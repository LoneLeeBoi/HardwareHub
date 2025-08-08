import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let baseSql = `
    FROM users AS u
    LEFT JOIN user_details AS ud ON ud.user_id = u.id
    WHERE ud.deleted_at IS NULL AND ud.user_id IS NOT NULL
  `;

  const conditions = [];
  const values = [];

  if (searchQuery) {
    conditions.push("(u.username LIKE ? OR u.email LIKE ?)");
    values.push(`%${searchQuery}%`, `%${searchQuery}%`);
  }

  if (conditions.length > 0) {
    baseSql += " AND " + conditions.join(" AND ");
  }

  // Select explicitly so there’s no overwriting of columns
  const dataSql = `
    SELECT 
      u.id AS user_id,
      u.username,
      u.email,
      ud.firstname,
      ud.lastname,
      ud.address,
      ud.contact
    ${baseSql}
    ORDER BY u.id DESC
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) AS total
    ${baseSql}
  `;

  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "Database error", details: err.message }, { status: 500 })
        );
      }

      db.query(countSql, values, (countErr, countResults) => {
        if (countErr) {
          return resolve(
            NextResponse.json({ error: "Count query error", details: countErr.message }, { status: 500 })
          );
        }

        const total = countResults[0]?.total || 0;

        resolve(
          NextResponse.json(
            {
              data: results,
              page,
              limit,
              total,
              totalPages: Math.ceil(total / limit),
            },
            { status: 200 }
          )
        );
      });
    });
  });
}
