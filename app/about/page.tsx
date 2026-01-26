import { Building2, Users, TrendingUp, Award, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About LeaseMyProperty
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              India&apos;s leading commercial real estate platform, connecting businesses with their perfect workspace across 75+ cities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Companies Trust Us", icon: Building2 },
              { number: "75+", label: "Cities Covered", icon: MapPin },
              { number: "10,000+", label: "Properties Listed", icon: Users },
              { number: "98%", label: "Client Satisfaction", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To revolutionize commercial real estate in India by providing a transparent, efficient, and trustworthy platform that connects businesses with their ideal workspace solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that the right workspace can transform businesses, and we&apos;re committed to making that transformation accessible to every company, from startups to enterprises.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become the most trusted commercial real estate platform in India, leveraging technology to simplify property leasing and create seamless experiences for landlords and tenants alike.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where finding the perfect commercial space is as easy as booking a flight, with complete transparency, instant verification, and unmatched customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Transparency",
                description: "Every property is verified, every listing is accurate, and every transaction is secure."
              },
              {
                icon: Users,
                title: "Customer First",
                description: "We prioritize our clients' needs and go above and beyond to ensure their success."
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description: "We continuously evolve our platform with cutting-edge technology and user-centric features."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts driving our vision forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "CEO & Founder",
                image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
              },
              {
                name: "Priya Sharma",
                role: "CTO & Co-Founder",
                image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
              },
              {
                name: "Amit Patel",
                role: "Head of Operations",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Workspace?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join 500+ companies that trust LeaseMyProperty for their commercial space needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
