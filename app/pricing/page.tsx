"use client"
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      icon: <Building2 className="w-8 h-8" />,
      features: [
        'Browse all properties',
        'Basic search filters',
        'Property enquiries',
        'Email support',
        'Save up to 5 properties',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Basic',
      price: '999',
      period: 'month',
      icon: <Zap className="w-8 h-8" />,
      features: [
        'Everything in Free',
        'Advanced search filters',
        'Price alerts',
        'Saved searches',
        'Save unlimited properties',
        'Priority email support',
        'Market insights reports',
        'Property comparison tool',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Premium',
      price: '2999',
      period: 'month',
      icon: <Crown className="w-8 h-8" />,
      features: [
        'Everything in Basic',
        'Featured property listings',
        'Virtual tour access',
        'ROI calculator',
        '24/7 phone support',
        'Dedicated account manager',
        'Early access to new listings',
        'Exclusive market reports',
        'Property valuation tool',
      ],
      cta: 'Go Premium',
      popular: false,
    },
  ];

  const landlordPlans = [
    {
      name: 'Starter',
      price: '4999',
      period: 'month',
      features: [
        'List up to 5 properties',
        'Basic property management',
        'Enquiry management',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: '9999',
      period: 'month',
      features: [
        'List unlimited properties',
        'Featured listings (3/month)',
        'Advanced analytics',
        'Priority support',
        'Property promotion tools',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'API access',
        'Bulk listing tools',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock powerful features to find or list properties faster
            </p>
          </div>

          {/* Visitor Plans */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">For Property Seekers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border-2 ${
                    plan.popular ? 'border-black shadow-2xl scale-105' : 'border-gray-200'
                  } p-8 relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-black">₹{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-600">/{plan.period}</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/auth/register"
                    className={`block w-full text-center py-4 rounded-lg font-bold transition-all ${
                      plan.popular
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Plans */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-8 text-center">For Property Owners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {landlordPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border-2 ${
                    plan.popular ? 'border-black shadow-2xl scale-105' : 'border-gray-200'
                  } p-8 relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-black">
                        {plan.price === 'Custom' ? 'Custom' : `₹${plan.price}`}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600">/{plan.period}</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/auth/register"
                    className={`block w-full text-center py-4 rounded-lg font-bold transition-all ${
                      plan.popular
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can I change plans anytime?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 30-day money-back guarantee on all paid plans. No questions asked.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, UPI, and bank transfers.',
                },
                {
                  q: 'Are there any hidden fees?',
                  a: 'No hidden fees. The price you see is what you pay. All features are included in your plan.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <h3 className="font-bold text-black mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
