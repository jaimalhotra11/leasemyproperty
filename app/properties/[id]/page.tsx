import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getUserProfile } from '@/lib/auth';
import PropertyDetailClient from './PropertyDetailClient';
import EnquiryForm from './EnquiryForm';
import SocialShare from '@/components/SocialShare';
import PropertyMap from '@/components/PropertyMap';
import VirtualTour from '@/components/VirtualTour';
import PropertyReviews from '@/components/PropertyReviews';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { Types } from 'mongoose';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const profile = await getUserProfile();
  
  try {
    await connectDB();
    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      notFound();
    }
    
    const p = await Property.findById(params.id).lean() as any;
    if (!p) {
      notFound();
    }
    
    const property = {
      id: p._id.toString(),
      landlord_id: (p.landlordId as Types.ObjectId).toString(),
      title: p.title,
      description: p.description,
      property_type: p.property_type,
      address_line1: p.address_line1,
      address_line2: p.address_line2,
      city: p.city,
      state: p.state,
      postal_code: p.postal_code,
      country: p.country,
      latitude: p.latitude,
      longitude: p.longitude,
      size_sqft: p.size_sqft,
      price_monthly: p.price_monthly,
      availability_status: p.availability_status,
      legal_requirements: p.legal_requirements,
      amenities: p.amenities,
      front_images: p.front_images,
      interior_images: p.interior_images,
      blurred_images: p.blurred_images || [],
      virtual_tour_url: p.virtual_tour_url,
      video_url: p.video_url,
      is_premium: p.is_premium,
      is_featured: p.is_featured,
      view_count: p.view_count || 0,
      is_approved: p.is_approved,
      created_at: p.createdAt?.toISOString() || '',
      updated_at: p.updatedAt?.toISOString() || '',
    };
    
    if (!property.is_approved && property.landlord_id !== profile?.id && profile?.role !== 'admin') {
      notFound();
    }

    return (
    <div className="min-h-screen bg-white">
      <Navbar isAuthenticated={!!profile} userRole={profile?.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetailClient property={property} profile={profile} />
            
            {/* Virtual Tour Section */}
            {(property.virtual_tour_url || property.video_url) && (
              <VirtualTour
                virtualTourUrl={property.virtual_tour_url}
                videoUrl={property.video_url}
                images={property.interior_images || []}
              />
            )}

            {/* Map Section */}
            {property.latitude && property.longitude && (
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                address={property.address_line1}
                city={property.city}
                state={property.state}
              />
            )}

            {/* Property Reviews */}
            <PropertyReviews
              propertyId={property.id}
              userRole={profile?.role}
              userId={profile?.id}
            />

            {/* Property Comparison Tool - Removed from property detail page as it's a standalone tool */}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SocialShare 
                propertyId={property.id}
                title={property.title}
                description={property.description}
              />
              {profile && profile.role === 'visitor' && property.is_approved && (
                <EnquiryForm propertyId={property.id} visitorProfile={profile} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  } catch (error) {
    console.error('Error loading property:', error);
    notFound();
  }
}