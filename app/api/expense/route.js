import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { isAuthorized } from "@/app/lib/auth";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const category = searchParams.get("category"); 
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];

  if (id) {
    conditions.push("expenses.id = ?");
    values.push(id);
  }

  if (search) {
    conditions.push("expenses.name LIKE ?");
    values.push(`%${search}%`);
  }

  if (category) {
    conditions.push("expenses.category = ?");
    values.push(category);
  }

  const whereClause = `
    WHERE expenses.deleted_at IS NULL
    ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
  `;

  // No join since category is stored directly in expenses
  const dataSql = `
    SELECT expenses.*
    FROM expenses
    ${whereClause}
    ORDER BY expenses.row DESC
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM expenses
    ${whereClause}
  `;

  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "DB error" }, { status: 500 })
        );
      }

      db.query(countSql, values, (countErr, countRes) => {
        if (countErr) {
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

export async function POST(req) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { user_id, name, amount, date, category } = await req.json();
  const id = randomUUID();

  // Helper: check empty/null/whitespace
  const isEmpty = (val) => !val || val.toString().trim().length === 0;

  // Validate fields
  if (
    isEmpty(user_id) ||
    isEmpty(name) ||
    isEmpty(amount) ||
    isNaN(amount) ||
    isEmpty(date) ||
    isEmpty(category)
  ) {
    return NextResponse.json(
      { error: "All fields are required. No empty or whitespace values allowed." },
      { status: 400 }
    );
  }

  return new Promise((resolve) => {
    db.query(
      `INSERT INTO expenses (id, user_id, name, amount, date, category)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_id.trim(), name.trim(), parseFloat(amount), date.trim(), category.trim()],
      (err) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: "Insert failed" }, { status: 500 })
          );
        }
        resolve(
          NextResponse.json({ message: "Expense added", id }, { status: 200 })
        );
      }
    );
  });
}
