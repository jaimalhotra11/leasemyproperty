import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EnquiryForm from './EnquiryForm';
import { getUserProfile } from '@/lib/auth';
import { MapPin, Square, Building2, CheckCircle2, Wifi, Car, Coffee, Shield, Clock, Phone, Mail } from 'lucide-react';

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

  // Amenity icons mapping
  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Parking': Car,
    'Cafeteria': Coffee,
    'Security': Shield,
    '24/7 Access': Clock,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuthenticated={!!profile} userRole={profile?.role} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/properties" className="hover:text-black transition-colors">Properties</a>
          <span>/</span>
          <span className="text-black font-medium">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
              <div className="relative h-96 bg-gray-100">
                <Image
                  src={property.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Status Badge on Image */}
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    property.availability_status === 'available'
                      ? 'bg-green-500 text-white'
                      : property.availability_status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {property.availability_status.charAt(0).toUpperCase() + property.availability_status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {property.interior_images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50">
                  {property.interior_images.slice(1, 5).map((image: string, index: number) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-black transition-all cursor-pointer">
                      <Image src={image} alt={`Interior ${index + 2}`} fill className="object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}

              {/* Property Details */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 bg-black text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                        {property.property_type}
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold text-black mb-4 leading-tight">{property.title}</h1>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start text-gray-700 mb-6 pb-6 border-b-2 border-gray-200">
                  <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-black" />
                  <span className="text-base">
                    {property.address_line1}
                    {property.address_line2 && `, ${property.address_line2}`}, {property.city}, {property.state} {property.postal_code}
                  </span>
                </div>

                {/* Price and Key Details */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Monthly Rent</p>
                      <div className="text-4xl font-bold text-black">₹{property.price_monthly.toLocaleString()}</div>
                      <p className="text-sm text-gray-600 mt-1">Per month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <Square className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Area</p>
                        <p className="font-bold text-black text-lg">{property.size_sqft.toLocaleString()} sq ft</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Type</p>
                        <p className="font-bold text-black text-lg capitalize">{property.property_type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <div className="w-1 h-8 bg-black mr-3"></div>
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{property.description}</p>
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                      <div className="w-1 h-8 bg-black mr-3"></div>
                      Amenities & Features
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {property.amenities.map((amenity: string, index: number) => {
                        const Icon = amenityIcons[amenity] || CheckCircle2;
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all group"
                          >
                            <Icon className="w-5 h-5 text-black group-hover:text-white flex-shrink-0" />
                            <span className="font-medium text-sm text-gray-900 group-hover:text-white">
                              {amenity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Legal Requirements */}
                {property.legal_requirements && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                      <div className="w-1 h-8 bg-black mr-3"></div>
                      Legal Requirements
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                      <p className="text-gray-700 leading-relaxed text-base">{property.legal_requirements}</p>
                    </div>
                  </div>
                )}

                {/* Property Highlights */}
                <div className="bg-black text-white rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-6">Property Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verified Property</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Prime Location</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Ready to Move</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Professional Management</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enquiry Form or Status */}
              {profile?.role === 'visitor' && property.availability_status === 'available' ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-black mb-6">Send Enquiry</h3>
                  <EnquiryForm propertyId={property.id} visitorProfile={profile} />
                </div>
              ) : !profile ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">Send an Enquiry</h3>
                    <p className="text-gray-600">Login to access the enquiry form and connect with the property owner</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-gray-200">
                    <h4 className="font-bold text-black mb-3">What you&apos;ll get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Direct contact with property owner</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Schedule property visits</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Get instant responses</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Access detailed information</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/auth/login"
                    className="block w-full text-center px-6 py-4 bg-black hover:bg-gray-900 text-white rounded-xl font-bold transition-all hover:shadow-xl mb-4"
                  >
                    Login to Send Enquiry
                  </a>
                  
                  <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account? <a href="/auth/signup" className="text-black font-bold hover:underline">Sign up here</a>
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-black mb-4">Property Status</h3>
                  <div className={`p-4 rounded-lg ${
                    property.availability_status === 'available'
                      ? 'bg-green-50 border-2 border-green-200'
                      : property.availability_status === 'pending'
                      ? 'bg-yellow-50 border-2 border-yellow-200'
                      : 'bg-red-50 border-2 border-red-200'
                  }`}>
                    <p className="text-gray-700 font-medium">
                      {property.availability_status === 'available'
                        ? '✓ This property is currently available for rent.'
                        : property.availability_status === 'pending'
                        ? '⏳ This property has pending enquiries.'
                        : '✗ This property is currently rented.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-black mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Call us</p>
                      <p className="text-black font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email us</p>
                      <p className="text-black font-bold">support@LeaseMyProperty.com</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all">
                  Schedule a Visit
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-black text-white rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Why Choose LeaseMyProperty?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm">Verified Properties</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm">Quick Approval Process</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm">Legal Assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}