import { db } from "../../lib/db"; // or correct path
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password required" }),
      {
        status: 400,
      }
    );
  }

  return new Promise((resolve) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          resolve(
            new Response(JSON.stringify({ message: "DB error" }), {
              status: 500,
            })
          );
          return;
        }

        if (results.length > 0) {
          resolve(
            new Response(JSON.stringify({ message: "User already exists" }), {
              status: 409,
            })
          );
          return;
        }

        const hashed = await bcrypt.hash(password, 10);
        db.query(
          "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
          [randomUUID(), email, hashed],
          (err) => {
            if (err) {
              resolve(
                new Response(
                  JSON.stringify({ message: "DB insert error", err }),
                  { status: 500 }
                )
              );
            } else {
              resolve(
                new Response(
                  JSON.stringify({ message: "User registered successfully" }),
                  { status: 201 }
                )
              );
            }
          }
        );
      }
    );
  });
}
