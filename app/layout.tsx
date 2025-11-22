import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'PropSpace – Commercial Property Leasing in India',
    template: '%s | PropSpace',
  },
  description:
    'Find and lease verified commercial properties across India. Browse offices, warehouses, retail spaces, and showrooms with trusted landlords.',
  keywords: [
    'commercial property',
    'lease',
    'office space',
    'warehouse',
    'retail',
    'showroom',
    'India properties',
    'rent commercial',
  ],
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
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    title: 'PropSpace – Commercial Property Leasing in India',
    description:
      'Discover verified offices, warehouses, and retail spaces with transparent leasing and fast approvals.',
    url: '/',
    siteName: 'PropSpace',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PropSpace',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropSpace – Commercial Property Leasing in India',
    description:
      'Discover verified offices, warehouses, and retail spaces with transparent leasing and fast approvals.',
    images: ['/logo.png'],
    creator: '@propspace',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
