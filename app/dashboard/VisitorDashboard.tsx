'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { UserProfile, Enquiry } from '@/lib/types';

interface VisitorDashboardProps {
  profile: UserProfile;
}

export default function VisitorDashboard({ profile }: VisitorDashboardProps) {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEnquiries = async () => {
    const res = await fetch('/api/enquiries/me', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      setEnquiries(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const pendingCount = enquiries.filter(e => e.status === 'pending').length;
  const reviewingCount = enquiries.filter(e => e.status === 'reviewing').length;
  const forwardedCount = enquiries.filter(e => e.status === 'forwarded').length;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Visitor Dashboard</h1>
        <p className="text-slate-600">Welcome back, {profile.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Enquiries</p>
              <p className="text-3xl font-bold text-slate-900">{enquiries.length}</p>
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Pending</p>
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

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">{reviewingCount}</p>
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
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Forwarded</p>
              <p className="text-3xl font-bold text-green-600">{forwardedCount}</p>
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
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Your Enquiries</h2>
        <Link
          href="/search"
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition"
        >
          Browse Properties
        </Link>
      </div>

      {enquiries.length === 0 ? (
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
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No enquiries yet</h3>
          <p className="text-slate-600 mb-4">Start by browsing available properties</p>
          <Link
            href="/search"
            className="inline-block px-6 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry, i: number) => (
            <div key={enquiry.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-1 border border-slate-200 p-6" style={{animationDelay: `${i*80}ms`}}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">
                    {enquiry.properties?.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {enquiry.properties?.city}, {enquiry.properties?.state}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  enquiry.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : enquiry.status === 'reviewing'
                    ? 'bg-blue-100 text-blue-700'
                    : enquiry.status === 'forwarded'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-700 mb-3">{enquiry.message}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{enquiry.company_name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Contact</p>
                    <p className="font-medium text-slate-900">{enquiry.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{enquiry.contact_email}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Phone</p>
                    <p className="font-medium text-slate-900">{enquiry.contact_phone}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Submitted on {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
