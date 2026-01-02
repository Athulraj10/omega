# Email Setup Guide - Resend Configuration

This guide will help you configure the contact form to send emails using Resend.

## Quick Setup Steps

### 1. Sign up for Resend (Free tier available)

1. Sign up at [https://resend.com](https://resend.com)
2. Resend offers **3,000 emails/month for free** - perfect for contact forms!

### 2. Get Your API Key

1. Go to [Resend API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Omega Fresh Fish Contact Form")
4. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of your project:

```env
# Resend API Key (REQUIRED)
RESEND_API_KEY=re_your_api_key_here

# From Email (OPTIONAL - defaults to onboarding@resend.dev for testing)
# For testing: use "onboarding@resend.dev" (Resend's default)
# For production: use an email from your verified domain
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important:** Never commit `.env.local` to git - it contains sensitive information!

### 4. Update Email Configuration

Edit `src/config/email.config.ts` to set your recipient email:

```typescript
export const emailConfig = {
  // Your email where you want to receive contact form submissions
  recipientEmail: "omegaseafoods.general@gmail.com",  // ← Your email here
  
  // Email subject prefix
  subjectPrefix: "[Omega Fresh Fish] Contact Form Submission",
  
  // From email - will use RESEND_FROM_EMAIL from .env.local or default
  fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  fromName: "Omega Fresh Fish",
  
  // Resend API Key - loaded from environment variable
  resendApiKey: process.env.RESEND_API_KEY || '',
};
```

### 5. Domain Verification (For Production)

**For Testing:**
- You can use `onboarding@resend.dev` as the from email (already configured)
- This works immediately without any setup

**For Production:**
1. Go to [Resend Domains](https://resend.com/domains)
2. Add and verify your domain
3. Update `RESEND_FROM_EMAIL` in `.env.local` to use your verified domain
   - Example: `RESEND_FROM_EMAIL=noreply@yourdomain.com`

## Testing

1. Make sure your `.env.local` file is set up with your Resend API key
2. Start the development server: `npm run dev`
3. Go to the contact page (`/contact`)
4. Fill out and submit the form
5. Check your email inbox (and spam folder) at `omegaseafoods.general@gmail.com`

## How It Works

When a user submits the contact form:
1. The form data is sent to `/api/contact`
2. The API validates the data
3. An email is sent via Resend to `omegaseafoods.general@gmail.com`
4. The email includes:
   - Sender's name, email, phone (if provided), subject, and message
   - Reply-to is set to the sender's email, so you can reply directly
   - Both HTML and plain text versions for compatibility

## Troubleshooting

### Not receiving emails?

1. **Check your spam folder** - emails might be filtered
2. **Verify your API key** - make sure it's correct in `.env.local`
3. **Check the console logs** - errors will be logged in your terminal
4. **Verify Resend account** - make sure your Resend account is active

### API Key Errors?

- Make sure your API key starts with `re_`
- Ensure the `.env.local` file is in the root directory
- Restart your development server after adding/changing environment variables

### Domain Verification Issues?

- For testing, use `onboarding@resend.dev` (no verification needed)
- For production, verify your domain in Resend dashboard
- DNS records must be correctly configured

### Check Logs

The API will log errors to the console. Check your terminal for:
- "Resend API error:" - indicates an issue with the Resend API
- "Resend API key is not configured" - means the API key is missing

## Security Notes

- Never commit `.env.local` to version control
- Keep your Resend API key secret
- The API key has full access to send emails from your Resend account
- Consider using environment-specific keys for production vs development

