import { Cookie, Shield, Eye, Settings, Info, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cookie className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn how we use cookies and similar technologies to enhance your experience on LeaseMyProperty.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-black" />
                What Are Cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At LeaseMyProperty, we use cookies to enhance your experience, analyze site traffic, and personalize content. This policy explains how we use cookies and your choices regarding their use.
              </p>
            </div>

            {/* Types of Cookies We Use */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-black" />
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">Essential Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Authentication and security</li>
                    <li>Shopping cart and checkout process</li>
                    <li>Remembering your preferences</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">Performance Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Website analytics and traffic monitoring</li>
                    <li>Error tracking and performance optimization</li>
                    <li>User behavior analysis</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">Functional Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies enable enhanced functionality and personalization, such as videos and live chats.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Remembering your login details</li>
                    <li>Personalized content recommendations</li>
                    <li>Location-based services</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">Marketing Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Personalized advertising</li>
                    <li>Social media integration</li>
                    <li>Campaign tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-black" />
                How We Use Cookies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Enhanced User Experience</h3>
                    <p className="text-gray-600">Remember your preferences and login information</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Analytics & Insights</h3>
                    <p className="text-gray-600">Understand how our website is being used</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Personalization</h3>
                    <p className="text-gray-600">Show relevant content and property recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Security</h3>
                    <p className="text-gray-600">Protect your account and prevent fraud</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6 text-black" />
                Managing Your Cookie Preferences
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                You have several options to manage cookies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-black mb-2">Browser Settings</h3>
                  <p className="text-gray-600">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                    <li>Accept or reject all cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set notifications when cookies are sent</li>
                    <li>Block cookies from specific websites</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-black mb-2">Cookie Consent Banner</h3>
                  <p className="text-gray-600">
                    When you first visit our website, you&apos;ll see a cookie consent banner where you can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may use third-party services that set their own cookies on your device. These include:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <ul className="space-y-3 text-gray-600">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Social Media Platforms:</strong> For sharing content and social features</li>
                  <li><strong>Advertising Networks:</strong> For displaying relevant advertisements</li>
                  <li><strong>Payment Gateways:</strong> For secure payment processing</li>
                </ul>
              </div>
            </div>

            {/* Cookie Duration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Cookie Duration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-black mb-2">Session Cookies</h3>
                  <p className="text-gray-600">Deleted when you close your browser</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-black mb-2">Persistent Cookies</h3>
                  <p className="text-gray-600">Remain on your device for a set period or until deleted</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-black" />
                Your Rights and Choices
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Withdraw consent at any time</li>
                <li>Access information about cookies we use</li>
                <li>Request deletion of your data collected via cookies</li>
                <li>File a complaint with data protection authorities</li>
              </ul>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, legal requirements, or technology. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                <li>Posting the updated policy on our website</li>
                <li>Updating the &quot;Last updated&quot; date</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying a notice on our website</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Cookie Policy or how we use cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Email:</strong> privacy@leasemyproperty.com</li>
                  <li><strong>Phone:</strong> +91 98765 43210</li>
                  <li><strong>Address:</strong> 123 Business Tower, Mumbai, Maharashtra</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-8">Related Policies</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/privacy" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-black hover:bg-black hover:text-white transition">
                Privacy Policy
              </a>
              <a href="/terms" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-black hover:bg-black hover:text-white transition">
                Terms of Service
              </a>
              <a href="/help" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-black hover:bg-black hover:text-white transition">
                Help Center
              </a>
              <a href="/contact" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-black hover:bg-black hover:text-white transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
