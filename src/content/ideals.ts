import type { L } from "@/lib/i18n";

/**
 * Our Ideals, in four categories, each shown as a portrait with a quote and the years of their
 * life. The people, categories, quotes and portraits follow keshavprasadmaurya.com/ideals; the
 * Hindi is theirs with spelling fixed, the English is our translation.
 *
 * Portraits live at /public/images/ideals/<slug>.webp, cropped to 4:5 from freely licensed images on
 * Wikimedia Commons. `credit` records each one's author, licence and source page; by the owner's
 * choice it is not shown on the site, although CC BY and CC BY-SA ask for it. Ashok Singhal has no
 * free portrait there, so his is the full-size (239x300) portrait from that page, enlarged to 480x600.
 * `born`/`died` are Gregorian dates, given only where they are well recorded; they drive the
 * jayanti and punyatithi e-cards.
 */
export type IdealCategory = {
  slug: string;
  name: L;
  /** Accent for the portrait ring. */
  tone: "saffron" | "ganga" | "sindoor" | "marigold";
};

export const idealCategories: IdealCategory[] = [
  { slug: "sangh-bjp", name: { en: "Leading lights of the Sangh and BJP", hi: "संघ एवं भाजपा के शिखर पुरुष" }, tone: "saffron" },
  { slug: "bharat-ke-nayak", name: { en: "Great heroes of Bharat", hi: "भारत वर्ष के महान नायक" }, tone: "sindoor" },
  { slug: "dharm-ke-pranetaa", name: { en: "Great founders of Indian dharma", hi: "भारतीय धर्म के महान प्रणेता" }, tone: "marigold" },
  { slug: "jannayak", name: { en: "Leaders of social and political awakening", hi: "सामाजिक एवं राजनीतिक चेतना के जननायक" }, tone: "ganga" },
];

export type Ideal = {
  slug: string;
  category: string;
  name: L;
  /** Two letters for the monogram, in each script. */
  initials: L;
  /** Years of their life as shown after the name, if known. */
  years?: L;
  /** Line breaks mark the lines of a couplet. */
  quote: L;
  /** Who wrote the lines, when it is not the person themselves. */
  source?: L;
  image: string;
  /** Author, licence and Commons file page of the portrait (kept for the record, not shown). */
  credit?: { by: string; license: string; url: string };
  born?: string;
  died?: string;
};

const img = (slug: string) => `/images/ideals/${slug}.webp`;
const y = (years: string): L => ({ en: years, hi: years });
const bc = (years: string): L => ({ en: `${years} BC`, hi: `ई.पू. ${years}` });

export const ideals: Ideal[] = [
  /* ---------------- संघ एवं भाजपा के शिखर पुरुष ---------------- */
  {
    slug: "atal-bihari-vajpayee",
    category: "sangh-bjp",
    name: { en: "Shri Atal Bihari Vajpayee", hi: "श्री अटल बिहारी वाजपेयी" },
    initials: { en: "AV", hi: "अ" },
    years: y("1924–2018"),
    quote: {
      en: "The nation is a temple and we are its priests. In the worship of the nation, we must dedicate ourselves completely.",
      hi: "देश एक मंदिर है, हम पुजारी हैं। राष्ट्रदेव की पूजा में हमें अपने को समर्पित कर देना चाहिए।",
    },
    image: img("atal-bihari-vajpayee"),
    credit: { by: "Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Atal_Bihari_Vajpayee_(crop_2).jpg" },
    born: "1924-12-25",
    died: "2018-08-16",
  },
  {
    slug: "narendra-modi",
    category: "sangh-bjp",
    name: { en: "Shri Narendra Modi", hi: "श्री नरेन्द्र मोदी" },
    initials: { en: "NM", hi: "न" },
    years: y("1950"),
    quote: {
      en: "Do not dream of becoming something; dream of doing something and showing it.",
      hi: "कुछ बनने के लिए सपने मत देखो, बल्कि कुछ ऐसा करके दिखाना है, ऐसा सपना देखना चाहिए।",
    },
    image: img("narendra-modi"),
    credit: { by: "Prime Minister’s Office", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:The_official_portrait_of_Shri_Narendra_Modi,_the_Prime_Minister_of_the_Republic_of_India.jpg" },
  },
  {
    slug: "ashok-singhal",
    category: "sangh-bjp",
    name: { en: "Shri Ashok Singhal", hi: "श्री अशोक सिंघल" },
    initials: { en: "AS", hi: "अ" },
    years: y("1926–2015"),
    quote: {
      en: "The Shrimad Bhagavad Gita is the greatest source of dharmic awakening and devotion to duty. I regard it as the inspiration for every good deed of my life.",
      hi: "धर्म जागरण एवं कर्मनिष्ठा का सबसे बड़ा स्रोत श्रीमद्भगवद्गीता ग्रन्थ है। मैं अपने जीवनकाल के सत्कर्मों का प्रेरणा स्रोत इसे ही मानता हूँ।",
    },
    // Its own file name: the earlier thumbnail was a tight, tiny crop, and cached copies of it must not linger.
    image: img("ashok-singhal-portrait"),
    born: "1926-09-27",
    died: "2015-11-17",
  },
  {
    slug: "veer-savarkar",
    category: "sangh-bjp",
    name: { en: "Veer Savarkar", hi: "वीर सावरकर" },
    initials: { en: "VS", hi: "सा" },
    years: y("1883–1966"),
    quote: {
      en: "Motherland! I have already laid my heart at your feet. Believing that service of the country is service of God, I have served God by serving you.",
      hi: "मातृभूमि! तेरे चरणों में पहले ही मैं अपना मन अर्पित कर चुका हूँ। देश-सेवा ही ईश्वर-सेवा है, यह मानकर मैंने तेरी सेवा के माध्यम से भगवान की सेवा की।",
    },
    image: img("veer-savarkar"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Swatyantra_Vir_Savarkar.jpg" },
    born: "1883-05-28",
    died: "1966-02-26",
  },
  {
    slug: "syama-prasad-mookerjee",
    category: "sangh-bjp",
    name: { en: "Dr. Syama Prasad Mookerjee", hi: "डॉ. श्यामा प्रसाद मुखर्जी" },
    initials: { en: "SM", hi: "श्या" },
    years: y("1901–1953"),
    quote: {
      en: "One country cannot have two constitutions, two heads and two flags. “My son’s death is the death of a son of Mother India,” said Dr. Mookerjee’s mother, Jogamaya Devi, on hearing of his untimely death.",
      hi: "एक देश में दो विधान, दो प्रधान और दो निशान नहीं चलेंगे। “मेरे पुत्र की मृत्यु भारत माता के पुत्र की मृत्यु है”, अपने पुत्र की असामयिक मृत्यु का समाचार सुनने के पश्चात डॉ. मुखर्जी की माता योगमाया देवी ने कहा था।",
    },
    image: img("syama-prasad-mookerjee"),
    credit: { by: "NFAI Digital Archives", license: "CC BY-SA 2.5", url: "https://commons.wikimedia.org/wiki/File:Dr._Syama_Prasad_Mookerjee.jpg" },
    born: "1901-07-06",
    died: "1953-06-23",
  },
  {
    slug: "deendayal-upadhyaya",
    category: "sangh-bjp",
    name: { en: "Pt. Deendayal Upadhyaya", hi: "श्री पं. दीन दयाल उपाध्याय" },
    initials: { en: "DU", hi: "दी" },
    years: y("1916–1968"),
    quote: {
      en: "Economic plans and economic progress will be measured not by those who have reached the top of the ladder, but by the person at the very bottom.",
      hi: "आर्थिक योजनाओं तथा आर्थिक प्रगति का माप समाज के ऊपर की सीढ़ी पर पहुँचे हुए व्यक्ति नहीं, बल्कि सबसे नीचे के स्तर पर विद्यमान व्यक्ति से होगा।",
    },
    image: img("deendayal-upadhyaya"),
    credit: { by: "India Post", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Deendayal_Upadhyaya_2018_stamp_of_India.jpg" },
    born: "1916-09-25",
    died: "1968-02-11",
  },
  {
    slug: "madhav-sadashiv-golwalkar",
    category: "sangh-bjp",
    name: { en: "Shri Madhav Sadashiv Golwalkar", hi: "श्री माधव सदाशिव गोलवलकर" },
    initials: { en: "MG", hi: "गो" },
    years: y("1906–1973"),
    quote: {
      en: "The land of Bharat is so sacred that the truth seen across the whole world is experienced here, and nowhere else.",
      hi: "भारत-भूमि इतनी पावन है कि अखिल विश्व में दिखाई देने वाला सत् तत्व यहीं अनुभूत किया जाता है, अन्यत्र नहीं।",
    },
    image: img("madhav-sadashiv-golwalkar"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:M_S_Golwalkar.jpg" },
    born: "1906-02-19",
    died: "1973-06-05",
  },
  {
    slug: "keshav-baliram-hedgewar",
    category: "sangh-bjp",
    name: { en: "Dr. Keshav Baliram Hedgewar", hi: "डॉ. केशव बलिराम हेडगेवार" },
    initials: { en: "KH", hi: "हे" },
    years: y("1889–1940"),
    quote: {
      en: "To awaken and organise this society is to awaken and organise the nation. This is the work of the nation.",
      hi: "इस समाज को जागृत एवं सुसंघटित करना ही राष्ट्र का जागरण एवं संघटन है। यही राष्ट्र कार्य है।",
    },
    image: img("keshav-baliram-hedgewar"),
    credit: { by: "Sudhirn", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Dr._Hedgevar.jpg" },
    born: "1889-04-01",
    died: "1940-06-21",
  },

  /* ---------------- भारत वर्ष के महान नायक ---------------- */
  {
    slug: "maharana-pratap",
    category: "bharat-ke-nayak",
    name: { en: "Maharana Pratap", hi: "महाराणा प्रताप" },
    initials: { en: "MP", hi: "प्र" },
    years: y("1540–1597"),
    quote: {
      en: "This world listens only to those who act. So stay firm and steady on the path of your duty.",
      hi: "ये संसार कर्मवीरों की ही सुनता है। अतः अपने कर्म के मार्ग पर अडिग और प्रशस्त रहो।",
    },
    image: img("maharana-pratap"),
    credit: { by: "Surendra Singh Shaktawat", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Maharana_Pratap_By_Surendra_Singh_Shaktawat.jpg" },
  },
  {
    slug: "chhatrapati-shivaji-maharaj",
    category: "bharat-ke-nayak",
    name: { en: "Chhatrapati Shivaji Maharaj", hi: "शिवाजी महाराज" },
    initials: { en: "SM", hi: "शि" },
    years: y("1630–1680"),
    quote: {
      en: "First the nation, then the guru, then one’s parents, then God. So look first to the nation, not to yourself.",
      hi: "सर्वप्रथम राष्ट्र, फिर गुरु, फिर माता-पिता, फिर परमेश्वर। अतः पहले खुद को नहीं, राष्ट्र को देखना चाहिए।",
    },
    image: img("chhatrapati-shivaji-maharaj"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Shivaji_British_Museum.jpg" },
  },
  {
    slug: "guru-gobind-singh",
    category: "bharat-ke-nayak",
    name: { en: "Guru Gobind Singh", hi: "गुरु गोबिन्द सिंह" },
    initials: { en: "GS", hi: "गो" },
    years: y("1666–1708"),
    quote: {
      en: "The greatest happiness and lasting peace come when one ends selfishness within oneself.",
      hi: "सबसे महान सुख और स्थायी शांति तब प्राप्त होती है, जब कोई अपने भीतर से स्वार्थ को समाप्त कर देता है।",
    },
    image: img("guru-gobind-singh"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Portrait_of_Guru_Gobind_Singh_commissioned_by_the_Raja_of_Mandi,_end_of_17th_century.jpg" },
  },
  {
    slug: "samrat-ashoka",
    category: "bharat-ke-nayak",
    name: { en: "Samrat Ashoka", hi: "सम्राट अशोक" },
    initials: { en: "SA", hi: "अ" },
    years: bc("304–232"),
    quote: {
      en: "At all times, whether I am eating or in my chambers, let the reporters keep me informed of the people’s affairs. I will work everywhere. The welfare of the people is my duty, and its root is effort and promptness in work.",
      hi: "प्रत्येक समय, मैं चाहे भोजन कर रहा हूँ या शयनागार में हूँ, प्रतिवेदक प्रजा की स्थिति से मुझे अवगत करें। मैं सर्वत्र कार्य करूँगा। प्रजा हित मेरा कर्तव्य है और इसका मूल उद्योग तथा कार्य तत्परता है।",
    },
    image: img("samrat-ashoka"),
    credit: { by: "Amansinghmurao", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Samrat_Ashok.jpg" },
  },
  {
    slug: "chandragupta-maurya",
    category: "bharat-ke-nayak",
    name: { en: "Samrat Chandragupta Maurya", hi: "सम्राट चन्द्रगुप्त मौर्य" },
    initials: { en: "CM", hi: "च" },
    years: bc("345–297"),
    quote: {
      en: "Once you have made a decision in life, do not look back, for those who keep looking back do not make history.",
      hi: "जीवन में एक बार जो फैसला कर लिया, तो फिर पीछे मुड़कर मत देखो, क्योंकि पलट-पलट कर देखने वाले इतिहास नहीं बनाते।",
    },
    image: img("chandragupta-maurya"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Chandragupt_maurya_Birla_mandir_6_dec_2009_(31)_(cropped).JPG" },
  },
  {
    slug: "chanakya",
    category: "bharat-ke-nayak",
    name: { en: "Kautilya (Chanakya)", hi: "कौटिल्य (चाणक्य)" },
    initials: { en: "KC", hi: "चा" },
    years: bc("375–283"),
    quote: {
      en: "Education is the best friend. An educated person is respected everywhere. Education outshines beauty and youth.",
      hi: "शिक्षा सबसे अच्छी मित्र है। एक शिक्षित व्यक्ति हर जगह सम्मान पाता है। शिक्षा सौंदर्य और यौवन को परास्त कर देती है।",
    },
    image: img("chanakya"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Chanakya_artistic_depiction.jpg" },
  },
  {
    slug: "kabir-das",
    category: "bharat-ke-nayak",
    name: { en: "Kabir Das", hi: "कबीर दास" },
    initials: { en: "KD", hi: "क" },
    years: y("1398–1494"),
    quote: {
      en: "I went looking for the wicked and found no one wicked.\nWhen I searched my own heart, I found no one worse than me.",
      hi: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय,\nजो दिल खोजा आपना, मुझसे बुरा न कोय।",
    },
    image: img("kabir-das"),
    credit: { by: "ShubhamSay", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Kabir_Das.jpg" },
  },
  {
    slug: "sant-ravidas",
    category: "bharat-ke-nayak",
    name: { en: "Sant Ravidas", hi: "रविदास" },
    initials: { en: "SR", hi: "र" },
    years: y("1450–1520"),
    quote: {
      en: "Stay bound to your work, and never give up hope of its fruit.\nWork is the dharma of a human being: so says Ravidas, speaking the truth.",
      hi: "करम बंधन में बन्ध रहियो, फल की ना तज्जियो आस।\nकर्म मानुष का धर्म है, सत् भाखै रविदास।",
    },
    image: img("sant-ravidas"),
    credit: { by: "Mayank.teenu", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Guru_Ravidas.jpg" },
  },
  {
    slug: "tulsidas",
    category: "bharat-ke-nayak",
    name: { en: "Tulsidas", hi: "तुलसी दास" },
    initials: { en: "TD", hi: "तु" },
    years: y("1511–1623"),
    quote: {
      en: "Sweet words, says Tulsi, spread happiness all around.\nThey are the one charm that wins every heart: give up harsh words.",
      hi: "तुलसी मीठे बचन ते सुख उपजत चहुँ ओर।\nबसीकरन इक मंत्र है परिहरु बचन कठोर॥",
    },
    image: img("tulsidas"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Goswami_Tulsidas_Awadhi_Hindi_Poet.jpg" },
  },

  /* ---------------- भारतीय धर्म के महान प्रणेता ---------------- */
  {
    slug: "bhagwan-shri-ram",
    category: "dharm-ke-pranetaa",
    name: { en: "Bhagwan Shri Ram", hi: "भगवान श्री राम" },
    initials: { en: "R", hi: "रा" },
    quote: {
      en: "The good bear hardship to spare others pain; the wicked live to bring others pain.",
      hi: "संत दूसरों को दुःख से बचाने के लिए कष्ट सहते हैं। दुष्ट लोग दूसरों को दुःख में डालने के लिए हैं।",
    },
    image: img("bhagwan-shri-ram"),
    credit: { by: "Wikimedia Commons", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Rama_in_Adhyatma_Ramayana.jpg" },
  },
  {
    slug: "bhagwan-mahavir",
    category: "dharm-ke-pranetaa",
    name: { en: "Bhagwan Mahavir", hi: "भगवान महावीर" },
    initials: { en: "M", hi: "म" },
    years: bc("599–527"),
    quote: {
      en: "Non-violence is the highest dharma, for it wishes the good of all.",
      hi: "अहिंसा ही सबसे बड़ा धर्म है, जो सबके कल्याण की कामना करता है।",
    },
    image: img("bhagwan-mahavir"),
    credit: { by: "Dayodaya", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Mahavir.jpg" },
  },
  {
    slug: "bhagwan-buddha",
    category: "dharm-ke-pranetaa",
    name: { en: "Bhagwan Buddha", hi: "भगवान बुद्ध" },
    initials: { en: "B", hi: "बु" },
    years: bc("563–483"),
    quote: {
      en: "Better than a thousand hollow words is one word that brings peace.",
      hi: "हजारों खोखले शब्दों से अच्छा वह एक शब्द है, जो शांति लाए।",
    },
    image: img("bhagwan-buddha"),
    credit: { by: "พระมหาเทวประภาส วชิรญาณเมธี", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg" },
  },
  {
    slug: "bhagwan-shri-krishna",
    category: "dharm-ke-pranetaa",
    name: { en: "Bhagwan Shri Krishna", hi: "भगवान श्री कृष्ण" },
    initials: { en: "K", hi: "कृ" },
    quote: {
      en: "I see all beings alike; none is less dear to me, and none more. But those who worship me with love live in me, and I come into their lives.",
      hi: "मैं सभी प्राणियों को समान रूप से देखता हूँ, ना कोई मुझे कम प्रिय है ना अधिक। लेकिन जो मेरी प्रेमपूर्वक आराधना करते हैं, वो मेरे भीतर रहते हैं और मैं उनके जीवन में आता हूँ।",
    },
    image: img("bhagwan-shri-krishna"),
    credit: { by: "Wikimedia Commons", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Krishna_Holds_Up_Mount_Govardhan_(MET_70694)_cropped.png" },
  },
  {
    slug: "guru-nanak",
    category: "dharm-ke-pranetaa",
    name: { en: "Guru Nanak", hi: "गुरु नानक" },
    initials: { en: "GN", hi: "ना" },
    years: y("1469–1539"),
    quote: {
      en: "God is one, and to God all are equal.",
      hi: "परमात्मा एक है और उसके लिए सब एक समान हैं।",
    },
    image: img("guru-nanak"),
    credit: { by: "Amritpal Singh Mann", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Mural_painting_of_Guru_Nanak_from_Gurdwara_Baba_Atal_Rai.jpg" },
  },
  {
    slug: "gayatri-parivar",
    category: "dharm-ke-pranetaa",
    name: { en: "Gayatri Parivar", hi: "गायत्री परिवार" },
    initials: { en: "GP", hi: "गा" },
    quote: {
      en: "The measure of success is not victory or defeat, nor wealth, but the duties one has carried out faithfully even in adversity and loss.",
      hi: "सफलता का मापदंड विजय-पराजय अथवा धन-दौलत नहीं, बल्कि वे कर्तव्य हैं, जिनका किसी ने आपत्ति तथा हानि की स्थिति में भी निष्ठापूर्वक पालन किया है।",
    },
    image: img("gayatri-parivar"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Pt.ShriramSharma_Smiling.jpg" },
  },

  /* ---------------- सामाजिक एवं राजनीतिक चेतना के जननायक ---------------- */
  {
    slug: "sardar-patel",
    category: "jannayak",
    name: { en: "Sardar Vallabhbhai Patel", hi: "सरदार वल्लभ भाई पटेल" },
    initials: { en: "VP", hi: "स" },
    years: y("1875–1950"),
    quote: {
      en: "There is something unique in the soil of our country; that is why, despite great obstacles, it has always been the home of great souls.",
      hi: "हमारे देश की मिट्टी में कुछ अनूठा है, तभी तो कठिन बाधाओं के बावजूद हमेशा महान आत्माओं का निवास स्थान रहा है।",
    },
    image: img("sardar-patel"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Sardar_patel_(cropped).jpg" },
    born: "1875-10-31",
    died: "1950-12-15",
  },
  {
    slug: "morarji-desai",
    category: "jannayak",
    name: { en: "Morarji Desai", hi: "मोरारजी देसाई" },
    initials: { en: "MD", hi: "मो" },
    years: y("1896–1995"),
    quote: {
      en: "Life can become hard at any moment, and it can become very easy at any moment. It all depends on how we adjust to it.",
      hi: "किसी भी समय जीवन मुश्किल बन सकता है और किसी भी समय जीवन बहुत आसान बन सकता है। यह सब हमारे जीवन के समायोजन पर निर्भर करता है।",
    },
    image: img("morarji-desai"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Morarji_Desai_During_his_visit_to_the_United_States_of_America_(cropped).jpg" },
    born: "1896-02-29",
    died: "1995-04-10",
  },
  {
    slug: "br-ambedkar",
    category: "jannayak",
    name: { en: "Dr. Bhimrao Ambedkar", hi: "डॉ. भीमराव अम्बेडकर" },
    initials: { en: "BA", hi: "भी" },
    years: y("1891–1956"),
    quote: {
      en: "Equality may be a fiction, but nonetheless one must accept it as a governing principle.",
      hi: "समानता एक कल्पना हो सकती है, लेकिन फिर भी इसे एक गवर्निंग सिद्धांत के रूप में स्वीकार करना होगा।",
    },
    image: img("br-ambedkar"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Dr._Bhimrao_Ambedkar.jpg" },
    born: "1891-04-14",
    died: "1956-12-06",
  },
  {
    slug: "mother-teresa",
    category: "jannayak",
    name: { en: "Mother Teresa", hi: "मदर टेरेसा" },
    initials: { en: "MT", hi: "टे" },
    years: y("1910–1997"),
    quote: {
      en: "We feel that what we do is just a drop in the ocean. But the ocean would be less because of that missing drop.",
      hi: "हम सब यही सोचते हैं कि हमारे किए गए कार्य तो समुद्र में एक बूँद के बराबर होते हैं, लेकिन ध्यान रखने वाली बात यह भी है कि उस बूँद के बिना सागर का पानी तो कम ही होगा।",
    },
    image: img("mother-teresa"),
    credit: { by: "Kingkongphoto & www.celebrity-photos.com", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Mother_Teresa_1.jpg" },
    born: "1910-08-26",
    died: "1997-09-05",
  },
  {
    slug: "apj-abdul-kalam",
    category: "jannayak",
    name: { en: "A.P.J. Abdul Kalam", hi: "अब्दुल कलाम" },
    initials: { en: "AK", hi: "क" },
    years: y("1931–2015"),
    quote: {
      en: "Happiness in life is truly felt only when it has been won through hardship.",
      hi: "जीवन में सुख का अनुभव तभी प्राप्त होता है, जब इन सुखों को कठिनाइयों से प्राप्त किया जाता है।",
    },
    image: img("apj-abdul-kalam"),
    credit: { by: "Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam.jpg" },
    born: "1931-10-15",
    died: "2015-07-27",
  },
  {
    slug: "swami-vivekananda",
    category: "jannayak",
    name: { en: "Swami Vivekananda", hi: "स्वामी विवेकानन्द" },
    initials: { en: "SV", hi: "वि" },
    years: y("1863–1902"),
    quote: {
      en: "Whatever the task, arise at once, awake, and stop not till the goal is reached.",
      hi: "किसी भी कार्य को करने के लिए तुरंत उठो, जागो और तब तक नहीं रुकना जब तक लक्ष्य हासिल न हो जाए।",
    },
    image: img("swami-vivekananda"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Swami_Vivekananda-1893-09-signed.jpg" },
    born: "1863-01-12",
    died: "1902-07-04",
  },
  {
    slug: "ramakrishna-paramhansa",
    category: "jannayak",
    name: { en: "Ramakrishna Paramahamsa", hi: "राम कृष्ण परमहंस" },
    initials: { en: "RP", hi: "रा" },
    years: y("1836–1886"),
    quote: {
      en: "When the flower blooms, the bees come uninvited. When we become worthy of renown, people will sing our praises unasked.",
      hi: "जब फूल खिलता है तो मधुमक्खी बिना बुलाए आ जाती है, और हम जब प्रसिद्ध होंगे तो लोग बिना बताए हमारा गुणगान करने लगेंगे।",
    },
    image: img("ramakrishna-paramhansa"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Ramakrishna.jpg" },
    born: "1836-02-18",
    died: "1886-08-16",
  },
  {
    slug: "rabindranath-tagore",
    category: "jannayak",
    name: { en: "Rabindranath Tagore", hi: "रवीन्द्रनाथ टैगोर" },
    initials: { en: "RT", hi: "र" },
    years: y("1861–1941"),
    quote: {
      en: "Let us not pray to be sheltered from dangers, but to be fearless in facing them.",
      hi: "हम ये प्रार्थना ना करें कि हमारे ऊपर खतरे न आएँ, बल्कि ये करें कि हम उनका सामना करने में निडर रहें।",
    },
    image: img("rabindranath-tagore"),
    credit: { by: "Georges Chevalier", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:1926_Rabindrath_Tagore.jpg" },
    born: "1861-05-07",
    died: "1941-08-07",
  },
  {
    slug: "subhas-chandra-bose",
    category: "jannayak",
    name: { en: "Subhas Chandra Bose", hi: "सुभाष चन्द्र बोस" },
    initials: { en: "SB", hi: "सु" },
    years: y("1897–1945"),
    quote: {
      en: "Our road may be frightening and stony, and our journey however painful, yet we must go forward. The day of success may be far off, but its coming is certain.",
      hi: "हमारी राह भले ही भयानक और पथरीली हो, हमारी यात्रा चाहे कितनी भी कष्टदायक हो, फिर भी हमें आगे बढ़ना ही है। सफलता का दिन दूर हो सकता है, पर उसका आना अनिवार्य है।",
    },
    image: img("subhas-chandra-bose"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Subhas_Chandra_Bose_NRB.jpg" },
    born: "1897-01-23",
  },
  {
    slug: "swami-dayanand-saraswati",
    category: "jannayak",
    name: { en: "Swami Dayanand Saraswati (Arya Samaj)", hi: "स्वामी दयानन्द सरस्वती (आर्य समाज)" },
    initials: { en: "DS", hi: "द" },
    years: y("1824–1883"),
    quote: {
      en: "Give the world your best, and the best will come back to you.",
      hi: "दुनिया को अपना सर्वश्रेष्ठ दीजिए और आपके पास सर्वश्रेष्ठ लौटकर आएगा।",
    },
    image: img("swami-dayanand-saraswati"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Dayananda_Saraswati.jpg" },
    born: "1824-02-12",
    died: "1883-10-30",
  },
  {
    slug: "chandrashekhar-azad",
    category: "jannayak",
    name: { en: "Chandrashekhar Azad", hi: "चन्द्रशेखर आज़ाद" },
    initials: { en: "CA", hi: "आ" },
    years: y("1906–1931"),
    quote: {
      en: "Do not wait every day for others to break your record; try to break it yourself, for the fight for success is with yourself.",
      hi: "आप हर दिन दूसरों को अपने रिकॉर्ड तोड़ने की प्रतीक्षा मत करो, बल्कि खुद उसे तोड़ने का प्रयत्न करो, क्योंकि सफलता के लिए आपकी खुद से लड़ाई है।",
    },
    image: img("chandrashekhar-azad"),
    credit: { by: "Unknown author", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Chandrasekhar_Azad.jpg" },
    born: "1906-07-23",
    died: "1931-02-27",
  },
  {
    slug: "rani-lakshmibai",
    category: "jannayak",
    name: { en: "Rani Lakshmibai of Jhansi", hi: "झाँसी की रानी लक्ष्मीबाई" },
    initials: { en: "RL", hi: "ल" },
    years: y("1828–1858"),
    quote: {
      en: "In eighteen fifty-seven that old sword flashed again;\nwe heard the story from the bards of Bundelkhand:\nhow bravely she fought, the Queen of Jhansi.",
      hi: "चमक उठी सन सत्तावन में, वह तलवार पुरानी थी,\nबुंदेले हरबोलों के मुँह हमने सुनी कहानी थी,\nखूब लड़ी मर्दानी वह तो झाँसी वाली रानी थी।",
    },
    source: { en: "Subhadra Kumari Chauhan", hi: "सुभद्रा कुमारी चौहान" },
    image: img("rani-lakshmibai"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Rani_of_jhansi.jpg" },
    born: "1828-11-19",
    died: "1858-06-18",
  },
  {
    slug: "jyotiba-phule",
    category: "jannayak",
    name: { en: "Mahatma Jyotiba Phule", hi: "महात्मा ज्योतिबा फुले" },
    initials: { en: "JP", hi: "ज्यो" },
    years: y("1827–1890"),
    quote: {
      en: "Without learning, wisdom was lost; without wisdom, morality was lost;\nwithout morality, progress was lost; without progress, wealth was lost.",
      hi: "विद्या बिन मति गयी, मति बिना नीति गयी,\nनीति बिना गति गयी, गति बिना वित्त गया।",
    },
    image: img("jyotiba-phule"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Mahatma_Jotirao_Phule.jpg" },
    born: "1827-04-11",
    died: "1890-11-28",
  },
  {
    slug: "savitribai-phule",
    category: "jannayak",
    name: { en: "Savitribai Phule", hi: "सावित्रीबाई फुले" },
    initials: { en: "SP", hi: "सा" },
    years: y("1831–1897"),
    quote: {
      en: "Go, get an education. Be self-reliant, be hard-working, work, and gather knowledge and wealth. Without knowledge, all is lost.",
      hi: "जाओ, जाकर पढ़ो-लिखो, बनो आत्मनिर्भर, बनो मेहनती, काम करो, ज्ञान और धन इकट्ठा करो। ज्ञान के बिना सब खो जाता है।",
    },
    image: img("savitribai-phule"),
    credit: { by: "Wander-earth", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Savitribai_Phule_Jyotira_Phule_Phulewada.tif" },
    born: "1831-01-03",
    died: "1897-03-10",
  },
  {
    slug: "bhagat-singh",
    category: "jannayak",
    name: { en: "Bhagat Singh", hi: "भगत सिंह" },
    initials: { en: "BS", hi: "भ" },
    years: y("1907–1931"),
    quote: {
      en: "Any man who stands for progress has to criticise, disbelieve and challenge every item of the old faith.",
      hi: "जो व्यक्ति भी विकास के लिए खड़ा है, उसे हर एक रूढ़िवादी चीज़ की आलोचना करनी होगी, उसमें अविश्वास करना होगा तथा उसे चुनौती देनी होगी।",
    },
    image: img("bhagat-singh"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Lahore_conspiracy_case_poster_9th_Oct_193o_jindal_sunam_12x9_copy_(cropped).jpg" },
    born: "1907-09-28",
    died: "1931-03-23",
  },
  {
    slug: "mahatma-gandhi",
    category: "jannayak",
    name: { en: "Mahatma Gandhi", hi: "महात्मा गांधी" },
    initials: { en: "MG", hi: "गां" },
    years: y("1869–1948"),
    quote: {
      en: "We must know the value of cleanliness and hygiene… We must remove filth from our midst… Is cleanliness not its own reward?",
      hi: "हमें स्वच्छता और सफाई का मूल्य पता होना चाहिए… गंदगी को हमें अपने बीच से हटाना होगा… क्या स्वच्छता स्वयं इनाम नहीं है?",
    },
    image: img("mahatma-gandhi"),
    credit: { by: "Wikimedia Commons", license: "public domain", url: "https://commons.wikimedia.org/wiki/File:Mahatma-Gandhi,_studio,_1931.jpg" },
    born: "1869-10-02",
    died: "1948-01-30",
  },
];

export const getCategory = (slug: string) => idealCategories.find((c) => c.slug === slug);

export const idealsIn = (category: string) => ideals.filter((i) => i.category === category);

/** A different thought each day, the same for everyone on that day. */
export function thoughtOfTheDay(today = new Date()) {
  const day = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000);
  return ideals[day % ideals.length];
}
