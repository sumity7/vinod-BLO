import type { L } from "@/lib/i18n";
import type { Scene } from "@/lib/ecardScenes";

/**
 * e-Card occasions. Each one sets the greeting and the card's colours and drawn motif. Festival
 * dates move with the Hindu calendar, so no dates are stored for festivals; fixed national days
 * and the Ideals' anniversaries carry their dates.
 */
export type Motif = "diya" | "ghat-lamps" | "sun" | "colours" | "flag" | "shiva" | "rakhi" | "kite" | "lotus" | "garland" | "scene";

export type ECardTemplate = {
  id: string;
  label: L;
  greeting: L;
  line: L;
  motif: Motif;
  /** A themed picture behind the card (see lib/ecardScenes.ts). */
  scene?: Scene;
  /** One or two sentences on what the day is. */
  detail?: L;
  /** Background top, background bottom, accent, text. */
  palette: [string, string, string, string];
  /** mm-dd for fixed national days. */
  fixed?: string;
};

export const ecardTemplates: ECardTemplate[] = [
  {
    id: "dev-deepawali",
    label: { en: "Dev Deepawali", hi: "देव दीपावली" },
    greeting: { en: "Happy Dev Deepawali", hi: "देव दीपावली की हार्दिक शुभकामनाएँ" },
    line: { en: "May the lamps on Kashi’s ghats light every home.", hi: "काशी के घाटों पर जले दीप, हर घर में उजाला करें।" },
    detail: { en: "On Kartik Purnima, lakhs of diyas light the ghats of Kashi along the Ganga.", hi: "कार्तिक पूर्णिमा पर गंगा किनारे काशी के घाट लाखों दीपों से जगमगा उठते हैं।" },
    motif: "ghat-lamps",
    palette: ["#0a2832", "#123f4f", "#f2a51a", "#fff7e8"],
  },
  {
    id: "diwali",
    label: { en: "Deepawali", hi: "दीपावली" },
    greeting: { en: "Happy Deepawali", hi: "दीपावली की हार्दिक शुभकामनाएँ" },
    line: { en: "May light, prosperity and joy fill your home.", hi: "आपके घर में प्रकाश, समृद्धि और ख़ुशियाँ भरें।" },
    detail: { en: "The festival of lights, the day Shri Ram returned to Ayodhya.", hi: "प्रकाश का पर्व, वह दिन जब श्री राम अयोध्या लौटे।" },
    motif: "diya",
    palette: ["#3a0d0a", "#7a1616", "#f2a51a", "#fff3dc"],
  },
  {
    id: "chhath",
    label: { en: "Chhath Puja", hi: "छठ पूजा" },
    greeting: { en: "Happy Chhath Puja", hi: "छठ महापर्व की हार्दिक शुभकामनाएँ" },
    line: { en: "May Chhathi Maiya bless every family.", hi: "छठी मइया सबके परिवार पर कृपा करें।" },
    detail: { en: "Arghya to the setting and the rising sun, offered with faith and discipline.", hi: "अस्त और उदय होते सूर्य को अर्घ्य, आस्था और अनुशासन के साथ।" },
    motif: "sun",
    palette: ["#b84f08", "#f47216", "#ffe08a", "#fffaf0"],
  },
  {
    id: "holi",
    label: { en: "Holi", hi: "होली" },
    greeting: { en: "Happy Holi", hi: "होली की हार्दिक शुभकामनाएँ" },
    line: { en: "Colours of love, brotherhood and joy.", hi: "प्रेम, भाईचारे और उल्लास के रंग।" },
    detail: { en: "Holika Dahan and the festival of colours: the victory of good over evil.", hi: "होलिका दहन और रंगों का पर्व: अच्छाई की बुराई पर जीत।" },
    motif: "colours",
    palette: ["#5b1a6e", "#c2185b", "#ffd54f", "#fff8fb"],
  },
  {
    id: "navratri",
    label: { en: "Navratri / Vijayadashami", hi: "नवरात्रि / विजयादशमी" },
    greeting: { en: "Happy Navratri and Vijayadashami", hi: "नवरात्रि एवं विजयादशमी की शुभकामनाएँ" },
    line: { en: "May Maa Durga give strength; may good always win.", hi: "माँ दुर्गा शक्ति दें, सदा सत्य की विजय हो।" },
    detail: { en: "Nine nights of Maa Durga, ending with Vijayadashami.", hi: "माँ दुर्गा की नौ रातें, और अंत में विजयादशमी।" },
    motif: "garland",
    palette: ["#7a1616", "#a3281a", "#f2a51a", "#fff3dc"],
  },
  {
    id: "mahashivratri",
    label: { en: "Mahashivratri", hi: "महाशिवरात्रि" },
    greeting: { en: "Happy Mahashivratri", hi: "महाशिवरात्रि की हार्दिक शुभकामनाएँ" },
    line: { en: "Har Har Mahadev. May Baba Vishwanath bless all.", hi: "हर हर महादेव। बाबा विश्वनाथ सबका कल्याण करें।" },
    detail: { en: "The great night of Shiva: fasting, jagran and Har Har Mahadev.", hi: "शिव की महान रात्रि: उपवास, जागरण और हर हर महादेव।" },
    motif: "shiva",
    palette: ["#0a1f2e", "#1d3b57", "#9fd3e6", "#f2fbff"],
  },
  {
    id: "raksha-bandhan",
    label: { en: "Raksha Bandhan", hi: "रक्षाबंधन" },
    greeting: { en: "Happy Raksha Bandhan", hi: "रक्षाबंधन की हार्दिक शुभकामनाएँ" },
    line: { en: "A sister’s love, a brother’s promise.", hi: "बहन का स्नेह, भाई का वचन।" },
    detail: { en: "The sacred thread of protection and affection between brothers and sisters.", hi: "भाई-बहन के स्नेह और रक्षा के संकल्प का पवित्र धागा।" },
    motif: "rakhi",
    palette: ["#8a1b4a", "#d0456f", "#ffd27a", "#fff6f8"],
  },
  {
    id: "makar-sankranti",
    label: { en: "Makar Sankranti", hi: "मकर संक्रांति / खिचड़ी" },
    greeting: { en: "Happy Makar Sankranti", hi: "मकर संक्रांति की हार्दिक शुभकामनाएँ" },
    line: { en: "May your hopes fly as high as the kites.", hi: "पतंगों की तरह आपकी उम्मीदें ऊँची उड़ान भरें।" },
    detail: { en: "The sun begins its northward journey; in Uttar Pradesh, the day of khichdi and daan.", hi: "सूर्य उत्तरायण होते हैं; उत्तर प्रदेश में खिचड़ी और दान का दिन।" },
    motif: "kite",
    palette: ["#0f5d8c", "#4fb0d9", "#f2a51a", "#ffffff"],
  },
  {
    id: "ram-navami",
    label: { en: "Ram Navami", hi: "रामनवमी" },
    greeting: { en: "Happy Ram Navami", hi: "रामनवमी की हार्दिक शुभकामनाएँ" },
    line: { en: "May Maryada Purushottam Shri Ram’s ideals guide our lives.", hi: "मर्यादा पुरुषोत्तम श्री राम के आदर्श हमारा मार्ग दिखाएँ।" },
    detail: { en: "The birth of Shri Ram, who stands for truth, duty and Ram Rajya.", hi: "श्री राम का प्राकट्य: सत्य, कर्तव्य और रामराज्य का आदर्श।" },
    motif: "scene",
    scene: "bow",
    palette: ["#5a0f0f", "#b03a0c", "#ffd27a", "#fff7e8"],
  },
  {
    id: "janmashtami",
    label: { en: "Janmashtami", hi: "जन्माष्टमी" },
    greeting: { en: "Happy Janmashtami", hi: "श्रीकृष्ण जन्माष्टमी की हार्दिक शुभकामनाएँ" },
    line: { en: "May Shri Krishna’s flute fill every home with joy.", hi: "श्रीकृष्ण की बाँसुरी हर घर में आनंद भर दे।" },
    detail: { en: "The birth of Shri Krishna, and the Gita’s message of doing one’s duty.", hi: "श्रीकृष्ण का जन्म, और गीता का कर्म का संदेश।" },
    motif: "scene",
    scene: "flute",
    palette: ["#06183a", "#0f4a8a", "#f2c14e", "#f2f8ff"],
  },
  {
    id: "eid",
    label: { en: "Eid", hi: "ईद" },
    greeting: { en: "Eid Mubarak", hi: "ईद मुबारक" },
    line: { en: "May this Eid bring peace, joy and brotherhood to all.", hi: "यह ईद सबके जीवन में अमन, ख़ुशी और भाईचारा लाए।" },
    motif: "scene",
    scene: "crescent",
    palette: ["#06251f", "#0e3b32", "#ffe29a", "#f4fff9"],
  },
  {
    id: "christmas",
    label: { en: "Christmas", hi: "क्रिसमस" },
    greeting: { en: "Merry Christmas", hi: "क्रिसमस की हार्दिक शुभकामनाएँ" },
    line: { en: "Peace, love and goodwill to all.", hi: "सबके लिए शांति, प्रेम और सद्भावना।" },
    motif: "scene",
    scene: "christmas",
    palette: ["#0b2a1f", "#12503a", "#ffd36b", "#ffffff"],
  },
  {
    id: "independence-day",
    label: { en: "Independence Day", hi: "स्वतंत्रता दिवस" },
    greeting: { en: "Happy Independence Day", hi: "स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ" },
    line: { en: "Salute to those who gave us freedom.", hi: "आज़ादी दिलाने वालों को शत-शत नमन।" },
    detail: { en: "On 15 August 1947 India became free.", hi: "15 अगस्त 1947 को भारत स्वतंत्र हुआ।" },
    motif: "flag",
    palette: ["#ffffff", "#fff4e8", "#f47216", "#0a2832"],
    fixed: "08-15",
  },
  {
    id: "republic-day",
    label: { en: "Republic Day", hi: "गणतंत्र दिवस" },
    greeting: { en: "Happy Republic Day", hi: "गणतंत्र दिवस की हार्दिक शुभकामनाएँ" },
    line: { en: "Proud of our Constitution, proud of our India.", hi: "अपने संविधान पर गर्व, अपने भारत पर गर्व।" },
    detail: { en: "On 26 January 1950 the Constitution of India came into force.", hi: "26 जनवरी 1950 को भारत का संविधान लागू हुआ।" },
    motif: "flag",
    palette: ["#ffffff", "#eef7f1", "#00a650", "#0a2832"],
    fixed: "01-26",
  },
  {
    id: "new-year",
    label: { en: "New Year", hi: "नववर्ष" },
    greeting: { en: "Happy New Year", hi: "नववर्ष की हार्दिक शुभकामनाएँ" },
    line: { en: "A year of health, service and progress.", hi: "स्वास्थ्य, सेवा और प्रगति से भरा वर्ष।" },
    motif: "lotus",
    palette: ["#0f3a48", "#1b5868", "#f2a51a", "#ffffff"],
    fixed: "01-01",
  },
  {
    id: "birthday",
    label: { en: "Birthday wishes", hi: "जन्मदिन की बधाई" },
    greeting: { en: "Happy Birthday", hi: "जन्मदिन की हार्दिक बधाई" },
    line: { en: "Wishing you a long, healthy life of service.", hi: "दीर्घायु, स्वस्थ और यशस्वी जीवन की कामना।" },
    motif: "garland",
    palette: ["#b84f08", "#e8630a", "#ffe08a", "#fffaf0"],
  },
];

/** Greeting for an Ideal's anniversary card, built from content/ideals.ts. */
export const tributeText = {
  jayanti: {
    greeting: { en: "Tributes on the birth anniversary of", hi: "की जयंती पर शत-शत नमन" },
    line: { en: "Let us walk the path they showed.", hi: "आइए, उनके दिखाए मार्ग पर चलें।" },
  },
  punyatithi: {
    greeting: { en: "Humble tributes on the death anniversary of", hi: "की पुण्यतिथि पर विनम्र श्रद्धांजलि" },
    line: { en: "Their ideas live on in our work.", hi: "उनके विचार हमारे कार्य में जीवित हैं।" },
  },
} satisfies Record<string, { greeting: L; line: L }>;

type Theme = { scene: Scene; palette: [string, string, string, string] };
const themes: Record<string, Theme> = {
  charkha: { scene: "charkha", palette: ["#3b2a1a", "#6b4a2a", "#e8b04a", "#fff6e6"] },
  constitution: { scene: "constitution", palette: ["#0b2a5b", "#143d85", "#7fb2ff", "#f2f7ff"] },
  rocket: { scene: "rocket", palette: ["#050b24", "#10224f", "#ffd27a", "#f2f6ff"] },
  sunrise: { scene: "sunrise", palette: ["#0a2a4a", "#12435e", "#ffcf7a", "#fff7e8"] },
  swords: { scene: "swords", palette: ["#4a0d0d", "#8a1b12", "#e6c35c", "#fff3dc"] },
  khanda: { scene: "khanda", palette: ["#0b2a5b", "#1b4a9a", "#ffcf3a", "#fff8e0"] },
  torch: { scene: "torch", palette: ["#1a0f0a", "#4a1d0a", "#ff9a3a", "#fff3e0"] },
  lotus: { scene: "lotus-flags", palette: ["#7a2a05", "#c2410c", "#ffd27a", "#fff7e8"] },
  om: { scene: "om-sun", palette: ["#8a2a05", "#e8630a", "#ffe08a", "#fffaf0"] },
  bow: { scene: "bow", palette: ["#5a0f0f", "#b03a0c", "#ffd27a", "#fff7e8"] },
  flute: { scene: "flute", palette: ["#06183a", "#0f4a8a", "#f2c14e", "#f2f8ff"] },
  dharma: { scene: "dharmachakra", palette: ["#7a4a08", "#b8770f", "#ffe4a8", "#fffaf0"] },
  book: { scene: "diya-book", palette: ["#2a1608", "#5a3010", "#ffcf7a", "#fff7e8"] },
  seva: { scene: "seva", palette: ["#0a3a6a", "#1b6aa8", "#cfe8ff", "#ffffff"] },
  ekta: { scene: "ekta", palette: ["#0f3a48", "#1b5868", "#f2a51a", "#ffffff"] },
};

/** Which picture and colours each of the Ideals gets on a jayanti or punyatithi card. */
const idealTheme: Record<string, keyof typeof themes> = {
  "mahatma-gandhi": "charkha",
  "br-ambedkar": "constitution",
  "apj-abdul-kalam": "rocket",
  "swami-vivekananda": "sunrise",
  "maharana-pratap": "swords",
  "chhatrapati-shivaji-maharaj": "swords",
  "rani-lakshmibai": "swords",
  "chandragupta-maurya": "swords",
  "guru-gobind-singh": "khanda",
  "guru-nanak": "khanda",
  "veer-savarkar": "torch",
  "subhas-chandra-bose": "torch",
  "chandrashekhar-azad": "torch",
  "bhagat-singh": "torch",
  "atal-bihari-vajpayee": "lotus",
  "narendra-modi": "lotus",
  "ashok-singhal": "lotus",
  "syama-prasad-mookerjee": "lotus",
  "deendayal-upadhyaya": "lotus",
  "madhav-sadashiv-golwalkar": "lotus",
  "keshav-baliram-hedgewar": "lotus",
  "morarji-desai": "ekta",
  "sardar-patel": "ekta",
  "bhagwan-shri-ram": "bow",
  "bhagwan-shri-krishna": "flute",
  "bhagwan-mahavir": "dharma",
  "bhagwan-buddha": "dharma",
  "samrat-ashoka": "dharma",
  "chanakya": "book",
  "kabir-das": "book",
  "sant-ravidas": "book",
  "tulsidas": "book",
  "rabindranath-tagore": "book",
  "jyotiba-phule": "book",
  "savitribai-phule": "book",
  "mother-teresa": "seva",
  "ramakrishna-paramhansa": "om",
  "swami-dayanand-saraswati": "om",
  "gayatri-parivar": "om",
};

export function themeFor(slug: string): Theme {
  return themes[idealTheme[slug] ?? "lotus"];
}
