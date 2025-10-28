import "./globals.css";
import '@fontsource-variable/urbanist';
import type { Metadata } from "next";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "BookAdZone - Instant Outdoor Ad Space Booking Platform | Launching Soon",
    template: "%s | BookAdZone"
  },
  description: "Revolutionize outdoor advertising with BookAdZone. Instantly book billboards, hoardings & digital screens across multiple locations. Streamline your ad campaigns with our AI-powered platform. Join the waitlist for early access!",
  keywords: [
    "outdoor advertising",
    "billboard booking",
    "ad space rental",
    "digital hoardings",
    "programmatic advertising",
    "outdoor media",
    "ad campaign management",
    "advertising platform",
    "billboard ads",
    "outdoor media buying",
    "digital signage",
    "ad space marketplace"
  ],
  authors: [{ name: "BookAdZone" }],
  creator: "BookAdZone",
  publisher: "BookAdZone",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bookadzone.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bookadzone.com',
    siteName: 'BookAdZone',
    title: 'BookAdZone - Instant Outdoor Ad Space Booking Platform',
    description: 'Book ad spaces instantly across billboards, hoardings & digital screens. Join BookAdZone to simplify outdoor advertising.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BookAdZone - Outdoor Advertising Made Simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookAdZone - Instant Outdoor Ad Space Booking',
    description: 'Revolutionize your outdoor advertising campaigns. Book billboards & digital screens instantly.',
    images: ['/twitter-image.jpg'],
    creator: '@bookadzone',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'advertising technology',
  classification: 'Advertising Platform',
  abstract: 'BookAdZone is a revolutionary platform simplifying outdoor ad space booking for advertisers and agencies worldwide.',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  appleWebApp: {
    title: 'BookAdZone',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'application-name': 'BookAdZone',
    'generator': 'Next.js',
    'revisit-after': '7 days',
    'rating': 'general',
    'distribution': 'global',
    'coverage': 'worldwide',
    'target': 'all',
    'audience': 'advertisers, marketing agencies, media buyers',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BookAdZone",
              "alternateName": "Outdoor Ad Space Booking Platform",
              "url": "https://bookadzone.com",
              "logo": "https://www.bookadzone.com/_next/static/media/bookadzone-logo.3e77d101.png",
              "description": "Instant outdoor advertising space booking platform for billboards, hoardings and digital screens",
              "sameAs": [
                "https://x.com/bookadzone",
                "https://linkedin.com/company/bookadzone",
                "https://facebook.com/bookadzone"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@bookadzone.com",
                "contactType": "customer service"
              },
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Outdoor Advertising",
                "Programmatic Advertising",
                "Digital Signage",
                "Media Buying",
                "Ad Campaign Management"
              ]
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BookAdZone",
              "url": "https://bookadzone.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bookadzone.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}