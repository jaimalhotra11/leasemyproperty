'use client';

import React, { useState } from 'react';
import { Database, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    if (!confirm('This will add dummy data to the database. Continue?')) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `Successfully seeded ${data.landlords} landlords and ${data.properties} properties!`,
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to seed database',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Seed Database</h1>
              <p className="text-gray-600">Add dummy data for testing</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-200">
            <h2 className="font-bold text-black mb-4">What will be added:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span><strong>6 Landlords</strong> - With company names and contact details</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span><strong>12 Properties</strong> - Across multiple cities (Delhi, Mumbai, Bangalore, Hyderabad, etc.)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span><strong>Market Insights</strong> - Real data based on properties</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Properties include: Office spaces, Retail shops, Warehouses, Showrooms</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>All properties are pre-approved and ready to view</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Note:</strong> This will create new landlords and properties. Existing data will not be deleted.
            </p>
            <button
              onClick={handleSeed}
              disabled={loading}
              className="w-full px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Seeding Database...</span>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <span>Seed Database</span>
                </>
              )}
            </button>
          </div>

          {result && (
            <div
              className={`p-6 rounded-xl border-2 ${
                result.success
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                {result.success ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <p
                  className={`font-bold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {result.message}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-black mb-2">Test Credentials:</h3>
            <p className="text-sm text-gray-700 mb-2">
              After seeding, you can login with any landlord account:
            </p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <p><strong>Email:</strong> rajesh.property@email.com</p>
              <p><strong>Password:</strong> password123</p>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              (Same password for all seeded landlord accounts)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
