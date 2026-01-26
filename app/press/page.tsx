import { Newspaper, Calendar, Download, ExternalLink, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PressPage() {
  const pressReleases = [
    {
      title: "LeaseMyProperty Raises $10M Series A to Transform Commercial Real Estate",
      date: "November 15, 2024",
      category: "Funding",
      excerpt: "Leading proptech startup secures funding to expand across 100+ cities and enhance AI-powered property matching.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
      title: "LeaseMyProperty Partners with Major Real Estate Developers",
      date: "October 28, 2024",
      category: "Partnership",
      excerpt: "Strategic collaboration brings 5,000+ verified commercial properties to the platform.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
    },
    {
      title: "New AI-Powered Property Matching Algorithm Launches",
      date: "September 12, 2024",
      category: "Product",
      excerpt: "Revolutionary technology reduces property search time by 80% and improves matching accuracy.",
      image: "https://images.pexels.com/photos/3184365/pexels-photo-3184365.jpeg"
    }
  ];

  const mediaCoverage = [
    {
      publication: "Economic Times",
      headline: "How LeaseMyProperty is Digitizing Commercial Real Estate in India",
      date: "November 20, 2024",
      link: "#"
    },
    {
      publication: "TechCrunch",
      headline: "Indian Proptech Startup LeaseMyProperty Raises $10M to Expand Nationwide",
      date: "November 16, 2024",
      link: "#"
    },
    {
      publication: "YourStory",
      headline: "From Startup to Market Leader: The LeaseMyProperty Journey",
      date: "October 30, 2024",
      link: "#"
    },
    {
      publication: "Business Standard",
      headline: "Commercial Real Estate Goes Digital with LeaseMyProperty's New Platform",
      date: "October 15, 2024",
      link: "#"
    }
  ];

  const awards = [
    {
      name: "Best Proptech Startup 2024",
      organizer: "India Tech Awards",
      year: "2024"
    },
    {
      name: "Most Innovative Real Estate Platform",
      organizer: "PropTech Summit",
      year: "2024"
    },
    {
      name: "Startup of the Year - Real Estate",
      organizer: "Business Today",
      year: "2023"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Newspaper className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, announcements, and media coverage about LeaseMyProperty.
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Press Releases</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Official announcements and company news
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-slate-200">
                <div className="relative h-48">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                      {release.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {release.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {release.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
                    Read More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Media Coverage</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              What the media is saying about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaCoverage.map((coverage, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{coverage.publication}</span>
                    <span className="text-sm text-slate-500">{coverage.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{coverage.headline}</h3>
                  <a
                    href={coverage.link}
                    className="text-blue-600 font-medium hover:text-blue-700 transition inline-flex items-center"
                  >
                    Read Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Award className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Honors and accolades we&apos;ve received
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{award.name}</h3>
                <p className="text-slate-600 mb-1">{award.organizer}</p>
                <p className="text-slate-500 text-sm">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Press Kit</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Download our media resources and company information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Company Overview",
                description: "Detailed information about LeaseMyProperty",
                size: "2.4 MB"
              },
              {
                title: "Logo & Brand Assets",
                description: "Official logos and brand guidelines",
                size: "5.8 MB"
              },
              {
                title: "Executive Photos",
                description: "High-resolution photos of leadership team",
                size: "12.3 MB"
              },
              {
                title: "Fact Sheet 2024",
                description: "Key metrics and company statistics",
                size: "1.2 MB"
              }
            ].map((resource, index) => (
              <div key={index} className="p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition">
                <Download className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{resource.size}</span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Contact</h2>
            <p className="text-xl mb-8 text-slate-300">
              For press inquiries, interviews, or media partnerships
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-bold mb-2">Contact Person</h3>
                  <p className="text-slate-300">Sarah Johnson</p>
                  <p className="text-slate-400">Head of Communications</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-slate-300">press@leasemyproperty.com</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-slate-300">+91 98765 43210</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Response Time</h3>
                  <p className="text-slate-300">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
