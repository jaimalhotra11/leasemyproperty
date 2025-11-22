'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile, Property, Enquiry } from '@/lib/types';

interface AdminDashboardProps {
  profile: UserProfile;
}

export default function AdminDashboard({ profile }: AdminDashboardProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<'all' | 'pending' | 'reviewing' | 'forwarded' | 'closed'>('pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageFlags, setImageFlags] = useState<Record<string, { blurred: Set<string>; front: Set<string> }>>({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatus]);

  const fetchData = async () => {
    const [propertiesRes, enquiriesRes] = await Promise.all([
      fetch('/api/properties/search?is_approved=false', { cache: 'no-store' }),
      fetch(activeStatus === 'all' ? '/api/enquiries' : `/api/enquiries?status=${activeStatus}`, { cache: 'no-store' }),
    ]);
    if (propertiesRes.ok) {
      const data = await propertiesRes.json();
      setProperties(data);
      const nextFlags: Record<string, { blurred: Set<string>; front: Set<string> }> = {};
      data.forEach((p: Property) => {
        nextFlags[p.id] = {
          blurred: new Set(p.blurred_images || []),
          front: new Set(p.front_images || []),
        };
      });
      setImageFlags(nextFlags);
    }
    if (enquiriesRes.ok) {
      const data = await enquiriesRes.json();
      setEnquiries(data as any);
    }
    setLoading(false);
  };

  const toggleFlag = (pid: string, img: string, type: 'blurred' | 'front') => {
    setImageFlags((prev) => {
      const curr = prev[pid] || { blurred: new Set<string>(), front: new Set<string>() };
      const next = { blurred: new Set(curr.blurred), front: new Set(curr.front) };
      const set = type === 'blurred' ? next.blurred : next.front;
      if (set.has(img)) set.delete(img); else set.add(img);
      return { ...prev, [pid]: next };
    });
  };

  const saveImageFlags = async (pid: string) => {
    const flags = imageFlags[pid];
    if (!flags) return;
    const res = await fetch(`/api/properties/${pid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blurred_images: Array.from(flags.blurred),
        front_images: Array.from(flags.front),
      }),
    });
    if (res.ok) fetchData();
  };

  const approveProperty = async (propertyId: string) => {
    const res = await fetch(`/api/properties/${propertyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: true }),
    });
    if (res.ok) fetchData();
  };

  const updateEnquiryStatus = async (enquiryId: string, status: string) => {
    const res = await fetch(`/api/enquiries/${enquiryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchData();
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Welcome back, {profile.full_name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Pending Property Approvals ({properties.length})
          </h2>
          <div className="space-y-4">
            {properties.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-slate-600">
                No pending approvals
              </div>
            ) : (
              properties.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200" style={{padding:'1.5rem'}}>
                  <h3 className="font-bold text-slate-900 mb-2">{property.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {property.city}, {property.state} | {property.size_sqft.toLocaleString()} sq ft | ₹{property.price_monthly.toLocaleString()}/mo
                  </p>
                  {property.interior_images && property.interior_images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {property.interior_images.map((img) => (
                        <div key={img} className="border rounded-lg p-2">
                          <Image src={img} alt="" width={320} height={96} className="w-full h-24 object-cover rounded" />
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <label className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={imageFlags[property.id]?.blurred?.has(img) || false}
                                onChange={() => toggleFlag(property.id, img, 'blurred')}
                              />
                              <span>Blur</span>
                            </label>
                            <label className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={imageFlags[property.id]?.front?.has(img) || false}
                                onChange={() => toggleFlag(property.id, img, 'front')}
                              />
                              <span>Front (hide)</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-3">
                    <Link
                      href={`/properties/${property.id}`}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => saveImageFlags(property.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      Save Image Flags
                    </button>
                    <button
                      onClick={() => approveProperty(property.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Enquiries ({activeStatus.charAt(0).toUpperCase() + activeStatus.slice(1)}) ({enquiries.length})
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            {['all','pending','reviewing','forwarded','closed'].map((s) => (
              <button
                key={s}
                onClick={() => { setActiveStatus(s as any); setLoading(true); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${activeStatus===s ? 'bg-neutral-800 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-slate-600">
                No pending enquiries
              </div>
            ) : (
              enquiries.map((enquiry: any, i: number) => (
                <div key={enquiry.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200" style={{padding:'1.5rem', animationDelay: `${i*80}ms`}}>
                  <h3 className="font-bold text-slate-900 mb-2">{enquiry.company_name}</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    Property: {enquiry.properties?.title}
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    Contact: {enquiry.contact_name} ({enquiry.contact_email})
                  </p>
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedId(expandedId === enquiry.id ? null : enquiry.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {expandedId === enquiry.id ? 'Hide Details' : 'View Details'}
                    </button>
                    {expandedId === enquiry.id && (
                      <div className="mt-3 text-sm text-slate-700">
                        <p className="mb-2">{enquiry.message}</p>
                        <p className="text-slate-500">Phone: {enquiry.contact_phone}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {(activeStatus === 'pending' || activeStatus === 'reviewing') && (
                      <button
                        onClick={() => updateEnquiryStatus(enquiry.id, 'reviewing')}
                        className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs font-medium transition"
                      >
                        Review
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        await fetch(`/api/properties/${enquiry.property_id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ is_approved: true }),
                        });
                        fetchData();
                      }}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
