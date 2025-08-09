import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { isAuthorized } from "@/app/lib/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let baseSql = `FROM products WHERE deleted_at IS NULL`;
  const conditions = [];
  const values = [];

  if (id) {
    conditions.push("id = ?");
    values.push(id);
  }

  if (search) {
    conditions.push("name LIKE ?");
    values.push(`%${search}%`);
  }

  if (conditions.length > 0) {
    baseSql += " AND " + conditions.join(" AND ");
  }

  const dataSql = `
    SELECT * 
    ${baseSql} 
ORDER BY CAST(stock AS UNSIGNED) ASC, id ASC
    LIMIT ? OFFSET ?
  `;
  const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        console.error("DATA QUERY ERROR:", err);
        return resolve(
          NextResponse.json({ error: "DB error" }, { status: 500 })
        );
      }

      db.query(countSql, values, (countErr, countRes) => {
        if (countErr) {
          console.error("COUNT QUERY ERROR:", countErr);
          return resolve(
            NextResponse.json({ error: "Count error" }, { status: 500 })
          );
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

// POST: Add new inventory record
export async function POST(req) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { user_id, product_id, stock, acquisition, retail } = await req.json();
  const id = randomUUID();

  return new Promise((resolve) => {
    // Step 1: Insert into inventory
    db.query(
      `INSERT INTO inventory 
        (id, user_id, product_id, stock, acquisition, retail) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_id, product_id, stock, acquisition, retail],
      (err) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: "Insert failed" }, { status: 500 })
          );
        }

        // Step 2: Get current product stock
        db.query(
          `SELECT stock FROM products WHERE id = ? LIMIT 1`,
          [product_id],
          (err, results) => {
            if (err || results.length === 0) {
              return resolve(
                NextResponse.json(
                  { error: "Product not found" },
                  { status: 404 }
                )
              );
            }

            const currentStock = parseInt(results[0].stock || 0);
            const updatedStock = currentStock + parseInt(stock);

            db.query(
              `UPDATE products SET stock = ? WHERE id = ?`,
              [updatedStock, product_id],
              (err) => {
                if (err) {
                  return resolve(
                    NextResponse.json(
                      { error: "Stock update failed" },
                      { status: 500 }
                    )
                  );
                }

                resolve(
                  NextResponse.json(
                    {
                      message: "Inventory added and product stock updated",
                      id,
                    },
                    { status: 200 }
                  )
                );
              }
            );
          }
        );
      }
    );
  });
}
