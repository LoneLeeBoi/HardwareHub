import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { isAuthorized } from "@/app/lib/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let baseSql = `FROM cart 
    JOIN products ON cart.product_id = products.id 
    WHERE cart.deleted_at IS NULL`;
  const conditions = [];
  const values = [];

  if (userId) {
    conditions.push("cart.user_id = ?");
    values.push(userId);
  }

  if (conditions.length > 0) {
    baseSql += " AND " + conditions.join(" AND ");
  }

  const dataSql = `
    SELECT cart.*, products.name AS product_name, products.units 
    ${baseSql}
    ORDER BY cart.updated_at DESC 
    LIMIT ? OFFSET ?`;
  const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        console.error("DATA QUERY ERROR:", err);
        return resolve(NextResponse.json({ error: "DB error" }, { status: 500 }));
      }

      db.query(countSql, values, (countErr, countRes) => {
        if (countErr) {
          return resolve(NextResponse.json({ error: "Count error" }, { status: 500 }));
        }

        resolve(
          NextResponse.json(
            {
              data: results,
              page,
              limit,
              total: countRes[0]?.total || 0,
              totalPages: Math.ceil((countRes[0]?.total || 0) / limit),
            },
            { status: 200 }
          )
        );
      });
    });
  });
}
export async function POST(req) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { user_id, product_id, quantity } = await req.json();
  const id = randomUUID();

  return new Promise((resolve) => {
    // Step 1: Check if the product is already in the cart for this user
    db.query(
      `SELECT id FROM cart WHERE user_id = ? AND product_id = ? AND deleted_at IS NULL LIMIT 1`,
      [user_id, product_id],
      (err, results) => {
        if (err) {
          console.error("CART CHECK ERROR:", err);
          return resolve(
            NextResponse.json({ error: "Check failed" }, { status: 500 })
          );
        }

        if (results.length > 0) {
          return resolve(
            NextResponse.json({ error: "Product already in cart" }, { status: 409 })
          );
        }

        // Step 2: Insert if not found
        db.query(
          `INSERT INTO cart (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?)`,
          [id, user_id, product_id, quantity],
          (insertErr) => {
            if (insertErr) {
              console.error("CART INSERT ERROR:", insertErr);
              return resolve(
                NextResponse.json({ error: "Insert failed" }, { status: 500 })
              );
            }

            resolve(
              NextResponse.json({ message: "Item added to cart", id }, { status: 200 })
            );
          }
        );
      }
    );
  });
}
