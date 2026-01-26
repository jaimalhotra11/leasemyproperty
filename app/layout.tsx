import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://leasemyproperty.com'),
  title: {
    default: 'LeaseMyProperty - Commercial Property Leasing in India | Office, Warehouse & Retail Spaces',
    template: '%s | LeaseMyProperty',
  },
  description:
    'Find and lease verified commercial properties across 75+ cities in India. Browse 850+ office spaces, warehouses, retail shops, and showrooms with trusted landlords. Fast approvals, transparent pricing, and expert consultation.',
  keywords: [
    'commercial property India',
    'office space for rent',
    'warehouse lease India',
    'retail shop rental',
    'commercial real estate',
    'business space lease',
    'showroom for rent',
    'co-working space',
    'industrial property',
    'commercial building',
    'office lease Mumbai',
    'warehouse Delhi',
    'retail space Bangalore',
    'commercial property Chennai',
    'business premises',
    'verified properties',
    'fast approval',
    'transparent leasing',
    'property management',
    'commercial rental',
    'lease agreement',
    'property consultation',
    'real estate India',
    'business location',
    'commercial spaces',
    'office rental',
    'warehouse rental',
    'shop for lease',
    'business property'
  ],
  authors: [{ name: 'LeaseMyProperty Team' }],
  creator: 'LeaseMyProperty',
  publisher: 'LeaseMyProperty',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-IN',
      'en-US': '/en-US',
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    title: 'LeaseMyProperty – Commercial Property Leasing in India | Office, Warehouse & Retail',
    description:
      'Discover 850+ verified offices, warehouses, and retail spaces across 75+ Indian cities. Transparent leasing, fast approvals, and expert consultation.',
    url: '/',
    siteName: 'LeaseMyProperty',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'LeaseMyProperty - Commercial Property Leasing in India',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeaseMyProperty – Commercial Property Leasing in India',
    description:
      '850+ verified commercial properties across 75+ cities. Office spaces, warehouses, retail shops with fast approvals.',
    images: ['/logo.png'],
    creator: '@LeaseMyProperty',
    site: '@LeaseMyProperty',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#000000',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'real estate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "LeaseMyProperty",
    "description": "India's leading commercial real estate platform for leasing office spaces, warehouses, retail shops, and showrooms",
    "url": "https://leasemyproperty.com",
    "logo": "https://leasemyproperty.com/logo.png",
    "image": "https://leasemyproperty.com/logo.png",
    "telephone": "+91 98765 43210",
    "email": "info@leasemyproperty.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Tower",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "areaServed": [
      "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", 
      "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat"
    ],
    "serviceType": [
      "Office Space Leasing",
      "Warehouse Rental", 
      "Retail Shop Leasing",
      "Showroom Rental",
      "Co-working Space",
      "Industrial Property"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Properties for Lease",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "RealEstateListing",
            "name": "Office Spaces",
            "description": "Verified office spaces for lease across India"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "RealEstateListing",
            "name": "Warehouses",
            "description": "Industrial warehouses and storage spaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "RealEstateListing", 
            "name": "Retail Shops",
            "description": "Commercial retail spaces and shops"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/company/leasemyproperty",
      "https://www.twitter.com/leasemyproperty",
      "https://www.instagram.com/leasemyproperty"
    ],
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
