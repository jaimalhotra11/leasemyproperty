'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MapPin, DollarSign, Building2, BarChart3 } from 'lucide-react';

interface MarketData {
  city: string;
  averagePrice: number;
  priceChange: number;
  totalProperties: number;
  demandScore: number;
  popularTypes: { type: string; count: number }[];
}

export default function MarketInsights() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const loadMarketData = async () => {
    try {
      setLoading(true);
      const url = selectedCity === 'all' 
        ? '/api/market-insights' 
        : `/api/market-insights?city=${encodeURIComponent(selectedCity)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setMarketData(data);
      }
    } catch (error) {
      console.error('Error loading market data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading market insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black">Market Insights</h3>
            <p className="text-sm text-gray-600">Real-time property market trends</p>
          </div>
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
        >
          <option value="all">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Jaipur">Jaipur</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((data, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-black" />
                <h4 className="font-bold text-black">{data.city}</h4>
              </div>
              {data.priceChange >= 0 ? (
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-bold">+{data.priceChange}%</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span className="text-sm font-bold">{data.priceChange}%</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Price</span>
                <span className="font-bold text-black flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  ₹{data.averagePrice.toLocaleString()}/mo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Properties</span>
                <span className="font-bold text-black flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {data.totalProperties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Demand Score</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{ width: `${data.demandScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-black">{data.demandScore}%</span>
                </div>
              </div>
            </div>

            {data.popularTypes.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">Popular Types:</p>
                <div className="flex flex-wrap gap-2">
                  {data.popularTypes.slice(0, 3).map((type, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black text-white text-xs font-medium rounded-full"
                    >
                      {type.type} ({type.count})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {marketData.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p>No market data available yet</p>
        </div>
      )}
    </div>
  );
}
