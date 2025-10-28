// components/SeoHead.tsx
import Head from 'next/head';
import React from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
}

export default function SeoHead({
  title = 'BookAdZone – The Future of Outdoor Ad Space Booking | Coming Soon',
  description = 'Book ad spaces instantly across billboards, hoardings & digital screens. Join BookAdZone to simplify advertising—register now and get notified at launch!',
  url = 'https://bookadzone.com',
  image = 'https://bookadzone.com/og-image.jpg',
  twitterHandle = '@BookAdZone',
}: SeoHeadProps) {
  const jsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    "name": "BookAdZone",
    "url": url,
    "description": description,
    "publisher": {
      "@type": "Organization" as const,
      "name": "BookAdZone",
      "url": url,
      "logo": {
        "@type": "ImageObject" as const,
        "url": image
      }
    }
  };

  return (
    <Head>
      {/* Basic */}
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="BookAdZone" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="BookAdZone - Book ad spaces instantly" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO helpers */}
      <meta name="theme-color" content="#7F6AF7" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}