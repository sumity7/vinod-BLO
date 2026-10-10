import type { L } from "@/lib/i18n";

/** Public work, from "Vinod ji Biodata.pdf". The biodata names no projects, villages or dates, so none are shown. */

export const development: {
  id: string;
  title: L;
  intro: L;
  areas: { title: L; body: L }[];
  principlesTitle: L;
  principles: L[];
} = {
  id: "development",
  title: { en: "Development work", hi: "विकास कार्य" },
  intro: {
    en: "Speeding up Gram Panchayat development: roads, drains, drinking water, sanitation, lighting, education and health.",
    hi: "ग्राम पंचायतों के विकास को गति: सड़क, नाली, पेयजल, स्वच्छता, प्रकाश, शिक्षा और स्वास्थ्य।",
  },
  areas: [
    {
      title: { en: "Road development", hi: "सड़क विकास" },
      body: { en: "Work to strengthen road facilities in rural areas.", hi: "ग्रामीण क्षेत्रों में सड़क सुविधाओं को सुदृढ़ करने हेतु कार्य।" },
    },
    {
      title: { en: "Drinking water", hi: "पेयजल व्यवस्था" },
      body: { en: "Work to strengthen drinking-water facilities in rural areas.", hi: "ग्रामीण क्षेत्रों में पेयजल सुविधाओं को सुदृढ़ करने हेतु कार्य।" },
    },
    {
      title: { en: "Education", hi: "शिक्षा विकास" },
      body: { en: "Work to strengthen education facilities in rural areas.", hi: "ग्रामीण क्षेत्रों में शिक्षा सुविधाओं को सुदृढ़ करने हेतु कार्य।" },
    },
    {
      title: { en: "Health facilities", hi: "स्वास्थ्य सुविधाएं" },
      body: { en: "Work to strengthen health facilities in rural areas.", hi: "ग्रामीण क्षेत्रों में स्वास्थ्य सुविधाओं को सुदृढ़ करने हेतु कार्य।" },
    },
    {
      title: { en: "Drainage and sanitation", hi: "नाली एवं स्वच्छता" },
      body: {
        en: "Work to strengthen drains, sanitation and street lighting in rural areas.",
        hi: "ग्रामीण क्षेत्रों में नाली, स्वच्छता और प्रकाश व्यवस्था को सुदृढ़ करने हेतु कार्य।",
      },
    },
    {
      title: { en: "Gram Panchayat development", hi: "ग्राम पंचायत विकास" },
      body: {
        en: "As Block Pramukh, a steady effort to speed up development in Gram Panchayats, hearing problems at panchayat level and coordinating with the officials concerned.",
        hi: "ब्लॉक प्रमुख के रूप में ग्राम पंचायतों के विकास कार्यों को गति देने का निरंतर प्रयास; पंचायत स्तर पर जनसमस्याएँ सुनकर संबंधित अधिकारियों से समन्वय।",
      },
    },
  ],
  principlesTitle: { en: "How the work is done", hi: "कार्य का तरीका" },
  principles: [
    {
      en: "Transparency, quality and timeliness as priorities in development work",
      hi: "विकास कार्यों में पारदर्शिता, गुणवत्ता एवं समयबद्धता को प्राथमिकता",
    },
    {
      en: "Taking welfare schemes to eligible beneficiaries",
      hi: "जनकल्याणकारी योजनाओं को पात्र लाभार्थियों तक पहुँचाना",
    },
    {
      en: "Being present among people regularly to resolve their problems",
      hi: "जनता के बीच नियमित रूप से उपस्थित रहकर जनसमस्याओं का निराकरण",
    },
  ],
};

export type SocialChapter = {
  id: string;
  title: L;
  body: L;
  items?: L[];
  badge?: L;
};

export const socialService: { id: string; title: L; intro: L; chapters: SocialChapter[] } = {
  id: "social-service",
  title: { en: "Social service", hi: "सामाजिक सेवा" },
  intro: {
    en: "Stories of standing with people when they needed it.",
    hi: "ज़रूरत के समय लोगों के साथ खड़े रहने की कहानियाँ।",
  },
  chapters: [
    {
      id: "covid",
      title: { en: "The COVID period: standing with people in a crisis", hi: "कोरोना काल: संकट के समय, लोगों के साथ" },
      body: {
        en: "During COVID, ration packets reached thousands of families in need, and protective and medical supplies reached people who needed them during the pandemic.",
        hi: "कोरोना काल में हज़ारों ज़रूरतमंद परिवारों को राशन पैकेट वितरित किए, और महामारी के दौरान ज़रूरतमंदों को सुरक्षा एवं चिकित्सा सामग्री उपलब्ध कराई।",
      },
      items: [
        { en: "Ration packets", hi: "राशन पैकेट वितरण" },
        { en: "Masks and sanitisers", hi: "मास्क एवं सैनिटाइज़र" },
        { en: "Oxygen cylinders", hi: "ऑक्सीजन सिलेंडर" },
        { en: "Essential medical supplies", hi: "आवश्यक चिकित्सा सामग्री" },
        {
          en: "Food, water and facilities for migrant workers and people in quarantine",
          hi: "प्रवासी श्रमिकों व क्वारंटाइन में रह रहे लोगों के लिए भोजन, पानी एवं सुविधाएँ",
        },
        { en: "Meals for stranded workers and travellers", hi: "राह में फँसे मज़दूरों एवं यात्रियों के लिए भोजन" },
      ],
    },
    {
      id: "marriage",
      title: { en: "Daughters’ weddings: standing in as a guardian", hi: "बेटियों का विवाह: अभिभावक की भूमिका" },
      body: {
        en: "Consistent financial help with, and meeting the costs of, weddings for girls from poor families, standing in as a guardian at the weddings of daughters from families with limited means.",
        hi: "गरीब एवं ज़रूरतमंद बालिकाओं के विवाह में आर्थिक सहयोग और विवाह खर्च उठाने का कार्य निरंतर किया; आर्थिक रूप से कमज़ोर परिवारों की बेटियों के विवाह में अभिभावक की भूमिका निभाई।",
      },
      items: [{ en: "Marriage assistance", hi: "विवाह सहायता" }],
    },
    {
      id: "education",
      title: { en: "Education: learning for every child", hi: "शिक्षा: हर बच्चे तक पढ़ाई" },
      body: {
        en: "Support with schooling, study materials, clothing and other essentials for children from poor families.",
        hi: "गरीब बच्चों की शिक्षा-दीक्षा, शिक्षण सामग्री, वस्त्र एवं अन्य आवश्यक सहयोग उपलब्ध कराने का कार्य।",
      },
      items: [
        { en: "Education support", hi: "शिक्षा सहायता" },
        { en: "Study materials and clothing", hi: "शिक्षण सामग्री एवं वस्त्र" },
      ],
    },
    {
      id: "rakhi",
      title: { en: "Raksha Bandhan: a sister’s affection, a brother’s promise", hi: "रक्षाबंधन: बहनों का स्नेह, भाई का वचन" },
      badge: { en: "10,000+ sisters", hi: "10,000+ बहनें" },
      body: {
        en: "On the occasion of Raksha Bandhan, as every year, more than 10,000 sisters tied rakhi and received gifts.",
        hi: "रक्षाबंधन के पावन अवसर पर प्रतिवर्ष की भाँति 10,000 से अधिक बहनों से रक्षाबंधन बँधवाकर उन्हें उपहार भेंट किए।",
      },
    },
    {
      id: "health",
      title: { en: "Health: free medical camps", hi: "स्वास्थ्य: निःशुल्क चिकित्सा शिविर" },
      body: {
        en: "Free medical camps in Varanasi and other districts, offering health check-ups, medicines and medical advice to people in need.",
        hi: "जनपद वाराणसी सहित अन्य जनपदों में निःशुल्क चिकित्सा शिविरों का आयोजन, जिनमें ज़रूरतमंदों को स्वास्थ्य परीक्षण, दवा वितरण एवं चिकित्सकीय परामर्श मिला।",
      },
      items: [
        { en: "Check-ups and medicines", hi: "स्वास्थ्य परीक्षण एवं दवा वितरण" },
        { en: "Free eye operations", hi: "निःशुल्क आँख ऑपरेशन" },
        { en: "Spectacles distribution", hi: "चश्मा वितरण" },
      ],
    },
    {
      id: "elderly",
      title: { en: "Elders and children: respect and support", hi: "बुज़ुर्ग एवं बच्चे: सम्मान और सहारा" },
      body: {
        en: "Regular service for the care and respect of the elderly; clothing, food and essentials for old-age homes and orphanages.",
        hi: "वृद्धजनों की सेवा, सम्मान एवं सहयोग के लिए समय-समय पर सेवा कार्य; वृद्धाश्रमों और अनाथालयों में वस्त्र, भोजन सामग्री एवं आवश्यक वस्तुओं का वितरण।",
      },
      items: [
        { en: "Char Dham pilgrimage for the elderly", hi: "वृद्धजनों को चारधाम यात्रा" },
        { en: "Old-age home service", hi: "वृद्धाश्रम सेवा" },
        { en: "Orphanage support", hi: "अनाथालय सहयोग" },
      ],
    },
    {
      id: "schemes",
      title: { en: "Schemes: government benefits, to those eligible", hi: "योजनाएँ: योजनाओं का लाभ, पात्र तक" },
      body: {
        en: "Camps at locations across Shivpur Assembly Constituency to bring government schemes to eligible people.",
        hi: "शिवपुर विधानसभा क्षेत्र के विभिन्न स्थानों पर शिविर लगाकर सरकारी योजनाओं का लाभ पात्र लोगों तक पहुँचाया।",
      },
      items: [
        { en: "Old-age pension", hi: "वृद्धा पेंशन" },
        { en: "Widow pension", hi: "विधवा पेंशन" },
        { en: "Disability pension", hi: "दिव्यांगजन पेंशन" },
        { en: "Ayushman card", hi: "आयुष्मान कार्ड" },
        { en: "Ration card", hi: "राशन कार्ड" },
        { en: "Aadhaar correction", hi: "आधार सुधार" },
      ],
    },
  ],
};

export const environment: { id: string; title: L; campaign: L; body: L; points: L[] } = {
  id: "environment",
  title: { en: "Environmental protection", hi: "पर्यावरण संरक्षण" },
  campaign: { en: "Ek Ped Maa Ke Naam", hi: "एक पेड़ माँ के नाम" },
  body: {
    en: "Under the ‘Ek Ped Maa Ke Naam’ campaign, tree plantation with public participation across Shivpur Assembly Constituency, and large-scale plantation drives in Varanasi carrying the message of environmental protection, treated as a social responsibility alongside development.",
    hi: "‘एक पेड़ माँ के नाम’ अभियान के तहत शिवपुर विधानसभा क्षेत्र में जनभागीदारी के साथ वृक्षारोपण कराया, और वाराणसी में बड़े स्तर पर वृक्षारोपण अभियान चलाकर पर्यावरण संरक्षण का संदेश दिया। विकास के साथ पर्यावरण संरक्षण को भी अपनी सामाजिक ज़िम्मेदारी माना।",
  },
  points: [
    { en: "Tree plantation", hi: "वृक्षारोपण" },
    { en: "Cleanliness campaigns", hi: "स्वच्छता अभियान" },
    { en: "Encouraging water conservation", hi: "जल संरक्षण के लिए प्रेरणा" },
    { en: "Public participation", hi: "जनभागीदारी" },
    { en: "Participation of youth and party workers", hi: "युवाओं एवं कार्यकर्ताओं की सहभागिता" },
  ],
};

export const publicConnect: { id: string; title: L; intro: L; summary: L } = {
  id: "public-connect",
  title: { en: "Public connect", hi: "जनसंपर्क" },
  intro: {
    en: "Ongoing conversation with every section of society: young people, women, farmers, workers, traders, the poor, the elderly and the deprived.",
    hi: "समाज के हर वर्ग (युवा, महिला, किसान, मज़दूर, व्यापारी, गरीब, बुज़ुर्ग एवं वंचित वर्ग) के साथ निरंतर संवाद।",
  },
  summary: {
    en: "Meetings with senior leadership, public programmes and religious and cultural events.",
    hi: "वरिष्ठ नेतृत्व के साथ भेंट, सार्वजनिक कार्यक्रम तथा धार्मिक-सांस्कृतिक आयोजन।",
  },
};

/** The four columns on the home page. */
export const summaries: { id: string; title: L; text: L }[] = [
  {
    id: development.id,
    title: development.title,
    text: {
      en: "Roads, drains, drinking water, sanitation, lighting, education and health across Gram Panchayats.",
      hi: "ग्राम पंचायतों में सड़क, नाली, पेयजल, स्वच्छता, प्रकाश, शिक्षा और स्वास्थ्य।",
    },
  },
  {
    id: socialService.id,
    title: socialService.title,
    text: {
      en: "Relief in the COVID period, weddings, education, health camps and care for the elderly.",
      hi: "कोरोना काल में राहत, विवाह सहायता, शिक्षा, स्वास्थ्य शिविर और वृद्धजन सेवा।",
    },
  },
  {
    id: environment.id,
    title: environment.title,
    text: {
      en: "‘Ek Ped Maa Ke Naam’, tree plantation, cleanliness and water-conservation awareness.",
      hi: "‘एक पेड़ माँ के नाम’, वृक्षारोपण, स्वच्छता और जल संरक्षण के प्रति जागरूकता।",
    },
  },
  {
    id: publicConnect.id,
    title: publicConnect.title,
    text: publicConnect.summary,
  },
];
