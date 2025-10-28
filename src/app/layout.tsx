import "./globals.css";
import '@fontsource-variable/urbanist';
import type { Metadata } from "next";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "BookAdZone | Your Outdoor Advertising AI Powerhouse",
    template: "%s | BookAdZone AI"
  },
  description: "Modernize your outdoor advertising with BookAdZone. Get predictive AI insights and instantly book billboards, hoardings, & digital screens. Streamline your campaigns with our AI powerhouse platform. Join the waitlist for early access!",
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
    "ad space marketplace",
    "bus shelter ads",
    "digital screens",
    "highway billboards",
    "OOH",
    "outdoor ad booking",
    "Banner ads",
    "predictive AI advertising", 
    "AI ad campaign", 
    "advertising AI powerhouse", 
    "modern outdoor advertising",
    "AI media buying",
    "AI insights" 
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
    title: 'BookAdZone: The AI Powerhouse for Outdoor Advertising', 
    description: 'Modernize your OOH campaigns. Get predictive AI insights and book ad spaces instantly with the BookAdZone powerhouse.', 
    images: [
      {
        url: '/favicon.ico', 
        width: 1200,
        height: 630,
        alt: 'BookAdZone - AI-Powered Outdoor Advertising',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookAdZone: Your Outdoor Advertising AI Powerhouse', 
    description: 'Modernize outdoor advertising with predictive AI insights. Book billboards & digital screens instantly with our powerhouse platform.', 
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
  abstract: 'BookAdZone is an AI powerhouse platform, offering predictive insights to modernize and simplify outdoor ad space booking for advertisers and agencies all over india.',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  appleWebApp: {
    title: 'BookAdZone AI Powerhouse', 
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'application-name': 'BookAdZone AI Powerhouse', 
    'generator': 'Next.js',
    'revisit-after': '7 days',
    'rating': 'general',
    'distribution': 'global',
    'coverage': 'worldwide',
    'target': 'all',
    'audience': 'advertisers, marketing agencies, media buyers, OOH specialists, AI-driven marketers', 
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BookAdZone",
              "alternateName": "AI Outdoor Advertising Powerhouse", 
              "url": "https://bookadzone.com",
              "logo": "https://www.bookadzone.com/_next/static/media/bookadzone-logo.3e77d101.png",
              "description": "Modernize outdoor advertising with predictive AI insights. The BookAdZone powerhouse platform simplifies instant booking for billboards, hoardings, and digital screens.",
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
                "Ad Campaign Management",
                "Predictive AI Insights", 
                "Advertising Technology" 
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