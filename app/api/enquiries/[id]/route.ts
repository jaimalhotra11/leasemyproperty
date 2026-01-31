import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid enquiry ID' }, { status: 400 });
    }

    const body = await req.json();
    if (!body.status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // Validate status value
    const validStatuses = ['pending', 'reviewing', 'forwarded', 'closed'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const result = await Enquiry.updateOne({ _id: params.id }, { $set: { status: body.status } });
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}