'use client';

import Link from 'next/link';

const popularLocations = [
  { name: 'Mumbai', icon: '🏙️' },
  { name: 'Delhi', icon: '🌆' },
  { name: 'Bangalore', icon: '🏢' },
  { name: 'Hyderabad', icon: '🌃' },
  { name: 'Pune', icon: '🏗️' },
  { name: 'Chennai', icon: '🌇' },
];

export default function LocationBar() {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
          {popularLocations.map((location) => (
            <Link
              key={location.name}
              href={`/search?city=${encodeURIComponent(location.name)}`}
              className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-100 transition whitespace-nowrap group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {location.icon}
              </span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                {location.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
