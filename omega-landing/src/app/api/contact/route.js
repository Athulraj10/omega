// API route for contact form submission using Resend

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message, agreeToTerms } = body;

    // Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return Response.json(
        {
          success: false,
          error: 'All fields are required'
        },
        { status: 400 }
      );
    }

    if (!agreeToTerms) {
      return Response.json(
        {
          success: false,
          error: 'Please agree to the terms and conditions'
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        {
          success: false,
          error: 'Invalid email address'
        },
        { status: 400 }
      );
    }

    // Prepare email content with seafood context
    const emailSubject = `New Contact Form Submission - ${subject} | Omega Seafoods`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a5f3f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1a5f3f; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #1a5f3f; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🐟 New Contact Form Submission - Omega Seafoods</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${fullName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Omega Seafoods contact form.</p>
              <p>Please respond to the customer at: ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission - Omega Seafoods

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Omega Seafoods contact form.
Please respond to the customer at: ${email}
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Omega Seafoods <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'info@omegafoods.com',
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json(
        {
          success: false,
          error: 'Failed to send email. Please try again later.'
        },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a5f3f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🐟 Thank You for Contacting Omega Seafoods!</h2>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for reaching out to Omega Seafoods. We have received your message regarding "${subject}" and our team will get back to you within 24-48 hours.</p>
              <p>We appreciate your interest in our premium seafood products and look forward to serving you.</p>
              <p>Best regards,<br>The Omega Seafoods Team</p>
            </div>
            <div class="footer">
              <p>Omega Seafoods - Premium Seafood Delivered Fresh</p>
              <p>Abu Dhabi, UAE | info@omegafoods.com | +971 55 545 1188</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send confirmation email (optional, don't fail if this fails)
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Omega Seafoods <onboarding@resend.dev>',
        to: email,
        subject: 'Thank You for Contacting Omega Seafoods',
        html: confirmationHtml,
      });
    } catch (confirmationError) {
      console.error('Confirmation email error (non-critical):', confirmationError);
    }

    return Response.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        id: data?.id
      }
    });

  } catch (error) {
    console.error('Contact form API error:', error);
    return Response.json(
      {
        success: false,
        error: 'An error occurred while processing your request. Please try again later.',
        message: error.message
      },
      { status: 500 }
    );
  }
}

