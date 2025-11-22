'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PropertyType } from '@/lib/types';

interface PropertyFormProps {
  landlordId: string;
}

export default function PropertyForm({ landlordId }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'commercial' as PropertyType,
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    size_sqft: '',
    price_monthly: '',
    legal_requirements: '',
    amenities: '',
    images_files: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a);

      if (formData.images_files.length < 3) {
        setError('Please upload at least 3 images (exterior and interior).');
        setLoading(false);
        return;
      }

      const fd = new FormData();
      formData.images_files.forEach((f) => fd.append('files', f));
      fd.append('folder', 'propspace/properties/all');
      const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!upRes.ok) {
        const data = await upRes.json();
        setError(data.error || 'Image upload failed');
        setLoading(false);
        return;
      }
      const upData = await upRes.json();
      const allImages: string[] = upData.urls;

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          property_type: formData.property_type,
          address_line1: formData.address_line1,
          address_line2: formData.address_line2 || null,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
          country: formData.country,
          size_sqft: parseFloat(formData.size_sqft),
          price_monthly: parseFloat(formData.price_monthly),
          legal_requirements: formData.legal_requirements || null,
          amenities: amenitiesArray,
          images: allImages,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Unable to submit property');
        return;
      }

      router.push('/dashboard?success=property_listed');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Property Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Modern Commercial Space in Downtown"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your property in detail..."
            />
          </div>

          <div>
            <label htmlFor="property_type" className="block text-sm font-medium text-slate-700 mb-1">
              Property Type *
            </label>
            <select
              id="property_type"
              value={formData.property_type}
              onChange={(e) => setFormData({ ...formData, property_type: e.target.value as PropertyType })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="commercial">Commercial</option>
              <option value="retail">Retail</option>
              <option value="office">Office</option>
              <option value="warehouse">Warehouse</option>
              <option value="showroom">Showroom</option>
            </select>
          </div>

          <div>
            <label htmlFor="size_sqft" className="block text-sm font-medium text-slate-700 mb-1">
              Size (sq ft) *
            </label>
            <input
              id="size_sqft"
              type="number"
              value={formData.size_sqft}
              onChange={(e) => setFormData({ ...formData, size_sqft: e.target.value })}
              required
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="price_monthly" className="block text-sm font-medium text-slate-700 mb-1">
              Monthly Rent (₹) *
            </label>
            <input
              id="price_monthly"
              type="number"
              value={formData.price_monthly}
              onChange={(e) => setFormData({ ...formData, price_monthly: e.target.value })}
              required
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="150000"
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Address</h3>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address_line1" className="block text-sm font-medium text-slate-700 mb-1">
              Address Line 1 *
            </label>
            <input
              id="address_line1"
              type="text"
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main Street"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address_line2" className="block text-sm font-medium text-slate-700 mb-1">
              Address Line 2
            </label>
            <input
              id="address_line2"
              type="text"
              value={formData.address_line2}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Near City Mall"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
              City *
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mumbai"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
              State *
            </label>
            <input
              id="state"
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Maharashtra"
            />
          </div>

          <div>
            <label htmlFor="postal_code" className="block text-sm font-medium text-slate-700 mb-1">
              Postal Code *
            </label>
            <input
              id="postal_code"
              type="text"
              value={formData.postal_code}
              onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="400001"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">
              Country *
            </label>
            <input
              id="country"
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="amenities" className="block text-sm font-medium text-slate-700 mb-1">
              Amenities (comma separated)
            </label>
            <input
              id="amenities"
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Parking, Security, Power Backup, Elevator"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="legal_requirements" className="block text-sm font-medium text-slate-700 mb-1">
              Legal Requirements
            </label>
            <textarea
              id="legal_requirements"
              value={formData.legal_requirements}
              onChange={(e) => setFormData({ ...formData, legal_requirements: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Any specific legal or documentation requirements..."
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Property Images *</h3>
            <p className="text-sm text-slate-600 mb-3">Upload a minimum of 3 images including exterior/front, lobby/interior, and any key amenities. Our admin will categorize and blur sensitive images before publishing.</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, images_files: Array.from(e.target.files || []) })}
              className="w-full"
            />
            <p className="mt-1 text-xs text-slate-500">Accepted formats: JPG, PNG, WebP. Max 5MB per image.</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit for Approval'}
          </button>
        </div>

        <p className="text-sm text-slate-600 text-center">
          Your property will be reviewed by our admin team before going live
        </p>
      </form>
    </div>
  );
}
