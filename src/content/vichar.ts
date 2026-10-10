import type { L } from "@/lib/i18n";
import type { Source } from "./vikas";

/**
 * Vichar: articles on schemes and public issues. A scheme article has four fixed parts (what it
 * is, who benefits, how to apply, our position) so readers always find the same answers in the
 * same place. Figures and rules are as published on the official site linked in `official`.
 *
 * Each article has a photo of its subject at /public/images/vichar/<slug>.webp, cropped from freely
 * licensed images on Wikimedia Commons.
 */
export type VicharCategory = "shiksha" | "mahila" | "rozgar" | "vikas" | "yojana" | "kisan";

export const vicharCategories: Record<VicharCategory, L> = {
  yojana: { en: "Government schemes", hi: "सरकार की योजनाएँ" },
  shiksha: { en: "Education", hi: "शिक्षा" },
  mahila: { en: "Women’s safety", hi: "महिला सुरक्षा" },
  rozgar: { en: "Employment", hi: "रोज़गार" },
  kisan: { en: "Farmers", hi: "किसान" },
  vikas: { en: "Development", hi: "विकास" },
};

export type Block = { heading?: L; paras?: L[]; bullets?: L[] };

export type Article = {
  slug: string;
  category: VicharCategory;
  date: string;
  readMin: number;
  title: L;
  summary: L;
  image: string;
  /** Large figure shown on the card, e.g. "₹5 lakh". */
  highlight?: { value: L; label: L };
  scheme?: { what: L[]; who: L[]; how: L[] };
  body?: Block[];
  stance: L[];
  official?: Source;
  sources: Source[];
  /** Link to a page on this site, e.g. the Vikas Yatra figures. */
  cta?: { href: string; label: L };
};

const D = "2026-10-10";

const img = (slug: string) => `/images/vichar/${slug}.webp`;

export const articles: Article[] = [
  {
    slug: "ayushman-bharat",
    image: img("ayushman-bharat"),
    category: "yojana",
    date: D,
    readMin: 3,
    title: { en: "Ayushman Bharat: free treatment up to ₹5 lakh a year", hi: "आयुष्मान भारत: हर वर्ष ₹5 लाख तक मुफ़्त इलाज" },
    summary: {
      en: "Cashless treatment in government and listed private hospitals for eligible families, and now for every citizen aged 70 and above.",
      hi: "पात्र परिवारों के लिए सरकारी और सूचीबद्ध निजी अस्पतालों में कैशलेस इलाज, और अब 70 वर्ष से ऊपर के हर नागरिक के लिए।",
    },
    highlight: { value: { en: "₹5 lakh", hi: "₹5 लाख" }, label: { en: "per family, per year", hi: "प्रति परिवार, प्रति वर्ष" } },
    scheme: {
      what: [
        { en: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY), launched in September 2018, covers hospital treatment up to ₹5 lakh per family per year, without cash payment at the hospital.", hi: "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY) सितंबर 2018 में शुरू हुई। इसमें प्रति परिवार प्रति वर्ष ₹5 लाख तक का अस्पताल इलाज, बिना नकद भुगतान के, मिलता है।" },
        { en: "It covers surgery, medicines, tests, and costs three days before and fifteen days after admission.", hi: "इसमें ऑपरेशन, दवाइयाँ, जाँच, और भर्ती से तीन दिन पहले व पंद्रह दिन बाद तक का ख़र्च शामिल है।" },
      ],
      who: [
        { en: "Families identified in the SECC 2011 data and those added later by the state.", hi: "SECC 2011 के आँकड़ों में चिह्नित परिवार, और बाद में राज्य द्वारा जोड़े गए परिवार।" },
        { en: "Since October 2024, every citizen aged 70 or above, whatever their income, through the Ayushman Vay Vandana card.", hi: "अक्टूबर 2024 से 70 वर्ष या उससे अधिक आयु का हर नागरिक, आय कोई भी हो, आयुष्मान वय वंदना कार्ड के माध्यम से।" },
      ],
      how: [
        { en: "Check eligibility at beneficiary.nha.gov.in or on the Ayushman app with your mobile number and Aadhaar.", hi: "beneficiary.nha.gov.in या आयुष्मान ऐप पर मोबाइल नंबर और आधार से पात्रता जाँचें।" },
        { en: "Make the Ayushman card at a Common Service Centre (CSC), a listed hospital, or yourself on the app.", hi: "जन सेवा केंद्र (CSC), सूचीबद्ध अस्पताल, या ऐप पर स्वयं आयुष्मान कार्ड बनाएँ।" },
        { en: "At the hospital, show the card at the Ayushman Mitra desk.", hi: "अस्पताल में आयुष्मान मित्र काउंटर पर कार्ड दिखाएँ।" },
      ],
    },
    stance: [
      { en: "No family should have to sell land or take a loan to save a life. Health is the first need of the poor, and Ayushman Bharat is Antyodaya in practice.", hi: "किसी परिवार को जान बचाने के लिए ज़मीन बेचनी या क़र्ज़ लेना न पड़े। स्वास्थ्य गरीब की पहली ज़रूरत है, और आयुष्मान भारत अंत्योदय का व्यावहारिक रूप है।" },
      { en: "Our workers help families in Harhua make their cards. If you have trouble, register it on e-Shikayat under Health.", hi: "हमारे कार्यकर्ता हरहुआ में परिवारों के कार्ड बनवाने में मदद करते हैं। कोई कठिनाई हो तो ई-शिकायत पर ‘स्वास्थ्य’ श्रेणी में दर्ज करें।" },
    ],
    official: { label: "pmjay.gov.in", url: "https://pmjay.gov.in" },
    sources: [{ label: "National Health Authority: PM-JAY", url: "https://pmjay.gov.in" }],
    cta: { href: "/e-shikayat", label: { en: "Need help with your card?", hi: "कार्ड बनवाने में मदद चाहिए?" } },
  },
  {
    slug: "pm-awas-gramin",
    image: img("pm-awas-gramin"),
    category: "yojana",
    date: D,
    readMin: 3,
    title: { en: "PM Awas Yojana (Gramin): a pucca house for every family", hi: "प्रधानमंत्री आवास योजना (ग्रामीण): हर परिवार को पक्का घर" },
    summary: {
      en: "Money in instalments straight to your bank account to build a pucca house, with a toilet, gas and power connection through linked schemes.",
      hi: "पक्का घर बनाने के लिए किस्तों में सीधे बैंक खाते में राशि, और जुड़ी योजनाओं से शौचालय, गैस व बिजली कनेक्शन।",
    },
    highlight: { value: { en: "₹1.20 lakh", hi: "₹1.20 लाख" }, label: { en: "for a house in the plains", hi: "मैदानी क्षेत्र में घर के लिए" } },
    scheme: {
      what: [
        { en: "Families without a pucca house receive ₹1.20 lakh in the plains to build one, paid in instalments directly to their bank account as construction progresses.", hi: "पक्के घर से वंचित परिवारों को मैदानी क्षेत्र में घर बनाने के लिए ₹1.20 लाख मिलते हैं, जो निर्माण की प्रगति के साथ किस्तों में सीधे बैंक खाते में आते हैं।" },
        { en: "Wages for 90 days of work under MGNREGA and ₹12,000 for a toilet under the Swachh Bharat Mission can be added.", hi: "मनरेगा के तहत 90 दिन की मज़दूरी और स्वच्छ भारत मिशन से शौचालय के लिए ₹12,000 अतिरिक्त मिल सकते हैं।" },
      ],
      who: [
        { en: "Families who are homeless or live in kutcha houses, as recorded in the Awaas+ survey and approved by the Gram Sabha.", hi: "बेघर या कच्चे घर में रहने वाले परिवार, जो आवास+ सर्वे में दर्ज हों और ग्राम सभा द्वारा अनुमोदित हों।" },
      ],
      how: [
        { en: "Contact your Gram Pradhan, Panchayat Secretary or the Block office to have your name included in the survey.", hi: "सर्वे में नाम जुड़वाने के लिए अपने ग्राम प्रधान, पंचायत सचिव या ब्लॉक कार्यालय से संपर्क करें।" },
        { en: "Keep your Aadhaar, bank passbook and job card ready.", hi: "आधार, बैंक पासबुक और जॉब कार्ड तैयार रखें।" },
        { en: "Check the status of your house on pmayg.nic.in.", hi: "pmayg.nic.in पर अपने आवास की स्थिति देखें।" },
      ],
    },
    stance: [
      { en: "A house is the start of dignity: a safe place for children to study and for women to live without fear. The house is registered in the woman’s name or jointly wherever possible.", hi: "घर सम्मान की शुरुआत है: बच्चों के पढ़ने और महिलाओं के बिना डर रहने की सुरक्षित जगह। जहाँ संभव हो, घर महिला के नाम या संयुक्त नाम पर होता है।" },
      { en: "Not one eligible family in Harhua should be left out. If your name is missing from the list, tell us on e-Shikayat under Housing.", hi: "हरहुआ का एक भी पात्र परिवार न छूटे। सूची में नाम न हो तो ई-शिकायत पर ‘आवास’ श्रेणी में बताएँ।" },
    ],
    official: { label: "pmayg.nic.in", url: "https://pmayg.nic.in" },
    sources: [{ label: "Ministry of Rural Development: PMAY-G", url: "https://pmayg.nic.in" }],
    cta: { href: "/e-shikayat", label: { en: "Name missing from the list?", hi: "सूची में नाम नहीं है?" } },
  },
  {
    slug: "pm-kisan",
    image: img("pm-kisan"),
    category: "kisan",
    date: D,
    readMin: 2,
    title: { en: "PM Kisan Samman Nidhi: ₹6,000 a year to every farmer family", hi: "पीएम किसान सम्मान निधि: हर किसान परिवार को सालाना ₹6,000" },
    summary: {
      en: "Three instalments of ₹2,000 a year directly into the bank accounts of land-holding farmer families.",
      hi: "भूमिधारक किसान परिवारों के बैंक खाते में हर वर्ष ₹2,000 की तीन किस्तें सीधे।",
    },
    highlight: { value: { en: "₹6,000", hi: "₹6,000" }, label: { en: "a year, in three instalments", hi: "प्रति वर्ष, तीन किस्तों में" } },
    scheme: {
      what: [
        { en: "Started in February 2019, PM-KISAN pays ₹6,000 a year to farmer families, in three instalments of ₹2,000 sent straight to their bank accounts.", hi: "फ़रवरी 2019 में शुरू पीएम-किसान योजना में किसान परिवारों को हर वर्ष ₹6,000, ₹2,000 की तीन किस्तों में सीधे बैंक खाते में मिलते हैं।" },
      ],
      who: [
        { en: "Farmer families who own cultivable land in their name. Income-tax payers, institutional land holders and some professionals are excluded.", hi: "अपने नाम पर कृषि योग्य भूमि वाले किसान परिवार। आयकरदाता, संस्थागत भूमिधारक और कुछ पेशेवर इसमें शामिल नहीं हैं।" },
      ],
      how: [
        { en: "Register at pmkisan.gov.in (New Farmer Registration) or at a CSC.", hi: "pmkisan.gov.in पर (New Farmer Registration) या जन सेवा केंद्र पर पंजीकरण करें।" },
        { en: "Complete e-KYC and link Aadhaar to your bank account, or instalments stop.", hi: "ई-केवाईसी पूरा करें और आधार को बैंक खाते से जोड़ें, नहीं तो किस्तें रुक जाती हैं।" },
        { en: "Check your status under ‘Know Your Status’ on the same site.", hi: "उसी वेबसाइट पर ‘Know Your Status’ में अपनी स्थिति देखें।" },
      ],
    },
    stance: [
      { en: "The farmer feeds the nation; the money reaches him without a middleman, in full. That is what direct benefit transfer has changed.", hi: "किसान देश का अन्नदाता है; उसकी राशि बिना बिचौलिये, पूरी की पूरी उसके खाते में पहुँचती है। प्रत्यक्ष लाभ अंतरण ने यही बदला है।" },
    ],
    official: { label: "pmkisan.gov.in", url: "https://pmkisan.gov.in" },
    sources: [{ label: "Ministry of Agriculture: PM-KISAN", url: "https://pmkisan.gov.in" }],
  },
  {
    slug: "mission-shakti",
    image: img("mission-shakti"),
    category: "mahila",
    date: D,
    readMin: 3,
    title: { en: "Mission Shakti: safety, respect and self-reliance for women in UP", hi: "मिशन शक्ति: उत्तर प्रदेश में नारी सुरक्षा, सम्मान और स्वावलंबन" },
    summary: {
      en: "Women’s help desks in every police station, quick-response helplines, and schemes that put money and skills in women’s hands.",
      hi: "हर थाने में महिला हेल्प डेस्क, तुरंत मदद वाली हेल्पलाइन, और महिलाओं के हाथ में पैसा व हुनर देने वाली योजनाएँ।",
    },
    body: [
      {
        heading: { en: "What has changed", hi: "क्या बदला है" },
        paras: [
          { en: "The Uttar Pradesh government launched Mission Shakti in October 2020 as a campaign for the safety, dignity and self-reliance of women and girls. Anti-Romeo squads were formed in 2017 to stop harassment in public places.", hi: "उत्तर प्रदेश सरकार ने अक्टूबर 2020 में महिलाओं और बेटियों की सुरक्षा, सम्मान और स्वावलंबन के लिए मिशन शक्ति अभियान शुरू किया। सार्वजनिक स्थानों पर छेड़छाड़ रोकने के लिए 2017 में एंटी-रोमियो स्क्वॉड बनाए गए।" },
        ],
        bullets: [
          { en: "Women’s help desks in police stations, staffed by women officers.", hi: "थानों में महिला पुलिसकर्मियों वाली महिला हेल्प डेस्क।" },
          { en: "Pink booths and women’s patrols in markets and near schools.", hi: "बाज़ारों और स्कूलों के पास पिंक बूथ और महिला गश्त।" },
          { en: "Kanya Sumangala Yojana: support for a girl from birth to graduation.", hi: "कन्या सुमंगला योजना: बेटी के जन्म से स्नातक तक सहायता।" },
        ],
      },
      {
        heading: { en: "Numbers to remember", hi: "याद रखें ये नंबर" },
        bullets: [
          { en: "1090: Women Power Line, for harassment and threats.", hi: "1090: वीमेन पावर लाइन, छेड़छाड़ और धमकी के लिए।" },
          { en: "181: women’s helpline for support and counselling.", hi: "181: महिला हेल्पलाइन, सहायता और परामर्श के लिए।" },
          { en: "112: police emergency.", hi: "112: पुलिस आपातकालीन सेवा।" },
        ],
      },
      {
        heading: { en: "Across India", hi: "पूरे देश में" },
        paras: [
          { en: "Beti Bachao Beti Padhao (2015), Sukanya Samriddhi accounts, Ujjwala gas connections, and Lakhpati Didi through self-help groups all share one aim: women who are safe, educated and earning.", hi: "बेटी बचाओ बेटी पढ़ाओ (2015), सुकन्या समृद्धि खाते, उज्ज्वला गैस कनेक्शन, और स्वयं सहायता समूहों के माध्यम से लखपति दीदी: सबका एक ही लक्ष्य है, सुरक्षित, शिक्षित और कमाने वाली महिलाएँ।" },
        ],
      },
    ],
    stance: [
      { en: "Nari Shakti is the strength of the nation. Safety comes first, because a girl who is afraid on the road to school cannot study. Then come education and income, so that she decides her own future.", hi: "नारी शक्ति ही राष्ट्र शक्ति है। सुरक्षा पहले, क्योंकि स्कूल के रास्ते में डरी बेटी पढ़ नहीं सकती। फिर शिक्षा और आय, ताकि वह अपना भविष्य स्वयं तय करे।" },
      { en: "Every year in Harhua, more than 10,000 sisters tie rakhi to Vinod ji; that promise of protection is a public responsibility.", hi: "हरहुआ में हर वर्ष 10,000 से अधिक बहनें विनोद जी को राखी बाँधती हैं; रक्षा का यह वचन एक सार्वजनिक दायित्व है।" },
    ],
    official: { label: "missionshakti.up.gov.in", url: "https://missionshakti.up.gov.in" },
    sources: [
      { label: "Government of Uttar Pradesh: Mission Shakti", url: "https://missionshakti.up.gov.in" },
      { label: "UP Police: Women Power Line 1090", url: "https://uppolice.gov.in" },
    ],
  },
  {
    slug: "nep-2020",
    image: img("nep-2020"),
    category: "shiksha",
    date: D,
    readMin: 3,
    title: { en: "National Education Policy 2020: learning in your mother tongue, skills from class 6", hi: "राष्ट्रीय शिक्षा नीति 2020: मातृभाषा में पढ़ाई, कक्षा 6 से हुनर" },
    summary: {
      en: "The first new education policy in 34 years puts early learning, Indian languages and practical skills at the centre.",
      hi: "34 वर्षों में पहली नई शिक्षा नीति, जिसके केंद्र में शुरुआती पढ़ाई, भारतीय भाषाएँ और व्यावहारिक हुनर हैं।",
    },
    body: [
      {
        heading: { en: "What it changes", hi: "क्या बदलता है" },
        paras: [
          { en: "Approved in July 2020, the National Education Policy replaced the policy of 1986. It reshapes school into stages that follow how children learn.", hi: "जुलाई 2020 में स्वीकृत राष्ट्रीय शिक्षा नीति ने 1986 की नीति का स्थान लिया। यह स्कूली शिक्षा को बच्चों के सीखने के क्रम के अनुसार चरणों में ढालती है।" },
        ],
        bullets: [
          { en: "A 5+3+3+4 structure in place of 10+2, starting at age 3.", hi: "10+2 की जगह 5+3+3+4 ढाँचा, 3 वर्ष की आयु से शुरुआत।" },
          { en: "Teaching in the mother tongue or local language, at least until class 5 where possible.", hi: "जहाँ संभव हो, कम से कम कक्षा 5 तक मातृभाषा या स्थानीय भाषा में पढ़ाई।" },
          { en: "Vocational learning with internships from class 6.", hi: "कक्षा 6 से इंटर्नशिप सहित व्यावसायिक शिक्षा।" },
          { en: "In college, the freedom to enter and exit with a certificate, diploma or degree.", hi: "कॉलेज में प्रमाणपत्र, डिप्लोमा या डिग्री के साथ प्रवेश और निकास की स्वतंत्रता।" },
        ],
      },
      {
        heading: { en: "In Uttar Pradesh", hi: "उत्तर प्रदेश में" },
        paras: [
          { en: "Under Operation Kayakalp, government primary schools are being given toilets, drinking water, boundary walls and smart classes, and Nipun Bharat focuses on reading and arithmetic by class 3.", hi: "ऑपरेशन कायाकल्प के तहत सरकारी प्राथमिक विद्यालयों में शौचालय, पेयजल, चहारदीवारी और स्मार्ट क्लास दिए जा रहे हैं, और निपुण भारत कक्षा 3 तक पढ़ने-गिनने पर ध्यान देता है।" },
        ],
      },
    ],
    stance: [
      { en: "Education must build character and confidence, not only marks. A child who learns first in Hindi or Bhojpuri understands more, and grows up proud of her language.", hi: "शिक्षा केवल अंक नहीं, चरित्र और आत्मविश्वास बनाए। जो बच्चा पहले हिंदी या भोजपुरी में सीखता है, वह अधिक समझता है और अपनी भाषा पर गर्व के साथ बड़ा होता है।" },
      { en: "A problem in your village school (teacher, toilet, water)? Register it on e-Shikayat under Education.", hi: "गाँव के विद्यालय में शिक्षक, शौचालय या पानी की समस्या? ई-शिकायत पर ‘शिक्षा’ श्रेणी में दर्ज करें।" },
    ],
    official: { label: "education.gov.in", url: "https://www.education.gov.in/nep" },
    sources: [{ label: "Ministry of Education: NEP 2020", url: "https://www.education.gov.in/nep" }],
  },
  {
    slug: "mudra-vishwakarma",
    image: img("mudra-vishwakarma"),
    category: "rozgar",
    date: D,
    readMin: 3,
    title: { en: "Mudra and PM Vishwakarma: loans without collateral for your own work", hi: "मुद्रा और पीएम विश्वकर्मा: अपने काम के लिए बिना गारंटी ऋण" },
    summary: {
      en: "Loans up to ₹20 lakh for small businesses, and cheap credit, training and a toolkit for carpenters, potters, tailors and other artisans.",
      hi: "छोटे व्यवसाय के लिए ₹20 लाख तक का ऋण, और बढ़ई, कुम्हार, दर्ज़ी जैसे कारीगरों के लिए सस्ता ऋण, प्रशिक्षण और टूलकिट।",
    },
    highlight: { value: { en: "₹20 lakh", hi: "₹20 लाख" }, label: { en: "maximum Mudra loan", hi: "अधिकतम मुद्रा ऋण" } },
    body: [
      {
        heading: { en: "Pradhan Mantri Mudra Yojana", hi: "प्रधानमंत्री मुद्रा योजना" },
        paras: [
          { en: "Started in April 2015, Mudra gives loans without collateral through banks to start or grow a small non-farm business.", hi: "अप्रैल 2015 में शुरू मुद्रा योजना में बैंकों से बिना गारंटी ऋण मिलता है, छोटा ग़ैर-कृषि व्यवसाय शुरू करने या बढ़ाने के लिए।" },
        ],
        bullets: [
          { en: "Shishu: up to ₹50,000.", hi: "शिशु: ₹50,000 तक।" },
          { en: "Kishore: ₹50,000 to ₹5 lakh.", hi: "किशोर: ₹50,000 से ₹5 लाख।" },
          { en: "Tarun: ₹5 lakh to ₹10 lakh.", hi: "तरुण: ₹5 लाख से ₹10 लाख।" },
          { en: "Tarun Plus: up to ₹20 lakh, for those who have repaid a Tarun loan.", hi: "तरुण प्लस: ₹20 लाख तक, तरुण ऋण चुका चुके उद्यमियों के लिए।" },
        ],
      },
      {
        heading: { en: "PM Vishwakarma", hi: "पीएम विश्वकर्मा" },
        paras: [
          { en: "Launched in September 2023 for artisans in 18 traditional trades, including carpenters, potters, tailors, goldsmiths and boat makers.", hi: "सितंबर 2023 में 18 पारंपरिक व्यवसायों के कारीगरों के लिए शुरू, जिनमें बढ़ई, कुम्हार, दर्ज़ी, सुनार और नाव बनाने वाले शामिल हैं।" },
        ],
        bullets: [
          { en: "Skill training with a daily stipend, and a toolkit incentive of up to ₹15,000.", hi: "दैनिक भत्ते के साथ कौशल प्रशिक्षण, और ₹15,000 तक का टूलकिट प्रोत्साहन।" },
          { en: "Collateral-free loans of ₹1 lakh, then ₹2 lakh, at 5% interest.", hi: "5% ब्याज पर बिना गारंटी ₹1 लाख, फिर ₹2 लाख का ऋण।" },
          { en: "Register at a CSC with Aadhaar, mobile and bank details; verification is done through the Gram Panchayat.", hi: "आधार, मोबाइल और बैंक विवरण के साथ जन सेवा केंद्र पर पंजीकरण; सत्यापन ग्राम पंचायत के माध्यम से।" },
        ],
      },
    ],
    stance: [
      { en: "Employment does not only mean a job: it means the young person who becomes an employer. Harhua’s weavers and craftsmen carry Kashi’s name; with credit and skills they can carry it further.", hi: "रोज़गार का अर्थ केवल नौकरी नहीं, वह युवा भी है जो स्वयं रोज़गार देने वाला बनता है। हरहुआ के बुनकर और कारीगर काशी का नाम लेकर चलते हैं; ऋण और हुनर से वे इसे और आगे ले जा सकते हैं।" },
    ],
    official: { label: "mudra.org.in · pmvishwakarma.gov.in", url: "https://pmvishwakarma.gov.in" },
    sources: [
      { label: "MUDRA", url: "https://www.mudra.org.in" },
      { label: "PM Vishwakarma", url: "https://pmvishwakarma.gov.in" },
    ],
  },
  {
    slug: "bharat-2014-ke-baad",
    image: img("bharat-2014-ke-baad"),
    category: "vikas",
    date: D,
    readMin: 3,
    title: { en: "India before and after 2014: what the figures show", hi: "2014 से पहले और बाद का भारत: आँकड़े क्या कहते हैं" },
    summary: {
      en: "Highways up by more than half, airports more than doubled, medical colleges doubled, and 56 crore people with a bank account for the first time.",
      hi: "राजमार्ग डेढ़ गुना से अधिक, हवाई अड्डे दोगुने से अधिक, मेडिकल कॉलेज दोगुने, और 56 करोड़ लोगों का पहली बार बैंक खाता।",
    },
    highlight: { value: { en: "74 → 160", hi: "74 → 160" }, label: { en: "airports, 2014 to 2025", hi: "हवाई अड्डे, 2014 से 2025" } },
    body: [
      {
        paras: [
          { en: "In 2014 India had 91,287 km of national highways and 74 airports. By March 2025 it had 1,46,204 km of highways and 160 airports. Medical colleges grew from 387 to 780, and MBBS seats from 51,348 to 1,18,137.", hi: "2014 में भारत में 91,287 किमी राष्ट्रीय राजमार्ग और 74 हवाई अड्डे थे। मार्च 2025 तक 1,46,204 किमी राजमार्ग और 160 हवाई अड्डे हो गए। मेडिकल कॉलेज 387 से बढ़कर 780 हुए, और एमबीबीएस सीटें 51,348 से 1,18,137।" },
          { en: "The change that touches the poorest is easiest to miss: 56 crore Jan Dhan accounts, 10 crore free gas connections, and 24.82 crore people out of multidimensional poverty between 2013-14 and 2022-23, by NITI Aayog’s estimate.", hi: "सबसे गरीब तक पहुँचा बदलाव सबसे कम दिखता है: 56 करोड़ जन धन खाते, 10 करोड़ निःशुल्क गैस कनेक्शन, और नीति आयोग के अनुमान के अनुसार 2013-14 से 2022-23 के बीच 24.82 करोड़ लोग बहुआयामी गरीबी से बाहर।" },
        ],
      },
    ],
    stance: [
      { en: "Development is measured by whether it reached the last house in the village. These figures are the record we ask to be judged on.", hi: "विकास इससे मापा जाता है कि वह गाँव के अंतिम घर तक पहुँचा या नहीं। यही वह रिकॉर्ड है जिस पर हम परखे जाना चाहते हैं।" },
    ],
    sources: [
      { label: "PIB: 11 years of transforming infrastructure (June 2025)", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jun/doc2025611568101.pdf" },
      { label: "PIB: 11 years of PM Jan Dhan Yojana (August 2025)", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/aug/doc2025827621301.pdf" },
    ],
    cta: { href: "/vikas-yatra", label: { en: "See every figure with its source", hi: "हर आँकड़ा स्रोत के साथ देखें" } },
  },
  {
    slug: "uttar-pradesh-2017-ke-baad",
    image: img("uttar-pradesh-2017-ke-baad"),
    category: "vikas",
    date: D,
    readMin: 3,
    title: { en: "Uttar Pradesh since 2017: from ‘BIMARU’ to growth engine", hi: "2017 के बाद उत्तर प्रदेश: ‘बीमारू’ से विकास के इंजन तक" },
    summary: {
      en: "The state economy grew from ₹13.30 lakh crore to ₹30.25 lakh crore, expressways crossed the state, and Kashi got the Vishwanath Dham.",
      hi: "राज्य की अर्थव्यवस्था ₹13.30 लाख करोड़ से ₹30.25 लाख करोड़ हुई, एक्सप्रेसवे पूरे प्रदेश में फैले, और काशी को विश्वनाथ धाम मिला।",
    },
    highlight: { value: { en: "₹30.25 lakh cr", hi: "₹30.25 लाख करोड़" }, label: { en: "state economy, 2024-25", hi: "राज्य की अर्थव्यवस्था, 2024-25" } },
    body: [
      {
        paras: [
          { en: "According to the state’s first Economic Survey (2025-26), Uttar Pradesh’s economy grew from ₹13.30 lakh crore in 2016-17 to ₹30.25 lakh crore in 2024-25, about 10.8% a year.", hi: "राज्य के पहले आर्थिक सर्वेक्षण (2025-26) के अनुसार उत्तर प्रदेश की अर्थव्यवस्था 2016-17 के ₹13.30 लाख करोड़ से बढ़कर 2024-25 में ₹30.25 लाख करोड़ हो गई, यानी हर वर्ष लगभग 10.8% की वृद्धि।" },
          { en: "Of 22 expressways planned, 7 are in use and 3 are under construction. Investment proposals worth over ₹50 lakh crore are in the pipeline.", hi: "योजनाबद्ध 22 एक्सप्रेसवे में से 7 पर यातायात चालू है और 3 निर्माणाधीन हैं। ₹50 लाख करोड़ से अधिक के निवेश प्रस्ताव पाइपलाइन में हैं।" },
        ],
      },
      {
        heading: { en: "For Kashi", hi: "काशी के लिए" },
        bullets: [
          { en: "Shri Kashi Vishwanath Dham, dedicated on 13 December 2021.", hi: "श्री काशी विश्वनाथ धाम, 13 दिसंबर 2021 को लोकार्पित।" },
          { en: "Purvanchal Expressway, opened in November 2021.", hi: "पूर्वांचल एक्सप्रेसवे, नवंबर 2021 में खुला।" },
          { en: "Banarasi silk as Varanasi’s One District One Product.", hi: "वाराणसी का ‘एक जनपद एक उत्पाद’: बनारसी रेशम।" },
        ],
      },
    ],
    stance: [
      { en: "Law and order came first, because no investor and no daughter feels safe without it. Investment and roads followed. Harhua, on the edge of Varanasi, is part of this growth, and must get its share.", hi: "पहले क़ानून-व्यवस्था, क्योंकि उसके बिना न निवेशक सुरक्षित महसूस करता है, न बेटी। फिर निवेश और सड़कें आईं। वाराणसी से सटा हरहुआ इस विकास का हिस्सा है, और उसे उसका हक़ मिलना चाहिए।" },
    ],
    sources: [
      { label: "Uttar Pradesh Economic Survey 2025-26 (summary)", url: "https://oga-prod.angelone.in/news/economy/uttar-pradesh-economic-survey-2025-26-highlights-1-trillion-roadmap" },
    ],
    cta: { href: "/vikas-yatra", label: { en: "See UP’s figures", hi: "उत्तर प्रदेश के आँकड़े देखें" } },
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
