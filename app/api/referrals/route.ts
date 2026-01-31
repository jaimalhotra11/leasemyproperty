import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Referral } from '@/models/Referral';
import { UserProfile } from '@/models/UserProfile';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const referrals = await Referral.find({
      referrerId: new Types.ObjectId(profile.id),
    })
      .populate('referredUserId', 'full_name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(referrals.map((r: any) => ({
      id: r._id.toString(),
      referredUserName: r.referredUserId?.full_name || 'Unknown',
      status: r.status,
      reward_type: r.reward_type,
      reward_amount: r.reward_amount,
      reward_given: r.reward_given,
      created_at: r.createdAt?.toISOString() || '',
    })));
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { referral_code } = body;

    if (!referral_code) {
      return NextResponse.json({ error: 'Referral code is required' }, { status: 400 });
    }

    // Find referrer by code
    const referrer = await UserProfile.findOne({ referral_code }).lean();
    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    // Get current user (the one being referred)
    const { profile } = await requireAuth();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already used a referral code
    const existingUser = await UserProfile.findById(profile.id).lean();
    if (existingUser?.referred_by) {
      return NextResponse.json({ error: 'You have already used a referral code' }, { status: 409 });
    }

    // Check if user is referring themselves
    if (referrer._id.toString() === profile.id) {
      return NextResponse.json({ error: 'Cannot use your own referral code' }, { status: 400 });
    }

    // Create referral record
    const referral = await Referral.create({
      referrerId: new Types.ObjectId(referrer._id),
      referredUserId: new Types.ObjectId(profile.id),
      referral_code,
      status: 'completed',
      reward_type: 'credit',
      reward_amount: 500, // ₹500 credit for referrer
    });

    // Update referred user
    await UserProfile.findByIdAndUpdate(profile.id, {
      referred_by: referral_code,
    });

    // Give credit to referrer
    await UserProfile.findByIdAndUpdate(referrer._id, {
      $inc: { credits: 500 },
    });

    // Mark referral as rewarded
    await Referral.findByIdAndUpdate(referral._id, {
      reward_given: true,
      reward_date: new Date(),
    });

    return NextResponse.json({
      message: 'Referral code applied successfully',
      reward: 'You and your referrer both received ₹500 credits!',
    });
  } catch (error) {
    console.error('Error processing referral:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
