"use client"
import React, { useState } from 'react';
import { X, TrendingUp, MapPin, DollarSign, Square, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';

interface PropertyComparisonProps {
  properties: Property[];
  onRemove: (id: string) => void;
}

export default function PropertyComparison({ properties, onRemove }: PropertyComparisonProps) {
  if (properties.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black shadow-2xl z-50 max-h-[60vh] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-black flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Compare Properties ({properties.length})</span>
          </h3>
          <button
            onClick={() => properties.forEach(p => onRemove(p.id))}
            className="text-sm text-gray-600 hover:text-black"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 relative">
              <button
                onClick={() => onRemove(property.id)}
                className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>

              <Link href={`/properties/${property.id}`}>
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={property.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <h4 className="font-bold text-black mb-2 line-clamp-1">{property.title}</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.city}, {property.state}</span>
                </div>
                <div className="flex items-center text-black font-semibold">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>₹{property.price_monthly.toLocaleString()}/mo</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{property.size_sqft.toLocaleString()} sq ft</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="text-xs">₹{(property.price_monthly / property.size_sqft).toFixed(2)}/sq ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
