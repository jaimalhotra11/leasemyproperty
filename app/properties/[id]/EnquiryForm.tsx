'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';

interface EnquiryFormProps {
  propertyId: string;
  visitorProfile: UserProfile;
}

export default function EnquiryForm({ propertyId, visitorProfile }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    companyName: visitorProfile.company_name || '',
    contactName: visitorProfile.full_name,
    contactEmail: visitorProfile.email,
    contactPhone: visitorProfile.phone || '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkDuplicate = async () => {
      const res = await fetch('/api/enquiries/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const found = (data as any[]).some((e) => e.property_id === propertyId);
        setAlreadySubmitted(found);
      }
    };
    checkDuplicate();
  }, [propertyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: propertyId,
          company_name: formData.companyName,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to send enquiry');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl ">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">Enquiry Sent Successfully!</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Your enquiry has been submitted. Our team will review it and the property owner will get back to you soon.
          </p>
          <div className="bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Next Steps:</strong> Check your email and dashboard for updates on your enquiry status.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Enquiry Already Submitted</h3>
        <p className="text-gray-600 mb-4">You have already submitted an enquiry for this property.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg font-medium transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg ">
      <div className="">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-bold text-black mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400"
              placeholder="Enter your company name"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="block text-sm font-bold text-black mb-2">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              id="contactName"
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-bold text-black mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400"
              placeholder="your.email@company.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-bold text-black mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-black mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black placeholder-gray-400 resize-none"
              placeholder="Tell us about your requirements, preferred move-in date, and any specific questions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>

          {/* Info Message */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong className="text-black">Note:</strong> Your enquiry will be reviewed by our team before being forwarded to the property owner. You&apos;ll receive updates via email.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}