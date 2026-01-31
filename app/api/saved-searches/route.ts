import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { SavedSearch } from '@/models/SavedSearch';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const searches = await SavedSearch.find({ userId: new Types.ObjectId(profile.id) })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(searches.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      filters: s.filters,
      email_alerts: s.email_alerts,
      sms_alerts: s.sms_alerts,
      created_at: s.createdAt?.toISOString() || '',
    })));
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    if (!body.name || !body.filters) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const search = await SavedSearch.create({
      userId: new Types.ObjectId(profile.id),
      name: body.name,
      filters: body.filters,
      email_alerts: body.email_alerts !== false,
      sms_alerts: body.sms_alerts === true,
    });

    return NextResponse.json({ id: search._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating saved search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
