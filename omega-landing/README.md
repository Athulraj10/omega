# Omega Landing Page

A minimal Next.js landing page with Tailwind CSS for Omega Fresh Fish.

## Project Structure

```
omega-landing/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # API route for contact form
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page
│   │   ├── page.tsx            # Main page (imports LandingPage)
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles with Tailwind
│   ├── components/
│   │   ├── layout/             # Layout components (Header, Navbar)
│   │   ├── AboutPage.tsx       # About page component
│   │   ├── ContactPage.tsx     # Contact page component
│   │   └── LandingPage.tsx     # Landing page component
│   └── config/
│       └── email.config.ts     # Email configuration file
├── .env.local.example          # Example environment variables
├── next.config.ts              # Minimal Next.js config
└── package.json
```

## Features

- ✨ Modern, responsive design
- 🎨 Styled with Tailwind CSS
- 🎠 Image slider using Swiper
- 📱 Fully responsive
- ⚡ Fast and optimized
- 📁 Organized with src/ directory structure
- 📧 Contact form with email notifications

## Email Configuration

The contact form can send emails to your account. Follow these steps:

### Option 1: Using Resend (Recommended - Free tier available)

1. Sign up at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Copy `.env.local.example` to `.env.local`
4. Add your API key: `RESEND_API_KEY=re_your_api_key_here`
5. Update `src/config/email.config.ts`:
   - Set `recipientEmail` to your email address
   - Set `service: 'resend'`

### Option 2: Using SendGrid

1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`: `SENDGRID_API_KEY=SG.your_api_key_here`
4. Update `src/config/email.config.ts`:
   - Set `recipientEmail` to your email address
   - Set `service: 'sendgrid'`

### Option 3: Using SMTP (Gmail, Outlook, etc.)

1. Copy `.env.local.example` to `.env.local`
2. Add your SMTP credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. Update `src/config/email.config.ts`:
   - Set `recipientEmail` to your email address
   - Set `service: 'nodemailer'` or `'smtp'`

### Quick Configuration

Edit `src/config/email.config.ts` to change:
- `recipientEmail`: Your email address where you want to receive submissions
- `fromEmail`: The sender email address
- `fromName`: The sender name
- `service`: Email service to use

**Important**: Update the `recipientEmail` in `src/config/email.config.ts` with your email address!

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file (update with your email service API key)
cp .env.local.example .env.local

# Update src/config/email.config.ts with your recipient email

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Swiper.js (for slider)
- TypeScript
