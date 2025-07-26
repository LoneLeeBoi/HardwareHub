import { db } from '@/app/lib/db';
import { isAuthorized } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

// PUT - update
export async function PUT(req, context) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();
  const { name } = body;

  return new Promise((resolve) => {
    db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Update failed' }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: 'Category updated successfully!' }, { status: 200 }));
      }
    });
  });
}

// DELETE - soft delete
export async function DELETE(req, context) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } =await context.params;

  return new Promise((resolve) => {
    db.query('UPDATE categories SET deleted_at = NOW() WHERE id = ?', [id], (err) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Delete failed' }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 }));
      }
    });
  });
}
