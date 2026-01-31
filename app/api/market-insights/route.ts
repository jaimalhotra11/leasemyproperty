import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    const matchStage: any = {
      is_approved: true,
      availability_status: 'available',
    };

    if (city && city !== 'all') {
      matchStage.city = { $regex: city, $options: 'i' };
    }

    // Get market data grouped by city
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: '$city',
          averagePrice: { $avg: '$price_monthly' },
          totalProperties: { $sum: 1 },
          properties: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          city: '$_id',
          averagePrice: { $round: ['$averagePrice', 0] },
          totalProperties: 1,
          properties: 1,
        },
      },
    ];

    const cityData = await Property.aggregate(pipeline);

    // Calculate price changes (simulated - in production, compare with historical data)
    const marketData = cityData.map((data: any) => {
      const propertyTypes = data.properties.reduce((acc: any, prop: any) => {
        acc[prop.property_type] = (acc[prop.property_type] || 0) + 1;
        return acc;
      }, {});

      const popularTypes = Object.entries(propertyTypes)
        .map(([type, count]) => ({ type, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      // Calculate demand score based on actual enquiries and views
      const totalViews = data.properties.reduce((sum: number, prop: any) => sum + (prop.view_count || 0), 0);
      const totalEnquiries = data.properties.reduce((sum: number, prop: any) => sum + (prop.enquiries_count || 0), 0);
      const demandScore = Math.min(95, Math.max(40, Math.floor((totalViews / 10 + totalEnquiries * 5) / data.totalProperties)));

      // Simulate price change based on city (realistic variations)
      const cityPriceChanges: Record<string, number> = {
        'Delhi': 2.5,
        'Mumbai': 3.2,
        'Bangalore': 4.1,
        'Hyderabad': 2.8,
        'Pune': 3.5,
        'Gurgaon': 2.3,
        'Noida': 2.1,
        'Jaipur': 1.8,
      };
      const priceChange = cityPriceChanges[data.city] || (Math.random() * 5 - 2).toFixed(1);

      return {
        city: data.city,
        averagePrice: data.averagePrice,
        priceChange: typeof priceChange === 'number' ? priceChange : parseFloat(priceChange),
        totalProperties: data.totalProperties,
        demandScore,
        popularTypes,
      };
    });

    return NextResponse.json(marketData);
  } catch (error) {
    console.error('Error fetching market insights:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
