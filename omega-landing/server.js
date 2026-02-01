// Custom server.js file for footer data
// This can be used if you want to run a separate Express server
// Otherwise, use the Next.js API route at /api/footer

const express = require('express');
const cors = require('cors');
// Use built-in fetch (Node.js 18+ has fetch built-in)
// For older Node versions, install node-fetch: npm install node-fetch@2
let fetch;
try {
  // Try to use built-in fetch (Node.js 18+)
  fetch = globalThis.fetch;
  if (!fetch) {
    // Fallback to node-fetch for older Node versions
    fetch = require('node-fetch');
  }
} catch (e) {
  console.warn('Fetch not available. Please use Node.js 18+ or install node-fetch');
  throw new Error('Fetch is required. Please use Node.js 18+ or install node-fetch');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Static seafood categories data (acts as data source when there's no backend)
const seafoodCategories = [
  {
    id: 1,
    name: "Fresh Fish",
    slug: "fresh-fish",
    isMainCategory: true,
    description: "Premium fresh fish selection"
  },
  {
    id: 2,
    name: "Shrimp & Prawns",
    slug: "shrimp-prawns",
    isMainCategory: true,
    description: "Fresh shrimp and prawns"
  },
  {
    id: 3,
    name: "Crab & Lobster",
    slug: "crab-lobster",
    isMainCategory: true,
    description: "Premium crab and lobster"
  },
  {
    id: 4,
    name: "Shellfish",
    slug: "shellfish",
    isMainCategory: true,
    description: "Fresh shellfish varieties"
  },
  {
    id: 5,
    name: "Squid & Octopus",
    slug: "squid-octopus",
    isMainCategory: true,
    description: "Fresh squid and octopus"
  },
  {
    id: 6,
    name: "Frozen Seafood",
    slug: "frozen-seafood",
    isMainCategory: true,
    description: "Premium frozen seafood products"
  },
  {
    id: 7,
    name: "Smoked Fish",
    slug: "smoked-fish",
    isMainCategory: true,
    description: "Delicious smoked fish varieties"
  },
  {
    id: 8,
    name: "Seafood Products",
    slug: "seafood-products",
    isMainCategory: true,
    description: "Processed seafood products"
  }
];

// Function to get categories from static data
const getCategories = () => {
  try {
    // Transform categories into menu links format
    return seafoodCategories.map(cat => ({
      href: `/shop?category=${cat.slug}`,
      text: cat.name,
      icon: "bi bi-chevron-double-right"
    }));
  } catch (error) {
    console.error('Error getting categories:', error);
    // Return default categories if there's an error
    return [
      { href: "/shop", text: "Fresh Fish", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Shrimp & Prawns", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Crab & Lobster", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Shellfish", icon: "bi bi-chevron-double-right" }
    ];
  }
};

// Default footer data - can be moved to a database or external config
const getDefaultFooterData = () => ({
  en: {
    default: {
      contactInfo: {
        address: {
          icon: "bi bi-geo-alt-fill",
          title: "address",
          value: "Abu Dhabi, UAE"
        },
        email: {
          icon: "bi bi-envelope-fill",
          title: "send email",
          value: "info@omegafoods.com"
        },
        phone: {
          icon: "bi bi-telephone-fill",
          title: "call",
          value: "+971 55 545 1188"
        }
      },
      quickLinks: {
        title: "Quick Links",
        links: [
          { href: "/about", text: "About Us", icon: "bi bi-chevron-double-right" },
          { href: "/faq", text: "FAQ'S", icon: "bi bi-chevron-double-right" },
          { href: "/contact", text: "Contact Us", icon: "bi bi-chevron-double-right" }
        ]
      },
      menu: {
        title: "Our Menu",
        links: [
          // Will be populated from static data
        ]
      },
      contactUs: {
        title: "Contact Us",
        hours: [
          { day: "24 Hours", time: "24 Hours" }
        ]
      },
      copyright: {
        text: "© All Copyright 2024 by",
        company: "Omega Foods",
        companyLink: "#"
      },
      backgroundImage: "/assets/img/footer/footer.png",
      decorativeImage: "/assets/img/footer/mussels.png"
    }
  },
  ar: {
    default: {
      contactInfo: {
        address: {
          icon: "bi bi-geo-alt-fill",
          title: "العنوان",
          value: "أبو ظبي، الإمارات العربية المتحدة"
        },
        email: {
          icon: "bi bi-envelope-fill",
          title: "إرسال بريد إلكتروني",
          value: "info@omegafoods.com"
        },
        phone: {
          icon: "bi bi-telephone-fill",
          title: "اتصل",
          value: "+971 55 545 1188"
        }
      },
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { href: "/about", text: "من نحن", icon: "bi bi-chevron-double-right" },
          { href: "/faq", text: "الأسئلة الشائعة", icon: "bi bi-chevron-double-right" },
          { href: "/contact", text: "اتصل بنا", icon: "bi bi-chevron-double-right" }
        ]
      },
      menu: {
        title: "قائمتنا",
        links: [
          // Will be populated from static data
        ]
      },
      contactUs: {
        title: "اتصل بنا",
        hours: [
          { day: "الاثنين – الجمعة", time: "8 صباحاً – 4 مساءً" },
          { day: "السبت", time: "8 صباحاً – 12 ظهراً" }
        ]
      },
      copyright: {
        text: "© جميع الحقوق محفوظة 2024 لـ",
        company: "أوميغا فودز",
        companyLink: "#"
      },
      backgroundImage: "/assets/img/footer/footer.png",
      decorativeImage: "/assets/img/footer/mussels.png"
    }
  }
};

// Footer API endpoint
app.get('/api/footer', async (req, res) => {
  try {
    const { locale = 'en', context = 'default' } = req.query;
    
    // Get base footer data
    const baseData = getDefaultFooterData();
    const localeData = baseData[locale]?.[context] || baseData.en.default;
    
    // Get categories from static data
    const menuLinks = getCategories();
    
    // Merge dynamic menu data
    const data = {
      ...localeData,
      menu: {
        ...localeData.menu,
        links: menuLinks
      }
    };

    res.json({
      success: true,
      data: data,
      locale: locale,
      context: context
    });
  } catch (error) {
    console.error('Footer API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch footer data',
      message: error.message
    });
  }
});

// Contact info API endpoint
app.get('/api/contact-info', (req, res) => {
  try {
    const { locale = 'en' } = req.query;

    // Default contact information - can be moved to database or config
    const contactInfo = {
      en: {
        address: {
          title: "Our Address",
          value: "Abu Dhabi, UAE",
          icon: "/assets/img/icon/location.png",
          description: "Visit our location for fresh seafood"
        },
        email: {
          title: "Email Us",
          value: "info@omegafoods.com",
          icon: "/assets/img/icon/gmail.png",
          description: "Email us anytime for any kind of query about our premium seafood products."
        },
        phone: {
          title: "Call Us",
          value: "+971 55 545 1188",
          icon: "/assets/img/icon/phone.png",
          description: "24/7/365 priority Live Chat and ticketing support for all your seafood needs."
        },
        hours: {
          title: "Opening Hours",
          value: "Monday – Friday: 8am – 4pm\nSaturday: 8am – 12pm\nSunday: Closed",
          icon: "/assets/img/icon/clock.png",
          description: "Visit us during our business hours for the freshest seafood selection."
        },
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28821.965472924858!2d54.3773438!3d24.4538848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6716b5e6b5e5%3A0x4b4b4b4b4b4b4b!2sAbu%20Dhabi%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae",
        formTitle: "Get in Touch",
        formDescription: "Have questions about our premium seafood products? We're here to help!",
        subjectOptions: [
          { value: "product-inquiry", label: "Product Inquiry" },
          { value: "order-status", label: "Order Status" },
          { value: "wholesale", label: "Wholesale Inquiry" },
          { value: "custom-order", label: "Custom Order Request" },
          { value: "complaint", label: "Complaint" },
          { value: "feedback", label: "Feedback" },
          { value: "other", label: "Other" }
        ],
        termsText: "I agree to the terms and conditions and privacy policy"
      },
      ar: {
        address: {
          title: "عنواننا",
          value: "أبو ظبي، الإمارات العربية المتحدة",
          icon: "/assets/img/icon/location.png",
          description: "زر موقعنا للحصول على المأكولات البحرية الطازجة"
        },
        email: {
          title: "راسلنا",
          value: "info@omegafoods.com",
          icon: "/assets/img/icon/gmail.png",
          description: "راسلنا في أي وقت لأي نوع من الاستفسارات حول منتجاتنا البحرية المميزة."
        },
        phone: {
          title: "اتصل بنا",
          value: "+971 55 545 1188",
          icon: "/assets/img/icon/phone.png",
          description: "دعم مباشر على مدار الساعة لجميع احتياجاتك من المأكولات البحرية."
        },
        hours: {
          title: "ساعات العمل",
          value: "الاثنين – الجمعة: 8 صباحاً – 4 مساءً\nالسبت: 8 صباحاً – 12 ظهراً\nالأحد: مغلق",
          icon: "/assets/img/icon/clock.png",
          description: "زرنا خلال ساعات العمل للحصول على أفضل تشكيلة من المأكولات البحرية."
        },
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28821.965472924858!2d54.3773438!3d24.4538848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6716b5e6b5e5%3A0x4b4b4b4b4b4b4b!2sAbu%20Dhabi%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae",
        formTitle: "تواصل معنا",
        formDescription: "هل لديك أسئلة حول منتجاتنا البحرية المميزة؟ نحن هنا للمساعدة!",
        subjectOptions: [
          { value: "product-inquiry", label: "استفسار عن المنتج" },
          { value: "order-status", label: "حالة الطلب" },
          { value: "wholesale", label: "استفسار بالجملة" },
          { value: "custom-order", label: "طلب مخصص" },
          { value: "complaint", label: "شكوى" },
          { value: "feedback", label: "ملاحظات" },
          { value: "other", label: "أخرى" }
        ],
        termsText: "أوافق على الشروط والأحكام وسياسة الخصوصية"
      }
    };

    const data = contactInfo[locale] || contactInfo.en;

    res.json({
      success: true,
      data: data,
      locale: locale
    });

  } catch (error) {
    console.error('Contact info API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact information',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'footer-api' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Footer API server running on http://localhost:${PORT}`);
    console.log(`Footer endpoint: http://localhost:${PORT}/api/footer`);
  });
}

module.exports = app;

