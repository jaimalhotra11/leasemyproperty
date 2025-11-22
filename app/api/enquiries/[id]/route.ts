import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { requireAuth } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { profile } = await requireAuth();
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (body.status) {
    await Enquiry.updateOne({ _id: params.id }, { $set: { status: body.status } });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}