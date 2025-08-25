import { randomUUID } from "crypto";
import { promisify } from "util";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";
const query = promisify(db.query).bind(db);
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
   console.log("qty: ", body.items);

    // ✅ Stock check
     for (const item of body.items) {
      const products = await query(
        `SELECT stock FROM products WHERE id = ? LIMIT 1`,
        [item.id]
      );

      const product = products[0]; // mysql returns array of rows

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.id} not found` },
          { status: 404 }
        );
      }

      const currentStock = parseInt(product.stock, 10);
      const requestedQty = parseInt(item.quantity, 10);

      if (requestedQty > currentStock) {
        return NextResponse.json(
          {
            error: `Not enough stock for ${item.name}. Available: ${currentStock}, Requested: ${requestedQty}`,
          },
          { status: 400 }
        );
      }
    }

    // ✅ Deduct stock
    for (const item of body.items) {
      await query(`UPDATE products SET stock = stock - ? WHERE id = ?`, [
        item.quantity,
        item.id,
      ]);
    }
    const orderId = randomUUID();

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
            success_url: "https://w0q5x1x4-3000.asse.devtunnels.ms/",
            cancel_url: "https://w0q5x1x4-3000.asse.devtunnels.ms/",
            metadata: {
              order_id: orderId,
              user_id: body.user_id,
            },
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
    const checkoutSessionId = paymentRes.data.data.id;

    await db.query(
      `INSERT INTO orders 
        (id, user_id, payment_method, items, stock, total_amount, paymongo_payment_intent_id, checkout_session_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        body.user_id,
        body.payment_method,
        JSON.stringify(body.items),
        JSON.stringify(body.stock),
        body.total_amount,
        null,
        checkoutSessionId,
        "pending",
      ]
    );

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("PayMongo Error:", error.response?.data || error);
    return NextResponse.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}
