'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, User, Menu, X, Building2, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

export default function Navbar({ isAuthenticated = false, userRole = 'user' }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCity, setDrawerCity] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  // Clicking the logo should simply navigate home, never log the user out

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="LeaseMyProperty Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-black">LeaseMyProperty</span>
            <span className='text-sm text-gray-400'>By SK Promoters</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, location, or property type..."
                className="w-full px-4 py-2.5 pl-11 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {userRole === 'landlord' && (
                  <Link
                    href="/properties/new"
                    className="flex items-center space-x-2 px-4 py-2 text-black hover:bg-gray-100 rounded-lg font-medium transition-all"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>List Property</span>
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-black hover:bg-gray-900 text-white rounded-lg font-bold transition-all hover:shadow-lg"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2.5 hover:bg-gray-100 rounded-lg transition-all border-2 border-gray-200"
                  >
                    <User className="w-5 h-5 text-black" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-black hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white rounded-lg font-bold transition-all hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="LeaseMyProperty Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-black">LeaseMyProperty</span>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/search" 
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-black transition-all"
                  onClick={() => setDrawerOpen(false)}
                >
                  Properties
                </Link>
                <Link 
                  href="/#services" 
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-black transition-all"
                  onClick={() => setDrawerOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/#about" 
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-black transition-all"
                  onClick={() => setDrawerOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/#contact" 
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-black transition-all"
                  onClick={() => setDrawerOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Search by City */}
              <div className="border-t-2 border-gray-200 pt-6">
                <p className="text-sm font-bold text-black mb-3">Search by City</p>
                <div className="flex">
                  <input
                    type="text"
                    value={drawerCity}
                    onChange={(e) => setDrawerCity(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-l-lg outline-none focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-400"
                    placeholder="Enter city name"
                  />
                  <button
                    onClick={() => {
                      if (drawerCity.trim()) {
                        router.push(`/search?city=${encodeURIComponent(drawerCity.trim())}`);
                        setDrawerOpen(false);
                      }
                    }}
                    className="px-5 bg-black text-white rounded-r-lg font-bold hover:bg-gray-900 transition-all"
                  >
                    Go
                  </button>
                </div>
                
                {/* Popular Cities */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'].map((c) => (
                    <button
                      key={c}
                      onClick={() => { 
                        router.push(`/search?city=${encodeURIComponent(c)}`); 
                        setDrawerOpen(false); 
                      }}
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-all"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="border-t-2 border-gray-200 pt-6">
                {!isAuthenticated ? (
                  <div className="space-y-3">
                    <Link 
                      href="/auth/login" 
                      className="block w-full text-center px-4 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="block w-full text-center px-4 py-3 border-2 border-black text-black rounded-lg font-bold hover:bg-gray-100 transition-all"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    {userRole === 'landlord' && (
                      <Link 
                        href="/properties/new" 
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-black text-black rounded-lg font-bold hover:bg-gray-100 transition-all"
                        onClick={() => setDrawerOpen(false)}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>List Property</span>
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        handleLogout();
                        setDrawerOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-gray-200 text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}