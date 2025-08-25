import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);


    const paymentData = body.data?.attributes?.data;
    const status = paymentData?.attributes?.status;
    const orderId = paymentData?.attributes?.metadata?.order_id;

    if (!status || !orderId) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    let newStatus;
    if (status === 'paid') {
      newStatus = 'succeeded';
    } else if (status === 'failed') {
      newStatus = 'failed';
    } else {
      return NextResponse.json({ received: true });
    }

    await db.query(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [newStatus, orderId]
    );

    return NextResponse.json({ received: true });

  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
