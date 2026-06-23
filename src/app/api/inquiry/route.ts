import { NextResponse } from "next/server";
import { saveInquiry, deleteInquiry, checkDuplicateInquiry } from "@/lib/db";

// Helper function to retry asynchronous operations, skipping permanent failures
async function retry<T>(operation: () => Promise<T>, maxAttempts = 3, delayMs = 1000): Promise<T> {
  let lastError: any;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.warn(`[Formspree] Attempt ${attempt} failed. Error:`, error);
      
      // Stop retrying on permanent HTTP client errors (e.g. 404 Form Not Found or 400 Bad Request)
      const isPermanentError = 
        error.message && (
          error.message.includes("status 400") || 
          error.message.includes("status 404") || 
          error.message.includes("status 403") ||
          error.message.toLowerCase().includes("not found") ||
          error.message.toLowerCase().includes("bad request")
        );

      if (isPermanentError) {
        console.warn(`[Formspree] Permanent error detected. Aborting further retry attempts.`);
        throw error;
      }

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, company } = body;

    // 1. Server-side validation
    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ success: false, error: "Name is required (2-100 characters)." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }
    // Phone validator allowing numbers, spaces, plus, hyphens, and parentheses
    const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      return NextResponse.json({ success: false, error: "A valid phone number is required (8-20 characters)." }, { status: 400 });
    }
    if (!service || service.trim().length < 2 || service.trim().length > 100) {
      return NextResponse.json({ success: false, error: "Service selection is required." }, { status: 400 });
    }
    if (message && message.length > 1000) {
      return NextResponse.json({ success: false, error: "Message must not exceed 1000 characters." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanService = service.trim();
    const cleanCompany = company ? company.trim() : "";
    const cleanMessage = message ? message.trim() : "";

    // Concatenate company details for SQLite persistence
    const dbMessage = cleanCompany 
      ? `Company: ${cleanCompany}\n\n${cleanMessage}`
      : cleanMessage;

    // 2. Prevent duplicate submissions (within last 30 seconds)
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString();
    try {
      if (checkDuplicateInquiry(cleanEmail, cleanPhone, cleanService, thirtySecondsAgo)) {
        return NextResponse.json(
          { success: false, error: "Duplicate submission detected. Please wait 30 seconds before submitting again." },
          { status: 429 }
        );
      }
    } catch (dbError) {
      console.error("[DB] Duplicate check failed:", dbError);
    }

    // 3. Generate Metadata
    const inquiryId = `INQ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateTime = new Date().toISOString();

    // 4. Save to SQLite Database first (ensuring local record safety)
    try {
      saveInquiry({
        inquiryId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        service: cleanService,
        message: dbMessage,
        dateTime,
      });
      console.log(`[DB] Successfully saved inquiry: ${inquiryId}`);
    } catch (dbError: any) {
      console.error("[DB] Save failed:", dbError);
      return NextResponse.json({ success: false, error: "Failed to persist inquiry details. Please try again." }, { status: 500 });
    }

    // 5. Send payload to Formspree endpoint
    const formspreeUrl = process.env.FORMSPREE_URL || "https://formspree.io/f/mbdvlray";

    try {
      console.log(`[Formspree] Forwarding inquiry ${inquiryId} to ${formspreeUrl}`);
      
      await retry(async () => {
        const formspreeResponse = await fetch(formspreeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            "Full Name": cleanName,
            "Email Address": cleanEmail,
            "Phone Number": cleanPhone,
            "Service Interested In": cleanService,
            "Company Name": cleanCompany || "N/A",
            "Message": cleanMessage,
            "Inquiry ID": inquiryId,
            "Submitted At": new Date(dateTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)",
          }),
        });

        let formspreeResult: any = {};
        try {
          formspreeResult = await formspreeResponse.json();
        } catch (parseErr) {
          // Response is not JSON
        }

        if (!formspreeResponse.ok || (formspreeResult && formspreeResult.ok === false)) {
          const errMsg = formspreeResult.error || `HTTP status ${formspreeResponse.status}`;
          throw new Error(errMsg);
        }
      });

      console.log(`[Formspree] Successfully delivered inquiry: ${inquiryId}`);
    } catch (formspreeError: any) {
      console.error("[Formspree] Delivery failed. Rolling back database record...", formspreeError);
      
      // TRANSACTION ROLLBACK: remove local SQLite row since mailer dispatch failed
      try {
        deleteInquiry(inquiryId);
        console.log(`[DB] Rolled back inquiry: ${inquiryId}`);
      } catch (rollbackError) {
        console.error("[DB] Rollback delete failed:", rollbackError);
      }

      return NextResponse.json(
        { 
          success: false, 
          error: `Formspree submission failed: ${formspreeError.message || "Connection timeout"}. Inquiry rolled back.` 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Thank you for contacting SEOWebAgency. We have received your inquiry and our team will contact you shortly.",
    });

  } catch (err: any) {
    console.error("[API] General error in inquiry route:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
