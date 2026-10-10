import type { L } from "@/lib/i18n";

/**
 * The two slides of the Home hero. Everything the slider shows lives here; nothing else on the
 * site reads this file. Links are existing routes (without the language prefix). Each photograph
 * fills the right-hand side of the hero and fades into the page colour on its left edge.
 */
export type HeroSlide = {
  id: string;
  number: string;
  eyebrow: L;
  label: L;
  title: { en: string[]; hi: string[] };
  subtitle?: L;
  description: L;
  snapshot: { title: L; rows: { k: L; v: L }[] };
  primary: { label: L; href: string };
  secondary: { label: L; href: string };
  /** When set, shown instead of the shared Contact button on this slide only. */
  secondaryButton?: { label: L; href: string };
  person: {
    src: string;
    width: number;
    height: number;
    alt: L;
    /** CSS object-position, so the face stays in frame whatever the screen shape. */
    position: string;
    /** A transparent cut-out, shown standing on the hero without a frame. */
    cutout?: boolean;
  };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "profile",
    number: "01",
    eyebrow: { en: "Official profile", hi: "आधिकारिक प्रोफ़ाइल" },
    label: { en: "Public profile", hi: "सार्वजनिक प्रोफ़ाइल" },
    title: {
      en: ["Vinod Kumar", "Upadhyay"],
      hi: ["विनोद कुमार", "उपाध्याय"],
    },
    subtitle: { en: "(Block Pramukh, Harhua)", hi: "(ब्लॉक प्रमुख, हरहुआ)" },
    description: {
      en: "Dedicated to carrying the spirit of service and public welfare to the last person in society, through public service, development and organisation.",
      hi: "जनसेवा, विकास और संगठन के माध्यम से समाज के अंतिम व्यक्ति तक सेवा और जनकल्याण की भावना को आगे बढ़ाने के लिए समर्पित।",
    },
    snapshot: {
      title: { en: "Profile snapshot", hi: "प्रोफ़ाइल एक नज़र में" },
      rows: [
        { k: { en: "Role", hi: "दायित्व" }, v: { en: "Block Pramukh", hi: "ब्लॉक प्रमुख" } },
        { k: { en: "Constituency", hi: "क्षेत्र" }, v: { en: "Shivpur, Varanasi", hi: "शिवपुर, वाराणसी" } },
        { k: { en: "Party", hi: "दल" }, v: { en: "Bharatiya Janata Party", hi: "भारतीय जनता पार्टी" } },
      ],
    },
    primary: { label: { en: "Explore profile", hi: "प्रोफ़ाइल देखें" }, href: "/about" },
    secondary: { label: { en: "About the journey", hi: "यात्रा के बारे में" }, href: "/about#journey" },
    person: {
      src: "/images/leader-standing.webp",
      width: 1059,
      height: 1319,
      position: "50% 100%",
      cutout: true,
      alt: {
        en: "Vinod Kumar Upadhyay standing with arms folded, in a white shirt",
        hi: "सफ़ेद कमीज़ में हाथ बाँधे खड़े विनोद कुमार उपाध्याय",
      },
    },
  },
  {
    id: "journey",
    number: "02",
    eyebrow: { en: "A Moment of Honour", hi: "सम्मान का क्षण" },
    label: { en: "Public life & journey", hi: "सार्वजनिक जीवन एवं यात्रा" },
    title: {
      en: ["With the Hon’ble", "Prime Minister"],
      hi: ["माननीय प्रधानमंत्री", "जी से संवाद"],
    },
    description: {
      en: "A memorable moment with Prime Minister Shri Narendra Modi ji: respect for leadership and a commitment to public service.",
      hi: "प्रधानमंत्री श्री नरेन्द्र मोदी जी के साथ एक यादगार क्षण: नेतृत्व के प्रति सम्मान और जनसेवा का संकल्प।",
    },
    snapshot: {
      title: { en: "Journey in brief", hi: "यात्रा संक्षेप में" },
      rows: [
        { k: { en: "Rooted in", hi: "जुड़ाव" }, v: { en: "RSS shakhas", hi: "संघ की शाखाएँ" } },
        { k: { en: "Joined BJP", hi: "भाजपा में" }, v: { en: "At the age of 18", hi: "18 वर्ष की आयु में" } },
        { k: { en: "Membership drive", hi: "सदस्यता अभियान" }, v: { en: "2000+ new members", hi: "2000+ नए सदस्य" } },
      ],
    },
    primary: { label: { en: "Explore His Journey", hi: "उनकी यात्रा देखें" }, href: "/about#journey" },
    secondary: { label: { en: "View timeline", hi: "समय-रेखा देखें" }, href: "/about#milestones" },
    secondaryButton: { label: { en: "View Gallery", hi: "गैलरी देखें" }, href: "/media" },
    person: {
      src: "/images/meetings/pm-modi.webp",
      width: 1089,
      height: 1800,
      position: "50% 14%",
      alt: {
        en: "Vinod Kumar Upadhyay greeting Prime Minister Shri Narendra Modi with folded hands",
        hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी का हाथ जोड़कर अभिवादन करते हुए विनोद कुमार उपाध्याय",
      },
    },
  },
];
