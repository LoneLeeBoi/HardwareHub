import { db } from '@/app/lib/db';
import { randomUUID } from 'crypto';
import { isAuthorized } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return new Promise((resolve) => {
    db.query('SELECT * FROM categories WHERE deleted_at IS NULL', (err, results) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(results));
      }
    });
  });
}

export async function POST(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;
  const id = randomUUID();

  return new Promise((resolve) => {
    db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name], (err) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Insert failed' }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: 'Category added successfully', id }));
      }
    });
  });
}
