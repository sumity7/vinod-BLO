import type { L } from "@/lib/i18n";

/**
 * Search-result titles and descriptions for the main pages. Each names the person first and says
 * what is on that page, so no two pages share a title. Everything stated here is already on the
 * page it describes. Titles are used as-is (no "| Name" suffix is added to them).
 */
type PageSeo = { title: L; description: L };

export const homeSeo: PageSeo = {
  title: {
    en: "Vinod Kumar Upadhyay | Block Pramukh, Harhua, Varanasi | Official Website",
    hi: "विनोद कुमार उपाध्याय | ब्लॉक प्रमुख, हरहुआ, वाराणसी | आधिकारिक वेबसाइट",
  },
  description: {
    en: "Official website of Vinod Kumar Upadhyay, Block Pramukh of Harhua Block, Varanasi (Shivpur Assembly Constituency): his journey, development work, social service, media and contact.",
    hi: "विनोद कुमार उपाध्याय, ब्लॉक प्रमुख, हरहुआ ब्लॉक, वाराणसी (शिवपुर विधानसभा क्षेत्र) की आधिकारिक वेबसाइट: उनकी यात्रा, विकास कार्य, सामाजिक सेवा, मीडिया और संपर्क।",
  },
};

export const pageSeo = {
  about: {
    title: {
      en: "Vinod Kumar Upadhyay | Biography & Political Journey",
      hi: "विनोद कुमार उपाध्याय | जीवन परिचय और राजनीतिक यात्रा",
    },
    description: {
      en: "Biography of Vinod Kumar Upadhyay, Block Pramukh of Harhua, Varanasi: his responsibilities, vision and political journey from booth level to Block Pramukh.",
      hi: "ब्लॉक प्रमुख, हरहुआ, वाराणसी विनोद कुमार उपाध्याय का जीवन परिचय: दायित्व, दृष्टि और बूथ स्तर से ब्लॉक प्रमुख तक की राजनीतिक यात्रा।",
    },
  },
  publicLife: {
    title: {
      en: "Vinod Kumar Upadhyay | Public Life, Development & Social Service",
      hi: "विनोद कुमार उपाध्याय | सार्वजनिक जीवन, विकास कार्य और सामाजिक सेवा",
    },
    description: {
      en: "Development work, social service, environmental campaigns and public interaction by Vinod Kumar Upadhyay in Harhua Block and Shivpur, Varanasi.",
      hi: "हरहुआ ब्लॉक और शिवपुर, वाराणसी में विनोद कुमार उपाध्याय के विकास कार्य, सामाजिक सेवा, पर्यावरण अभियान और जनसंपर्क।",
    },
  },
  media: {
    title: {
      en: "Vinod Kumar Upadhyay | Photos & Media",
      hi: "विनोद कुमार उपाध्याय | फ़ोटो और मीडिया",
    },
    description: {
      en: "Official photographs of Vinod Kumar Upadhyay: meetings, public programmes, relief work and community events. Videos and press coverage will be added as published.",
      hi: "विनोद कुमार उपाध्याय के आधिकारिक छायाचित्र: बैठकें, सार्वजनिक कार्यक्रम, राहत कार्य और सामुदायिक आयोजन। वीडियो और प्रेस कवरेज प्रकाशित होने पर जोड़े जाएँगे।",
    },
  },
  updates: {
    title: {
      en: "Vinod Kumar Upadhyay | Latest Updates",
      hi: "विनोद कुमार उपाध्याय | ताज़ा समाचार और गतिविधियाँ",
    },
    description: {
      en: "Latest updates on the public activity of Vinod Kumar Upadhyay, Block Pramukh of Harhua, Varanasi.",
      hi: "ब्लॉक प्रमुख, हरहुआ, वाराणसी विनोद कुमार उपाध्याय की सार्वजनिक गतिविधियों के ताज़ा समाचार।",
    },
  },
  contact: {
    title: {
      en: "Contact Vinod Kumar Upadhyay | Enquiries & Meetings",
      hi: "विनोद कुमार उपाध्याय से संपर्क | पूछताछ और भेंट",
    },
    description: {
      en: "Send an enquiry to Vinod Kumar Upadhyay: general enquiries, media requests, public programmes and meeting requests.",
      hi: "विनोद कुमार उपाध्याय को पूछताछ भेजें: सामान्य पूछताछ, मीडिया अनुरोध, सार्वजनिक कार्यक्रम और भेंट का अनुरोध।",
    },
  },
} satisfies Record<string, PageSeo>;
