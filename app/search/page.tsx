import { Suspense } from 'react';
import SearchContent from './SearchContent';
import Navbar from '@/components/Navbar';
import { getUserProfile } from '@/lib/auth';

export default async function SearchPage() {
  const profile = await getUserProfile();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isAuthenticated={!!profile} userRole={profile?.role} />
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
