import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
  }

  return new Promise((resolve) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        resolve(NextResponse.json({ message: 'DB error' }, { status: 500 }));
        return;
      }

      if (results.length === 0) {
        resolve(NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }));
        return;
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        resolve(NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }));
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      resolve(NextResponse.json({ message: 'Login successful', token }, { status: 200 }));
    });
  });
}
