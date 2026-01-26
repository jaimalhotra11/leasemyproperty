import { MapPin, Home, Building, FileText, Users, HelpCircle, BookOpen, Newspaper, Briefcase, Shield, Phone, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SitemapPage() {
  const mainPages = [
    { name: "Home", path: "/", icon: Home, description: "Main landing page" },
    { name: "Properties", path: "/properties", icon: Building, description: "Browse all available properties" },
    { name: "Search", path: "/search", icon: MapPin, description: "Advanced property search" },
    { name: "Dashboard", path: "/dashboard", icon: Users, description: "User dashboard and account management" }
  ];

  const companyPages = [
    { name: "About Us", path: "/about", icon: Users, description: "Learn about our company and mission" },
    { name: "Careers", path: "/careers", icon: Briefcase, description: "Join our team" },
    { name: "Press", path: "/press", icon: Newspaper, description: "News and media coverage" },
    { name: "Blog", path: "/blog", icon: BookOpen, description: "Insights and articles" }
  ];

  const resourcePages = [
    { name: "Help Center", path: "/help", icon: HelpCircle, description: "Get support and answers" },
    { name: "Terms of Service", path: "/terms", icon: FileText, description: "Legal terms and conditions" },
    { name: "Privacy Policy", path: "/privacy", icon: Shield, description: "How we protect your data" },
    { name: "Sitemap", path: "/sitemap", icon: MapPin, description: "Site navigation" }
  ];

  const propertyTypes = [
    "Office Spaces",
    "Warehouses", 
    "Retail Spaces",
    "Showrooms",
    "Industrial Properties",
    "Co-working Spaces"
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", 
    "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sitemap
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Navigate through all pages and sections of LeaseMyProperty
            </p>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Main Pages</h2>
            <p className="text-lg text-slate-600">Core sections of our website</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainPages.map((page, index) => (
              <Link
                key={index}
                href={page.path}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <page.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                      {page.name}
                    </h3>
                    <p className="text-sm text-slate-600">{page.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Company</h2>
            <p className="text-lg text-slate-600">Learn more about LeaseMyProperty</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyPages.map((page, index) => (
              <Link
                key={index}
                href={page.path}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <page.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                      {page.name}
                    </h3>
                    <p className="text-sm text-slate-600">{page.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Resources</h2>
            <p className="text-lg text-slate-600">Helpful information and support</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourcePages.map((page, index) => (
              <Link
                key={index}
                href={page.path}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <page.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                      {page.name}
                    </h3>
                    <p className="text-sm text-slate-600">{page.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Building className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Property Types</h2>
            <p className="text-lg text-slate-600">Explore different categories of commercial properties</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypes.map((type, index) => (
              <Link
                key={index}
                href={`/search?type=${type.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition text-center"
              >
                <span className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
                  {type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Cities We Serve</h2>
            <p className="text-lg text-slate-600">Find properties in major Indian cities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={`/search?city=${city.toLowerCase()}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition text-center"
              >
                <span className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
                  {city}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Account Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Account Sections</h2>
            <p className="text-lg text-slate-600">Manage your account and activities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Profile Settings", path: "/dashboard/profile", description: "Update your personal information" },
              { name: "My Properties", path: "/dashboard/properties", description: "View your listed or saved properties" },
              { name: "Messages", path: "/dashboard/messages", description: "Communicate with landlords and tenants" },
              { name: "Favorites", path: "/dashboard/favorites", description: "Save properties you're interested in" },
              { name: "Payment History", path: "/dashboard/payments", description: "View transaction history" },
              { name: "Notifications", path: "/dashboard/notifications", description: "Manage your notification preferences" }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition group"
              >
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center group-hover:text-blue-700 transition">
                  Access →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help Finding Something?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Our support team is here to help you navigate our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-slate-300">+91 98765 43210</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-slate-300">support@leasemyproperty.com</p>
            </div>
            <div className="text-center">
              <HelpCircle className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h3 className="font-bold mb-2">Help Center</h3>
              <p className="text-slate-300">Browse our help articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Platform Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-slate-600">Main Pages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-slate-600">Property Types</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">75+</div>
                <div className="text-slate-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-slate-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
