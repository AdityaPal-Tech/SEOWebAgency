import { NextRequest, NextResponse } from "next/server";

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

// In-memory store for inquiries (use a proper DB in production)
const inquiries: Array<InquiryData & { id: string; timestamp: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body: InquiryData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate phone (basic - at least 10 digits)
    const phoneDigits = body.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number with at least 10 digits." },
        { status: 400 }
      );
    }

    // Create inquiry record
    const inquiryId = `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const inquiry = {
      id: inquiryId,
      ...body,
      timestamp: new Date().toISOString(),
    };

    inquiries.push(inquiry);

    // In production: save to database and send email notification
    // await db.insert(inquiry);
    // await sendEmailNotification(inquiry);

    console.log(`[Inquiry] New inquiry received: ${inquiryId}`, inquiry);

    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: "Your inquiry has been received successfully. Our team will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Inquiry] Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      count: inquiries.length,
      inquiries: inquiries.slice(-10).map(({ id, name, email, service, timestamp }) => ({
        id,
        name,
        email,
        service,
        timestamp,
      })),
    },
    { status: 200 }
  );
}
