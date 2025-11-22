import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserProfile } from '@/models/UserProfile';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const user = await UserProfile.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  const res = NextResponse.json({ id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role });
  res.cookies.set('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
  return res;
}