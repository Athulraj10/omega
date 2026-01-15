# Dynamic Footer API Documentation

The Footer component now loads data dynamically from an API endpoint, allowing you to change content based on locale and context.

## Setup

### Option 1: Next.js API Route (Recommended - No additional dependencies)

The footer data is served via the Next.js API route at `/api/footer`. This is the default and recommended approach.

**Usage:**
- The Footer component automatically fetches from `/api/footer`
- No additional setup required
- Works with Next.js App Router

### Option 2: Custom Express Server (Optional)

If you want to run a separate Express server, use the `server.js` file in the root directory.

**Setup:**
1. Install dependencies:
```bash
npm install express cors
```

2. Run the server:
```bash
node server.js
```

The server will run on `http://localhost:3001` (or the PORT environment variable).

3. Update the Footer component to use the external server:
   - Change the API URL in `Footer1.jsx` from `/api/footer` to `http://localhost:3001/api/footer`

## API Endpoint

### GET `/api/footer`

**Query Parameters:**
- `locale` (optional): Language locale (default: `'en'`)
  - Supported: `'en'`, `'ar'`
- `context` (optional): Context identifier (default: `'default'`)

**Example:**
```
GET /api/footer?locale=en&context=default
GET /api/footer?locale=ar&context=default
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contactInfo": {
      "address": { "icon": "...", "title": "...", "value": "..." },
      "email": { "icon": "...", "title": "...", "value": "..." },
      "phone": { "icon": "...", "title": "...", "value": "..." }
    },
    "quickLinks": {
      "title": "...",
      "links": [...]
    },
    "menu": {
      "title": "...",
      "links": [...]
    },
    "contactUs": {
      "title": "...",
      "hours": [...]
    },
    "copyright": {
      "text": "...",
      "company": "...",
      "companyLink": "#"
    },
    "backgroundImage": "...",
    "decorativeImage": "..."
  },
  "locale": "en",
  "context": "default"
}
```

## Usage in Components

### Basic Usage
```jsx
import Footer1 from '@/app/Components/Footer/Footer1';

<Footer1 />
```

### With Locale
```jsx
<Footer1 locale="ar" />
```

### With Locale and Context
```jsx
<Footer1 locale="en" context="default" />
```

## Adding New Locales or Contexts

Edit the footer data in:
- **Next.js API Route**: `src/app/api/footer/route.js`
- **Express Server**: `server.js`

Add new entries to the `footerData` object:
```javascript
const footerData = {
  en: {
    default: { /* ... */ },
    special: { /* ... */ }  // New context
  },
  ar: {
    default: { /* ... */ }
  },
  fr: {  // New locale
    default: { /* ... */ }
  }
};
```

## Features

- ✅ Dynamic content loading
- ✅ Multi-language support (English, Arabic)
- ✅ Context-based content switching
- ✅ Fallback to default data on error
- ✅ Loading state handling
- ✅ No additional dependencies required (for API route)

## Future Enhancements

- Connect to a database for dynamic content management
- Add admin panel for footer content editing
- Support for more locales
- Image upload for background and decorative images

