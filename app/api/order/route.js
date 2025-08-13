import { randomUUID } from "crypto";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const MINIMUM_AMOUNT = 2000;
    const totalAmount = body.items.reduce((sum, item) => {
      return sum + item.price * 100 * item.quantity;
    }, 0);

    if (totalAmount < MINIMUM_AMOUNT) {
      return NextResponse.json(
        {
          error: `The minimum payment amount is ₱20.00. Your current total is ₱${(
            totalAmount / 100
          ).toFixed(2)}`,
          minimumRequired: MINIMUM_AMOUNT,
          currentAmount: totalAmount,
        },
        { status: 400 }
      );
    }

    const lineItems = body.items.map((item) => ({
      name: item.name || `Item ${item.id}`,
      amount: (item.price || 0) * 100,
      currency: "PHP",
      quantity: item.quantity || 1,
    }));

    const paymentRes = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            line_items: lineItems,
            payment_method_types: ["gcash", "card"],
            description: "Order Payment",
            success_url: "http://localhost:3000/",
            cancel_url: "http://localhost:3000/",
          },
        },
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAYMONGO_SECRET + ":").toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );

    const paymentUrl = paymentRes.data.data.attributes.checkout_url;
    const sessionId = paymentRes.data.data.id;
    const orderId = randomUUID();

    await new Promise((resolve, reject) => {
      db.query("START TRANSACTION", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    try {
      await new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO orders 
            (id, user_id, payment_method, items, stock, total_amount, paymongo_session_id, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            body.user_id,
            body.payment_method,
            JSON.stringify(body.items),
            JSON.stringify(body.stock),
            body.total_amount,
            sessionId,
            "pending",
          ],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      });

      if (body.items && body.items.length > 0) {
        const productIds = body.items.map((item) => item.product_id);
        const placeholders = body.items.map(() => "?").join(",");

        await new Promise((resolve, reject) => {
          db.query(
            `DELETE FROM cart WHERE user_id = ? AND product_id IN (${placeholders})`,
            [body.user_id, ...productIds],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
      }

      await new Promise((resolve, reject) => {
        db.query("COMMIT", (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      return NextResponse.json({ paymentUrl });
    } catch (error) {
      await new Promise((resolve, reject) => {
        db.query("ROLLBACK", (err, result) => {
          if (err) console.error("Rollback failed:", err);
          reject(error);
        });
      });

      throw error;
    }
  } catch (error) {
    console.error("PayMongo Error:", error.response?.data || error);
    return NextResponse.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}
