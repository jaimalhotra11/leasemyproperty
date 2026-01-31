"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import StateDropdownBar from '@/components/StateDropDownBar';
import type { Property } from '@/lib/types';
import { Search, MapPin, Building2, ChevronRight, Star, ArrowRight, Mail, Phone, Linkedin, Twitter, Instagram, TrendingUp, Users, Shield, Zap, Award, Clock, DollarSign, Home, Briefcase, Warehouse, Store, Factory, Building } from 'lucide-react';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import ROICalculator from '@/components/ROICalculator';
import MarketInsights from '@/components/MarketInsights';

// Constants defined outside component to avoid JSX parsing issues
const propertyTypesData = [
  { name: 'Office Space', count: '250+' },
  { name: 'Retail', count: '180+' },
  { name: 'Co-working', count: '120+' },
  { name: 'Warehouse', count: '90+' },
  { name: 'Industrial', count: '75+' },
  { name: 'Commercial', count: '200+' }
];

const propertyTypeIcons: Record<string, any> = {
  'Office Space': Building2,
  'Retail': Store,
  'Co-working': Briefcase,
  'Warehouse': Warehouse,
  'Industrial': Factory,
  'Commercial': Home,
};

export default function HomePage() {
  const [userLocation, setUserLocation] = useState('Jaipur, Rajasthan');
  const [userCity, setUserCity] = useState('Jaipur');
  const [userState, setUserState] = useState('Rajasthan');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityProperties, setCityProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [bestPropertiesNearby, setBestPropertiesNearby] = useState<Property[]>([]);
  const [recommendedLandlords, setRecommendedLandlords] = useState<any[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const router = useRouter();

  // Improved location detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await res.json();

          // Priority: city > town > village > suburb > district
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.suburb ||
            data.address.municipality ||
            data.address.county ||
            'Jaipur';

          const state = data.address.state || 'Rajasthan';

          setUserCity(city);
          setUserState(state);
          setUserLocation(`${city}, ${state}`);

          console.log('Detected location:', { city, state, fullData: data.address });
        } catch (error) {
          console.error('Location detection error:', error);
          setUserLocation('Jaipur, Rajasthan');
          setUserCity('Jaipur');
          setUserState('Rajasthan');
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        setUserLocation('Jaipur, Rajasthan');
        setUserCity('Jaipur');
        setUserState('Rajasthan');
      });
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingProps(true);
        // Fetch all data in parallel
        const promises = [
          fetch('/api/properties?is_approved=true&availability_status=available&limit=6', { cache: 'no-store' }),
          fetch('/api/properties?is_approved=true&availability_status=available&limit=6', { cache: 'no-store' }), // For best properties (all cities if no city)
        ];
        
        // Add city-specific queries if city is available
        if (userCity) {
          promises.push(
            fetch(`/api/properties/search?city=${encodeURIComponent(userCity)}&is_approved=true&availability_status=available`, { cache: 'no-store' }),
            fetch(`/api/properties/search?city=${encodeURIComponent(userCity)}&is_approved=true&availability_status=available&limit=6`, { cache: 'no-store' }),
            fetch(`/api/landlords/recommended?city=${encodeURIComponent(userCity)}&limit=4`, { cache: 'no-store' })
          );
        } else {
          promises.push(
            Promise.resolve({ ok: true, json: async () => [] } as any),
            Promise.resolve({ ok: true, json: async () => [] } as any),
            fetch('/api/landlords/recommended?limit=4', { cache: 'no-store' }) // Get landlords from all cities if no city
          );
        }

        const [featRes, bestAllRes, cityRes, bestCityRes, landlordsRes] = await Promise.all(promises);
        
        const feat = featRes.ok ? await featRes.json() : [];
        const bestAll = bestAllRes.ok ? await bestAllRes.json() : [];
        const cprops = (cityRes as Response).ok ? await (cityRes as Response).json() : [];
        const bestCity = (bestCityRes as Response).ok ? await (bestCityRes as Response).json() : [];
        const landlords = (landlordsRes as Response).ok ? await (landlordsRes as Response).json() : [];
        
        console.log('Data loaded:', {
          featured: feat.length,
          bestAll: bestAll.length,
          cityProps: cprops.length,
          bestCity: bestCity.length,
          landlords: Array.isArray(landlords) ? landlords.length : 0,
          landlordsData: landlords
        });
        
        setFeaturedProperties(feat as Property[]);
        setCityProperties(cprops as Property[]);
        // Use city-specific properties if available, otherwise use all properties
        setBestPropertiesNearby((bestCity.length > 0 ? bestCity : bestAll) as Property[]);
        setRecommendedLandlords(Array.isArray(landlords) ? landlords : []);
      } catch (error) {
        console.error('Failed to load properties:', error);
        // Set empty arrays as fallback
        setFeaturedProperties([]);
        setCityProperties([]);
        setBestPropertiesNearby([]);
        setRecommendedLandlords([]);
      } finally {
        setLoadingProps(false);
      }
    };
    load();
  }, [userCity]);

  const companyLogos = [
    "/assets/company-logo/amazon.png",
    "/assets/company-logo/apollo.png",
    "/assets/company-logo/au.png",
    "/assets/company-logo/axis.png",
    "/assets/company-logo/bata.jpg",
    "/assets/company-logo/dominos.png",
    "/assets/company-logo/flipkart.png",
    "/assets/company-logo/hdfc.png",
    "/assets/company-logo/icici.png",
    "/assets/company-logo/lenskart.png",
    "/assets/company-logo/muthoot.svg",
    "/assets/company-logo/pizza-hut.png",
    "/assets/company-logo/redtape.png",
    "/assets/company-logo/unity.svg",
  ];

  const propertyTypes = propertyTypesData.map(type => {
    const IconComponent = propertyTypeIcons[type.name] || Building2;
    return {
      ...type,
      IconComponent
    };
  });

  const stats = [
    { IconComponent: Building2, value: '850+', label: 'Properties Listed' },
    { IconComponent: Users, value: '500+', label: 'Happy Clients' },
    { IconComponent: MapPin, value: '75+', label: 'Cities Covered' },
    { IconComponent: Award, value: '98%', label: 'Success Rate' }
  ];

  const features = [
    { IconComponent: Shield, title: 'Verified Listings', desc: 'Every property is thoroughly verified with legal documentation' },
    { IconComponent: Zap, title: 'Quick Approval', desc: 'Get property approvals within 24-48 hours' },
    { IconComponent: Users, title: 'Expert Consultation', desc: 'Free consultation with our property experts' },
    { IconComponent: TrendingUp, title: 'Market Insights', desc: 'Real-time market analysis and property trends' },
    { IconComponent: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support for all queries' },
    { IconComponent: DollarSign, title: 'Best Pricing', desc: 'Competitive rates with transparent pricing' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', company: 'Tech Innovations Pvt Ltd', text: 'LeaseMyProperty made finding our office incredibly easy. The team was professional and the process was seamless. We found our perfect space in just 10 days!', rating: 5, position: 'CEO' },
    { name: 'Priya Sharma', company: 'Retail Solutions India', text: 'Outstanding service and genuine properties. The verification process gave us complete confidence. Highly recommended for anyone looking for commercial spaces.', rating: 5, position: 'Director' },
    { name: 'Amit Patel', company: 'StartupHub Ventures', text: 'Best platform for commercial real estate. The market insights and expert guidance helped us make the right decision. Great experience overall!', rating: 5, position: 'Founder' },
    { name: 'Sneha Reddy', company: 'Fashion Retail Co', text: 'Found an amazing retail space in a prime location. The team understood our requirements perfectly and delivered exactly what we needed.', rating: 5, position: 'Operations Head' },
    { name: 'Vikram Singh', company: 'Manufacturing Solutions', text: 'Professional service from start to finish. The warehouse we got through LeaseMyProperty has been perfect for our operations. Thank you team!', rating: 5, position: 'COO' },
    { name: 'Anita Desai', company: 'Creative Agency Hub', text: 'The co-working space we found is fantastic! Great amenities and perfect location. LeaseMyProperty team was supportive throughout.', rating: 5, position: 'Creative Director' }
  ];

  const processSteps = [
    { step: '01', title: 'Search Properties', desc: 'Browse through our verified listings or contact us for customized options' },
    { step: '02', title: 'Schedule Visit', desc: 'Book property visits at your convenience with our dedicated team' },
    { step: '03', title: 'Documentation', desc: 'We handle all legal paperwork and verification processes' },
    { step: '04', title: 'Move In', desc: 'Get your keys and start your business journey in your new space' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* State Dropdown Bar */}
      <StateDropdownBar />

      {/* Hero Section - Black & White Theme */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Currently showing properties in: <strong>{userLocation}</strong></span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block mt-2 text-white">
                Commercial Property
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Discover premium office spaces, retail locations, and warehouses across India&apos;s top business districts
            </p>
          </div>

          {/* Enhanced Search Bar - Black & White */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-200">
                  <MapPin className="w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="City, Locality or Project"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-black placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center space-x-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Building2 className="w-5 h-5 text-black" />
                  <select className="bg-transparent flex-1 outline-none text-black">
                    <option>Property Type</option>
                    <option>Office Space</option>
                    <option>Retail Shop</option>
                    <option>Warehouse</option>
                    <option>Co-working</option>
                    <option>Industrial</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-200">
                  <DollarSign className="w-5 h-5 text-black" />
                  <select className="bg-transparent flex-1 outline-none text-black">
                    <option>Budget</option>
                    <option>Under ₹1L</option>
                    <option>₹1L - ₹3L</option>
                    <option>₹3L - ₹5L</option>
                    <option>Above ₹5L</option>
                  </select>
                </div>

                <button
                  onClick={() => { if (searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`); }}
                  className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-all hover:scale-105 font-semibold"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats - Black & White */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
            {stats.map((stat, i) => {
              const IconComponent = stat.IconComponent;
              return (
              <div key={i} className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Property Types - Black & White */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Browse by Property Type</h2>
            <p className="text-lg text-gray-600">Find the perfect space for your business needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyTypes.map((type, i) => {
              const mapType: Record<string, string> = {
                'Office Space': 'office',
                'Retail': 'retail',
                'Co-working': 'office',
                'Warehouse': 'warehouse',
                'Industrial': 'commercial',
                'Commercial': 'commercial',
              };
              const t = mapType[type.name] || 'commercial';
              const IconComponent = type.IconComponent;
              return (
                <Link key={i} href={`/search?type=${encodeURIComponent(t)}&is_approved=true`} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 text-center hover:bg-black hover:text-white hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-gray-200">
                    <div className="w-14 h-14 bg-black group-hover:bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:text-black group-hover:scale-110 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-black group-hover:text-white mb-1 text-sm">{type.name}</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-300">{type.count} listings</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moving Brands Section - Black & White */}
      <section className="py-12 bg-white overflow-hidden ">
        <div className="mb-6">
          <h3 className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Trusted by 15+ Leading Brands
          </h3>
        </div>
        <div className="relative">
          <div className="flex animate-scroll items-center ">
            {[...companyLogos, ...companyLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 mx-8 items-center">
                <div className="text-2xl flex justify-center font-bold text-gray-700 hover:text-white transition-colors cursor-pointer items-center">
                  <Image width={100} height={40} src={brand} alt={brand} className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Properties Near You - Enhanced Section */}
      <section id="best-properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-full mb-6">
              <Award className="w-6 h-6" />
              <span className="font-bold text-lg">Best Properties Near You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Premium Spaces {userCity ? `in ${userCity}` : 'Available Now'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked verified properties {userCity ? 'in your area' : ''} with the best ratings and amenities
            </p>
          </div>

          {loadingProps ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading best properties...</p>
            </div>
          ) : bestPropertiesNearby.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {bestPropertiesNearby.slice(0, 6).map((p, i) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-200 relative"
              >
                {/* Badge for top properties */}
                {i < 3 && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Top {i + 1}</span>
                  </div>
                )}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image src={p.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wide">
                      {p.property_type}
                    </span>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">4.{8 + i}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors line-clamp-1">
                    {p.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-black" />
                    <span className="font-medium">{p.city}, {p.state}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-black">₹{p.price_monthly.toLocaleString()}/mo</div>
                      <div className="text-xs text-gray-500 font-medium">{p.size_sqft.toLocaleString()} sq ft</div>
                    </div>
                    <div className="p-3 bg-black text-white rounded-xl group-hover:bg-gray-900 group-hover:scale-110 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href={userCity ? `/search?city=${encodeURIComponent(userCity)}&is_approved=true` : '/search?is_approved=true'} className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all hover:shadow-xl hover:scale-105">
              <span>View All Properties {userCity ? `in ${userCity}` : ''}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No properties available yet</h3>
              <p className="text-gray-600 mb-6">Check back soon for new listings in your area</p>
              <Link href="/search?is_approved=true" className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-all">
                <span>Browse All Properties</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Landlords Section */}
      <section id="recommended-landlords" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Users className="w-6 h-6" />
              <span className="font-bold text-lg">Recommended Landlords</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted Property Owners {userCity ? `in ${userCity}` : ''}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Verified landlords with multiple properties and excellent track records
            </p>
          </div>

          {loadingProps ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
              <p className="mt-4 text-gray-300">Loading recommended landlords...</p>
            </div>
          ) : recommendedLandlords.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedLandlords.map((landlord, i) => (
              <div
                key={landlord.landlord_id}
                className="group bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {landlord.sample_property && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={landlord.sample_property.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                      alt={landlord.landlord_name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-xs font-bold text-white">Verified</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                        {landlord.landlord_name}
                      </h3>
                      {landlord.company_name && (
                        <p className="text-sm text-gray-400">{landlord.company_name}</p>
                      )}
                    </div>
                    <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                      <div className="text-xs text-gray-400">Properties</div>
                      <div className="text-lg font-bold text-white">{landlord.property_count}</div>
                    </div>
                  </div>
                  
                  {landlord.sample_property && (
                    <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Sample Property</p>
                      <p className="text-sm font-medium text-white line-clamp-1">{landlord.sample_property.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{landlord.sample_property.city}, {landlord.sample_property.state}</p>
                      <p className="text-sm font-bold text-yellow-400 mt-2">₹{landlord.sample_property.price_monthly.toLocaleString()}/mo</p>
                    </div>
                  )}

                  <Link
                    href={`/search?landlordId=${landlord.landlord_id}&is_approved=true`}
                    className="block w-full text-center px-4 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    View Properties
                  </Link>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12 bg-gray-900 rounded-2xl border-2 border-gray-800">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold text-white mb-2">No landlords available yet</h3>
              <p className="text-gray-400 mb-6">Check back soon for verified landlords in your area</p>
              <Link href="/search?is_approved=true" className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all">
                <span>Browse All Properties</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Local Properties */}
      {cityProperties.length > 0 && (
      <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-6 h-6 text-black" />
              <h2 className="text-3xl md:text-4xl font-bold text-black">More Properties in {userCity}</h2>
            </div>
            <p className="text-lg text-gray-600">Explore more verified listings in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cityProperties.slice(0, 3).map((p, i) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-200"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image src={p.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-semibold">
                      {p.property_type}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {p.city}, {p.state}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-black">₹{p.price_monthly.toLocaleString()}/mo</div>
                      <div className="text-xs text-gray-500">{p.size_sqft.toLocaleString()} sq ft</div>
                    </div>
                    <div className="p-3 bg-black text-white rounded-xl group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Properties */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600">Premium spaces across major cities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((p, i) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-200"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image src={p.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">
                      {p.property_type}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">4.6</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {p.city}, {p.state}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-black">₹{p.price_monthly.toLocaleString()}/mo</div>
                      <div className="text-xs text-gray-500">{p.size_sqft.toLocaleString()} sq ft</div>
                    </div>
                    <div className="p-3 bg-black text-white rounded-xl group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/search?is_approved=true" className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all hover:shadow-xl inline-flex items-center space-x-2">
              <span>View All Properties</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Features - Black & White */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Why Choose LeaseMyProperty?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to making your property search effortless with our comprehensive services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const IconComponent = feature.IconComponent;
              return (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl hover:bg-black hover:text-white hover:shadow-xl transition-all duration-300 border-2 border-gray-200 group"
              >
                <div className="w-14 h-14 bg-black group-hover:bg-white rounded-xl flex items-center justify-center mb-6 text-white group-hover:text-black group-hover:scale-110 transition-all">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300">{feature.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Black & White */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Four simple steps to find your perfect commercial property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all hover:scale-105 border-2 border-gray-800">
                  <div className="text-5xl font-bold text-white mb-6 opacity-30">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Black & White */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Trusted by businesses across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-black">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights - Dynamic Component */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <MarketInsights />
        </div>
      </section>

      {/* CTA Section - Black & White */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join 500+ businesses that found their ideal property with LeaseMyProperty. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/search?is_approved=true" className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Browse Properties</span>
            </Link>
            <Link href="/auth/register" className="px-10 py-5 bg-black text-white rounded-xl font-bold text-lg border-2 border-white hover:bg-gray-900 transition-all hover:scale-105 inline-flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>List Your Property</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: <Shield />, text: 'Verified Properties' },
              { icon: <Clock />, text: '24/7 Support' },
              { icon: <Award />, text: '98% Success Rate' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Black & White */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to get the latest property listings and market insights</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-black outline-none"
            />
            <button className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Calculate Your Investment Returns
            </h2>
            <p className="text-xl text-gray-600">
              Make informed decisions with our ROI calculator
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Footer - Black & White */}
      <Footer />

      {/* Live Chat */}
      <LiveChat />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}