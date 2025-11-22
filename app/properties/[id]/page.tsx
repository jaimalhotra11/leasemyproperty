'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Square, Building2, CheckCircle2, Wifi, Car, Coffee, Shield, Clock, Phone, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyDetailClientProps {
  property: any;
  profile: any;
}

export default function PropertyDetailClient({ property, profile }: PropertyDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // Amenity icons mapping
  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Parking': Car,
    'Cafeteria': Coffee,
    'Security': Shield,
    '24/7 Access': Clock,
  };

  // Filter out front images and blurred images for gallery
  const galleryImages = property.interior_images.filter(
    (img: string) => !property.front_images?.includes(img)
  );

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (showGallery) {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setShowGallery(false);
    }
  };

  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress as any);
      return () => window.removeEventListener('keydown', handleKeyPress as any);
    }
  });

  return (
    <>
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
          {/* Main Image */}
          <div 
            className="relative h-96 bg-gray-100 cursor-pointer group"
            onClick={() => setShowGallery(true)}
          >
            <Image
              src={galleryImages[selectedImage] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
              alt={property.title}
              fill
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${property.blurred_images?.includes(galleryImages[selectedImage]) ? 'blur-sm' : ''}`}
              priority
            />
            {/* Status Badge on Image */}
            <div className="absolute top-4 right-4 z-10">
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
            
            {/* View Gallery Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-6 py-3 rounded-lg font-bold">
                Click to view gallery
              </div>
            </div>

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg font-bold text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {galleryImages.length > 1 && (
            <div className="p-4 bg-gray-50 overflow-x-auto">
              <div className="flex gap-3 min-w-max">
                {galleryImages.map((image: string, index: number) => (
                  <div 
                    key={index} 
                    className={`relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === index 
                        ? 'border-black scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-black'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image 
                      src={image} 
                      alt={`Property ${index + 1}`} 
                      fill 
                      className={`object-cover ${property.blurred_images?.includes(image) ? 'blur-sm' : ''}`} 
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-white/10 text-white px-6 py-3 rounded-full font-bold z-50">
            {selectedImage + 1} / {galleryImages.length}
          </div>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-20">
            <Image
              src={galleryImages[selectedImage]}
              alt={property.title}
              fill
              className={`object-contain ${property.blurred_images?.includes(galleryImages[selectedImage]) ? 'blur-sm' : ''}`}
            />
          </div>

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex gap-2 overflow-x-auto justify-center">
              {galleryImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === index
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-white'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={`object-cover ${property.blurred_images?.includes(image) ? 'blur-sm' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            Use arrow keys or click arrows to navigate • Press ESC to close
          </div>
        </div>
      )}
    </>
  );
}