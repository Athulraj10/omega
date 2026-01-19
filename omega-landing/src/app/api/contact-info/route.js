// API route for dynamic contact information

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Default contact information - can be moved to database or config
    const contactInfo = {
      en: {
        address: {
          title: "Our Address",
          value: "Abu Dhabi, UAE",
          icon: "/assets/img/icon/location_blue.png",
          description: "Visit our location for fresh seafood"
        },
        email: {
          title: "Email Us",
          value: "info@omegafoods.com",
          icon: "/assets/img/icon/gmail_blue.png",
          description: "Email us anytime for any kind of query about our premium seafood products."
        },
        phone: {
          title: "Call Us",
          value: "+971 55 545 1188",
          icon: "/assets/img/icon/phone_blue.png",
          description: "24/7/365 priority Live Chat and ticketing support for all your seafood needs."
        },
        hours: {
          title: "Opening Hours",
          value: "Monday – Friday: 8am – 4pm\nSaturday: 8am – 12pm\nSunday: Closed",
          icon: "/assets/img/icon/clock_blue.png",
          description: "Visit us during our business hours for the freshest seafood selection."
        },
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28821.965472924858!2d54.3773438!3d24.4538848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6716b5e6b5e5%3A0x4b4b4b4b4b4b4b4b!2sAbu%20Dhabi%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae",
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
          icon: "/assets/img/icon/location_blue.png",
          description: "زر موقعنا للحصول على المأكولات البحرية الطازجة"
        },
        email: {
          title: "راسلنا",
          value: "info@omegafoods.com",
          icon: "/assets/img/icon/gmail_blue.png",
          description: "راسلنا في أي وقت لأي نوع من الاستفسارات حول منتجاتنا البحرية المميزة."
        },
        phone: {
          title: "اتصل بنا",
          value: "+971 55 545 1188",
          icon: "/assets/img/icon/phone_blue.png",
          description: "دعم مباشر على مدار الساعة لجميع احتياجاتك من المأكولات البحرية."
        },
        hours: {
          title: "ساعات العمل",
          value: "الاثنين – الجمعة: 8 صباحاً – 4 مساءً\nالسبت: 8 صباحاً – 12 ظهراً\nالأحد: مغلق",
          icon: "/assets/img/icon/clock_blue.png",
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

    return Response.json({
      success: true,
      data: data,
      locale: locale
    });

  } catch (error) {
    console.error('Contact info API error:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch contact information',
        message: error.message
      },
      { status: 500 }
    );
  }
}

