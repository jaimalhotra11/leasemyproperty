import { Shield, Eye, Database, User, Lock, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-slate-600">
            <Calendar className="w-5 h-5 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                LeaseMyProperty (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-slate-600 leading-relaxed">
                By using our Service, you consent to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <User className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Personal Information</h3>
                    <p className="text-slate-600 mb-2">We may collect:</p>
                    <ul className="list-disc list-inside text-slate-600 ml-4">
                      <li>Name, email address, phone number</li>
                      <li>Physical address and location data</li>
                      <li>Professional information and company details</li>
                      <li>Government-issued identification (for verification)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Usage Information</h3>
                    <p className="text-slate-600 mb-2">We automatically collect:</p>
                    <ul className="list-disc list-inside text-slate-600 ml-4">
                      <li>IP address and device information</li>
                      <li>Browser type and operating system</li>
                      <li>Pages visited and time spent on our Service</li>
                      <li>Search queries and property preferences</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Property Information</h3>
                    <p className="text-slate-600 mb-2">For landlords, we collect:</p>
                    <ul className="list-disc list-inside text-slate-600 ml-4">
                      <li>Property details and specifications</li>
                      <li>Photographs and videos of properties</li>
                      <li>Rental terms and pricing information</li>
                      <li>Availability status and lease terms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-slate-600 mb-4">We use your information to:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Provide and maintain our Service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate with you about products, services, and promotions</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Fulfill legal and regulatory requirements</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  <strong>We may share your information in the following circumstances:</strong>
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">With Other Users</h4>
                    <p className="text-slate-600 text-sm">Property listings and contact information may be shared with potential tenants or landlords as part of our service.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Service Providers</h4>
                    <p className="text-slate-600 text-sm">We may share information with third-party service providers who perform services on our behalf (payment processing, data analytics, etc.).</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Legal Requirements</h4>
                    <p className="text-slate-600 text-sm">We may disclose information when required by law or to protect our rights, property, or safety.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <div className="flex gap-4">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Our security measures include:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 ml-4">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and database protection</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Employee training on data protection</li>
                    <li>Access controls and authentication systems</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We retain your information for as long as necessary to provide our Service, fulfill legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When you delete your account, we will delete or anonymize your personal information, except where we are required by law to retain certain information.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  <strong>Under applicable data protection laws, you have the right to:</strong>
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Access and obtain a copy of your personal information</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability (transfer your data to another service)</li>
                </ul>
                <p className="text-slate-600">
                  To exercise these rights, please contact us at privacy@leasemyproperty.com.
                </p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cookies and Tracking</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  We use cookies and similar tracking technologies to enhance your experience on our Service:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Essential Cookies</h4>
                    <p className="text-slate-600 text-sm">Required for basic functionality and security features.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Performance Cookies</h4>
                    <p className="text-slate-600 text-sm">Help us understand how visitors interact with our Service.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Marketing Cookies</h4>
                    <p className="text-slate-600 text-sm">Used to deliver personalized advertisements and content.</p>
                  </div>
                </div>
                <p className="text-slate-600">
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Third-Party Links</h2>
              <p className="text-slate-600 leading-relaxed">
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            {/* International Data Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. International Data Transfers</h2>
              <p className="text-slate-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Information</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span><strong>Email:</strong> privacy@leasemyproperty.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span><strong>Phone:</strong> +91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span><strong>Address:</strong> 123 Business Tower, Mumbai, Maharashtra 400001, India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/terms" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
              Terms of Service
            </a>
            <a href="/help" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
              Help Center
            </a>
            <a href="/contact" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
              Contact Us
            </a>
            <a href="/sitemap" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
              Sitemap
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
