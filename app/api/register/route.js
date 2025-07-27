import { db } from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password required' }, { status: 400 });
    }

    console.log('Checking existing user...');
    return new Promise((resolve) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          console.error('DB error:', err);
          resolve(NextResponse.json({ message: 'DB error' }, { status: 500 }));
          return;
        }

        if (results.length > 0) {
          resolve(NextResponse.json({ message: 'User already exists' }, { status: 409 }));
          return;
        }

        const hashed = await bcrypt.hash(password, 10);
        console.log('Inserting user...');
        db.query(
          'INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
          [randomUUID(), username, email, hashed, 'user'],
          (err) => {
            if (err) {
              console.error('Insert error:', err);
              resolve(NextResponse.json({ message: 'DB insert error', err }, { status: 500 }));
            } else {
              resolve(NextResponse.json({ message: 'User registered successfully' }, { status: 200 }));
            }
          }
        );
      });
    });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}