import type { L } from "@/lib/i18n";

/**
 * Before/after figures for the Vikas Yatra page. Every figure carries its source and the date the
 * source gives. `then` is omitted for schemes that did not exist before (shown as "since launch").
 * Update a figure by editing it here together with its source; never without one.
 *
 * Each figure and milestone has a photo of the work it measures, at /public/images/vikas/<id>.webp,
 * cropped from freely licensed images on Wikimedia Commons (mostly PIB, under GODL-India).
 */
export type Source = { label: string; url: string };

const img = (id: string) => `/images/vikas/${id}.webp`;

export type Stat = {
  id: string;
  label: L;
  unit: L;
  then?: { value: number; when: L; display?: L };
  now: { value: number; when: L; display?: L };
  note?: L;
  source: Source;
  image: string;
  icon: "road" | "plane" | "metro" | "hospital" | "seat" | "bank" | "flame" | "rise" | "rail" | "rupee" | "expressway" | "temple";
};

const pibInfra: Source = {
  label: "PIB: 11 years of transforming infrastructure (June 2025)",
  url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jun/doc2025611568101.pdf",
};

export const indiaStats: Stat[] = [
  {
    id: "highways",
    image: img("highways"),
    label: { en: "National highways", hi: "राष्ट्रीय राजमार्ग" },
    unit: { en: "km", hi: "किमी" },
    then: { value: 91287, when: { en: "2013-14", hi: "2013-14" } },
    now: { value: 146204, when: { en: "March 2025", hi: "मार्च 2025" } },
    source: pibInfra,
    icon: "road",
  },
  {
    id: "airports",
    image: img("airports"),
    label: { en: "Operational airports", hi: "संचालित हवाई अड्डे" },
    unit: { en: "", hi: "" },
    then: { value: 74, when: { en: "2014", hi: "2014" } },
    now: { value: 160, when: { en: "March 2025", hi: "मार्च 2025" } },
    note: { en: "Includes water aerodromes and heliports.", hi: "जल हवाई अड्डे और हेलीपोर्ट सहित।" },
    source: pibInfra,
    icon: "plane",
  },
  {
    id: "metro",
    image: img("metro"),
    label: { en: "Metro rail network", hi: "मेट्रो रेल नेटवर्क" },
    unit: { en: "km", hi: "किमी" },
    then: { value: 248, when: { en: "2014", hi: "2014" } },
    now: { value: 1013, when: { en: "May 2025", hi: "मई 2025" } },
    source: pibInfra,
    icon: "metro",
  },
  {
    id: "medical-colleges",
    image: img("medical-colleges"),
    label: { en: "Medical colleges", hi: "मेडिकल कॉलेज" },
    unit: { en: "", hi: "" },
    then: { value: 387, when: { en: "2014", hi: "2014" } },
    now: { value: 780, when: { en: "2024", hi: "2024" } },
    source: {
      label: "Ministry of Health in Parliament, via IANS (December 2024)",
      url: "https://ianslive.in/mbbs-seats-rise-to-118137-medical-colleges-surge-to-780-in-2024-centre--20241207121709",
    },
    icon: "hospital",
  },
  {
    id: "mbbs",
    image: img("mbbs"),
    label: { en: "MBBS seats", hi: "एमबीबीएस सीटें" },
    unit: { en: "", hi: "" },
    then: { value: 51348, when: { en: "2014", hi: "2014" } },
    now: { value: 118137, when: { en: "2024", hi: "2024" } },
    source: {
      label: "Ministry of Health in Parliament, via IANS (December 2024)",
      url: "https://ianslive.in/mbbs-seats-rise-to-118137-medical-colleges-surge-to-780-in-2024-centre--20241207121709",
    },
    icon: "seat",
  },
  {
    id: "rail-electrification",
    image: img("rail-electrification"),
    label: { en: "Railway lines electrified", hi: "रेल लाइनों का विद्युतीकरण" },
    unit: { en: "route km", hi: "रूट किमी" },
    then: { value: 5188, when: { en: "in 2004-14", hi: "2004-14 के दस वर्षों में" } },
    now: { value: 45000, when: { en: "in 2014-25", hi: "2014-25 में" }, display: { en: "45,000+", hi: "45,000+" } },
    source: pibInfra,
    icon: "rail",
  },
  {
    id: "jan-dhan",
    image: img("jan-dhan"),
    label: { en: "Jan Dhan bank accounts", hi: "जन धन बैंक खाते" },
    unit: { en: "crore", hi: "करोड़" },
    now: { value: 56.16, when: { en: "August 2025", hi: "अगस्त 2025" } },
    note: {
      en: "Launched in August 2014. Deposits: ₹2.67 lakh crore.",
      hi: "अगस्त 2014 में शुरू। कुल जमा: ₹2.67 लाख करोड़।",
    },
    source: {
      label: "PIB: 11 years of PM Jan Dhan Yojana (August 2025)",
      url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/aug/doc2025827621301.pdf",
    },
    icon: "bank",
  },
  {
    id: "ujjwala",
    image: img("ujjwala"),
    label: { en: "Free LPG connections (Ujjwala)", hi: "निःशुल्क एलपीजी कनेक्शन (उज्ज्वला)" },
    unit: { en: "crore", hi: "करोड़" },
    now: { value: 10.33, when: { en: "1 March 2025", hi: "1 मार्च 2025" } },
    note: { en: "Launched in Ballia, UP, in May 2016.", hi: "मई 2016 में बलिया, उत्तर प्रदेश से शुरू।" },
    source: {
      label: "PIB: PM Ujjwala Yojana, nine years (April 2025)",
      url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/apr/doc2025430548201.pdf",
    },
    icon: "flame",
  },
  {
    id: "poverty",
    image: img("poverty"),
    label: { en: "People out of multidimensional poverty", hi: "बहुआयामी गरीबी से बाहर आए लोग" },
    unit: { en: "crore", hi: "करोड़" },
    now: { value: 24.82, when: { en: "2013-14 to 2022-23", hi: "2013-14 से 2022-23" } },
    source: {
      label: "NITI Aayog discussion paper on multidimensional poverty, reported by PTI (January 2024)",
      url: "https://www.theweek.in/wire-updates/business/2024/01/15/del69-biz-ld-niti-poverty.html",
    },
    icon: "rise",
  },
];

export const upStats: Stat[] = [
  {
    id: "gsdp",
    image: img("gsdp"),
    label: { en: "Size of the state economy (GSDP)", hi: "राज्य की अर्थव्यवस्था (GSDP)" },
    unit: { en: "lakh crore ₹", hi: "लाख करोड़ ₹" },
    then: { value: 13.3, when: { en: "2016-17", hi: "2016-17" } },
    now: { value: 30.25, when: { en: "2024-25", hi: "2024-25" } },
    note: { en: "About 10.8% growth every year.", hi: "हर वर्ष लगभग 10.8% की वृद्धि।" },
    source: {
      label: "Uttar Pradesh Economic Survey 2025-26",
      url: "https://oga-prod.angelone.in/news/economy/uttar-pradesh-economic-survey-2025-26-highlights-1-trillion-roadmap",
    },
    icon: "rupee",
  },
  {
    id: "expressways",
    image: img("expressways"),
    label: { en: "Expressways planned and built", hi: "एक्सप्रेसवे (योजनाबद्ध और निर्मित)" },
    unit: { en: "", hi: "" },
    now: { value: 22, when: { en: "2025-26", hi: "2025-26" } },
    note: {
      en: "7 already in use, 3 under construction. Includes Purvanchal, Bundelkhand and Ganga expressways.",
      hi: "7 पर यातायात चालू, 3 निर्माणाधीन। पूर्वांचल, बुंदेलखंड और गंगा एक्सप्रेसवे सहित।",
    },
    source: {
      label: "Uttar Pradesh Economic Survey 2025-26",
      url: "https://oga-prod.angelone.in/news/economy/uttar-pradesh-economic-survey-2025-26-highlights-1-trillion-roadmap",
    },
    icon: "expressway",
  },
  {
    id: "investment",
    image: img("investment"),
    label: { en: "Investment proposals in the pipeline", hi: "पाइपलाइन में निवेश प्रस्ताव" },
    unit: { en: "lakh crore ₹", hi: "लाख करोड़ ₹" },
    now: { value: 50, when: { en: "2025-26", hi: "2025-26" }, display: { en: "50+", hi: "50+" } },
    source: {
      label: "Uttar Pradesh Economic Survey 2025-26",
      url: "https://oga-prod.angelone.in/news/economy/uttar-pradesh-economic-survey-2025-26-highlights-1-trillion-roadmap",
    },
    icon: "rupee",
  },
];

/** Milestones for Kashi and Purvanchal: dated events, not figures. */
export const kashiMilestones: { date: L; title: L; text: L; image: string }[] = [
  {
    date: { en: "13 December 2021", hi: "13 दिसंबर 2021" },
    image: img("kashi-dham"),
    title: { en: "Shri Kashi Vishwanath Dham", hi: "श्री काशी विश्वनाथ धाम" },
    text: {
      en: "The corridor linking the temple to the Ganga ghats was dedicated by the Prime Minister.",
      hi: "मंदिर को गंगा घाटों से जोड़ने वाले धाम का लोकार्पण माननीय प्रधानमंत्री जी ने किया।",
    },
  },
  {
    date: { en: "16 November 2021", hi: "16 नवंबर 2021" },
    image: img("purvanchal"),
    title: { en: "Purvanchal Expressway", hi: "पूर्वांचल एक्सप्रेसवे" },
    text: {
      en: "Opened from Lucknow to Ghazipur, bringing eastern UP within hours of the state capital.",
      hi: "लखनऊ से ग़ाज़ीपुर तक खुला, पूर्वी उत्तर प्रदेश को राजधानी से कुछ घंटों की दूरी पर ला दिया।",
    },
  },
  {
    date: { en: "24 January 2018", hi: "24 जनवरी 2018" },
    image: img("odop"),
    title: { en: "One District One Product", hi: "एक जनपद एक उत्पाद" },
    text: {
      en: "Launched on UP Day. Varanasi’s product is the Banarasi silk sari.",
      hi: "उत्तर प्रदेश दिवस पर शुरू। वाराणसी का उत्पाद बनारसी रेशमी साड़ी है।",
    },
  },
];

export const ratio = (s: Stat) => (s.then ? s.now.value / s.then.value : undefined);
