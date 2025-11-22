'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile, Property } from '@/lib/types';

interface LandlordDashboardProps {
  profile: UserProfile;
}

export default function LandlordDashboard({ profile }: LandlordDashboardProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProperties = async () => {
    const res = await fetch(`/api/properties?landlordId=${profile.id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setProperties(data);
    }
    setLoading(false);
  };

  const deleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const res = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' });
    if (res.ok) fetchProperties();
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const pendingCount = properties.filter(p => !p.is_approved).length;
  const approvedCount = properties.filter(p => p.is_approved).length;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Landlord Dashboard</h1>
        <p className="text-slate-600">Welcome back, {profile.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-slate-900">{properties.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Your Properties</h2>
        <Link
          href="/properties/new"
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition"
        >
          List New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No properties yet</h3>
          <p className="text-slate-600 mb-4">Start by listing your first property</p>
          <Link
            href="/properties/new"
            className="inline-block px-6 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition"
          >
            List Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, i) => (
            <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200" style={{animationDelay: `${i*80}ms`}}>
              <div className="relative h-48">
                <Image
                  src={property.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    property.is_approved
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {property.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{property.title}</h3>
                <p className="text-sm text-slate-600 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {property.city}, {property.state}
                </p>
                <p className="text-blue-600 font-bold mb-4">
                  ₹{property.price_monthly.toLocaleString()}/mo
                </p>

                <div className="flex space-x-2">
                  <Link
                    href={`/properties/${property.id}`}
                    className="flex-1 text-center px-3 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteProperty(property.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
