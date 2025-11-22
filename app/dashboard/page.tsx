import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getUserProfile } from '@/lib/auth';
import AdminDashboard from './AdminDashboard';
import LandlordDashboard from './LandlordDashboard';
import VisitorDashboard from './VisitorDashboard';

export default async function DashboardPage() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isAuthenticated={true} userRole={profile.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profile.role === 'admin' && <AdminDashboard profile={profile} />}
        {profile.role === 'landlord' && <LandlordDashboard profile={profile} />}
        {profile.role === 'visitor' && <VisitorDashboard profile={profile} />}
      </main>
    </div>
  );
}
