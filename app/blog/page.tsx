import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Commercial Real Estate in India: Trends to Watch in 2025",
      excerpt: "Explore the key trends shaping India's commercial real estate landscape, from flexible workspaces to sustainable buildings and technology integration.",
      author: "Rajesh Kumar",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Industry Trends",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      tags: ["Commercial Real Estate", "Trends", "2025 Predictions"]
    },
    {
      title: "How to Choose the Perfect Office Space for Your Startup",
      excerpt: "A comprehensive guide for startups looking for their ideal workspace. Learn about location, amenities, budget considerations, and lease negotiations.",
      author: "Priya Sharma",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Guides",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      tags: ["Office Space", "Startups", "Guide"]
    },
    {
      title: "The Rise of Hybrid Work: What It Means for Commercial Properties",
      excerpt: "Understanding how hybrid work models are reshaping commercial real estate demands and creating new opportunities for landlords and businesses.",
      author: "Amit Patel",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Workplace",
      image: "https://images.pexels.com/photos/3184365/pexels-photo-3184365.jpeg",
      tags: ["Hybrid Work", "Commercial Properties", "Future of Work"]
    },
    {
      title: "Sustainable Office Spaces: Green Buildings That Attract Top Talent",
      excerpt: "Discover how eco-friendly office spaces are becoming a competitive advantage for companies looking to attract and retain top talent.",
      author: "Sarah Johnson",
      date: "November 28, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      image: "https://images.pexels.com/photos/3184381/pexels-photo-3184381.jpeg",
      tags: ["Sustainability", "Green Buildings", "Talent Attraction"]
    },
    {
      title: "Commercial Property Leasing 101: A Complete Guide for Tenants",
      excerpt: "Everything you need to know about leasing commercial property, from understanding lease terms to negotiating the best deal for your business.",
      author: "Rajesh Kumar",
      date: "November 20, 2024",
      readTime: "10 min read",
      category: "Guides",
      image: "https://images.pexels.com/photos/3184391/pexels-photo-3184391.jpeg",
      tags: ["Leasing", "Guide", "Tenants"]
    },
    {
      title: "Technology in Real Estate: How AI is Transforming Property Search",
      excerpt: "Explore how artificial intelligence and machine learning are revolutionizing the way businesses find and lease commercial properties.",
      author: "Priya Sharma",
      date: "November 15, 2024",
      readTime: "6 min read",
      category: "Technology",
      image: "https://images.pexels.com/photos/3184401/pexels-photo-3184401.jpeg",
      tags: ["AI", "Technology", "Property Search"]
    }
  ];

  const categories = [
    { name: "All Posts", count: 24 },
    { name: "Industry Trends", count: 8 },
    { name: "Guides", count: 6 },
    { name: "Workplace", count: 4 },
    { name: "Sustainability", count: 3 },
    { name: "Technology", count: 3 }
  ];

  const popularTags = [
    "Commercial Real Estate", "Office Space", "Leasing", "Startups", 
    "Sustainability", "AI", "Hybrid Work", "Green Buildings"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Expert insights, industry trends, and practical guides for navigating the commercial real estate landscape in India.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-slate-200">
                    <div className="relative h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <Link
                          href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                          className="text-blue-600 font-medium hover:text-blue-700 transition inline-flex items-center"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Popular Tags */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 bg-white text-slate-600 rounded-full text-sm hover:bg-blue-600 hover:text-white transition border border-slate-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-slate-900 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                <p className="text-slate-300 mb-6">
                  Get the latest insights and trends delivered to your inbox weekly.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
                />
                <button className="w-full px-4 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Topics</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Deep dives into the most important topics in commercial real estate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Office Space Guide",
                description: "Complete guide to finding and leasing the perfect office space",
                icon: "🏢"
              },
              {
                title: "Warehouse Solutions",
                description: "Everything you need to know about industrial and warehouse spaces",
                icon: "🏭"
              },
              {
                title: "Retail Properties",
                description: "Navigate the retail property market with expert insights",
                icon: "🏪"
              }
            ].map((topic, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition text-center">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.title}</h3>
                <p className="text-slate-600 mb-6">{topic.description}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition">
                  Explore Topic →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
