'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minSize, setMinSize] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('city', location);
    if (propertyType) params.set('type', propertyType);
    if (minSize) params.set('minSize', minSize);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <Image
        src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg"
        alt="Commercial property"
        fill
        className="object-cover mix-blend-overlay"
        priority
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
          Find Your Perfect
          <span className="block text-blue-400">Commercial Space</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 text-center mb-8 max-w-2xl">
          Premium properties for leading brands and businesses
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl p-2 w-full max-w-4xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or location"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="propertyType" className="sr-only">
              Property Type
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
            >
              <option value="">All Types</option>
              <option value="commercial">Commercial</option>
              <option value="retail">Retail</option>
              <option value="office">Office</option>
              <option value="warehouse">Warehouse</option>
              <option value="showroom">Showroom</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="minSize" className="sr-only">
              Minimum Size
            </label>
            <input
              id="minSize"
              type="number"
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
              placeholder="Min. sq ft"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="bg-neutral-800 hover:bg-neutral-900 text-white px-8 py-3 rounded-xl font-medium transition flex items-center justify-center space-x-2 shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
