import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#03030a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://seowebagency.in"),    title: {
    default:
      "SEOWebAgency | AI-Powered SEO, Website Development & Digital Marketing Agency in Meerut, India - SEO Services, Local SEO, AI Automation & Lead Generation",
    template: "%s | SEOWebAgency - SEO & Digital Growth Agency Meerut",
  },
  description:
    "SEOWebAgency is a premium digital growth agency in Meerut, Uttar Pradesh, India. We deliver AI-powered SEO services, high-conversion website development, local SEO for Meerut businesses, Google Business Profile optimization, AI automation, and lead generation. 500+ projects delivered with 312% average traffic increase.",
  keywords: [
    "SEO Services Meerut",
    "Website Development Meerut",
    "Local SEO Meerut",
    "Digital Marketing Agency Meerut",
    "SEO Agency Uttar Pradesh",
    "Google Business Profile Optimization",
    "AI Automation Services",
    "Lead Generation Company",
    "SEO Services India",
    "Website Design Meerut",
    "Search Engine Optimization Meerut",
    "Digital Growth Agency",
    "AI-Powered SEO",
    "Keyword Research Services",
    "Technical SEO Audit",
    "Organic Traffic Growth",
    "Meerut SEO Expert",
    "Best SEO Agency Meerut",
    "Website Development India",
    "Online Marketing Meerut",
  ],
  authors: [{ name: "Aditya Pal", url: "https://seowebagency.in" }],
  creator: "SEOWebAgency",
  publisher: "SEOWebAgency",
  verification: {
    google: "google-site-verification-id-placeholder",
  },
  alternates: {
    canonical: "https://seowebagency.in",
    languages: {
      "en-IN": "https://seowebagency.in",
      "en": "https://seowebagency.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SEOWebAgency - SEO & Digital Growth Agency",
    title:
      "SEOWebAgency | AI-Powered SEO Services, Website Development & Digital Marketing - Meerut, India",
    description:
      "Premium digital growth agency in Meerut delivering AI-powered SEO, high-conversion websites, local SEO optimization, Google Business Profile management, AI automation, and data-driven lead generation. 500+ successful projects.",
    url: "https://seowebagency.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEOWebAgency – AI-Powered SEO & Digital Growth Agency in Meerut, India",
      },
    ],
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    site: "@seowebagency",
    creator: "@seowebagency",
    title:
      "SEOWebAgency | AI-Powered SEO, Website Development & Digital Marketing Agency Meerut",
    description:
      "Premium digital growth agency - AI-powered SEO, high-conversion websites, local SEO, Google Business optimization, and lead generation. Based in Meerut, serving India.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification:
    "SEO Agency | Website Development Company | Digital Marketing Agency | AI Automation Services | Lead Generation Services",
};

// ─────────────────────────────────────────────
// ADVANCED SCHEMA MARKUP (JSON-LD)
// ─────────────────────────────────────────────

// 1. Organization Schema (Primary)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://seowebagency.in/#organization",
  name: "SEOWebAgency",
  alternateName: "SEOWebAgency – SEO & Digital Growth Agency",
  url: "https://seowebagency.in",
  logo: "https://seowebagency.in/logo.png",
  image: "https://seowebagency.in/og-image.png",
  description:
    "AI-powered SEO and digital growth agency in Meerut, Uttar Pradesh, India. Specializing in website development, local SEO, Google Business optimization, AI automation, and lead generation for businesses across India.",
  telephone: "+918803511070",
  email: "seowebagency.in@gmail.com",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Aditya Pal",
    jobTitle: "Founder & CEO",
    sameAs: "https://www.linkedin.com/in/adityapaltech",
  },
  sameAs: [
    "https://wa.me/918860384919",
    "https://instagram.com/seoweb_agency",
    "https://www.linkedin.com/company/seowebagency",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Begum Bridge Road, Civil Lines",
    addressLocality: "Meerut",
    addressRegion: "Uttar Pradesh",
    postalCode: "250001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.9845",
    longitude: "77.7064",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "₹₹",
  areaServed: [
    {
      "@type": "City",
      name: "Meerut",
      sameAs: "https://www.wikidata.org/wiki/Q200092",
    },
    {
      "@type": "State",
      name: "Uttar Pradesh",
      sameAs: "https://www.wikidata.org/wiki/Q1498",
    },
    {
      "@type": "Country",
      name: "India",
      sameAs: "https://www.wikidata.org/wiki/Q668",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEO & Digital Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-web-dev",
          name: "Website Development",
          description:
            "High-performance, conversion-optimized websites built with Next.js, React, and modern frameworks for maximum speed and SEO performance.",
          provider: { "@id": "https://seowebagency.in/#organization" },
          areaServed: { "@type": "City", name: "Meerut" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-seo",
          name: "Search Engine Optimization",
          description:
            "Data-driven SEO services including keyword research, technical SEO, on-page optimization, link building, and content strategy for sustainable organic growth.",
          provider: { "@id": "https://seowebagency.in/#organization" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-local-seo",
          name: "Local SEO",
          description:
            "Local search optimization for Meerut businesses including Google Maps ranking, local citation building, and review management to dominate local search results.",
          provider: { "@id": "https://seowebagency.in/#organization" },
          areaServed: [
            { "@type": "City", name: "Meerut" },
            { "@type": "State", name: "Uttar Pradesh" },
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-gbp",
          name: "Google Business Profile Optimization",
          description:
            "Complete Google Business Profile optimization including categories, attributes, posts, Q&A management, and review strategies for maximum local visibility.",
          provider: { "@id": "https://seowebagency.in/#organization" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-ai-automation",
          name: "AI Automation & Lead Generation",
          description:
            "AI-powered lead generation systems with intelligent chatbots, automated CRM workflows, smart lead scoring, and 24/7 automated qualification.",
          provider: { "@id": "https://seowebagency.in/#organization" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://seowebagency.in/#service-digital-marketing",
          name: "Digital Marketing",
          description:
            "Omnichannel digital marketing campaigns including paid ads, social media marketing, email marketing, and ROI-optimized multi-channel strategies.",
          provider: { "@id": "https://seowebagency.in/#organization" },
        },
      },
    ],
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Rajesh Kumar" },
      reviewBody:
        "SEOWebAgency transformed our digital presence completely. 400% organic traffic increase in 4 months.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Priya Sharma" },
      reviewBody:
        "The website they built is incredibly fast and conversion rate improved 60% in the first month.",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "50",
    reviewCount: "50",
  },
};

// 2. BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://seowebagency.in/#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://seowebagency.in" },
    {
      "@type": "ListItem",
      position: 2,
      name: "SEO Services",
      item: "https://seowebagency.in/#services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Website Development",
      item: "https://seowebagency.in/#services",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Local SEO Meerut",
      item: "https://seowebagency.in/#services",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact SEOWebAgency",
      item: "https://seowebagency.in/#contact",
    },
  ],
};

// 3. WebSite Schema with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://seowebagency.in/#website",
  name: "SEOWebAgency – SEO & Digital Growth Agency",
  url: "https://seowebagency.in",
  description:
    "Premium AI-powered SEO agency in Meerut, India. Specializing in website development, local SEO, digital marketing, Google Business optimization, and AI automation.",
  publisher: { "@id": "https://seowebagency.in/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://seowebagency.in/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

// 4. FAQPage Schema (Answers to common questions for AEO)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://seowebagency.in/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What SEO services does SEOWebAgency offer in Meerut?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEOWebAgency offers comprehensive SEO services in Meerut including technical SEO audits, keyword research and optimization, on-page SEO, off-page link building, local SEO for Google Maps rankings, content strategy, and monthly performance reporting. We serve businesses throughout Meerut, Uttar Pradesh, and across India with AI-powered optimization strategies that deliver measurable results.",
      },
    },
    {
      "@type": "Question",
      name: "How much does website development cost in Meerut?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEOWebAgency offers website development packages starting from ₹9,999 for a basic 5-page responsive website to ₹29,999+ for premium business websites with custom features, e-commerce integration, AI chatbot integration, and advanced SEO optimization. Every website is built with Next.js for lightning-fast performance and optimized for Core Web Vitals.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see results from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients begin seeing measurable improvements in organic traffic within 4–8 weeks of starting our SEO services. Significant ranking improvements for competitive keywords typically occur within 3–6 months. Our clients achieve an average traffic increase of 312% within 6 months through our data-driven SEO methodology combining technical optimization, content strategy, and authoritative link building.",
      },
    },
    {
      "@type": "Question",
      name: "What is Local SEO and why is it important for Meerut businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Local SEO is the process of optimizing your online presence to attract more business from local searches on Google and other search engines. For Meerut businesses, local SEO is crucial because it helps you appear in Google Maps results, local pack listings, and location-based searches. Our local SEO services include Google Business Profile optimization, local citation building, review management, and geo-targeted content strategy to help Meerut businesses dominate local search results.",
      },
    },
    {
      "@type": "Question",
      name: "Does SEOWebAgency provide AI automation services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SEOWebAgency provides cutting-edge AI automation services including intelligent chatbots for lead capture, automated CRM workflows, smart lead scoring systems, AI-powered content generation, and automated email marketing sequences. Our AI automation solutions help businesses save up to 20+ hours per week on lead management and achieve 70% automatic lead qualification rates.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book a free consultation with SEOWebAgency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a free strategic growth consultation with SEOWebAgency by calling +91 8803511070, emailing seowebagency.in@gmail.com, chatting with us on WhatsApp at +91 8860384919, or filling out the contact form on our website. Our team will analyze your website, discuss your business goals, and provide a customized growth strategy at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "What makes SEOWebAgency different from other SEO agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEOWebAgency differentiates itself through AI-powered optimization, real-time dashboard access, transparent reporting, custom tech stacks built for each client, programmatic SEO models, 100/100 Core Web Vitals performance, and a data-driven approach that delivers an average 8.5x ROI. Unlike traditional agencies that rely on manual updates and static reports, we build automated systems that scale with your business.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer Google Business Profile optimization services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SEOWebAgency offers complete Google Business Profile optimization including category and attribute selection, service menu optimization, post and update management, Q&A monitoring and responses, review generation strategies, and performance tracking. Our GBP clients see an average of 5x more profile views and 3x more direction requests after optimization.",
      },
    },
  ],
};

// 5. HowTo Schema (Step-by-step SEO process for AEO & featured snippets)
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://seowebagency.in/#howto",
  name: "How to Improve Your Website SEO with SEOWebAgency",
  description:
    "Our proven SEO methodology follows a systematic 5-step process to improve your website's search engine rankings, organic traffic, and conversions.",
  image: "https://seowebagency.in/og-image.png",
  estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "2999" },
  totalTime: "P3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Comprehensive SEO Audit & Analysis",
      text: "We conduct a thorough technical SEO audit of your website, analyzing site structure, page speed, mobile responsiveness, Core Web Vitals, meta tags, heading hierarchy, schema markup, backlink profile, and competitor positioning.",
      image: "https://seowebagency.in/og-image.png",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Keyword Research & Content Strategy",
      text: "Using AI-powered tools, we identify high-value keywords relevant to your business, analyze search intent, cluster keywords by topic, and develop a comprehensive content strategy targeting featured snippets and voice search optimization.",
      image: "https://seowebagency.in/og-image.png",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "On-Page Optimization & Technical Fixes",
      text: "We optimize meta titles, descriptions, heading tags, image alt texts, URL structures, internal linking, schema markup, and Core Web Vitals. We also implement technical fixes for crawlability, indexation, and page speed optimization.",
      image: "https://seowebagency.in/og-image.png",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Authority Building & Link Acquisition",
      text: "We build high-quality backlinks through strategic outreach, guest posting, digital PR, and content marketing. Our approach focuses on earning authoritative, relevant links that boost domain authority and search rankings.",
      image: "https://seowebagency.in/og-image.png",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Performance Tracking & Ongoing Optimization",
      text: "We provide real-time dashboard access, weekly performance reports, and monthly strategy reviews. We continuously monitor rankings, traffic, conversions, and ROI, making data-driven adjustments to maximize results.",
      image: "https://seowebagency.in/og-image.png",
    },
  ],
};

// 6. LocalBusiness Schema (for Meerut-specific local SEO)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://seowebagency.in/#localbusiness",
  name: "SEOWebAgency – Meerut SEO Agency",
  parentOrganization: { "@id": "https://seowebagency.in/#organization" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Begum Bridge Road, Civil Lines",
    addressLocality: "Meerut",
    addressRegion: "Uttar Pradesh",
    postalCode: "250001",
    addressCountry: "IN",
  },
  telephone: "+918803511070",
  email: "seowebagency.in@gmail.com",
  areaServed: [
    { "@type": "City", name: "Meerut" },
    { "@type": "City", name: "Ghaziabad" },
    { "@type": "City", name: "Noida" },
    { "@type": "City", name: "Delhi" },
    { "@type": "State", name: "Uttar Pradesh" },
  ],
  knowsAbout: [
    "Search Engine Optimization",
    "Website Development",
    "Local SEO",
    "Digital Marketing",
    "AI Automation",
    "Lead Generation",
    "Google Business Profile",
    "Social Media Marketing",
    "Content Marketing",
    "Keyword Research",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization to prevent flash */}
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
            `,
          }}
        />

        {/* Primary Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema, null, 0),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema, null, 0),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema, null, 0),
          }}
        />

        {/* FAQPage Schema (AEO + LLMO optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema, null, 0),
          }}
        />

        {/* HowTo Schema (AEO + Featured Snippet Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema, null, 0),
          }}
        />

        {/* LocalBusiness Schema (Local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema, null, 0),
          }}
        />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* GA4 Script - loaded after interactive */}
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
      <body className="min-h-full flex flex-col bg-[#ffffff] dark:bg-[#03030a] text-zinc-950 dark:text-zinc-50 selection:bg-[var(--primary-glow)]">
        {/* Skip-to-content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-indigo-500 focus:text-white focus:rounded-xl focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
