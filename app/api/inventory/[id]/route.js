import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { isAuthorized } from "@/app/lib/auth";

export async function GET(_, { params }) {
  const { id } = await params;

  return new Promise((resolve) => {
    db.query(
      "SELECT * FROM inventory WHERE id = ? AND deleted_at IS NULL",
      [id],
      (err, results) => {
        if (err || results.length === 0) {
          return resolve(
            NextResponse.json({ error: "Not found" }, { status: 404 })
          );
        }

        resolve(NextResponse.json(results[0], { status: 200 }));
      }
    );
  });
}

export async function PUT(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { user_id, product_id,  stock, acquisition, retail } = await req.json();
  console.log("id:",product_id)
  return new Promise((resolve) => {
    db.query(
      `UPDATE inventory 
       SET user_id=?, product_id = ?,  stock = ?, acquisition = ?, retail = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND deleted_at IS NULL`,
      [user_id, product_id,  stock, acquisition, retail, id],
      (err, result) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: "Update failed" }, { status: 500 })
          );
        }

        if (result.affectedRows === 0) {
          return resolve(
            NextResponse.json({ error: "No inventory updated" }, { status: 400 })
          );
        }

        resolve(
          NextResponse.json({ message: "Inventory updated" }, { status: 200 })
        );
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
      `UPDATE inventory SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: "Delete failed" }, { status: 500 })
          );
        }

        resolve(
          NextResponse.json({ message: "Inventory deleted" }, { status: 200 })
        );
      }
    );
  });
}