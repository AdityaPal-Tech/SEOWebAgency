import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "SEOWebAgency | SEO & Digital Growth Solutions - Meerut, India",
    template: "%s | SEOWebAgency",
  },
  description: "Accelerate your business with SEOWebAgency. We build high-conversion websites, generate qualified leads, optimize Google Business Profiles, and scale organic search traffic with advanced AI-powered strategies. Based in Meerut, serving India.",
  keywords: [
    "SEO Services", "Website Development", "Local SEO Meerut", "Google Business Profile Optimization",
    "AI Automation", "Lead Generation", "Digital Marketing", "SEO Agency India",
    "Website Design Company", "Search Engine Optimization", "AI SEO", "AEO Optimization",
    "GEO Search", "LLMO", "Google AI Overview Optimization", "ChatGPT SEO",
    "Gemini Optimization", "Perplexity AI", "Claude AI Search", "Voice Search Optimization",
    "Meerut SEO Agency", "Uttar Pradesh SEO", "Best SEO Company", "Digital Growth Agency",
  ],
  authors: [{ name: "SEOWebAgency", url: "https://seowebagency.in" }],
  creator: "SEOWebAgency",
  publisher: "SEOWebAgency",
  metadataBase: new URL("https://seowebagency.in"),
  verification: {
    google: "6-XbpH24HQ7bKACaHTZ-PkcKnFnzNlCO2RO_kGXcGC8",
  },
  alternates: {
    canonical: "https://seowebagency.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SEOWebAgency",
    title: "SEOWebAgency | SEO & Digital Growth Solutions - Meerut, India",
    description: "Accelerate your business with SEOWebAgency. We build high-conversion websites, generate qualified leads, optimize Google Business Profiles, and scale organic search traffic with advanced AI-powered strategies.",
    url: "https://seowebagency.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEOWebAgency - AI-Powered SEO & Digital Growth",
      },
    ],
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOWebAgency | SEO & Digital Growth Solutions - Meerut, India",
    description: "Accelerate your business with SEOWebAgency. AI-powered websites, SEO, lead generation, and digital growth solutions.",
    images: ["/og-image.png"],
    creator: "@seowebagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "SEO & Digital Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = "https://seowebagency.in";

  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "SEOWebAgency",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.png`,
    "description": "Accelerate your business with SEOWebAgency. We build high-conversion websites, generate qualified leads, optimize Google Business Profiles, and scale organic search traffic with advanced AI-powered strategies.",
    "email": "seowebagency.in@gmail.com",
    "telephone": "+918803511070",
    "foundingDate": "2023",
    "foundingLocation": "Meerut, Uttar Pradesh, India",
    "sameAs": [
      "https://wa.me/918860384919",
      "https://instagram.com/seoweb_agency",
      "https://seowebagency.in",
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Begum Bridge Road, Civil Lines",
      "addressLocality": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "250001",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.9845",
      "longitude": "77.7064",
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Meerut",
        "sameAs": "https://en.wikipedia.org/wiki/Meerut",
      },
      {
        "@type": "City",
        "name": "Noida",
      },
      {
        "@type": "City",
        "name": "Delhi",
      },
      {
        "@type": "City",
        "name": "Ghaziabad",
      },
      {
        "@type": "City",
        "name": "Gurugram",
      },
      {
        "@type": "City",
        "name": "Lucknow",
      },
    ],
  };

  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "SEOWebAgency",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.png`,
    "telephone": "+918803511070",
    "email": "seowebagency.in@gmail.com",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Bank Transfer, UPI, Cards",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Begum Bridge Road, Civil Lines",
      "addressLocality": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "250001",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.9845",
      "longitude": "77.7064",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "25",
      "bestRating": "5",
    },
    "areaServed": ["Meerut", "Noida", "Delhi", "Ghaziabad", "Gurugram", "Lucknow", "Uttar Pradesh", "India"],
  };

  const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "SEOWebAgency",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`,
      },
      "query": "required name=search_term_string",
    },
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service`,
    "name": "SEO & Digital Growth Services",
    "serviceType": [
      "Website Development",
      "Search Engine Optimization",
      "Local SEO",
      "Google Business Profile Optimization",
      "Digital Marketing",
      "AI Automation & Lead Generation",
    ],
    "provider": { "@id": `${baseUrl}/#organization` },
    "areaServed": ["Meerut", "Noida", "Delhi", "Ghaziabad", "Gurugram", "Lucknow", "Uttar Pradesh", "India"],
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What SEO services does SEOWebAgency offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEOWebAgency offers comprehensive SEO services including on-page SEO, technical SEO, local SEO, keyword research, content optimization, backlink strategies, Google Business Profile optimization, and AI-powered SEO automation. We serve clients in Meerut, Noida, Delhi, and across India.",
        },
      },
      {
        "@type": "Question",
        "name": "How much does a website cost from SEOWebAgency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Website development packages start from ₹9,999 for a basic 5-page website, ₹19,999 for a business website with premium UI/UX, and ₹29,999+ for a fully custom Next.js platform with AI integration. Custom quotes are available for enterprise solutions.",
        },
      },
      {
        "@type": "Question",
        "name": "How long does SEO take to show results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO is a long-term strategy. Clients typically start seeing measurable improvements in 3-6 months. Our clients have experienced an average traffic increase of 312% in 90 days through our comprehensive SEO approach combining technical optimization, quality content, and authority building.",
        },
      },
      {
        "@type": "Question",
        "name": "Is SEOWebAgency based in Meerut?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SEOWebAgency is headquartered in Meerut, Uttar Pradesh, India. We serve clients locally in Meerut and across India including Noida, Delhi, Ghaziabad, Gurugram, and Lucknow. We also work with international clients remotely.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you optimize for AI search engines like ChatGPT and Google AI Overview?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SEOWebAgency specializes in AEO (Answer Engine Optimization), GEO (Generative Engine Optimization), and LLMO (Large Language Model Optimization). We optimize content for Google AI Overview, ChatGPT, Gemini, Claude, Perplexity, and other AI search engines to ensure your brand appears in AI-generated answers.",
        },
      },
    ],
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${baseUrl}/#services` },
      { "@type": "ListItem", "position": 3, "name": "About", "item": `${baseUrl}/about` },
      { "@type": "ListItem", "position": 4, "name": "Pricing", "item": `${baseUrl}/#pricing` },
      { "@type": "ListItem", "position": 5, "name": "Contact", "item": `${baseUrl}/#contact` },
    ],
  };

  const allSchema = [
    schemaOrganization,
    schemaLocalBusiness,
    schemaWebSite,
    schemaService,
    schemaFAQ,
    schemaBreadcrumb,
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'system';
                  var root = document.documentElement;
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        {/* Schema JSON-LD structured data - Organization, LocalBusiness, WebSite, Service, FAQ, Breadcrumb */}
        {allSchema.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        
        {/* GA4 Script Async */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GA4ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GA4ID', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#ffffff] dark:bg-[#030303] text-zinc-950 dark:text-zinc-50 selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}


