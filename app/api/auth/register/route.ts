import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserProfile } from '@/models/UserProfile';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { email, password, full_name, role, phone, company_name } = body;

  if (!email || !password || !full_name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existing = await UserProfile.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await UserProfile.create({
    email,
    full_name,
    role,
    phone: phone || undefined,
    company_name: company_name || undefined,
    password_hash: hash,
  });

  const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  const res = NextResponse.json({ id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role, phone: user.phone, company_name: user.company_name });
  res.cookies.set('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
  return res;
}