import { getCategoryMenuLinks } from '@/data/seafoodCategories';

const getCategories = () => {
  try {
    return getCategoryMenuLinks();
  } catch (error) {
    console.error('Error getting categories:', error);
    return [
      { href: "/shop", text: "Fresh Fish", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Shrimp & Prawns", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Crab & Lobster", icon: "bi bi-chevron-double-right" },
      { href: "/shop", text: "Shellfish", icon: "bi bi-chevron-double-right" }
    ];
  }
};

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
        ]
      },
      contactUs: {
        title: "Contact Us",
        hours: [
          { day: "Monday – Friday", time: "8am – 4pm" },
          { day: "Saturday", time: "8am – 12am" }
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
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const context = searchParams.get('context') || 'default';

    const baseData = getDefaultFooterData();
    const localeData   = baseData[locale]?.[context] || baseData.en.default;
    
    const menuLinks = getCategories();
    
    const data = {
      ...localeData,
      menu: {
        ...localeData.menu,
        links: menuLinks
      }
    };

    return Response.json({
      success: true,
      data: data,
      locale: locale,
      context: context
    });
  } catch (error) {
    console.error('Footer API Error:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch footer data',
        message: error.message
      },
      { status: 500 }
    );
  }
}
