import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { isAuthorized } from "@/app/lib/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let baseSql = "FROM expenses WHERE deleted_at IS NULL";
  const conditions = [];
  const values = [];

  if (userId) {
    conditions.push("user_id = ?");
    values.push(userId);
  }

  if (search) {
    conditions.push("name LIKE ?");
    values.push(`%${search}%`);
  }

  if (category) {
    conditions.push("category = ?");
    values.push(category);
  }

  if (conditions.length > 0) {
    baseSql += " AND " + conditions.join(" AND ");
  }

  const dataSql = `SELECT * ${baseSql} ORDER BY date DESC LIMIT ? OFFSET ?`;
  const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
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

  return new Promise((resolve) => {
    db.query(
      `INSERT INTO expenses (id, user_id, name, amount, date, category)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_id, name, amount, date, category],
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
