"use client"
import { Building2, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer id="contact" className="bg-black text-white py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-2xl font-bold">LeaseMyProperty</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            India&apos;s leading commercial real estate platform. We connect businesses with their perfect workspace across 75+ cities. Trusted by 500+ companies for verified, premium properties.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Linkedin, link: '#' },
                                { Icon: Twitter, link: '#' },
                                { Icon: Instagram, link: '#' }
                            ].map(({ Icon, link }, i) => (
                                <a key={i} href={link} className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-gray-800">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="/press" className="hover:text-white transition-colors">Press</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Resources</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>info@LeaseMyProperty.com<br />support@LeaseMyProperty.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>+91 98765 43210<br />+91 98765 43211</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>123 Business Tower,<br />Mumbai, Maharashtra</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            &copy; 2025 LeaseMyProperty. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer