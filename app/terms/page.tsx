import { FileText, Shield, Users, AlertTriangle, Calendar, Building } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using LeaseMyProperty services
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

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to LeaseMyProperty. These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and services (collectively, the &quot;Service&quot;) operated by LeaseMyProperty (&quot;us,&quot; &quot;we,&quot; or &quot;our&quot;).
              </p>
              <p className="text-slate-600 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Definitions</h2>
              <div className="bg-slate-50 rounded-xl p-6 mb-4">
                <ul className="space-y-3 text-slate-600">
                  <li><strong>&quot;Service&quot;</strong> refers to the LeaseMyProperty website, mobile application, and related services.</li>
                  <li><strong>&quot;User&quot;</strong> refers to any individual or entity using our Service.</li>
                  <li><strong>&quot;Property&quot;</strong> refers to commercial real estate listings on our platform.</li>
                  <li><strong>&quot;Landlord&quot;</strong> refers to property owners listing properties on our platform.</li>
                  <li><strong>&quot;Tenant&quot;</strong> refers to individuals or businesses seeking to lease properties.</li>
                  <li><strong>&quot;Content&quot;</strong> refers to all text, images, videos, and other materials on our platform.</li>
                </ul>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Account Registration</h3>
                    <p className="text-slate-600">You must provide accurate, complete, and current information during registration. You are responsible for safeguarding your account credentials.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Prohibited Activities</h3>
                    <p className="text-slate-600 mb-2">You agree not to:</p>
                    <ul className="list-disc list-inside text-slate-600 ml-4">
                      <li>Post false, misleading, or fraudulent information</li>
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Interfere with or disrupt the Service</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Listings */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Property Listings</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Building className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Landlord Obligations</h3>
                    <p className="text-slate-600 mb-2">As a landlord, you must:</p>
                    <ul className="list-disc list-inside text-slate-600 ml-4">
                      <li>Provide accurate and complete property information</li>
                      <li>Ensure you have legal authority to list the property</li>
                      <li>Maintain property information up to date</li>
                      <li>Respond to tenant inquiries promptly</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Verification:</strong> While we verify properties to the best of our ability, we cannot guarantee the accuracy of all listings. Users should conduct their own due diligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Fees and Payments */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Fees and Payments</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  <strong>Service Fees:</strong> LeaseMyProperty charges fees for certain services, including property listings and premium features. Fees are clearly displayed before you commit to any payment.
                </p>
                <p className="text-slate-600">
                  <strong>Payment Terms:</strong> All payments are processed securely through our payment partners. You agree to provide valid payment information and authorize charges for selected services.
                </p>
                <p className="text-slate-600">
                  <strong>Refund Policy:</strong> Refunds are provided according to our refund policy, which is available separately on our platform.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  <strong>Our Content:</strong> The Service and its original content, features, and functionality are owned by LeaseMyProperty and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-slate-600">
                  <strong>User Content:</strong> By posting content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the Service.
                </p>
                <p className="text-slate-600">
                  <strong>Third-Party Content:</strong> We may display third-party content on our platform. You agree not to use such content without proper authorization from the respective owners.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Privacy</h2>
              <p className="text-slate-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-600">
                  By using our Service, you consent to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Disclaimers</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-600 mb-3">
                      <strong>Important Disclaimers:</strong>
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis</li>
                      <li>We make no warranties about the accuracy or reliability of property listings</li>
                      <li>We are not responsible for transactions between landlords and tenants</li>
                      <li>We do not provide legal or financial advice</li>
                      <li>Property availability and pricing are subject to change without notice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, LeaseMyProperty shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Termination</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach the Terms.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of India, without regard to conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our platform prior to the effective date of the changes.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Information</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-600 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Email:</strong> legal@leasemyproperty.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> 123 Business Tower, Mumbai, Maharashtra 400001, India</p>
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
            <a href="/privacy" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
              Privacy Policy
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
