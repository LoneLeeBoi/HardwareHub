import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export async function GET(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  return new Promise((resolve) => {
    const sql = `SELECT * FROM user_details WHERE user_id = ? AND deleted_at IS NULL`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return resolve(
          NextResponse.json({ error: "Query failed" }, { status: 500 })
        );
      }

      if (result.length === 0) {
        return resolve(
          NextResponse.json(
            { error: "No matching user found" },
            { status: 404 }
          )
        );
      }

      resolve(
        NextResponse.json(
          { message: "User retrieved successfully", data: result[0] },
          { status: 200 }
        )
      );
    });
  });
}

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

export async function PUT(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const form = await req.formData();

  const firstname = form.get("firstname");
  const lastname = form.get("lastname");
  const address = form.get("address");
  const contact = form.get("contact");

  try {
    const userExists = await new Promise((resolve, reject) => {
      db.query(
        "SELECT user_id FROM user_details WHERE user_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results.length > 0);
        }
      );
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const sql = `
      UPDATE user_details 
      SET firstname = ?, lastname = ?, address = ?, contact = ?, updated_at = NOW()
      WHERE user_id = ?
    `;

    const values = [firstname, lastname, address, contact, id];

    await new Promise((resolve, reject) => {
      db.query(sql, values, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return NextResponse.json(
      { message: "User details updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const form = await req.formData();

  const firstname = form.get("firstname");
  const lastname = form.get("lastname");
  const address = form.get("address");
  const contact = form.get("contact");

  try {
    const sql = `
      INSERT INTO user_details 
        (user_id, firstname, lastname, address, contact, created_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const values = [id, firstname, lastname, address, contact];

    await new Promise((resolve, reject) => {
      db.query(sql, values, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    return NextResponse.json(
      { message: "User details inserted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Insert failed", details: err.message },
      { status: 500 }
    );
  }
}
