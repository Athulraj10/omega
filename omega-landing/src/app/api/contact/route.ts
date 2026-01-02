import { NextRequest, NextResponse } from "next/server";
import { emailConfig } from "@/config/email.config";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  console.log("=== CONTACT FORM API CALLED ===");
  console.log("Timestamp:", new Date().toISOString());
  
  try {
    console.log("[1] Parsing request body...");
    const body = await request.json();
    console.log("[1] Request body received:", JSON.stringify(body, null, 2));
    
    const { name, email, phone, subject, message } = body;
    console.log("[2] Extracted fields:", { name, email, phone, subject, messageLength: message?.length });

    // Validate required fields
    console.log("[3] Validating required fields...");
    if (!name || !email || !subject || !message) {
      console.error("[3] VALIDATION FAILED - Missing required fields:", {
        hasName: !!name,
        hasEmail: !!email,
        hasSubject: !!subject,
        hasMessage: !!message
      });
      return NextResponse.json(
        { error: "Missing required fields. Please fill in all required fields." },
        { status: 400 }
      );
    }
    console.log("[3] ✓ All required fields present");

    // Validate email format
    console.log("[4] Validating email format...");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("[4] VALIDATION FAILED - Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    console.log("[4] ✓ Email format valid");

    // Check if Resend API key is configured
    console.log("[5] Checking Resend API key configuration...");
    console.log("[5] API Key exists:", !!emailConfig.resendApiKey);
    console.log("[5] API Key length:", emailConfig.resendApiKey?.length || 0);
    console.log("[5] API Key starts with 're_':", emailConfig.resendApiKey?.startsWith('re_') || false);
    
    if (!emailConfig.resendApiKey) {
      console.error("[5] ❌ VALIDATION FAILED - Resend API key is not configured");
      console.error("[5] Please add RESEND_API_KEY to your .env.local file.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }
    console.log("[5] ✓ Resend API key configured");

    // Format email content with HTML for better readability
    console.log("[6] Formatting email content...");
    const htmlEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5caf90; border-bottom: 2px solid #5caf90; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #5caf90; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Omega Fresh Fish contact form.<br>
          You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    // Plain text version for email clients that don't support HTML
    const textEmailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Omega Fresh Fish contact form.
You can reply directly to this email to respond to ${name}.
    `.trim();
    console.log("[6] ✓ Email content formatted (HTML length:", htmlEmailBody.length, ", Text length:", textEmailBody.length, ")");

    // Check email configuration
    console.log("[7] Email configuration:");
    console.log("[7] - From Email:", emailConfig.fromEmail);
    console.log("[7] - From Name:", emailConfig.fromName);
    console.log("[7] - Recipient Email:", emailConfig.recipientEmail);
    console.log("[7] - Subject Prefix:", emailConfig.subjectPrefix);
    console.log("[7] - Full Subject:", `${emailConfig.subjectPrefix}: ${subject}`);

    // Send email via Resend
    console.log("[8] Initializing Resend client...");
    const resend = new Resend(emailConfig.resendApiKey);
    console.log("[8] ✓ Resend client initialized");

    console.log("[9] Preparing email payload...");
    const emailPayload = {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: [emailConfig.recipientEmail],
      subject: `${emailConfig.subjectPrefix}: ${subject}`,
      html: htmlEmailBody,
      text: textEmailBody,
      replyTo: email,
    };
    console.log("[9] Email payload prepared:", {
      from: emailPayload.from,
      to: emailPayload.to,
      subject: emailPayload.subject,
      replyTo: emailPayload.replyTo,
      hasHtml: !!emailPayload.html,
      hasText: !!emailPayload.text
    });

    console.log("[10] Sending email via Resend API...");
    const { data, error } = await resend.emails.send(emailPayload);
    console.log("[10] Resend API response received");

    if (error) {
      console.error("[10] ❌ RESEND API ERROR:");
      console.error("[10] Error object:", JSON.stringify(error, null, 2));
      console.error("[10] Error message:", error.message);
      console.error("[10] Error name:", error.name);
      if ('statusCode' in error) {
        console.error("[10] Error status code:", (error as any).statusCode);
      }
      return NextResponse.json(
        { 
          error: "Failed to send email. Please try again later or contact us directly.",
          details: process.env.NODE_ENV === 'development' ? JSON.stringify(error, null, 2) : undefined
        },
        { status: 500 }
      );
    }

    console.log("[10] Resend response data:", JSON.stringify(data, null, 2));

    if (!data || !data.id) {
      console.error("[10] ❌ RESEND RETURNED NO DATA OR EMAIL ID");
      console.error("[10] Data object:", data);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Success
    console.log("[10] ✅ EMAIL SENT SUCCESSFULLY!");
    console.log("[10] Email ID:", data.id);
    console.log("[10] Recipient:", emailConfig.recipientEmail);
    console.log("=== CONTACT FORM PROCESSING COMPLETE ===");
    
    return NextResponse.json(
      { 
        message: "Thank you for your message! We'll get back to you soon.",
        emailId: data.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== CONTACT FORM ERROR ===");
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error("=== END ERROR ===");
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

