import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongoose';
import { UserProfile as UserModel } from '@/models/UserProfile';
import type { UserProfile } from './types';

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return { id: payload.sub } as any;
  } catch {
    return null;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  await connectDB();
  const user = await getUser();
  if (!user) return null;
  const doc = await UserModel.findById(user.id).lean() as any;
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    email: doc.email,
    full_name: doc.full_name,
    role: doc.role,
    phone: doc.phone,
    company_name: doc.company_name,
    created_at: doc.createdAt?.toISOString() || '',
    updated_at: doc.updatedAt?.toISOString() || '',
  };
}

export async function requireAuth() {
  const profile = await getUserProfile();
  if (!profile) return { user: null, profile: null };
  return { user: { id: profile.id } as any, profile };
}
