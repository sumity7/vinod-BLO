import type { L } from "@/lib/i18n";

export type MediaCategory = "photo" | "video" | "speech" | "press" | "document";

export type MediaItem = {
  id: string;
  category: MediaCategory;
  /** Image, or the poster frame for a video. */
  src: string;
  width: number;
  height: number;
  alt: L;
  /** Short line for cards and captions. */
  caption: L;
  /** Full title, used for videos. */
  title?: L;
  topic?: L;
  description?: L;
  video?: { src: string; type: string };
  date?: L;
  event?: L;
  location?: L;
  featured?: boolean;
  /** Photographs of meetings, shown together in the Meetings & Interactions section. */
  group?: "meeting";
  tone?: "saffron" | "sand";
};

export const mediaCategories: { id: MediaCategory; label: L }[] = [
  { id: "photo", label: { en: "Photos", hi: "चित्र" } },
  { id: "video", label: { en: "Videos", hi: "वीडियो" } },
  { id: "speech", label: { en: "Speeches", hi: "भाषण" } },
  { id: "press", label: { en: "Press", hi: "प्रेस" } },
  { id: "document", label: { en: "Documents", hi: "दस्तावेज़" } },
];

/**
 * Add event photographs, videos and press items here as they are supplied. The biodata and the
 * photos supplied with it carry no dates or locations, so none are shown. While no item has a
 * `video`, the Videos filter and the featured-video section stay hidden.
 */
export const media: MediaItem[] = [
  {
    id: "meeting-pm-modi",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/pm-modi.webp",
    width: 1089,
    height: 1800,
    alt: {
      en: "Vinod Kumar Upadhyay greeting Prime Minister Shri Narendra Modi with folded hands",
      hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी का हाथ जोड़कर अभिवादन करते हुए विनोद कुमार उपाध्याय",
    },
    caption: {
      en: "With Prime Minister Shri Narendra Modi",
      hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी के साथ",
    },
    title: {
      en: "With senior leadership",
      hi: "वरिष्ठ नेतृत्व के साथ",
    },
    description: {
      en: "With Prime Minister Shri Narendra Modi.",
      hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी के साथ।",
    },
    tone: "sand",
  },
  {
    id: "meeting-deputy-cm",
    category: "photo",
    group: "meeting",
    src: "/images/updates/keshav-prasad-maurya-meeting.webp",
    width: 1066,
    height: 1280,
    alt: {
      en: "Deputy Chief Minister Shri Keshav Prasad Maurya, wearing a golden shawl, receiving a memento during the meeting",
      hi: "बैठक के दौरान सुनहरा अंगवस्त्र धारण किए उपमुख्यमंत्री श्री केशव प्रसाद मौर्य जी स्मृति-चिह्न ग्रहण करते हुए",
    },
    caption: {
      en: "With Deputy Chief Minister Shri Keshav Prasad Maurya",
      hi: "उपमुख्यमंत्री श्री केशव प्रसाद मौर्य जी के साथ",
    },
    title: {
      en: "Meeting with the Deputy Chief Minister",
      hi: "उपमुख्यमंत्री से भेंट",
    },
    description: {
      en: "A cordial meeting with Shri Keshav Prasad Maurya Ji, Hon’ble Deputy Chief Minister of Uttar Pradesh, with meaningful discussion on social and public-interest matters. His guidance and affection are always an inspiration.",
      hi: "उत्तर प्रदेश के माननीय उपमुख्यमंत्री श्री केशव प्रसाद मौर्य जी से आत्मीय भेंट कर विभिन्न सामाजिक एवं जनहित के विषयों पर सार्थक चर्चा का अवसर प्राप्त हुआ। उनका मार्गदर्शन एवं स्नेह सदैव प्रेरणादायी है।",
    },
    tone: "sand",
  },
  {
    id: "meeting-public-programme",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/public-programme.webp",
    width: 853,
    height: 1280,
    alt: {
      en: "Vinod Kumar Upadhyay addressing a public programme, microphone in hand",
      hi: "सार्वजनिक कार्यक्रम में माइक हाथ में लेकर संबोधित करते हुए विनोद कुमार उपाध्याय",
    },
    caption: { en: "Addressing a public programme", hi: "सार्वजनिक कार्यक्रम को संबोधित करते हुए" },
    title: { en: "Public programme", hi: "सार्वजनिक कार्यक्रम" },
    description: { en: "Addressing the gathering.", hi: "जनसमूह को संबोधित करते हुए।" },
    tone: "sand",
  },
  {
    id: "meeting-religious-1",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/religious-event-1.webp",
    width: 1055,
    height: 886,
    alt: {
      en: "Vinod Kumar Upadhyay presenting a book to a seated guest at a religious and cultural programme",
      hi: "धार्मिक-सांस्कृतिक कार्यक्रम में मंच पर बैठे अतिथि को पुस्तक भेंट करते हुए विनोद कुमार उपाध्याय",
    },
    caption: { en: "Religious and cultural event", hi: "धार्मिक-सांस्कृतिक आयोजन" },
    title: { en: "Religious and cultural event", hi: "धार्मिक-सांस्कृतिक आयोजन" },
    tone: "sand",
  },
  {
    id: "meeting-religious-2",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/religious-event-2.webp",
    width: 867,
    height: 654,
    alt: {
      en: "Vinod Kumar Upadhyay greeting a seated guest on the stage of a religious and cultural event",
      hi: "धार्मिक-सांस्कृतिक आयोजन के मंच पर बैठे अतिथि का अभिवादन करते हुए विनोद कुमार उपाध्याय",
    },
    caption: { en: "Religious and cultural event", hi: "धार्मिक-सांस्कृतिक आयोजन" },
    title: { en: "Religious and cultural event", hi: "धार्मिक-सांस्कृतिक आयोजन" },
    tone: "sand",
  },
  {
    id: "relief-distribution",
    category: "photo",
    src: "/images/media/relief-distribution.webp",
    width: 1587,
    height: 991,
    alt: {
      en: "Vinod Kumar Upadhyay handing a packet of supplies to a man on a village road, with others around",
      hi: "गाँव की सड़क पर एक व्यक्ति को सामग्री का पैकेट सौंपते हुए विनोद कुमार उपाध्याय, आसपास अन्य लोग",
    },
    caption: { en: "Distributing supplies to people in need", hi: "ज़रूरतमंदों को सामग्री वितरण" },
    tone: "sand",
  },
  {
    id: "marriage-assistance",
    category: "photo",
    src: "/images/media/marriage-assistance.webp",
    width: 1440,
    height: 1440,
    alt: {
      en: "Vinod Kumar Upadhyay presenting a gift basket to brides seated at a wedding-assistance event",
      hi: "विवाह सहायता कार्यक्रम में बैठी वधुओं को उपहार की टोकरी भेंट करते हुए विनोद कुमार उपाध्याय",
    },
    caption: { en: "Marriage assistance", hi: "विवाह सहायता" },
    tone: "sand",
  },
  {
    id: "raksha-bandhan",
    category: "photo",
    src: "/images/media/raksha-bandhan.webp",
    width: 1620,
    height: 1080,
    alt: {
      en: "Vinod Kumar Upadhyay in a marigold garland, surrounded by women tying rakhis on Raksha Bandhan",
      hi: "गेंदे की माला पहने विनोद कुमार उपाध्याय, रक्षाबंधन पर राखी बाँधती बहनों के बीच",
    },
    caption: { en: "With sisters on Raksha Bandhan", hi: "रक्षाबंधन पर बहनों के साथ" },
    tone: "sand",
  },
  {
    id: "raksha-bandhan-2",
    category: "photo",
    src: "/images/media/raksha-bandhan-2.webp",
    width: 1180,
    height: 786,
    alt: {
      en: "A man in a marigold garland among a large gathering of women and children at a Raksha Bandhan programme",
      hi: "रक्षाबंधन कार्यक्रम में महिलाओं एवं बच्चों की बड़ी उपस्थिति के बीच गेंदे की माला पहने एक व्यक्ति",
    },
    caption: { en: "Raksha Bandhan programme", hi: "रक्षाबंधन कार्यक्रम" },
    tone: "sand",
  },
  {
    id: "raksha-bandhan-3",
    category: "photo",
    src: "/images/media/raksha-bandhan-3.webp",
    width: 1600,
    height: 1066,
    alt: {
      en: "A man speaking at a podium marked “Nasha Mukt Yuva for Viksit Bharat” on a decorated stage",
      hi: "सजे हुए मंच पर “नशा मुक्त युवा फॉर विकसित भारत” लिखे डायस से बोलते हुए एक व्यक्ति",
    },
    caption: { en: "Addressing the gathering", hi: "सभा को संबोधित करते हुए" },
    tone: "sand",
  },
  {
    id: "raksha-bandhan-4",
    category: "photo",
    src: "/images/media/raksha-bandhan-4.webp",
    width: 1600,
    height: 1066,
    alt: {
      en: "Guests standing on the stage in front of the Raksha Bandhan greeting banner, with women seated on the right",
      hi: "रक्षाबंधन शुभकामना बैनर के सामने मंच पर खड़े अतिथि, दाईं ओर बैठी महिलाएँ",
    },
    caption: { en: "Raksha Bandhan programme", hi: "रक्षाबंधन कार्यक्रम" },
    tone: "sand",
  },
  {
    id: "portrait-official",
    category: "photo",
    src: "/images/leader-portrait-saffron.webp",
    width: 1186,
    height: 1326,
    alt: {
      en: "Portrait of Vinod Kumar Upadhyay, seated, in a white shirt, against a saffron backdrop",
      hi: "केसरिया पृष्ठभूमि के सामने सफ़ेद कमीज़ में बैठे विनोद कुमार उपाध्याय का चित्र",
    },
    caption: { en: "Official portrait", hi: "आधिकारिक चित्र" },
    tone: "saffron",
  },
  {
    id: "portrait-glasses",
    category: "photo",
    src: "/images/about-portrait.webp",
    width: 1250,
    height: 1500,
    alt: {
      en: "Portrait of Vinod Kumar Upadhyay in glasses and a checked shirt",
      hi: "चश्मा और चारखाने की कमीज़ में विनोद कुमार उपाध्याय का चित्र",
    },
    caption: { en: "Vinod Kumar Upadhyay", hi: "विनोद कुमार उपाध्याय" },
    tone: "sand",
  },
];

export const featuredVideo = () => media.find((m) => m.video && m.featured);

export const meetingPhotos = () => media.filter((m) => m.group === "meeting");
