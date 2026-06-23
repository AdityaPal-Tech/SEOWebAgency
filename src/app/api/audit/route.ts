import { NextRequest, NextResponse } from "next/server";
import { runAudit } from "@/lib/audit-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "A URL is required." },
        { status: 400 }
      );
    }

    // Basic validation
    const trimmedUrl = url.trim();
    if (trimmedUrl.length < 3 || trimmedUrl.length > 2000) {
      return NextResponse.json(
        { success: false, error: "URL must be between 3 and 2000 characters." },
        { status: 400 }
      );
    }

    console.log(`[Audit] Starting audit for: ${trimmedUrl}`);

    // Run the audit engine
    const report = await runAudit(trimmedUrl);

    console.log(
      `[Audit] Completed for: ${trimmedUrl} — Overall score: ${report.overallScore}`
    );

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: any) {
    console.error("[Audit] Error:", err.message);

    // Determine if it's a network/connection error
    const errorMsg = err.message || "Unknown error occurred during audit.";
    const isConnectionError =
      errorMsg.includes("fetch") ||
      errorMsg.includes("network") ||
      errorMsg.includes("abort") ||
      errorMsg.includes("timeout") ||
      errorMsg.includes("ENOTFOUND") ||
      errorMsg.includes("ECONNREFUSED");

    return NextResponse.json(
      {
        success: false,
        error: isConnectionError
          ? `Could not connect to the provided URL. Please verify the website is accessible. (${errorMsg})`
          : `Audit failed: ${errorMsg}`,
      },
      { status: isConnectionError ? 400 : 500 }
    );
  }
}
