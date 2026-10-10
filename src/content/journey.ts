import type { L } from "@/lib/i18n";

/**
 * Political and public journey, from "Vinod ji Biodata.pdf". The biodata gives the steps in order
 * but no dates, so none are shown; steps are numbered instead of dated.
 */

export const ownJourney: L[] = [
  {
    en: "From the shakhas of the Rashtriya Swayamsevak Sangh in childhood to the Bharatiya Janata Party at 18, and from booth-level work to Block Pramukh of Harhua: a steady climb through the organisation.",
    hi: "बाल्यकाल में राष्ट्रीय स्वयंसेवक संघ की शाखाओं से, 18 वर्ष की आयु में भारतीय जनता पार्टी तक, और बूथ स्तर के कार्य से ब्लॉक प्रमुख, हरहुआ तक: संगठन के भीतर निरंतर आगे बढ़ती यात्रा।",
  },
];

/** Responsibilities he holds, shown beside the journey. */
export const ownRoles: { title: L; body: L }[] = [
  {
    title: { en: "Block Pramukh", hi: "ब्लॉक प्रमुख" },
    body: { en: "Harhua Block, Varanasi.", hi: "हरहुआ ब्लॉक, वाराणसी।" },
  },
  {
    title: { en: "President", hi: "अध्यक्ष" },
    body: {
      en: "Late Vaijanti Devi Memorial Trust, Varanasi.",
      hi: "स्व० वैजंती देवी मेमोरियल ट्रस्ट, वाराणसी।",
    },
  },
  {
    title: { en: "Convenor", hi: "संयोजक" },
    body: {
      en: "Kashi region, Divyanand Prem Seva Mission, Haridwar.",
      hi: "काशी अंचल, दिव्यानंद प्रेम सेवा मिशन, हरिद्वार।",
    },
  },
  {
    title: { en: "Cow-based farming", hi: "गौ-आधारित कृषि" },
    body: {
      en: "Head, Cow Rearing and Cow-based Farming, Kashi North, Rashtriya Swayamsevak Sangh.",
      hi: "गौ पालन और गौ-आधारित कृषि प्रमुख, काशी उत्तर भाग, राष्ट्रीय स्वयंसेवक संघ।",
    },
  },
  {
    title: { en: "Dharm Jagran", hi: "धर्म जागरण" },
    body: {
      en: "Former Co-City Convenor, Kashi, Uttar Pradesh.",
      hi: "पूर्व सह नगर संयोजक, काशी, उत्तर प्रदेश।",
    },
  },
];

/** The four turning points shown on the home page and in the Political Journey section. */
export const highlights: { label: L; title: L; body: L }[] = [
  {
    label: { en: "At 18", hi: "18 वर्ष की आयु में" },
    title: { en: "Joined the BJP", hi: "भाजपा की सदस्यता" },
    body: {
      en: "Took up membership of the Bharatiya Janata Party and began an active political life.",
      hi: "भारतीय जनता पार्टी की सदस्यता ग्रहण कर सक्रिय राजनीतिक जीवन की शुरुआत की।",
    },
  },
  {
    label: { en: "Membership drive", hi: "सदस्यता अभियान" },
    title: { en: "2000+ new members", hi: "2000+ नए सदस्य" },
    body: {
      en: "Connected more than 2000 new members to the party during its membership campaign.",
      hi: "पार्टी के सदस्यता अभियान के अंतर्गत 2000 से अधिक नए सदस्यों को भारतीय जनता पार्टी से जोड़ा।",
    },
  },
  {
    label: { en: "Mann Ki Baat", hi: "मन की बात" },
    title: { en: "Convenor", hi: "संयोजक" },
    body: {
      en: "Worked to take the Prime Minister’s ‘Mann Ki Baat’ down to the booth level.",
      hi: "माननीय प्रधानमंत्री जी के कार्यक्रम ‘मन की बात’ को बूथ स्तर तक पहुँचाने का प्रयास किया।",
    },
  },
  {
    label: { en: "Today", hi: "वर्तमान" },
    title: { en: "Block Pramukh, Harhua", hi: "ब्लॉक प्रमुख, हरहुआ" },
    body: {
      en: "Responsible for public service and development across Harhua Block, Varanasi district.",
      hi: "हरहुआ ब्लॉक, जनपद वाराणसी में जनसेवा एवं विकास कार्यों का दायित्व।",
    },
  },
];

export type JourneyStep = {
  id: string;
  title: L;
  body: L;
  items?: L[];
  badge?: L;
  current?: boolean;
};

/** The full journey, in the order the biodata gives it. */
export const steps: JourneyStep[] = [
  {
    id: "shakha",
    title: { en: "Rooted in the Sangh shakhas", hi: "संघ की शाखाओं से जुड़ाव" },
    body: {
      en: "From childhood, the RSS shakhas instilled discipline, service, values and patriotism.",
      hi: "बाल्यकाल से राष्ट्रीय स्वयंसेवक संघ की शाखाओं से जुड़कर अनुशासन, सेवा, संस्कार और राष्ट्रभक्ति की भावना को आत्मसात किया।",
    },
  },
  {
    id: "bjp",
    title: { en: "Joining the BJP", hi: "भाजपा की सदस्यता" },
    body: {
      en: "Joined the Bharatiya Janata Party at the age of 18 and began an active political life.",
      hi: "18 वर्ष की आयु में भारतीय जनता पार्टी की सदस्यता ग्रहण कर सक्रिय राजनीतिक जीवन की शुरुआत की।",
    },
  },
  {
    id: "booth",
    title: { en: "Booth-level organisational work", hi: "बूथ स्तर का संगठनात्मक कार्य" },
    body: {
      en: "Began organisational work at the booth level, taking the party’s principles and policies to every household.",
      hi: "बूथ स्तर पर संगठनात्मक कार्य प्रारंभ करते हुए पार्टी की रीति-नीति को जन-जन तक पहुँचाने का कार्य किया।",
    },
  },
  {
    id: "levels",
    title: { en: "Sector, mandal and regional levels", hi: "सेक्टर, मंडल एवं क्षेत्रीय स्तर" },
    body: {
      en: "Played an active role in strengthening the organisation at sector, mandal and regional levels.",
      hi: "सेक्टर, मंडल एवं क्षेत्रीय स्तर पर संगठन को मज़बूत करने में सक्रिय भूमिका निभाई।",
    },
  },
  {
    id: "elections",
    title: { en: "Active role in elections", hi: "चुनावों में सक्रिय योगदान" },
    body: {
      en: "Contributed actively, from booth management to public outreach, to the success of BJP candidates in Assembly and Lok Sabha elections.",
      hi: "विधानसभा एवं लोकसभा चुनावों में भाजपा प्रत्याशियों को विजयी बनाने हेतु बूथ स्तर से लेकर जनसंपर्क तक सक्रिय योगदान दिया।",
    },
  },
  {
    id: "membership",
    title: { en: "Membership campaign", hi: "सदस्यता अभियान" },
    badge: { en: "2000+ new members", hi: "2000+ नए सदस्य" },
    body: {
      en: "Connected more than 2000 new members to the Bharatiya Janata Party during the membership campaign.",
      hi: "पार्टी के सदस्यता अभियान के अंतर्गत 2000 से अधिक नए सदस्यों को भारतीय जनता पार्टी से जोड़ा।",
    },
  },
  {
    id: "mann-ki-baat",
    title: { en: "Convenor, ‘Mann Ki Baat’", hi: "‘मन की बात’ के संयोजक" },
    body: {
      en: "As convenor of Prime Minister Shri Narendra Modi’s ‘Mann Ki Baat’, worked to take the programme down to the booth level.",
      hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी के कार्यक्रम ‘मन की बात’ के संयोजक के रूप में कार्यक्रम को बूथ स्तर तक पहुँचाने का प्रयास किया।",
    },
  },
  {
    id: "campaigns",
    title: { en: "Campaigns and public-outreach programmes", hi: "अभियान एवं जन-संपर्क कार्यक्रम" },
    body: {
      en: "Large-scale tree plantation in Shivpur Assembly Constituency under ‘Ek Ped Maa Ke Naam’, and active participation in:",
      hi: "‘एक पेड़ माँ के नाम’ के अंतर्गत शिवपुर विधानसभा क्षेत्र में बड़ी संख्या में वृक्षारोपण, और इन अभियानों में सक्रिय सहभागिता:",
    },
    items: [
      { en: "Seva Pakhwada", hi: "सेवा पखवाड़ा" },
      { en: "Beneficiary outreach campaign", hi: "लाभार्थी संपर्क अभियान" },
      { en: "Booth empowerment campaign", hi: "बूथ सशक्तिकरण अभियान" },
      { en: "Public outreach campaign", hi: "जनसंपर्क अभियान" },
      { en: "Viksit Bharat Sankalp campaign", hi: "विकसित भारत संकल्प अभियान" },
      { en: "Tiranga Yatra", hi: "तिरंगा यात्रा" },
      { en: "Cleanliness campaign", hi: "स्वच्छता अभियान" },
      { en: "Tree-plantation campaign", hi: "वृक्षारोपण अभियान" },
    ],
  },
  {
    id: "bridge",
    title: { en: "A bridge between organisation and people", hi: "संगठन और जनता के बीच सेतु" },
    body: {
      en: "Built coordination between senior leadership, party workers and the public to strengthen the party, and carried every responsibility given by the party with full commitment.",
      hi: "संगठन के वरिष्ठ नेतृत्व, कार्यकर्ताओं एवं जनता के बीच समन्वय स्थापित कर पार्टी को मज़बूत करने का कार्य किया, और पार्टी द्वारा दिए गए प्रत्येक दायित्व को पूर्ण निष्ठा से निभाया।",
    },
  },
  {
    id: "block-pramukh",
    title: { en: "Block Pramukh, Harhua", hi: "ब्लॉक प्रमुख, हरहुआ" },
    current: true,
    body: {
      en: "From organisation to representation: responsible for public service and development as Block Pramukh of Harhua Block, Varanasi district.",
      hi: "संगठन से जनप्रतिनिधित्व तक: हरहुआ ब्लॉक, जनपद वाराणसी के ब्लॉक प्रमुख के रूप में जनसेवा एवं विकास कार्यों का दायित्व।",
    },
  },
];
