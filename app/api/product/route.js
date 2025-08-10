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
  const limit =parseInt(searchParams.get("limit") || "5", 10);;
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];

  let baseCondition = `products.deleted_at IS NULL`;

  if (categoryName && searchQuery) {
    conditions.push(`(categories.name LIKE ? OR products.name LIKE ?)`);
    values.push(`%${categoryName}%`, `%${searchQuery}%`);
  } else if (categoryName) {
    conditions.push(`categories.name LIKE ?`);
    values.push(`%${categoryName}%`);
  } else if (searchQuery) {
    conditions.push(`products.name LIKE ?`);
    values.push(`%${searchQuery}%`);
  }

  const whereClause = conditions.length > 0
    ? `${baseCondition} AND ${conditions.join(" AND ")}`
    : baseCondition;

  // 1. Get distinct product names with pagination
  const distinctNamesSql = `
    SELECT DISTINCT products.name
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE ${whereClause}
    ORDER BY products.row DESC
    LIMIT ? OFFSET ?
  `;

  const distinctNamesValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(distinctNamesSql, distinctNamesValues, (err, nameResults) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "Distinct names query error" }, { status: 500 })
        );
      }

      const distinctNames = nameResults.map(row => row.name);
      if (distinctNames.length === 0) {
        return resolve(
          NextResponse.json({ data: [], page, limit, total: 0, totalPages: 0 }, { status: 200 })
        );
      }


      const placeholders = distinctNames.map(() => "?").join(",");
      const dataSql = `
        SELECT products.*, categories.name AS category_name
        FROM products
        JOIN categories ON products.category_id = categories.id
        WHERE products.name IN (${placeholders})
        ORDER BY  products.row DESC
      `;
      const dataValues = distinctNames;

      db.query(dataSql, dataValues, (dataErr, results) => {
        if (dataErr) {
          return resolve(
            NextResponse.json({ error: "Data query error" }, { status: 500 })
          );
        }

        // 3. Count distinct product names for total
        const countSql = `
          SELECT COUNT(DISTINCT products.name) as total
          FROM products
          JOIN categories ON products.category_id = categories.id
          WHERE ${whereClause}
        `;

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
  });
}




export async function POST(req) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const user_id = form.get("user_id")?.trim();
  const name = form.get("name")?.trim();
  const acquisition_cost = form.get("acquisition_cost")?.trim();
  const price = form.get("price")?.trim();
  const category_id = form.get("category_id")?.trim();
  const units = form.get("units")?.trim();
  const stock = form.get("stock")?.trim();
  const file = form.get("image");

  // Helper: check empty/null/whitespace
  const isEmpty = (val) => !val || val.length === 0;

  // Validation
  if (
    isEmpty(user_id) ||
    isEmpty(name) ||
    isEmpty(acquisition_cost) ||
    isNaN(acquisition_cost) ||
    isEmpty(price) ||
    isNaN(price) ||
    isEmpty(category_id)
  ) {
    return NextResponse.json(
      { error: "All fields are required. No empty or whitespace values allowed." },
      { status: 400 }
    );
  }

  // Image validation
  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Invalid image upload" },
      { status: 400 }
    );
  }

  const id = randomUUID();
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
        `INSERT INTO products (id, user_id, name, acquisition_cost, price, stock, category_id, units, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, name, acquisition_cost, price, stock, category_id, units, imagePath],
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

