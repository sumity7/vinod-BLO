import type { L } from "@/lib/i18n";

export type UpdateCategory =
  | "public-connect"
  | "public-activities"
  | "events"
  | "meetings"
  | "social-work"
  | "development"
  | "press"
  | "announcements";

export type UpdateImage = {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption?: L;
  /** CSS object-position for the cropped card view, e.g. "40% 50%". */
  position?: string;
};

export type Update = {
  slug: string;
  /** Shown first on the home page and in the Updates list, with a "Featured" tag. */
  featured?: boolean;
  category: UpdateCategory;
  /** ISO yyyy-mm-dd. Left out when the date is not known; nothing is guessed. */
  date?: string;
  title: L;
  summary: L;
  /** Fuller description shown as the lead on the detail page; the card uses `summary`. */
  description?: L;
  body: L[];
  location?: L;
  /** Primary photograph, used on cards and at the top of the article. */
  image?: UpdateImage;
  /** Photograph for the top of the Updates page, when it should differ from `image`. */
  heroImage?: UpdateImage;
  /** Further photographs shown after the article text. */
  gallery?: UpdateImage[];
  /** Id of a video in content/media.ts that belongs to this update. */
  videoId?: string;
};

export const updateCategories: Record<UpdateCategory, L> = {
  "public-connect": { en: "Public Connect", hi: "जनसंपर्क" },
  "public-activities": { en: "Public Activities", hi: "जन-गतिविधियाँ" },
  events: { en: "Events", hi: "कार्यक्रम" },
  meetings: { en: "Meetings", hi: "बैठकें" },
  "social-work": { en: "Social Work", hi: "सामाजिक कार्य" },
  development: { en: "Development", hi: "विकास" },
  press: { en: "Press", hi: "प्रेस" },
  announcements: { en: "Announcements", hi: "घोषणाएँ" },
};

/**
 * Add verified updates here. If this list is ever emptied, the Updates section is hidden from the
 * navigation, the home page and the sitemap, and the /updates page returns "not found".
 * Dates are left out where the source gives none; nothing is guessed.
 */
const rudra = (n: number, width: number, height: number, alt: L, caption?: L): UpdateImage => ({
  src: `/images/updates/sawan-rudrabhishek/rudrabhishek-${n}.webp`,
  width,
  height,
  alt,
  caption,
});

export const updates: Update[] = [
  {
    slug: "sawan-rudrabhishek-harhua-shiv-mandir",
    featured: true,
    category: "events",
    title: {
      en: "Rudrabhishek at Shiva temples across Harhua Block through the month of Sawan",
      hi: "सावन मास भर हरहुआ ब्लॉक के शिव मंदिरों में रुद्राभिषेक",
    },
    summary: {
      en: "Block Pramukh Shri Vinod Kumar Upadhyay had Rudrabhishek performed at ancient and prominent Shiva temples across Harhua Block, in Shivpur Assembly Constituency, throughout Sawan.",
      hi: "शिवपुर विधानसभा क्षेत्र के हरहुआ ब्लॉक अंतर्गत विभिन्न प्राचीन एवं प्रमुख शिव मंदिरों में ब्लॉक प्रमुख श्री विनोद कुमार उपाध्याय जी द्वारा पूरे सावन मास रुद्राभिषेक कराया गया।",
    },
    description: {
      en: "Through the holy month of Sawan, one village Shivalaya after another in Harhua Block echoed with Vedic chants. At each temple, Rudrabhishek was performed with the villagers, and Block Pramukh Shri Vinod Kumar Upadhyay himself offered abhishek to Bhagwan Bholenath.",
      hi: "पवित्र सावन मास भर हरहुआ ब्लॉक के गाँव-गाँव के शिवालय एक के बाद एक वैदिक मंत्रों से गूँजते रहे। हर मंदिर में ग्रामवासियों के साथ रुद्राभिषेक हुआ, और ब्लॉक प्रमुख श्री विनोद कुमार उपाध्याय जी ने स्वयं भगवान भोलेनाथ का अभिषेक किया।",
    },
    location: {
      en: "Harhua Block, Shivpur Assembly, Varanasi",
      hi: "हरहुआ ब्लॉक, शिवपुर विधानसभा, वाराणसी",
    },
    body: [
      {
        en: "Throughout the month of Sawan, Shri Vinod Kumar Upadhyay, Block Pramukh, had Rudrabhishek performed at the ancient and prominent Shiva temples of Harhua Block in the Shivpur Assembly Constituency.",
        hi: "शिवपुर विधानसभा क्षेत्र के हरहुआ ब्लॉक अंतर्गत विभिन्न प्राचीन एवं प्रमुख शिव मंदिरों में श्री विनोद कुमार उपाध्याय जी, ब्लॉक प्रमुख के द्वारा पूरे सावन मास रुद्राभिषेक कराया गया।",
      },
      {
        en: "The Rudrabhishek was held at the Shivalayas of Jhanjhupur, Gangapur, Jayrampur, Kapildhara, Soyepur New Colony and Goithaha, among others in the area.",
        hi: "ग्राम झांझूपुर, गंगापुर, जयरामपुर, कपिलधारा, सोयेपुर न्यू कॉलोनी एवं गोईठहाँ सहित क्षेत्र के विभिन्न शिवालयों में रुद्राभिषेक सम्पन्न हुआ।",
      },
      {
        en: "Sawan is the month dearest to Bhagwan Shiva. Rudrabhishek is the abhishek of the Shivling with water, milk and other offerings while the mantras of the Rudri are recited, and it is performed as a prayer for the welfare of all.",
        hi: "सावन भगवान शिव का सबसे प्रिय मास है। रुद्री के मंत्रों के पाठ के साथ जल, दूध एवं अन्य पूजन सामग्री से शिवलिंग का अभिषेक ही रुद्राभिषेक है, जो सबके कल्याण की कामना से किया जाता है।",
      },
      {
        en: "At every temple the acharyas performed the abhishek with Vedic chanting, and the Shivling was adorned with bel leaves and flowers. Fruits and laddoos were offered as prasad. Men, women and children of the village gathered in the temple halls with folded hands, and at some places the puja and aarti went on into the evening.",
        hi: "हर मंदिर में आचार्यों ने वैदिक मंत्रोच्चार के साथ अभिषेक कराया, और शिवलिंग को बेलपत्र एवं पुष्पों से सजाया गया। प्रसाद में फल और लड्डू अर्पित किए गए। गाँव के पुरुष, महिलाएँ और बच्चे हाथ जोड़े मंदिर के सभा-कक्षों में एकत्र हुए, और कई स्थानों पर पूजा एवं आरती देर शाम तक चलती रही।",
      },
      {
        en: "The ancient Shivalayas of our villages are not only places of worship; they are where the village gathers and where its traditions live on. Holding the Rudrabhishek at temples across the block brought every village into the month-long worship.",
        hi: "हमारे गाँवों के प्राचीन शिवालय केवल पूजा के स्थान नहीं हैं; यहीं गाँव एकत्र होता है और यहीं उसकी परंपराएँ जीवित रहती हैं। ब्लॉक भर के मंदिरों में रुद्राभिषेक कराकर हर गाँव को पूरे मास की इस उपासना से जोड़ा गया।",
      },
      {
        en: "With every abhishek, Bhagwan Bholenath was prayed to for the happiness, prosperity and good health of every family of the area, and for the progress of Harhua Block.",
        hi: "हर अभिषेक के साथ भगवान भोलेनाथ से क्षेत्र के हर परिवार के सुख, समृद्धि और उत्तम स्वास्थ्य, तथा हरहुआ ब्लॉक की उन्नति की कामना की गई।",
      },
      {
        en: "Heartfelt thanks to the acharyas, the temple committees and all the villagers and colleagues who joined the Rudrabhishek. Har Har Mahadev!",
        hi: "रुद्राभिषेक में सहभागी सभी आचार्यों, मंदिर समितियों, ग्रामवासियों एवं साथियों का हृदय से आभार। हर हर महादेव!",
      },
    ],
    image: {
      src: "/images/updates/sawan-rudrabhishek/rudrabhishek-cover.webp",
      width: 1086,
      height: 1448,
      position: "40% 20%",
      alt: {
        en: "A man pouring milk over a Shivling inside a temple sanctum during Rudrabhishek",
        hi: "रुद्राभिषेक के दौरान मंदिर के गर्भगृह में शिवलिंग पर दूध चढ़ाते हुए एक व्यक्ति",
      },
      caption: { en: "Abhishek of the Shivling with milk", hi: "शिवलिंग का दुग्धाभिषेक" },
    },
    gallery: [
      rudra(1, 1599, 1066, {
        en: "Villagers and devotees with folded hands inside a Shiva temple hall during the Sawan Rudrabhishek",
        hi: "सावन रुद्राभिषेक के दौरान शिव मंदिर के सभा-कक्ष में हाथ जोड़े खड़े ग्रामीण एवं श्रद्धालु",
      }, { en: "Villagers at the Rudrabhishek", hi: "रुद्राभिषेक में सम्मिलित ग्रामवासी" }),
      rudra(3, 853, 1280, {
        en: "A Shivling bathed in milk and decorated with bel leaves and flowers during Rudrabhishek",
        hi: "रुद्राभिषेक के दौरान दूध से अभिषिक्त, बेलपत्र एवं पुष्पों से सुसज्जित शिवलिंग",
      }, { en: "The Shivling adorned with bel leaves and flowers", hi: "बेलपत्र एवं पुष्पों से सुसज्जित शिवलिंग" }),
      rudra(2, 886, 1180, {
        en: "A priest performing Rudrabhishek at a Shivling decorated with flowers",
        hi: "पुष्पों से सजे शिवलिंग पर रुद्राभिषेक कराते आचार्य",
      }, { en: "Abhishek with Vedic chanting", hi: "वैदिक मंत्रोच्चार के साथ अभिषेक" }),
      rudra(5, 1599, 1066, {
        en: "Devotees and priests gathered at a Shiva temple for Rudrabhishek",
        hi: "रुद्राभिषेक के लिए शिव मंदिर में एकत्र श्रद्धालु एवं आचार्यगण",
      }, { en: "Devotees and acharyas at the temple", hi: "मंदिर में एकत्र श्रद्धालु एवं आचार्यगण" }),
      rudra(6, 853, 1280, {
        en: "A man offering prayers with folded hands inside a Shiva shrine",
        hi: "शिव मंदिर के भीतर हाथ जोड़कर पूजा करते हुए",
      }, { en: "Prayers in the sanctum", hi: "गर्भगृह में पूजन" }),
      rudra(7, 1280, 853, {
        en: "Puja and aarti at a Shivling in an open-air temple courtyard",
        hi: "खुले प्रांगण वाले शिव मंदिर में शिवलिंग पर पूजा एवं आरती",
      }, { en: "Evening puja and aarti in the temple courtyard", hi: "मंदिर प्रांगण में संध्या पूजन एवं आरती" }),
    ],
  },
  {
    slug: "raksha-bandhan-sisters-harhua",
    category: "events",
    title: {
      en: "Raksha Bandhan: a sister’s affection, a brother’s promise",
      hi: "रक्षाबंधन: बहनों का स्नेह, भाई का वचन",
    },
    summary: {
      en: "On Raksha Bandhan, as every year, more than 10,000 sisters tied rakhi and received gifts.",
      hi: "रक्षाबंधन के पावन अवसर पर प्रतिवर्ष की भाँति 10,000 से अधिक बहनों से रक्षाबंधन बँधवाकर उन्हें उपहार भेंट किए।",
    },
    description: {
      en: "Every year on Raksha Bandhan, sisters from the villages of Harhua Block come together under one roof. This year too, more than 10,000 sisters tied rakhi to Block Pramukh Shri Vinod Kumar Upadhyay and blessed him, and each of them received a gift and the promise of a brother.",
      hi: "हर वर्ष रक्षाबंधन पर हरहुआ ब्लॉक के गाँव-गाँव से बहनें एक छत के नीचे जुटती हैं। इस वर्ष भी 10,000 से अधिक बहनों ने ब्लॉक प्रमुख श्री विनोद कुमार उपाध्याय जी को राखी बाँधकर आशीर्वाद दिया, और हर बहन को उपहार के साथ भाई का वचन मिला।",
    },
    location: {
      en: "Harhua Block, Varanasi",
      hi: "हरहुआ ब्लॉक, वाराणसी",
    },
    body: [
      {
        en: "In the spirit of Vasudhaiva Kutumbakam and on the great festival of a brother and sister’s love, affection and respect, greetings were offered to everyone on Raksha Bandhan.",
        hi: "वसुधैव कुटुम्बकम के भाव एवं भाई-बहन के प्रेम, स्नेह और सम्मान के महापर्व रक्षाबंधन पर सभी को हार्दिक बधाई एवं शुभकामनाएँ दी गईं।",
      },
      {
        en: "On the occasion of Raksha Bandhan, as every year, more than 10,000 sisters tied rakhi and received gifts.",
        hi: "रक्षाबंधन के पावन अवसर पर प्रतिवर्ष की भाँति 10,000 से अधिक बहनों से रक्षाबंधन बँधवाकर उन्हें उपहार भेंट किए।",
      },
      {
        en: "The large pandal was full long before the programme began. Sisters came from the villages of the block with their children and the elderly mothers of their homes, and one after another they applied tilak, tied rakhi and placed marigold garlands, until rakhis covered the wrist and the garlands could no longer be counted.",
        hi: "कार्यक्रम शुरू होने से बहुत पहले ही विशाल पंडाल भर चुका था। ब्लॉक के गाँव-गाँव से बहनें अपने बच्चों और घर की बुज़ुर्ग माताओं के साथ पहुँचीं, और एक के बाद एक तिलक लगाकर राखी बाँधी और गेंदे की मालाएँ पहनाईं, यहाँ तक कि कलाई राखियों से भर गई और मालाओं की गिनती न रही।",
      },
      {
        en: "Raksha Bandhan is the promise of protection. For a public representative, every sister of the area is family, and that promise means standing by her in every difficulty, and working for her safety, her dignity and her self-reliance.",
        hi: "रक्षाबंधन रक्षा का वचन है। एक जनप्रतिनिधि के लिए क्षेत्र की हर बहन परिवार है, और यह वचन हर सुख-दुख में उसके साथ खड़े रहने, और उसकी सुरक्षा, सम्मान व स्वावलंबन के लिए कार्य करने का संकल्प है।",
      },
      {
        en: "The same spirit runs through the work for women of the Central and State governments, from Mission Shakti and the women’s help desks at police stations to Ujjwala gas connections and homes registered in women’s names under PM Awas. Any sister who needs help with these schemes, or with any other problem, can reach the Block Pramukh’s office.",
        hi: "यही भाव केंद्र और प्रदेश सरकार के महिलाओं से जुड़े कार्यों में भी है, मिशन शक्ति और थानों की महिला हेल्प डेस्क से लेकर उज्ज्वला गैस कनेक्शन और पीएम आवास में महिलाओं के नाम पक्के घर तक। किसी भी बहन को इन योजनाओं में या किसी अन्य समस्या में सहायता चाहिए, तो वह ब्लॉक प्रमुख कार्यालय से संपर्क कर सकती है।",
      },
      {
        en: "Heartfelt thanks to every sister who came to give her blessings, and to all the colleagues and workers whose effort made the programme possible.",
        hi: "आशीर्वाद देने पहुँचीं सभी बहनों का, और कार्यक्रम को सफल बनाने वाले सभी साथियों एवं कार्यकर्ताओं का हृदय से आभार।",
      },
    ],
    image: {
      src: "/images/media/raksha-bandhan-4.webp",
      width: 1600,
      height: 1066,
      alt: {
        en: "Guests standing on the stage in front of the Raksha Bandhan greeting banner, with women seated on the right",
        hi: "रक्षाबंधन शुभकामना बैनर के सामने मंच पर खड़े अतिथि, दाईं ओर बैठी महिलाएँ",
      },
      caption: { en: "Guests on the stage of the Raksha Bandhan programme", hi: "रक्षाबंधन कार्यक्रम के मंच पर अतिथिगण" },
    },
    gallery: [
      {
        src: "/images/media/raksha-bandhan.webp",
        width: 1620,
        height: 1080,
        alt: {
          en: "A man in a marigold garland surrounded by women tying rakhis on Raksha Bandhan",
          hi: "गेंदे की माला पहने एक व्यक्ति, रक्षाबंधन पर राखी बाँधती बहनों के बीच",
        },
        caption: { en: "Sisters tying rakhi, one after another", hi: "एक के बाद एक राखी बाँधती बहनें" },
      },
      {
        src: "/images/media/raksha-bandhan-2.webp",
        width: 1180,
        height: 786,
        alt: {
          en: "A man in a marigold garland among a large gathering of women and children at a Raksha Bandhan programme",
          hi: "रक्षाबंधन कार्यक्रम में महिलाओं एवं बच्चों की बड़ी उपस्थिति के बीच गेंदे की माला पहने एक व्यक्ति",
        },
        caption: { en: "Blessings and garlands from the sisters of the block", hi: "ब्लॉक की बहनों का आशीर्वाद और स्नेह" },
      },
      {
        src: "/images/media/raksha-bandhan-3.webp",
        width: 1600,
        height: 1066,
        alt: {
          en: "A man speaking at a podium marked “Nasha Mukt Yuva for Viksit Bharat” on a decorated stage",
          hi: "सजे हुए मंच पर “नशा मुक्त युवा फॉर विकसित भारत” लिखे डायस से बोलते हुए एक व्यक्ति",
        },
      },
    ],
  },
];

/**
 * Featured updates first, then newest first. Updates without a date keep their
 * listed order after the dated ones.
 */
export const publishedUpdates = () =>
  [...updates].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      (b.date ?? "").localeCompare(a.date ?? ""),
  );
