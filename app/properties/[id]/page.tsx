import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getUserProfile } from '@/lib/auth';
import PropertyDetailClient from './PropertyDetailClient';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const profile = await getUserProfile();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/properties/${params.id}`, { cache: 'no-store' });
  const property = res.ok ? await res.json() : null;
  const error = !res.ok;

  if (error || !property) {
    notFound();
  }

  if (!property.is_approved && property.landlord_id !== profile?.id && profile?.role !== 'admin') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuthenticated={!!profile} userRole={profile?.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PropertyDetailClient property={property} profile={profile} />
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6"></div>
          </div>
        </div>
      </main>
    </div>
  );
}