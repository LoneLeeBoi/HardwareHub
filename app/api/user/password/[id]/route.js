import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function PATCH(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve) => {
      const sql = "UPDATE `users` SET `password` = ? WHERE `id` = ?";
      db.query(sql, [hashedPassword, id], (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return resolve(
            NextResponse.json({ error: "Query failed" }, { status: 500 })
          );
        }

        if (result.affectedRows === 0) {
          return resolve(
            NextResponse.json({ error: "User not found" }, { status: 404 })
          );
        }

        resolve(
          NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
          )
        );
      });
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  return new Promise((resolve) => {
    const sql = `SELECT password FROM users WHERE id = ?`;

    db.query(sql, [id], async (err, result) => {
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

      const isMatch = await bcrypt.compare(password, result[0].password);

      if (!isMatch) {
        return resolve(
          NextResponse.json({ error: "Incorrect password" }, { status: 401 })
        );
      }

      resolve(
        NextResponse.json({ message: "Password is correct" }, { status: 200 })
      );
    });
  });
}
