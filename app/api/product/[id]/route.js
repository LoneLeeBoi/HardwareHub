import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";


export async function GET(req, { params }) {


  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
  }

  return new Promise((resolve) => {
    db.query(
      'SELECT * FROM products WHERE id = ? AND deleted_at IS NULL',
      [id],
      (err, results) => {
        if (err) {
          resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
        } else if (results.length === 0) {
          resolve(NextResponse.json({ error: 'Product not found' }, { status: 404 }));
        } else {
          resolve(NextResponse.json(results[0], { status: 200 }));
        }
      }
    );
  });
}

export async function PUT(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const form = await req.formData();
  const user_id = form.get("user_id");
  const name = form.get("name");
  const price = form.get("price");
  const category_id = form.get("category_id");
  const file = form.get("image");

  let imagePath = null;

  if (file && typeof file !== "string") {
    const ext = file.name.split('.').pop();
    const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads');

    await mkdir(uploadPath, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadPath, uniqueName), buffer);

    imagePath = `/uploads/${uniqueName}`;
  }

  return new Promise((resolve) => {
    const sql = imagePath
      ? `UPDATE products SET user_id = ?, name = ?, price = ?, category_id = ?, image = ? WHERE id = ?`
      : `UPDATE products SET user_id = ?, name = ?, price = ?, category_id = ? WHERE id = ?`;

    const values = imagePath
      ? [user_id, name, price, category_id, imagePath, id]
      : [user_id, name, price, category_id, id];

    db.query(sql, values, (err) => {
      if (err) {
        resolve(NextResponse.json({ error: "Update failed" }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: "Product updated successfully" },{ status: 200 }));
      }
    });
  });
}

export async function DELETE(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  return new Promise((resolve) => {
    const sql = `UPDATE products SET deleted_at = NOW() WHERE id = ?`;

    db.query(sql, [id], (err) => {
      if (err) {
        resolve(NextResponse.json({ error: "Delete failed" }, { status: 500 }));
      } else {
        resolve(
          NextResponse.json({ message: "Product deleted (soft) successfully" }, { status: 200 })
        );
      }
    });
  });
}