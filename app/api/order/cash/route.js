import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomUUID } from "crypto";

function queryPromise(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, payment_method, items, stock, total_amount } = body;

    // Validation
    if (!user_id || !payment_method || !items || !stock || !total_amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Items must be a non-empty array" },
        { status: 400 }
      );
    }

    // Generate UUID
    const orderId = randomUUID();

    // Option 1: If you can rename the column to 'id' (recommended)
    const insertQuery = `
      INSERT INTO orders (id, user_id, payment_method, items, stock, total_amount, status) 
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;

    try {
      await queryPromise('START TRANSACTION');

      // Insert order
      await queryPromise(insertQuery, [
        orderId,
        user_id,
        payment_method,
        JSON.stringify(items),
        JSON.stringify(stock),
        total_amount,
      ]);

      // Clear cart items
      const productIds = items.map(item => item.product_id);
      if (productIds.length > 0) {
        const placeholders = productIds.map(() => "?").join(",");
        await queryPromise(
          `DELETE FROM cart WHERE user_id = ? AND product_id IN (${placeholders})`,
          [user_id, ...productIds]
        );
      }

      // Commit transaction
      await queryPromise('COMMIT');

      return NextResponse.json({
        success: true,
        message: "Order created successfully",
        orderId: orderId,
      });

    } catch (dbError) {
      await queryPromise('ROLLBACK');
      console.error("Database Error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Database operation failed",
          details: dbError.message
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        details: error.message
      },
      { status: 500 }
    );
  }
}