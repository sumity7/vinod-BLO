import type { L } from "@/lib/i18n";

/**
 * Verified facts about Vinod Kumar Upadhyay. Source: the client brief and "Vinod ji Biodata.pdf".
 * Rule: only facts from those two sources appear here. Private details in the biodata (date of
 * birth, parents, home address, phone, email) are deliberately NOT published.
 */

export const introduction: L = {
  en: "Vinod Kumar Upadhyay is the Block Pramukh of Harhua Block, Varanasi. Rooted in the Rashtriya Swayamsevak Sangh from childhood, he joined the Bharatiya Janata Party at 18 and has worked at booth, sector, mandal and regional levels.",
  hi: "विनोद कुमार उपाध्याय हरहुआ ब्लॉक, वाराणसी के ब्लॉक प्रमुख हैं। बाल्यकाल से राष्ट्रीय स्वयंसेवक संघ से जुड़े रहे, 18 वर्ष की आयु में भारतीय जनता पार्टी की सदस्यता ली और बूथ, सेक्टर, मंडल एवं क्षेत्रीय स्तर पर कार्य किया।",
};

export const quickFacts: { label: L; value: L }[] = [
  {
    label: { en: "Role", hi: "दायित्व" },
    value: { en: "Block Pramukh, Harhua Block", hi: "ब्लॉक प्रमुख, हरहुआ ब्लॉक" },
  },
  {
    label: { en: "Constituency", hi: "क्षेत्र" },
    value: { en: "Shivpur Assembly, Varanasi", hi: "शिवपुर विधानसभा, वाराणसी" },
  },
  {
    label: { en: "Party", hi: "दल" },
    value: { en: "Bharatiya Janata Party", hi: "भारतीय जनता पार्टी" },
  },
  {
    label: { en: "Focus", hi: "कार्यक्षेत्र" },
    value: { en: "Public service and development", hi: "जनसेवा एवं विकास" },
  },
];

/** The short text on the home page: the first two paragraphs of the personal profile. */
export const aboutPreview: L[] = [
  {
    en: "Vinod Kumar Upadhyay ‘Babbu’ is the Block Pramukh of Harhua development block, Varanasi. He was born into a respected family of Goithaha village in Varanasi district and was educated in Kashi. Since childhood he has been drawn to nationalist thought, social service and organisational work.",
    hi: "विनोद कुमार उपाध्याय ‘बब्बू’ वाराणसी के हरहुआ विकास खंड के ब्लॉक प्रमुख हैं। उनका जन्म वाराणसी जनपद के गोइठहां गाँव के एक प्रतिष्ठित परिवार में हुआ और उनकी शिक्षा-दीक्षा काशी में ही संपन्न हुई। बचपन से ही राष्ट्रवादी विचारधारा, सामाजिक सेवा और संगठनात्मक कार्यों के प्रति उनका विशेष झुकाव रहा है।",
  },
  {
    en: "A senior and dedicated worker of the Bharatiya Janata Party, he is counted among the close associates of Shri Anil Rajbhar, Cabinet Minister in the Uttar Pradesh government and MLA from Shivpur. In July 2021 the BJP named him its candidate for Block Pramukh of Harhua, and such was his standing in the area that he was elected unopposed.",
    hi: "वे भारतीय जनता पार्टी के एक वरिष्ठ और समर्पित कार्यकर्ता हैं और उत्तर प्रदेश सरकार के कैबिनेट मंत्री व शिवपुर विधायक श्री अनिल राजभर के निकट सहयोगियों में गिने जाते हैं। जुलाई 2021 में भाजपा ने उन्हें हरहुआ विकास खंड से ब्लॉक प्रमुख का उम्मीदवार बनाया और क्षेत्र में अपनी मज़बूत पकड़ के कारण वे निर्विरोध ब्लॉक प्रमुख चुने गए।",
  },
  {
    en: "His simple nature, and being always within reach of the people, have made him a popular leader of the countryside. Taking service to the last person in society, and working steadily to resolve people’s problems, is the central aim of his public life.",
    hi: "अपने सरल स्वभाव और जनता के बीच हमेशा उपलब्ध रहने के कारण उनकी छवि एक लोकप्रिय ग्रामीण जननेता की है। समाज के अंतिम व्यक्ति तक सेवा पहुँचाना और जनसमस्याओं के समाधान के लिए निरंतर प्रयास करना उनके सार्वजनिक जीवन का मुख्य उद्देश्य है।",
  },
];

export const biography: { id: string; title: L; body: L[] }[] = [
  {
    id: "profile",
    title: { en: "Personal profile", hi: "व्यक्तिगत परिचय" },
    // The home page's biography, with his years in the Sangh and the party between its paragraphs.
    body: [
      aboutPreview[0],
      {
        en: "Through the shakhas of the Rashtriya Swayamsevak Sangh from a young age, he absorbed discipline, service, values and patriotism. He joined the Bharatiya Janata Party at 18, beginning an active political life, and has played an active role in strengthening the organisation at booth, sector, mandal and regional levels.",
        hi: "बाल्यकाल से राष्ट्रीय स्वयंसेवक संघ की शाखाओं से जुड़कर उन्होंने अनुशासन, सेवा, संस्कार और राष्ट्रभक्ति की भावना को आत्मसात किया। 18 वर्ष की आयु में भारतीय जनता पार्टी की सदस्यता ग्रहण कर सक्रिय राजनीतिक जीवन की शुरुआत की और बूथ, सेक्टर, मंडल एवं क्षेत्रीय स्तर पर संगठन को मज़बूत करने में सक्रिय भूमिका निभाई।",
      },
      aboutPreview[1],
      aboutPreview[2],
    ],
  },
  {
    id: "responsibilities",
    title: { en: "Responsibilities", hi: "दायित्व" },
    body: [
      {
        en: "Block Pramukh, Harhua Block, Varanasi.",
        hi: "ब्लॉक प्रमुख, हरहुआ ब्लॉक, वाराणसी।",
      },
      {
        en: "President, Late Vaijanti Devi Memorial Trust, Varanasi.",
        hi: "अध्यक्ष, स्व० वैजंती देवी मेमोरियल ट्रस्ट, वाराणसी।",
      },
      {
        en: "Convenor, Kashi region, Divyanand Prem Seva Mission, Haridwar.",
        hi: "संयोजक, काशी अंचल, दिव्यानंद प्रेम सेवा मिशन, हरिद्वार।",
      },
      {
        en: "Head, Cow Rearing and Cow-based Farming, Kashi North division (Gau Seva Samvardhan Gatividhi), Rashtriya Swayamsevak Sangh (Kashi).",
        hi: "गौ पालन और गौ-आधारित कृषि प्रमुख, काशी उत्तर भाग (गौ सेवा संवर्धन गतिविधि), राष्ट्रीय स्वयंसेवक संघ (काशी)।",
      },
      {
        en: "Former Co-City Convenor, Dharm Jagran, Kashi, Uttar Pradesh.",
        hi: "पूर्व सह नगर संयोजक, धर्म जागरण, काशी, उत्तर प्रदेश।",
      },
    ],
  },
  {
    id: "vision",
    title: { en: "Vision and resolve", hi: "दृष्टि और संकल्प" },
    body: [
      {
        en: "My goal is to make the organisation stronger in Shivpur and across Varanasi district, to take the benefit of schemes to the poor and those in need, and to advance a politics of development and service.",
        hi: "मेरा लक्ष्य विधानसभा क्षेत्र शिवपुर सहित जनपद वाराणसी में संगठन को और अधिक मज़बूत करना, गरीबों एवं ज़रूरतमंदों तक योजनाओं का लाभ पहुँचाना तथा विकास और सेवा की राजनीति को आगे बढ़ाना है।",
      },
      {
        en: "Working to carry Prime Minister Shri Narendra Modi’s resolve of service, good governance and welfare of the poor to every household, and to realise Chief Minister Shri Yogi Adityanath’s model of development, security and good governance in the region.",
        hi: "माननीय प्रधानमंत्री श्री नरेंद्र मोदी जी के सेवा, सुशासन और गरीब कल्याण के संकल्प को जन-जन तक पहुँचाने, और माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी के विकास, सुरक्षा और सुशासन के मॉडल को क्षेत्र में साकार करने के लिए प्रयासरत।",
      },
      {
        en: "I see office as a means of service, and try to remain active among the people at all times.",
        hi: "पद को सेवा का माध्यम मानते हुए जनता के बीच निरंतर सक्रिय रहने का प्रयास करता हूँ।",
      },
    ],
  },
];
