import { NextResponse } from 'next/server';
import { isAuthorized } from '@/app/lib/auth';
import { randomUUID } from 'crypto';
import { db } from '@/app/lib/db';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';


export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  let baseSql = 'FROM products WHERE deleted_at IS NULL';
  const conditions = [];
  const values = [];

  if (categoryId) {
    conditions.push('category_id = ?');
    values.push(categoryId);
  }

  if (searchQuery) {
    conditions.push('name LIKE ?');
    values.push(`%${searchQuery}%`);
  }

  if (conditions.length > 0) {
    baseSql += ' AND ' + conditions.join(' AND ');
  }

  const dataSql = `SELECT * ${baseSql} LIMIT ? OFFSET ?`;
  const countSql = `SELECT COUNT(*) as total ${baseSql}`;
  const dataValues = [...values, limit, offset];

  return new Promise((resolve) => {
    db.query(dataSql, dataValues, (err, results) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: 'Database error' }, { status: 500 })
        );
      }

      db.query(countSql, values, (countErr, countResults) => {
        if (countErr) {
          return resolve(
            NextResponse.json({ error: 'Count query error' }, { status: 500 })
          );
        }

        const total = countResults[0]?.total || 0;

        resolve(
          NextResponse.json({
            data: results,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          }, { status: 200 })
        );
      });
    });
  });
}



export async function POST(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const user_id = form.get('user_id');
  const name = form.get('name');
  const price = form.get('price');
  const category_id = form.get('category_id');
  const file = form.get('image'); 

  const id = randomUUID();

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Invalid image upload' }, { status: 400 });
  }

  const ext = file.name.split('.').pop();
  const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
  const uploadPath = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadPath, { recursive: true }); 

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(path.join(uploadPath, uniqueName), buffer);

  const imagePath = `/uploads/${uniqueName}`; 

  await db.query(
    `INSERT INTO products (id, user_id, name, price, category_id, image)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, user_id, name, price, category_id, imagePath]
  );

  return NextResponse.json({ message: 'Product created successfully!' }, { status: 200 });
}