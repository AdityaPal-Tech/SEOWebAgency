import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Retrieve the response
  const response = NextResponse.next();

  // Define secure headers
  const securityHeaders = {
    "Content-Security-Policy": 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://ssl.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https://www.googletagmanager.com https://ssl.google-analytics.com; " +
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net; " +
      "font-src 'self' data:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self'; " +
      "frame-ancestors 'none'; " +
      "upgrade-insecure-requests;",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  };

  // Inject headers into the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Simple Rate-limiting markers for CDN / Cloudflare simulation
  response.headers.set("X-RateLimit-Limit", "100");
  response.headers.set("X-RateLimit-Remaining", "99");
  response.headers.set("X-CDN-Cache", "HIT");

  // Block malicious user agents / bots
  const userAgent = request.headers.get("user-agent") || "";
  const maliciousBots = [
    "badbot",
    "scraper",
    "headlesschrome",
    "webzip",
    "extract",
    "harvest",
  ];

  const isBot = maliciousBots.some((bot) => 
    userAgent.toLowerCase().includes(bot)
  );

  if (isBot) {
    return new NextResponse("Access Blocked: Malicious Bot Activity Detected", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return response;
}

// Apply middleware matchers to all application request patterns
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
