/**
 * SEOWebAgency - Professional SEO Audit Engine
 *
 * Analyzes websites in real-time using:
 * - Server-side HTML parsing (SEO, accessibility, mobile)
 * - HTTP response analysis (security, technical)
 * - Google PageSpeed Insights API (performance metrics)
 *
 * All scores are calculated from actual audit data — no placeholders.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AuditReport {
  url: string;
  domain: string;
  timestamp: string;
  overallScore: number;
  seo: ModuleResult;
  performance: ModuleResult;
  security: ModuleResult;
  accessibility: ModuleResult;
  mobile: ModuleResult;
  technical: ModuleResult;
  issues: AuditIssue[];
  competitiveInsights: string[];
  pageLoadTimeMs: number;
}

export interface ModuleResult {
  score: number;
  label: string;
  icon: string;
  checks: AuditCheck[];
  summary: string;
}

export interface AuditCheck {
  name: string;
  passed: boolean;
  value: string;
  recommendation: string;
  severity: "pass" | "critical" | "warning" | "info";
}

export interface AuditIssue {
  id: string;
  module: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  recommendation: string;
}

export interface PageSpeedResult {
  performanceScore: number;
  lcp: number | null;
  fcp: number | null;
  cls: number | null;
  tbt: number | null;
  si: number | null;
  error?: string;
}

interface PageHeaders {
  [key: string]: string;
}

interface PageAnalysis {
  html: string;
  headers: PageHeaders;
  statusCode: number;
  responseTimeMs: number;
  finalUrl: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractTag(html: string, tag: string, attribute?: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = html.match(regex);
  if (!match) return null;
  if (attribute) {
    const attrRegex = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, "i");
    const attrMatch = match[0].match(attrRegex);
    return attrMatch ? attrMatch[1].trim() : null;
  }
  return match[1].trim().replace(/\s+/g, " ");
}

function extractMetaTag(html: string, name: string): string | null {
  const regex = new RegExp(
    `<meta[^>]*(?:name|property)\\s*=\\s*["']${escapeRegex(name)}["'][^>]*content\\s*=\\s*["']([^"']+)["']`,
    "i"
  );
  const match = html.match(regex);
  if (match) return match[1].trim();

  // Try reversed attribute order
  const regex2 = new RegExp(
    `<meta[^>]*content\\s*=\\s*["']([^"']+)["'][^>]*(?:name|property)\\s*=\\s*["']${escapeRegex(name)}["']`,
    "i"
  );
  const match2 = html.match(regex2);
  return match2 ? match2[1].trim() : null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractAllTags(html: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>`, "gi");
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[0]);
  }
  return matches;
}

function extractAllTagContents(html: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

function extractAttribute(tag: string, attr: string): string | null {
  const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = tag.match(regex);
  return match ? match[1].trim() : null;
}

function hasAttribute(tag: string, attr: string): boolean {
  const regex = new RegExp(`${attr}(?:\\s*=\\s*["'][^"']*["'])?`, "i");
  return regex.test(tag);
}

function extractAllHrefs(html: string): string[] {
  const regex = /<a[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const hrefs: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1].trim());
  }
  return hrefs;
}

function extractJsonLd(html: string): string[] {
  const regex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const schemas: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      JSON.parse(match[1].trim());
      schemas.push(match[1].trim());
    } catch {
      // Invalid JSON-LD
    }
  }
  return schemas;
}

function elementCount(html: string, tag: string): number {
  const regex = new RegExp(`<${tag}[\\s>]`, "gi");
  const matches = html.match(regex);
  return matches ? matches.length : 0;
}

function hasMediaQueryLink(html: string): boolean {
  return /<link[^>]*media\s*=\s*["'][^"']*["'][^>]*href\s*=\s*["'][^"']+["']/i.test(html);
}

function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function normalizeUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  try {
    const u = new URL(url);
    return u.href.replace(/\/+$/, "");
  } catch {
    return url;
  }
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ─── Page Fetcher ────────────────────────────────────────────────────────────

async function fetchPage(url: string, timeoutMs = 15000): Promise<PageAnalysis> {
  const startTime = Date.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SEOWebAgency-Audit/1.0; +https://seowebagency.in)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const headers: PageHeaders = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const html = await response.text();
    const responseTimeMs = Date.now() - startTime;
    const finalUrl = response.url;

    clearTimeout(timeout);

    return {
      html,
      headers,
      statusCode: response.status,
      responseTimeMs,
      finalUrl,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchResource(url: string, timeoutMs = 8000): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "SEOWebAgency-Audit/1.0" },
    });
    clearTimeout(timeout);
    if (response.ok) return await response.text();
    return null;
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

// ─── PageSpeed Insights API ──────────────────────────────────────────────────

async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  const apiKey = process.env.PAGESPEED_API_KEY || "";

  if (!apiKey) {
    // PageSpeed API key not configured — return null and let the engine estimate
    return null;
  }

  try {
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=seo`;

    const response = await fetch(endpoint, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) {
      return { error: `PageSpeed API error: ${response.status}`, performanceScore: 0, lcp: null, fcp: null, cls: null, tbt: null, si: null };
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    if (!lighthouse) {
      return { error: "Invalid PageSpeed response", performanceScore: 0, lcp: null, fcp: null, cls: null, tbt: null, si: null };
    }

    const audits = lighthouse.audits || {};

    return {
      performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
      lcp: audits["largest-contentful-paint"]?.numericValue || null,
      fcp: audits["first-contentful-paint"]?.numericValue || null,
      cls: audits["cumulative-layout-shift"]?.numericValue || null,
      tbt: audits["total-blocking-time"]?.numericValue || null,
      si: audits["speed-index"]?.numericValue || null,
    };
  } catch (err: any) {
    return { error: `PageSpeed fetch failed: ${err.message}`, performanceScore: 0, lcp: null, fcp: null, cls: null, tbt: null, si: null };
  }
}

// ─── SEO Analysis ────────────────────────────────────────────────────────────

function analyzeSEO(html: string, url: string): ModuleResult {
  const checks: AuditCheck[] = [];
  const issues: AuditIssue[] = [];
  let scoreDeductions = 0;

  // 1. Title Tag
  const title = extractTag(html, "title");
  const titleLength = title ? title.length : 0;
  if (!title || title.trim() === "") {
    checks.push({ name: "Title Tag", passed: false, value: "Missing", recommendation: "Add a descriptive <title> tag (50-60 characters). Crucial for search rankings.", severity: "critical" });
    scoreDeductions += 15;
  } else if (titleLength < 30) {
    checks.push({ name: "Title Tag", passed: false, value: truncate(title, 80), recommendation: "Title is too short (${titleLength} chars). Aim for 50-60 characters.", severity: "warning" });
    scoreDeductions += 5;
  } else if (titleLength > 70) {
    checks.push({ name: "Title Tag", passed: false, value: truncate(title, 80), recommendation: "Title is too long (${titleLength} chars). Search engines may truncate beyond 60 characters.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "Title Tag", passed: true, value: truncate(title, 80), recommendation: "Title tag length is optimal.", severity: "pass" });
  }

  // 2. Meta Description
  const metaDesc = extractMetaTag(html, "description");
  const metaDescLength = metaDesc ? metaDesc.length : 0;
  if (!metaDesc) {
    checks.push({ name: "Meta Description", passed: false, value: "Missing", recommendation: "Add a meta description (120-158 characters). Influences click-through rate.", severity: "critical" });
    scoreDeductions += 12;
  } else if (metaDescLength < 70) {
    checks.push({ name: "Meta Description", passed: false, value: truncate(metaDesc, 90), recommendation: "Description too short (${metaDescLength} chars). Aim for 120-158 characters.", severity: "warning" });
    scoreDeductions += 5;
  } else if (metaDescLength > 170) {
    checks.push({ name: "Meta Description", passed: false, value: truncate(metaDesc, 90), recommendation: "Description too long (${metaDescLength} chars). May be truncated in SERPs.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "Meta Description", passed: true, value: truncate(metaDesc, 90), recommendation: "Meta description is well-optimized.", severity: "pass" });
  }

  // 3. Canonical URL
  const canonical = extractMetaTag(html, "canonical") || extractTag(html, "link", "rel");
  if (canonical) {
    checks.push({ name: "Canonical URL", passed: true, value: canonical, recommendation: "Canonical tag is present.", severity: "pass" });
  } else {
    // Also check link rel=canonical
    const linkCanonical = html.match(/<link[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["']/i);
    if (linkCanonical) {
      checks.push({ name: "Canonical URL", passed: true, value: linkCanonical[1], recommendation: "Canonical tag is present.", severity: "pass" });
    } else {
      checks.push({ name: "Canonical URL", passed: false, value: "Missing", recommendation: "Add a <link rel='canonical'> tag to prevent duplicate content issues.", severity: "warning" });
      scoreDeductions += 8;
    }
  }

  // 4. Robots Meta
  const robots = extractMetaTag(html, "robots");
  if (robots) {
    const isNoindex = robots.toLowerCase().includes("noindex");
    const isNofollow = robots.toLowerCase().includes("nofollow");
    if (isNoindex) {
      checks.push({ name: "Robots Meta", passed: false, value: robots, recommendation: "Page has 'noindex' directive — it won't appear in search results.", severity: "critical" });
      scoreDeductions += 15;
    } else {
      checks.push({ name: "Robots Meta", passed: true, value: robots, recommendation: "Page is indexable by search engines.", severity: "pass" });
    }
  } else {
    checks.push({ name: "Robots Meta", passed: true, value: "Not specified (index defaults to true)", recommendation: "No robots meta tag found. Default behavior is to index.", severity: "pass" });
  }

  // 5. Open Graph Tags
  const ogTitle = extractMetaTag(html, "og:title");
  const ogDesc = extractMetaTag(html, "og:description");
  const ogImage = extractMetaTag(html, "og:image");
  const ogUrl = extractMetaTag(html, "og:url");
  const ogType = extractMetaTag(html, "og:type");

  const ogTags = [ogTitle, ogDesc, ogImage, ogUrl, ogType].filter(Boolean).length;
  if (ogTags >= 4) {
    checks.push({ name: "Open Graph Tags", passed: true, value: `${ogTags}/5 required tags present`, recommendation: "Open Graph is well-configured for social sharing.", severity: "pass" });
  } else if (ogTags >= 2) {
    checks.push({ name: "Open Graph Tags", passed: false, value: `${ogTags}/5 required tags present`, recommendation: "Add missing OG tags: ${!ogTitle ? 'og:title, ' : ''}${!ogDesc ? 'og:description, ' : ''}${!ogImage ? 'og:image, ' : ''}${!ogUrl ? 'og:url, ' : ''}${!ogType ? 'og:type' : ''}", severity: "warning" });
    scoreDeductions += 6;
  } else {
    checks.push({ name: "Open Graph Tags", passed: false, value: "Missing or incomplete", recommendation: "Add Open Graph meta tags for proper social media sharing.", severity: "warning" });
    scoreDeductions += 8;
  }

  // 6. Twitter Cards
  const twitterCard = extractMetaTag(html, "twitter:card");
  if (twitterCard) {
    checks.push({ name: "Twitter Card", passed: true, value: twitterCard, recommendation: "Twitter Card is configured.", severity: "pass" });
  } else {
    checks.push({ name: "Twitter Card", passed: false, value: "Not found", recommendation: "Add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image).", severity: "info" });
    scoreDeductions += 4;
  }

  // 7. H1-H6 Structure
  const h1Count = elementCount(html, "h1");
  const h1Contents = extractAllTagContents(html, "h1");
  if (h1Count === 0) {
    checks.push({ name: "H1 Heading", passed: false, value: "No H1 tag found", recommendation: "Every page needs exactly one H1 heading. It's critical for SEO.", severity: "critical" });
    scoreDeductions += 12;
  } else if (h1Count > 1) {
    checks.push({ name: "H1 Heading", passed: false, value: `${h1Count} H1 tags found`, recommendation: "Multiple H1 tags detected. Use only one H1 per page.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    const h1Text = h1Contents[0] || "";
    checks.push({ name: "H1 Heading", passed: true, value: truncate(h1Text, 80), recommendation: "Single H1 heading found. Good for SEO.", severity: "pass" });
  }

  const h2Count = elementCount(html, "h2");
  if (h2Count === 0) {
    checks.push({ name: "H2 Subheadings", passed: false, value: "No H2 tags found", recommendation: "Use H2 tags to structure your content sections.", severity: "info" });
    scoreDeductions += 2;
  } else {
    checks.push({ name: "H2 Subheadings", passed: true, value: `${h2Count} H2 tags`, recommendation: "Good heading structure with H2 subheadings.", severity: "pass" });
  }

  // 8. Internal & External Links
  const allHrefs = extractAllHrefs(html);
  const domain = domainFromUrl(url);
  const internalLinks = allHrefs.filter((h) => h.startsWith("/") || h.startsWith("#") || h.includes(domain) || (!h.startsWith("http") && !h.startsWith("//")));
  const externalLinks = allHrefs.filter((h) => h.startsWith("http") && !h.includes(domain) && !h.startsWith("#") && !h.startsWith("/"));

  if (internalLinks.length > 0) {
    checks.push({ name: "Internal Links", passed: true, value: `${internalLinks.length} internal links`, recommendation: "Internal linking structure is present.", severity: "pass" });
  } else {
    checks.push({ name: "Internal Links", passed: false, value: "No internal links found", recommendation: "Add internal links to help search engines discover your content.", severity: "warning" });
    scoreDeductions += 5;
  }

  checks.push({ name: "External Links", passed: externalLinks.length > 0, value: externalLinks.length > 0 ? `${externalLinks.length} external links` : "No external links", recommendation: externalLinks.length > 0 ? "External outbound links present." : "Consider adding authoritative external references.", severity: externalLinks.length > 0 ? "pass" : "info" });

  // 9. Image Alt Tags
  const imgTags = extractAllTags(html, "img");
  const imgsWithAlt = imgTags.filter((t) => hasAttribute(t, "alt"));
  const imgsWithoutAlt = imgTags.length - imgsWithAlt.length;
  if (imgTags.length === 0) {
    checks.push({ name: "Image Alt Text", passed: true, value: "No images found", recommendation: "No images to check for alt text.", severity: "pass" });
  } else if (imgsWithoutAlt === 0) {
    checks.push({ name: "Image Alt Text", passed: true, value: `All ${imgTags.length} images have alt text`, recommendation: "All images have proper alt attributes. Excellent for accessibility and SEO.", severity: "pass" });
  } else if (imgsWithoutAlt <= 2) {
    checks.push({ name: "Image Alt Text", passed: false, value: `${imgsWithoutAlt}/${imgTags.length} images missing alt text`, recommendation: "Add alt text to ${imgsWithoutAlt} images for better accessibility and SEO.", severity: "warning" });
    scoreDeductions += 3;
  } else {
    checks.push({ name: "Image Alt Text", passed: false, value: `${imgsWithoutAlt}/${imgTags.length} images missing alt text`, recommendation: "${imgsWithoutAlt} images lack alt text. Add descriptive alt attributes for SEO and accessibility.", severity: "critical" });
    scoreDeductions += 6;
  }

  // 10. Structured Data (JSON-LD)
  const jsonLdBlocks = extractJsonLd(html);
  if (jsonLdBlocks.length > 0) {
    checks.push({ name: "Structured Data", passed: true, value: `${jsonLdBlocks.length} JSON-LD block(s) found`, recommendation: "Structured data is implemented. Good for rich results.", severity: "pass" });
  } else {
    checks.push({ name: "Structured Data", passed: false, value: "No JSON-LD found", recommendation: "Add structured data (JSON-LD) to enable rich snippets in search results.", severity: "info" });
    scoreDeductions += 3;
  }

  // 11. Viewport Meta
  const viewport = extractMetaTag(html, "viewport");
  if (viewport) {
    checks.push({ name: "Viewport Meta Tag", passed: true, value: viewport, recommendation: "Viewport meta tag is configured for responsive design.", severity: "pass" });
  } else {
    checks.push({ name: "Viewport Meta Tag", passed: false, value: "Missing", recommendation: "Add <meta name='viewport' content='width=device-width, initial-scale=1'> for mobile responsiveness.", severity: "critical" });
    scoreDeductions += 8;
  }

  // 12. Language Attribute
  const hasLang = /<html[^>]*lang\s*=\s*["'][^"']*["']/i.test(html);
  checks.push({ name: "Language Attribute", passed: hasLang, value: hasLang ? "Present" : "Missing", recommendation: hasLang ? "HTML lang attribute is set." : "Add lang attribute to <html> tag for accessibility and SEO.", severity: hasLang ? "pass" : "warning" });
  if (!hasLang) scoreDeductions += 2;

  // Calculate score
  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "SEO Analysis",
    icon: "search",
    checks,
    summary: score >= 90 ? "Excellent SEO health. Minor optimizations available."
      : score >= 70 ? "Good SEO foundation. Some improvements recommended."
      : score >= 50 ? "Below average SEO. Significant improvements needed."
      : "Poor SEO. Critical issues must be addressed.",
  };
}

// ─── Performance Analysis ────────────────────────────────────────────────────

function analyzePerformance(
  html: string,
  responseTimeMs: number,
  pagespeed: PageSpeedResult | null
): ModuleResult {
  const checks: AuditCheck[] = [];
  let scoreDeductions = 0;

  const htmlSizeKb = Math.round(new TextEncoder().encode(html).length / 1024);

  // Page load time
  if (responseTimeMs < 500) {
    checks.push({ name: "Server Response Time", passed: true, value: `${responseTimeMs}ms`, recommendation: "Fast server response time.", severity: "pass" });
  } else if (responseTimeMs < 1500) {
    checks.push({ name: "Server Response Time", passed: true, value: `${responseTimeMs}ms`, recommendation: "Acceptable server response time. Aim for under 500ms.", severity: "pass" });
  } else if (responseTimeMs < 3000) {
    checks.push({ name: "Server Response Time", passed: false, value: `${responseTimeMs}ms`, recommendation: "Slow server response. Optimize server config and database queries.", severity: "warning" });
    scoreDeductions += 8;
  } else {
    checks.push({ name: "Server Response Time", passed: false, value: `${responseTimeMs}ms`, recommendation: "Very slow server response. Consider upgrading hosting or implementing caching.", severity: "critical" });
    scoreDeductions += 15;
  }

  // HTML document size
  if (htmlSizeKb < 50) {
    checks.push({ name: "HTML Document Size", passed: true, value: `${htmlSizeKb}KB`, recommendation: "HTML size is well-optimized.", severity: "pass" });
  } else if (htmlSizeKb < 150) {
    checks.push({ name: "HTML Document Size", passed: true, value: `${htmlSizeKb}KB`, recommendation: "HTML size is acceptable.", severity: "pass" });
  } else if (htmlSizeKb < 300) {
    checks.push({ name: "HTML Document Size", passed: false, value: `${htmlSizeKb}KB`, recommendation: "Large HTML document. Consider reducing inline scripts/styles.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "HTML Document Size", passed: false, value: `${htmlSizeKb}KB`, recommendation: "Very large HTML document. Optimize by removing unnecessary markup.", severity: "critical" });
    scoreDeductions += 10;
  }

  // GZIP Compression
  // (we can't fully check without seeing the response, but flag if large)

  // PageSpeed Insights data
  if (pagespeed && !pagespeed.error) {
    checks.push({ name: "PageSpeed Score", passed: pagespeed.performanceScore >= 90, value: `${pagespeed.performanceScore}/100`, recommendation: pagespeed.performanceScore >= 90 ? "Excellent PageSpeed score." : "Optimize for better PageSpeed performance.", severity: pagespeed.performanceScore >= 90 ? "pass" : pagespeed.performanceScore >= 50 ? "warning" : "critical" });
    if (pagespeed.performanceScore < 90) {
      scoreDeductions += Math.round((90 - pagespeed.performanceScore) / 3);
    }

    if (pagespeed.lcp !== null) {
      const lcpMs = Math.round(pagespeed.lcp / 1000 * 10) / 10;
      checks.push({ name: "Largest Contentful Paint (LCP)", passed: lcpMs <= 2.5, value: `${lcpMs}s`, recommendation: lcpMs <= 2.5 ? "LCP is within the recommended 2.5s threshold." : "LCP exceeds 2.5s. Optimize hero images and reduce render-blocking resources.", severity: lcpMs <= 2.5 ? "pass" : lcpMs <= 4 ? "warning" : "critical" });
      if (lcpMs > 2.5) scoreDeductions += Math.round((lcpMs - 2.5) * 5);
    }

    if (pagespeed.fcp !== null) {
      const fcpMs = Math.round(pagespeed.fcp / 1000 * 10) / 10;
      checks.push({ name: "First Contentful Paint (FCP)", passed: fcpMs <= 1.8, value: `${fcpMs}s`, recommendation: fcpMs <= 1.8 ? "FCP is within the recommended 1.8s threshold." : "FCP exceeds 1.8s. Minimize render-blocking resources.", severity: fcpMs <= 1.8 ? "pass" : "warning" });
    }

    if (pagespeed.cls !== null) {
      const clsVal = Math.round(pagespeed.cls * 1000) / 1000;
      checks.push({ name: "Cumulative Layout Shift (CLS)", passed: clsVal <= 0.1, value: clsVal.toString(), recommendation: clsVal <= 0.1 ? "CLS is within the recommended 0.1 threshold." : "CLS exceeds 0.1. Ensure images have dimensions and avoid late-loading content.", severity: clsVal <= 0.1 ? "pass" : "warning" });
    }

    if (pagespeed.tbt !== null) {
      const tbtMs = Math.round(pagespeed.tbt);
      checks.push({ name: "Total Blocking Time (TBT)", passed: tbtMs <= 200, value: `${tbtMs}ms`, recommendation: tbtMs <= 200 ? "TBT is within the recommended 200ms threshold." : "TBT exceeds 200ms. Reduce long JavaScript tasks.", severity: tbtMs <= 200 ? "pass" : "warning" });
    }
  } else {
    // Estimate from response time
    checks.push({ name: "Core Web Vitals", passed: responseTimeMs < 1500, value: responseTimeMs < 1500 ? "Estimated: Good" : "Estimated: Needs Improvement", recommendation: responseTimeMs < 1500 ? "Based on fast response time, Core Web Vitals likely meet thresholds." : "Configure PAGESPEED_API_KEY in .env.local for real PageSpeed data.", severity: "info" });
  }

  // Number of external resources (scripts, stylesheets)
  const scriptCount = elementCount(html, "script");
  const linkStyles = (html.match(/<link[^>]*rel\s*=\s*["']stylesheet["']/gi) || []).length;
  const totalResources = scriptCount + linkStyles;

  if (totalResources > 30) {
    checks.push({ name: "External Resources", passed: false, value: `${scriptCount} scripts, ${linkStyles} stylesheets`, recommendation: "High number of external resources (${totalResources}). Reduce or bundle for better performance.", severity: "warning" });
    scoreDeductions += 4;
  } else if (totalResources > 15) {
    checks.push({ name: "External Resources", passed: false, value: `${scriptCount} scripts, ${linkStyles} stylesheets`, recommendation: "Moderate number of external resources. Consider combining files.", severity: "info" });
    scoreDeductions += 2;
  } else {
    checks.push({ name: "External Resources", passed: true, value: `${scriptCount} scripts, ${linkStyles} stylesheets`, recommendation: "Well-optimized number of external resources.", severity: "pass" });
  }

  // Render blocking check (inline scripts/styles are fine)
  const hasRenderBlocking = /<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*media\s*=\s*["'](?!print)["']?[^>]*>/i.test(html);
  if (!hasRenderBlocking && linkStyles > 2) {
    checks.push({ name: "Render-Blocking CSS", passed: false, value: `${linkStyles} stylesheets without media attribute`, recommendation: "Consider using media attributes on stylesheets or inlining critical CSS.", severity: "info" });
    scoreDeductions += 2;
  }

  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "Performance",
    icon: "activity",
    checks,
    summary: score >= 90 ? "Excellent performance. Fast and well-optimized."
      : score >= 70 ? "Good performance with room for improvement."
      : score >= 50 ? "Below average performance. Optimization required."
      : "Slow performance. Critical improvements needed.",
  };
}

// ─── Security Analysis ───────────────────────────────────────────────────────

function analyzeSecurity(headers: PageHeaders, url: string): ModuleResult {
  const checks: AuditCheck[] = [];
  let scoreDeductions = 0;

  // HTTPS
  const isHttps = url.startsWith("https://");
  checks.push({ name: "HTTPS", passed: isHttps, value: isHttps ? "Enabled" : "Not enabled", recommendation: isHttps ? "SSL/TLS is properly configured." : "Migrate to HTTPS immediately. Without SSL, sites are marked as 'Not Secure' and rank lower.", severity: isHttps ? "pass" : "critical" });
  if (!isHttps) scoreDeductions += 20;

  // Security headers
  const hsts = headers["strict-transport-security"];
  if (hsts) {
    checks.push({ name: "Strict-Transport-Security (HSTS)", passed: true, value: truncate(hsts, 60), recommendation: "HSTS header is present. Forces secure connections.", severity: "pass" });
  } else {
    checks.push({ name: "Strict-Transport-Security (HSTS)", passed: false, value: "Missing", recommendation: "Add HSTS header to enforce HTTPS and prevent man-in-the-middle attacks.", severity: "warning" });
    scoreDeductions += 8;
  }

  const csp = headers["content-security-policy"];
  if (csp) {
    checks.push({ name: "Content-Security-Policy (CSP)", passed: true, value: truncate(csp, 60), recommendation: "CSP header is present. Helps prevent XSS and data injection attacks.", severity: "pass" });
  } else {
    checks.push({ name: "Content-Security-Policy (CSP)", passed: false, value: "Missing", recommendation: "Add CSP header to prevent cross-site scripting and data injection attacks.", severity: "warning" });
    scoreDeductions += 8;
  }

  const xFrame = headers["x-frame-options"];
  if (xFrame) {
    checks.push({ name: "X-Frame-Options", passed: true, value: xFrame, recommendation: "X-Frame-Options header prevents clickjacking.", severity: "pass" });
  } else {
    checks.push({ name: "X-Frame-Options", passed: false, value: "Missing", recommendation: "Add X-Frame-Options: DENY or SAMEORIGIN to prevent clickjacking.", severity: "warning" });
    scoreDeductions += 6;
  }

  const xContentType = headers["x-content-type-options"];
  if (xContentType) {
    checks.push({ name: "X-Content-Type-Options", passed: true, value: xContentType, recommendation: "Prevents MIME type sniffing.", severity: "pass" });
  } else {
    checks.push({ name: "X-Content-Type-Options", passed: false, value: "Missing", recommendation: "Add X-Content-Type-Options: nosniff to prevent MIME sniffing.", severity: "info" });
    scoreDeductions += 4;
  }

  const xssProtection = headers["x-xss-protection"];
  if (xssProtection) {
    checks.push({ name: "X-XSS-Protection", passed: true, value: xssProtection, recommendation: "XSS filter is enabled.", severity: "pass" });
  } else {
    checks.push({ name: "X-XSS-Protection", passed: false, value: "Missing", recommendation: "Add X-XSS-Protection: 1; mode=block for older browsers.", severity: "info" });
    scoreDeductions += 2;
  }

  const referrerPolicy = headers["referrer-policy"];
  if (referrerPolicy) {
    checks.push({ name: "Referrer-Policy", passed: true, value: referrerPolicy, recommendation: "Referrer policy is configured.", severity: "pass" });
  } else {
    checks.push({ name: "Referrer-Policy", passed: false, value: "Missing", recommendation: "Add Referrer-Policy header for privacy and referrer control.", severity: "info" });
    scoreDeductions += 2;
  }

  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "Security",
    icon: "shield",
    checks,
    summary: score >= 90 ? "Strong security posture. All critical protections active."
      : score >= 70 ? "Good security. Some headers could be added."
      : score >= 50 ? "Below average security. Important protections missing."
      : "Poor security. Critical vulnerabilities exist.",
  };
}

// ─── Accessibility Analysis ──────────────────────────────────────────────────

function analyzeAccessibility(html: string): ModuleResult {
  const checks: AuditCheck[] = [];
  let scoreDeductions = 0;

  // 1. HTML lang attribute
  const langMatch = html.match(/<html[^>]*lang\s*=\s*["']([^"']+)["']/i);
  if (langMatch) {
    checks.push({ name: "HTML Language", passed: true, value: `lang="${langMatch[1]}"`, recommendation: "Language attribute is set for screen readers.", severity: "pass" });
  } else {
    checks.push({ name: "HTML Language", passed: false, value: "Missing", recommendation: "Add lang attribute to <html> for screen reader pronunciation.", severity: "critical" });
    scoreDeductions += 10;
  }

  // 2. Image Alt Text
  const imgTags = extractAllTags(html, "img");
  const imgsWithAlt = imgTags.filter((t) => hasAttribute(t, "alt"));
  const imgsWithoutAlt = imgTags.length - imgsWithAlt.length;
  const altRatio = imgTags.length > 0 ? imgsWithAlt.length / imgTags.length : 1;

  if (imgTags.length === 0) {
    checks.push({ name: "Image Alt Text", passed: true, value: "No images", recommendation: "No images to evaluate.", severity: "pass" });
  } else if (altRatio >= 0.9) {
    checks.push({ name: "Image Alt Text", passed: true, value: `${imgsWithAlt}/${imgTags.length} have alt text`, recommendation: "Good alt text coverage. Keeps improving.", severity: "pass" });
  } else if (altRatio >= 0.5) {
    checks.push({ name: "Image Alt Text", passed: false, value: `${imgsWithoutAlt}/${imgTags.length} images missing alt text`, recommendation: "Add alt text to ${imgsWithoutAlt} images for screen reader accessibility.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "Image Alt Text", passed: false, value: `${imgsWithoutAlt}/${imgTags.length} images missing alt text`, recommendation: "Most images lack alt text. Critical for accessibility compliance.", severity: "critical" });
    scoreDeductions += 10;
  }

  // 3. Heading Structure
  const h1Count = elementCount(html, "h1");
  const h2Count = elementCount(html, "h2");
  const h3Count = elementCount(html, "h3");
  const hasHeadings = h1Count > 0 && h2Count > 0;

  if (hasHeadings) {
    checks.push({ name: "Heading Structure", passed: true, value: `${h1Count} H1 + ${h2Count} H2 + ${h3Count} H3`, recommendation: "Heading structure helps screen readers navigate content.", severity: "pass" });
  } else if (h1Count > 0) {
    checks.push({ name: "Heading Structure", passed: false, value: `H1 present but no H2/H3`, recommendation: "Add subheadings (H2, H3) to structure content hierarchically.", severity: "warning" });
    scoreDeductions += 4;
  } else {
    checks.push({ name: "Heading Structure", passed: false, value: "No headings found", recommendation: "Add heading tags (H1, H2, H3) for content structure.", severity: "critical" });
    scoreDeductions += 8;
  }

  // 4. Form Labels
  const formTags = extractAllTags(html, "form");
  const hasFormLabels = /<label[^>]*for\s*=\s*["']/.test(html) || /aria-label\s*=\s*["']/.test(html);
  if (formTags.length === 0) {
    checks.push({ name: "Form Accessibility", passed: true, value: "No forms", recommendation: "No forms to check for labels.", severity: "pass" });
  } else if (hasFormLabels) {
    checks.push({ name: "Form Accessibility", passed: true, value: `${formTags.length} form(s) with labels`, recommendation: "Forms have proper labels or ARIA attributes.", severity: "pass" });
  } else {
    checks.push({ name: "Form Accessibility", passed: false, value: `${formTags.length} form(s) without labels`, recommendation: "Add <label> elements or aria-label to all form inputs.", severity: "warning" });
    scoreDeductions += 5;
  }

  // 5. ARIA Landmarks
  const hasARIA = /\b(role|aria-)\s*=\s*["']/.test(html);
  if (hasARIA) {
    checks.push({ name: "ARIA Attributes", passed: true, value: "ARIA landmarks found", recommendation: "ARIA attributes help assistive technology navigate the page.", severity: "pass" });
  } else {
    checks.push({ name: "ARIA Attributes", passed: false, value: "No ARIA attributes", recommendation: "Add ARIA landmarks (role='navigation', role='main', etc.) for accessibility.", severity: "info" });
    scoreDeductions += 3;
  }

  // 6. Skip Navigation Link
  const hasSkipLink = /<a[^>]*href\s*=\s*["']#(main|content|skip)["']/i.test(html);
  checks.push({ name: "Skip Navigation Link", passed: hasSkipLink, value: hasSkipLink ? "Found" : "Not found", recommendation: hasSkipLink ? "Skip navigation link helps keyboard users." : "Consider adding a skip-to-content link for keyboard navigation.", severity: hasSkipLink ? "pass" : "info" });
  if (!hasSkipLink) scoreDeductions += 2;

  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "Accessibility",
    icon: "accessibility",
    checks,
    summary: score >= 90 ? "Highly accessible. Great for all users."
      : score >= 70 ? "Good accessibility. Minor improvements recommended."
      : score >= 50 ? "Below average accessibility. Important fixes needed."
      : "Poor accessibility. Critical issues for disabled users.",
  };
}

// ─── Mobile Analysis ─────────────────────────────────────────────────────────

function analyzeMobile(html: string): ModuleResult {
  const checks: AuditCheck[] = [];
  let scoreDeductions = 0;

  // 1. Viewport Meta Tag
  const viewport = extractMetaTag(html, "viewport");
  const hasWidthDeviceWidth = viewport ? /width\s*=\s*device-width/i.test(viewport) : false;
  if (hasWidthDeviceWidth) {
    checks.push({ name: "Responsive Viewport", passed: true, value: viewport || "Configured", recommendation: "Viewport meta tag is correctly configured for mobile.", severity: "pass" });
  } else if (viewport) {
    checks.push({ name: "Responsive Viewport", passed: false, value: viewport, recommendation: "Viewport is present but should include width=device-width.", severity: "warning" });
    scoreDeductions += 10;
  } else {
    checks.push({ name: "Responsive Viewport", passed: false, value: "Missing", recommendation: "Add viewport meta tag for mobile responsiveness.", severity: "critical" });
    scoreDeductions += 20;
  }

  // 2. Media Queries (check for CSS media queries in link tags or inline)
  const hasMediaQueries = /@media\s*(screen|only)/i.test(html) || /media\s*=\s*["'](?:only\s+)?screen/i.test(html);
  if (hasMediaQueries) {
    checks.push({ name: "CSS Media Queries", passed: true, value: "Media queries detected", recommendation: "Responsive CSS is implemented.", severity: "pass" });
  } else {
    checks.push({ name: "CSS Media Queries", passed: false, value: "No media queries found", recommendation: "Implement CSS media queries for responsive design across devices.", severity: "warning" });
    scoreDeductions += 10;
  }

  // 3. Font Size (check if any CSS sets font-size below 14px)
  const hasSmallFont = /font-size\s*:\s*(1[0-3]|[0-9])px/i.test(html);
  if (hasSmallFont) {
    checks.push({ name: "Font Readability", passed: false, value: "Small fonts detected (below 14px)", recommendation: "Ensure body text is at least 14px for readability on mobile.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "Font Readability", passed: true, value: "Adequate font sizes", recommendation: "Font sizes appear adequate for mobile readability.", severity: "pass" });
  }

  // 4. Touch Targets (check for many small links close together - basic estimate)
  const links = extractAllHrefs(html);
  const smallElements = (html.match(/width\s*:\s*([0-9]+)px/gi) || []).filter(
    (m) => parseInt(m.replace(/\D/g, "")) < 44
  ).length;

  if (smallElements > 3) {
    checks.push({ name: "Touch Targets", passed: false, value: `${smallElements} small interactive elements`, recommendation: "Ensure touch targets are at least 44x44px for mobile usability.", severity: "warning" });
    scoreDeductions += 5;
  } else {
    checks.push({ name: "Touch Targets", passed: true, value: smallElements > 0 ? "Mostly adequate" : "No issues detected", recommendation: "Touch target sizes appear adequate.", severity: "pass" });
  }

  // 5. Content Width
  const hasMaxWidth = /max-width\s*:\s*\d+%|width\s*:\s*100%/i.test(html);
  if (hasMaxWidth) {
    checks.push({ name: "Content Width", passed: true, value: "Flexible content width", recommendation: "Content uses flexible widths for mobile.", severity: "pass" });
  } else {
    checks.push({ name: "Content Width", passed: false, value: "May overflow on small screens", recommendation: "Use relative units (%, vw) for content width instead of fixed pixels.", severity: "info" });
    scoreDeductions += 3;
  }

  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "Mobile",
    icon: "smartphone",
    checks,
    summary: score >= 90 ? "Excellent mobile optimization. Touch-friendly and responsive."
      : score >= 70 ? "Good mobile experience. Minor improvements available."
      : score >= 50 ? "Below average mobile. Responsive fixes needed."
      : "Poor mobile experience. Critical responsive issues.",
  };
}

// ─── Technical SEO Analysis ──────────────────────────────────────────────────

async function analyzeTechnical(html: string, headers: PageHeaders, url: string, statusCode: number): Promise<ModuleResult> {
  const checks: AuditCheck[] = [];
  let scoreDeductions = 0;
  const domain = domainFromUrl(url);
  const origin = url.match(/^(https?:\/\/[^\/]+)/)?.[0] || "";

  // 1. Status Code
  if (statusCode === 200) {
    checks.push({ name: "HTTP Status Code", passed: true, value: `${statusCode} OK`, recommendation: "Page returns a successful 200 status.", severity: "pass" });
  } else if (statusCode >= 300 && statusCode < 400) {
    checks.push({ name: "HTTP Status Code", passed: false, value: `${statusCode} Redirect`, recommendation: "Page redirects. Ensure there are no redirect chains.", severity: "warning" });
    scoreDeductions += 8;
  } else if (statusCode >= 400) {
    checks.push({ name: "HTTP Status Code", passed: false, value: `${statusCode} Error`, recommendation: "Page returns an error status code.", severity: "critical" });
    scoreDeductions += 15;
  }

  // 2. Sitemap.xml
  const sitemapUrl = `${origin}/sitemap.xml`;
  const sitemapContent = await fetchResource(sitemapUrl);
  if (sitemapContent) {
    const hasUrls = /<url>/i.test(sitemapContent);
    checks.push({ name: "XML Sitemap", passed: hasUrls, value: hasUrls ? "Present with URLs" : "Present but empty", recommendation: hasUrls ? "Sitemap.xml exists and contains URLs." : "Sitemap exists but appears empty. Add URLs to it.", severity: hasUrls ? "pass" : "warning" });
    if (!hasUrls) scoreDeductions += 4;
  } else {
    checks.push({ name: "XML Sitemap", passed: false, value: "Not found", recommendation: "Add a sitemap.xml file to help search engines discover your pages.", severity: "warning" });
    scoreDeductions += 8;
  }

  // 3. Robots.txt
  const robotsUrl = `${origin}/robots.txt`;
  const robotsContent = await fetchResource(robotsUrl);
  if (robotsContent) {
    const hasSitemapRef = /sitemap:/i.test(robotsContent);
    const hasDisallow = /disallow:/i.test(robotsContent);
    checks.push({ name: "Robots.txt", passed: true, value: hasSitemapRef ? "Present (with sitemap ref)" : "Present (no sitemap ref)", recommendation: hasSitemapRef ? "Robots.txt exists and references sitemap." : "Add a Sitemap directive to robots.txt.", severity: hasSitemapRef ? "pass" : "info" });
    if (!hasSitemapRef) scoreDeductions += 2;
  } else {
    checks.push({ name: "Robots.txt", passed: false, value: "Not found", recommendation: "Add a robots.txt file to control crawler access.", severity: "info" });
    scoreDeductions += 3;
  }

  // 4. GZIP/Compression
  const encoding = headers["content-encoding"];
  if (encoding) {
    checks.push({ name: "Content Compression", passed: true, value: `${encoding} enabled`, recommendation: "Content is compressed for faster delivery.", severity: "pass" });
  } else {
    checks.push({ name: "Content Compression", passed: false, value: "No compression detected", recommendation: "Enable GZIP or Brotli compression for faster page loads.", severity: "warning" });
    scoreDeductions += 5;
  }

  // 5. Canonicalization
  const canonical = extractMetaTag(html, "canonical") || html.match(/<link[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["']/i)?.[1];
  if (canonical) {
    checks.push({ name: "URL Canonicalization", passed: true, value: canonical, recommendation: "Canonical URL is specified.", severity: "pass" });
  } else {
    checks.push({ name: "URL Canonicalization", passed: false, value: "No canonical tag", recommendation: "Add canonical URL to prevent duplicate content.", severity: "warning" });
    scoreDeductions += 5;
  }

  // 6. Final URL vs input URL (redirect check)
  if (url !== url && new URL(url).hostname === domain) {
    // Already handled via fetch redirect
  }

  const maxScore = 100;
  const score = Math.max(0, Math.min(100, maxScore - scoreDeductions));

  return {
    score,
    label: "Technical SEO",
    icon: "settings",
    checks,
    summary: score >= 90 ? "Excellent technical foundation. Search engines can crawl effectively."
      : score >= 70 ? "Good technical SEO. Minor issues to fix."
      : score >= 50 ? "Below average technical setup. Important fixes needed."
      : "Poor technical SEO. Search engines may struggle to index content.",
  };
}

// ─── Competitive Insights ────────────────────────────────────────────────────

function analyzeCompetitive(html: string, url: string, seoScore: number): string[] {
  const insights: string[] = [];
  const title = extractTag(html, "title");

  // Keyword relevance from title
  if (title) {
    const words = title.toLowerCase().split(/\s+/);
    const seoTerms = ["seo", "digital", "marketing", "agency", "services", "consulting", "growth", "optimization"];
    const foundTerms = seoTerms.filter((t) => words.includes(t));
    if (foundTerms.length >= 3) {
      insights.push("Strong keyword alignment detected in page title with your target market.");
    }
  }

  // Content length indication
  const textContent = html.replace(/<[^>]+>/g, "").trim();
  const wordCount = textContent.split(/\s+/).length;
  if (wordCount < 300) {
    insights.push("Content is relatively thin (< 300 words). Competitors with comprehensive content (1500+ words) typically rank better.");
  } else if (wordCount < 1000) {
    insights.push("Moderate content length. Aim for 1500+ words to compete effectively in search rankings.");
  } else {
    insights.push("Good content depth. Continue expanding with targeted keyword coverage.");
  }

  // Structured data
  const jsonLd = extractJsonLd(html);
  if (jsonLd.length === 0) {
    insights.push("No structured data found. Competitors using schema markup are more likely to appear in rich results.");
  }

  // Schema types
  if (jsonLd.length > 0) {
    const types = jsonLd.map((j) => {
      try {
        return JSON.parse(j)["@type"] || "Unknown";
      } catch {
        return "Invalid";
      }
    });
    insights.push(`Structured data types detected: ${types.join(", ")}. This helps with rich snippet eligibility.`);
  }

  // Link analysis
  const internalLinks = extractAllHrefs(html).filter((h) => h.startsWith("/") || h.includes(domainFromUrl(url)));
  if (internalLinks.length > 10) {
    insights.push("Strong internal linking structure helps distribute page authority.");
  } else if (internalLinks.length < 3) {
    insights.push("Limited internal linking. Adding relevant internal links can improve SEO performance.");
  }

  // Performance insight
  insights.push("Consider running a competitive keyword gap analysis to identify high-opportunity terms your competitors rank for but you don't.");

  return insights;
}

// ─── Issue Generator ─────────────────────────────────────────────────────────

function generateIssues(
  seo: ModuleResult,
  performance: ModuleResult,
  security: ModuleResult,
  accessibility: ModuleResult,
  mobile: ModuleResult,
  technical: ModuleResult
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  let counter = 0;

  const allChecks = [
    { module: "SEO", result: seo },
    { module: "Performance", result: performance },
    { module: "Security", result: security },
    { module: "Accessibility", result: accessibility },
    { module: "Mobile", result: mobile },
    { module: "Technical", result: technical },
  ];

  const severityMap: Record<string, "critical" | "high" | "medium" | "low"> = {
    critical: "critical",
    warning: "high",
    info: "medium",
  };

  for (const { module, result } of allChecks) {
    for (const check of result.checks) {
      if (check.severity !== "pass" && check.severity !== "info") {
        counter++;
        issues.push({
          id: `ISSUE-${counter.toString().padStart(3, "0")}`,
          module,
          title: check.name,
          description: check.value,
          severity: severityMap[check.severity] || "low",
          recommendation: check.recommendation,
        });
      }
    }
  }

  // Also add failed info-level checks if the score is low
  for (const { module, result } of allChecks) {
    for (const check of result.checks) {
      if (check.severity === "info" && !check.passed) {
        counter++;
        issues.push({
          id: `ISSUE-${counter.toString().padStart(3, "0")}`,
          module,
          title: check.name,
          description: check.value,
          severity: "low",
          recommendation: check.recommendation,
        });
      }
    }
  }

  return issues.sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });
}

// ─── Overall Score ───────────────────────────────────────────────────────────

function calculateOverall(modules: ModuleResult[]): number {
  const weights = [0.25, 0.2, 0.15, 0.15, 0.15, 0.1]; // SEO, Performance, Security, Accessibility, Mobile, Technical
  let total = 0;
  let weightSum = 0;

  for (let i = 0; i < modules.length; i++) {
    total += modules[i].score * weights[i];
    weightSum += weights[i];
  }

  return Math.round(total / weightSum);
}

// ─── Main Audit Function ─────────────────────────────────────────────────────

export async function runAudit(inputUrl: string): Promise<AuditReport> {
  const url = normalizeUrl(inputUrl);
  const domain = domainFromUrl(url);

  // Fetch the page
  const page = await fetchPage(url);

  // Fetch PageSpeed Insights (if API key is configured)
  const pagespeed = await fetchPageSpeed(url);

  // Run all analysis modules
  const seo = analyzeSEO(page.html, page.finalUrl);
  const performance = analyzePerformance(page.html, page.responseTimeMs, pagespeed);
  const security = analyzeSecurity(page.headers, page.finalUrl);
  const accessibility = analyzeAccessibility(page.html);
  const mobile = analyzeMobile(page.html);
  const technical = await analyzeTechnical(page.html, page.headers, page.finalUrl, page.statusCode);

  // Generate issues and insights
  const issues = generateIssues(seo, performance, security, accessibility, mobile, technical);
  const competitiveInsights = analyzeCompetitive(page.html, page.finalUrl, seo.score);

  // Calculate overall score
  const overallScore = calculateOverall([seo, performance, security, accessibility, mobile, technical]);

  return {
    url: page.finalUrl,
    domain,
    timestamp: new Date().toISOString(),
    overallScore,
    seo,
    performance,
    security,
    accessibility,
    mobile,
    technical,
    issues,
    competitiveInsights,
    pageLoadTimeMs: page.responseTimeMs,
  };
}
