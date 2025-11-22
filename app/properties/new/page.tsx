import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PropertyForm from './PropertyForm';
import { getUserProfile } from '@/lib/auth';

export default async function NewPropertyPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== 'landlord') {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isAuthenticated={true} userRole={profile.role} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">List Your Property</h1>
        <PropertyForm landlordId={profile.id} />
      </main>
    </div>
  );
}

export const dynamic = 'force-dynamic'