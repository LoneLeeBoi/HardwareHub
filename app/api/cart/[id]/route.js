import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { isAuthorized } from "@/app/lib/auth";
export async function GET(_, { params }) {
  const { id } = await params;
  return new Promise((resolve) => {
    db.query(
      "SELECT * FROM cart WHERE id = ? AND deleted_at IS NULL",
      [id],
      (err, results) => {
        if (err || results.length === 0)
          return resolve(
            NextResponse.json({ error: "Not found" }, { status: 404 })
          );

        resolve(NextResponse.json(results[0], { status: 200 }));
      }
    );
  });
}


export async function DELETE(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  return new Promise((resolve) => {
    db.query(
      `DELETE FROM cart WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: "Delete failed" }, { status: 500 })
          );
        }

        if (result.affectedRows === 0) {
          return resolve(
            NextResponse.json({ error: "Expense not found" }, { status: 404 })
          );
        }

        resolve(
          NextResponse.json({ message: "Successfully removed from the cart" }, { status: 200 })
        );
      }
    );
  });
}
