// Email Configuration for Resend
// Setup Instructions:
// 1. Sign up at https://resend.com
// 2. Get your API key from https://resend.com/api-keys
// 3. Add RESEND_API_KEY to your .env.local file
// 4. Verify your domain or use Resend's default domain (onboarding@resend.dev for testing)
// 5. Update the fromEmail to match your verified domain

export const emailConfig = {
  // Your email address where you want to receive contact form submissions
  recipientEmail: "omegaseafoods.general@gmail.com",
  
  // Email subject prefix for contact form submissions
  subjectPrefix: "[Omega Fresh Fish] Contact Form Submission",
  
  // From email address - MUST be a verified domain in Resend
  // For testing: use "onboarding@resend.dev" (Resend's default)
  // For production: use an email from your verified domain (e.g., "noreply@yourdomain.com")
  fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  fromName: "Omega Fresh Fish",
  
  // Resend API Key - REQUIRED
  // Get your API key from: https://resend.com/api-keys
  // Add it to your .env.local file as: RESEND_API_KEY=re_your_api_key_here
  resendApiKey: process.env.RESEND_API_KEY || '',
};

// Log configuration on module load (for debugging)
if (typeof window === 'undefined') {
  console.log("=== EMAIL CONFIG LOADED ===");
  console.log("Recipient Email:", emailConfig.recipientEmail);
  console.log("From Email:", emailConfig.fromEmail);
  console.log("From Name:", emailConfig.fromName);
  console.log("API Key configured:", !!emailConfig.resendApiKey);
  console.log("API Key length:", emailConfig.resendApiKey?.length || 0);
  console.log("Environment variables:");
  console.log("  - RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("  - RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL || "not set (using default)");
  console.log("===========================");
}

