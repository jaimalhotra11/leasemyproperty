import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/lib/types';

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover premium commercial spaces in prime locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={property.interior_images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-neutral-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.property_type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                  {property.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {property.city}, {property.state}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-slate-700">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"></path>
                    </svg>
                    <span className="text-sm">{property.size_sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="text-blue-600 font-bold text-lg">
                    ₹{property.price_monthly.toLocaleString()}/mo
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    property.availability_status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : property.availability_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {property.availability_status.charAt(0).toUpperCase() + property.availability_status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/search"
            className="inline-block px-8 py-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-full font-medium transition shadow-lg"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
