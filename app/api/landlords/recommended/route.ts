import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { UserProfile } from '@/models/UserProfile';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || '';
    const limit = parseInt(searchParams.get('limit') || '5');

    // Get landlords with most approved properties
    const pipeline: any[] = [
      {
        $match: {
          is_approved: true,
          availability_status: 'available',
        }
      },
      {
        $group: {
          _id: '$landlordId',
          propertyCount: { $sum: 1 },
          properties: { $push: '$$ROOT' }
        }
      },
      {
        $sort: { propertyCount: -1 }
      },
      {
        $limit: limit
      }
    ];

    // If city is provided, filter by city
    if (city) {
      pipeline[0].$match.city = { $regex: city, $options: 'i' };
    }

    let landlordStats = await Property.aggregate(pipeline);
    
    // If no results with city filter, try without city filter
    if (landlordStats.length === 0 && city) {
      const pipelineNoCity = [
        {
          $match: {
            is_approved: true,
            availability_status: 'available',
          }
        },
        {
          $group: {
            _id: '$landlordId',
            propertyCount: { $sum: 1 },
            properties: { $push: '$$ROOT' }
          }
        },
        {
          $sort: { propertyCount: -1 }
        },
        {
          $limit: limit
        }
      ];
      landlordStats = await Property.aggregate(pipelineNoCity);
    }

    if (landlordStats.length === 0) {
      return NextResponse.json([]);
    }

    // Get landlord details
    const landlordIds = landlordStats.map((stat: any) => stat._id);
    const landlords = await UserProfile.find({
      _id: { $in: landlordIds },
      role: 'landlord'
    }).lean();

    // Combine data
    const result = landlordStats.map((stat: any) => {
      const landlord = landlords.find((l: any) => l._id.toString() === stat._id.toString());
      const sampleProperty = stat.properties[0];
      
      return {
        landlord_id: stat._id.toString(),
        landlord_name: landlord?.full_name || 'Unknown',
        company_name: landlord?.company_name || '',
        email: landlord?.email || '',
        phone: landlord?.phone || '',
        property_count: stat.propertyCount,
        sample_property: sampleProperty ? {
          id: sampleProperty._id.toString(),
          title: sampleProperty.title,
          city: sampleProperty.city,
          state: sampleProperty.state,
          price_monthly: sampleProperty.price_monthly,
          interior_images: sampleProperty.interior_images || [],
        } : null,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching recommended landlords:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
