import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/lib/auth";
import { randomUUID } from "crypto";
import { db } from "@/app/lib/db";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const categoryName = searchParams.get("category_name");
  const searchQuery = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let baseSql = `
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.deleted_at IS NULL
  `;

  const conditions = [];
  const values = [];

  if (categoryName && searchQuery) {
    // 💡 Both use LIKE for partial matching
    conditions.push("(categories.name LIKE ? OR products.name LIKE ?)");
    values.push(`%${categoryName}%`, `%${searchQuery}%`);
  } else if (categoryName) {
    conditions.push("categories.name LIKE ?");
    values.push(`%${categoryName}%`);
  } else if (searchQuery) {
    conditions.push("products.name LIKE ?");
    values.push(`%${searchQuery}%`);
  }

  if (conditions.length > 0) {
    baseSql += " AND " + conditions.join(" AND ");
  }

  const dataSql = `
    SELECT products.*, categories.name AS category_name
    ${baseSql}
    ORDER BY products.row DESC
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) as total
    ${baseSql}
  `;

  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "Database error" }, { status: 500 })
        );
      }

      db.query(countSql, values, (countErr, countResults) => {
        if (countErr) {
          return resolve(
            NextResponse.json({ error: "Count query error" }, { status: 500 })
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

export async function POST(req) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const user_id = form.get("user_id");
  const name = form.get("name");
  const price = form.get("price");
  const category_id = form.get("category_id");
  const units = form.get("units");
  const stock = form.get("stock");
  const file = form.get("image");

  const id = randomUUID();

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Invalid image upload" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop();
  const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadPath, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(path.join(uploadPath, uniqueName), buffer);

  const imagePath = `/uploads/${uniqueName}`;

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, user_id, name, price, stock, category_id, units, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, name, price, stock, category_id, units, imagePath],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    if (result.affectedRows === 1) {
      return NextResponse.json(
        { message: "Product created successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No product was created." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
