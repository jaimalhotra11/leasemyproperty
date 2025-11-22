'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import type { Property, UserProfile } from '@/lib/types';

export default function AdminReviewPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [blurred, setBlurred] = useState<Set<string>>(new Set());
  const [front, setFront] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [pRes, meRes] = await Promise.all([
        fetch(`/api/properties/${params.id}`, { cache: 'no-store' }),
        fetch('/api/auth/profile', { cache: 'no-store' }).catch(() => ({ ok: false } as any)),
      ]);
      if (pRes.ok) {
        const p = await pRes.json();
        setProperty(p);
        setBlurred(new Set(p.blurred_images || []));
        setFront(new Set(p.front_images || []));
      }
      if (meRes.ok) {
        const me = await meRes.json();
        setProfile(me);
      }
    };
    load();
  }, [params.id]);

  const toggle = (img: string, type: 'blur' | 'front') => {
    if (type === 'blur') {
      setBlurred((prev) => {
        const next = new Set(prev);
        if (next.has(img)) next.delete(img); else next.add(img);
        return next;
      });
    } else {
      setFront((prev) => {
        const next = new Set(prev);
        if (next.has(img)) next.delete(img); else next.add(img);
        return next;
      });
    }
  };

  const saveFlags = async () => {
    if (!property) return;
    setSaving(true);
    await fetch(`/api/properties/${property.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blurred_images: Array.from(blurred),
        front_images: Array.from(front),
      }),
    });
    setSaving(false);
  };

  const approve = async () => {
    if (!property) return;
    setSaving(true);
    await fetch(`/api/properties/${property.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: true }),
    });
    setSaving(false);
  };

  if (profile && profile.role !== 'admin') {
    return <div className="p-8">Forbidden</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuthenticated={!!profile} userRole={profile?.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!property ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-black mb-4">Review Property</h1>
            <p className="text-gray-600 mb-6">{property.title} — {property.city}, {property.state}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {property.interior_images.map((img) => (
                <div key={img} className="border rounded-lg p-2">
                  <Image src={img} alt="" width={400} height={300} className={`w-full h-36 object-cover rounded ${blurred.has(img) ? 'blur-sm' : ''}`} />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <label className="flex items-center space-x-1">
                      <input type="checkbox" checked={blurred.has(img)} onChange={() => toggle(img, 'blur')} />
                      <span>Blur</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input type="checkbox" checked={front.has(img)} onChange={() => toggle(img, 'front')} />
                      <span>Front (hide)</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button onClick={saveFlags} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium" disabled={saving}>
                {saving ? 'Saving...' : 'Save Flags'}
              </button>
              <button onClick={approve} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium" disabled={saving}>
                {saving ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}