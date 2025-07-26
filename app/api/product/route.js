import { NextResponse } from 'next/server';
import { isAuthorized } from '@/app/lib/auth';
import { randomUUID } from 'crypto';
import { db } from '@/app/lib/db';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export async function GET(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return new Promise((resolve) => {
    db.query('SELECT * FROM products WHERE deleted_at IS NULL', (err, results) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(results));
      }
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

  return NextResponse.json({ message: 'Product created successfully!' });
}
