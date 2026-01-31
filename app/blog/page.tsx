import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building2, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Commercial Property Investment Tips for 2025',
      excerpt: 'Discover the latest trends and strategies for investing in commercial real estate in India.',
      date: '2025-01-15',
      category: 'Investment',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Office Space for Your Startup',
      excerpt: 'A comprehensive guide to finding the ideal workspace that matches your business needs and budget.',
      date: '2025-01-10',
      category: 'Office Space',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    },
    {
      id: 3,
      title: 'Warehouse Leasing: Everything You Need to Know',
      excerpt: 'Learn about warehouse leasing requirements, costs, and best practices for e-commerce businesses.',
      date: '2025-01-05',
      category: 'Warehouse',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    },
    {
      id: 4,
      title: 'Commercial Real Estate Market Trends in 2025',
      excerpt: 'An in-depth analysis of the commercial real estate market trends across major Indian cities.',
      date: '2024-12-28',
      category: 'Market Trends',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    },
    {
      id: 5,
      title: 'Retail Space Leasing: Location is Everything',
      excerpt: 'Why location matters most when leasing retail spaces and how to find the perfect spot.',
      date: '2024-12-20',
      category: 'Retail',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    },
    {
      id: 6,
      title: 'Legal Checklist for Commercial Property Leasing',
      excerpt: 'Essential legal documents and requirements you need to know before signing a commercial lease.',
      date: '2024-12-15',
      category: 'Legal',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tips, and trends in commercial real estate
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-black font-medium hover:text-gray-700 transition"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Browse our verified listings and find the ideal commercial property for your business
          </p>
          <Link
            href="/search"
            className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition"
          >
            Browse Properties
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
