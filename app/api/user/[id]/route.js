import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export async function DELETE(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  return new Promise((resolve) => {
    const sql = `UPDATE user_details SET deleted_at = NOW() WHERE user_id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return resolve(
          NextResponse.json({ error: "Delete failed" }, { status: 500 })
        );
      }

      if (result.affectedRows === 0) {
        return resolve(
          NextResponse.json(
            { error: "No matching user found" },
            { status: 404 }
          )
        );
      }

      resolve(
        NextResponse.json(
          { message: "User deleted (soft) successfully" },
          { status: 200 }
        )
      );
    });
  });
}
