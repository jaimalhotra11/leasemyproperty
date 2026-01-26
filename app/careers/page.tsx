import { Building2, Users, Target, Heart, Rocket, Coffee, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai",
      type: "Full-time",
      experience: "3-5 years"
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "2-3 years"
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Delhi",
      type: "Full-time",
      experience: "1-3 years"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Learning budgets, mentorship programs, and clear career progression paths"
    },
    {
      icon: Coffee,
      title: "Work Environment",
      description: "Flexible work hours, remote options, and modern office spaces"
    },
    {
      icon: Shield,
      title: "Financial Security",
      description: "Competitive salaries, performance bonuses, and stock options"
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
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Build the future of commercial real estate with us. We&apos;re looking for passionate individuals who want to make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Work at LeaseMyProperty?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re more than just a company – we&apos;re a team of innovators changing an industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Mission-Driven",
                description: "Help businesses find their perfect workspace and grow"
              },
              {
                icon: TrendingUp,
                title: "Rapid Growth",
                description: "Be part of India&apos;s fastest-growing proptech startup"
              },
              {
                icon: Users,
                title: "Amazing Team",
                description: "Work with talented, passionate, and supportive colleagues"
              },
              {
                icon: Building2,
                title: "Industry Impact",
                description: "Shape the future of commercial real estate in India"
              }
            ].map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Benefits & Perks</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We take care of our team so they can focus on doing their best work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-black mb-2">{position.title}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {position.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-600">
                  <div>
                    <span className="font-medium">Department:</span> {position.department}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {position.location}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {position.experience}
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Culture</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At LeaseMyProperty, we foster a culture of innovation, collaboration, and continuous learning. We believe in empowering our team to take ownership of their work and make meaningful contributions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We celebrate diversity, encourage creativity, and maintain a healthy work-life balance. Our team is our greatest asset, and we&apos;re committed to creating an environment where everyone can thrive.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Daily standups and transparent communication
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Regular team outings and social events
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Learning and development opportunities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Recognition and rewards for excellence
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Team collaboration"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl mb-8 text-slate-300">
            If you don&apos;t see a role that fits, we&apos;d still love to hear from you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#positions"
              className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition"
            >
              View Open Positions
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Send Resume
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
