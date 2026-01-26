import { HelpCircle, Search, BookOpen, MessageCircle, Phone, Mail, FileText, Users, Building, Shield, CreditCard, Key } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HelpCenterPage() {
  const helpCategories = [
    {
      icon: Building,
      title: "Property Search",
      description: "Learn how to find and filter properties",
      articles: ["How to search for properties", "Using advanced filters", "Saving favorite properties"]
    },
    {
      icon: FileText,
      title: "Leasing Process",
      description: "Understanding the leasing workflow",
      articles: ["Step-by-step leasing guide", "Required documents", "Lease agreement basics"]
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your profile and preferences",
      articles: ["Creating your account", "Updating profile information", "Password reset"]
    },
    {
      icon: Shield,
      title: "Security & Safety",
      description: "Keeping your account secure",
      articles: ["Two-factor authentication", "Recognizing scams", "Data protection"]
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Understanding payment processes",
      articles: ["Payment methods", "Security deposits", "Refund policy"]
    },
    {
      icon: Key,
      title: "Property Management",
      description: "For landlords and property owners",
      articles: ["Listing your property", "Managing inquiries", "Tenant screening"]
    }
  ];

  const popularArticles = [
    {
      title: "How do I search for commercial properties?",
      category: "Property Search",
      views: "2.3k views"
    },
    {
      title: "What documents do I need to lease a property?",
      category: "Leasing Process",
      views: "1.8k views"
    },
    {
      title: "How do I reset my password?",
      category: "Account Management",
      views: "1.5k views"
    },
    {
      title: "Is my personal information secure?",
      category: "Security & Safety",
      views: "1.2k views"
    },
    {
      title: "What payment methods are accepted?",
      category: "Payments & Billing",
      views: "987 views"
    }
  ];

  const faqs = [
    {
      question: "How do I start searching for properties?",
      answer: "Simply use the search bar on the homepage to enter your location, property type, and other preferences. You can then filter results by price, size, amenities, and more."
    },
    {
      question: "Are the properties listed on LeaseMyProperty verified?",
      answer: "Yes, we verify all properties before listing them. Our team conducts physical inspections and document verification to ensure authenticity."
    },
    {
      question: "How long does the leasing process take?",
      answer: "The leasing process typically takes 2-4 weeks from property viewing to contract signing, depending on the complexity and negotiations."
    },
    {
      question: "Can I schedule a property visit online?",
      answer: "Yes, you can schedule property visits directly through our platform. Simply click on the 'Schedule Visit' button on any property listing."
    },
    {
      question: "What if I have issues with my landlord?",
      answer: "We provide mediation services to help resolve disputes between tenants and landlords. Contact our support team for assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to your questions and get the support you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-slate-600">Find help topics organized by category</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                    <div className="space-y-1">
                      {category.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                          → {article}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Articles</h2>
            <p className="text-lg text-slate-600">Most viewed help articles</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer">
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{article.category}</span>
                    <span>{article.views}</span>
                  </div>
                </div>
                <div className="text-slate-400">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Quick answers to common questions</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 mb-4">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition">
                  <span className="font-medium text-slate-900">{faq.question}</span>
                  <span className="text-slate-400">+</span>
                </button>
                <div className="px-6 pb-4 text-slate-600">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Still Need Help?</h2>
            <p className="text-lg text-slate-600">Our support team is here to assist you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-600 mb-4">Chat with our support team instantly</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Start Chat
              </button>
            </div>
            <div className="text-center p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-4">Get help via email within 24 hours</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Send Email
              </button>
            </div>
            <div className="text-center p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition">
              <Phone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Phone Support</h3>
              <p className="text-slate-600 mb-4">Call us for immediate assistance</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Links */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Additional Resources</h3>
                <p className="text-slate-300 mb-6">
                  Explore our comprehensive guides and resources for more in-depth information.
                </p>
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-white hover:text-blue-200 transition">
                    <FileText className="w-5 h-5 mr-3" />
                    User Guide & Documentation
                  </a>
                  <a href="#" className="flex items-center text-white hover:text-blue-200 transition">
                    <BookOpen className="w-5 h-5 mr-3" />
                    Video Tutorials
                  </a>
                  <a href="#" className="flex items-center text-white hover:text-blue-200 transition">
                    <Users className="w-5 h-5 mr-3" />
                    Community Forum
                  </a>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-4">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-slate-300">Support Available</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">&lt;2hr</div>
                    <div className="text-sm text-slate-300">Avg Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-slate-300">Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-slate-300">Help Articles</div>
                  </div>
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
