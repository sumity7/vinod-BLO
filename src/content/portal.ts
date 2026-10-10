import type { L, Lang } from "@/lib/i18n";

/**
 * Interface text for the citizen-service features added in version 2: e-Shikayat (complaints),
 * e-cards, Our Ideals, Vichar (articles) and Vikas Yatra (before/after figures).
 * Every string is { en, hi }; `pt(lang)` returns the text for one language.
 */

const portal = {
  nav: {
    services: { en: "Public Service", hi: "जनसेवा" },
    shikayat: { en: "e-Shikayat", hi: "ई-शिकायत" },
    shikayatNew: { en: "Register a complaint", hi: "शिकायत दर्ज करें" },
    track: { en: "Track complaint", hi: "शिकायत की स्थिति" },
    ecard: { en: "e-Card", hi: "ई-कार्ड" },
    ideals: { en: "Our Ideals", hi: "हमारे आदर्श" },
    vichar: { en: "Ideas & Articles", hi: "विचार" },
    vicharAll: { en: "Articles & schemes", hi: "लेख एवं योजनाएँ" },
    vikas: { en: "Development Journey", hi: "विकास यात्रा" },
    about: { en: "About", hi: "परिचय" },
    vimarsh: { en: "Development & Ideas", hi: "विकास विमर्श" },
  },

  vimarsh: {
    title: { en: "Development & Ideas: views and figures", hi: "विकास विमर्श: विचार और आँकड़े" },
    seoTitle: { en: "Development & Ideas: schemes, issues and the change in figures", hi: "विकास विमर्श: योजनाएँ, मुद्दे और बदलाव के आँकड़े" },
    description: {
      en: "Two parts: Vichar, articles on schemes and issues with the BJP’s position, and Vikas Yatra, India since 2014 and Uttar Pradesh since 2017 in sourced figures.",
      hi: "दो भाग: विचार, योजनाओं और मुद्दों पर लेख व भाजपा का दृष्टिकोण; और विकास यात्रा, 2014 के बाद भारत व 2017 के बाद उत्तर प्रदेश, स्रोत सहित आँकड़ों में।",
    },
    lead: {
      en: "What the government is doing, what we think about it, and what the numbers say.",
      hi: "सरकार क्या कर रही है, उस पर हमारा क्या मत है, और आँकड़े क्या कहते हैं।",
    },
    open: { en: "Open", hi: "खोलें" },
    vicharText: {
      en: "Schemes, women’s safety, education, employment and development, explained with who can benefit, how to apply and where we stand.",
      hi: "योजनाएँ, महिला सुरक्षा, शिक्षा, रोज़गार और विकास: किसे लाभ मिलेगा, आवेदन कैसे करें और हमारा मत क्या है।",
    },
    vikasText: {
      en: "Highways, airports, medical colleges, bank accounts and the state economy, then and now, each with its official source.",
      hi: "राजमार्ग, हवाई अड्डे, मेडिकल कॉलेज, बैंक खाते और राज्य की अर्थव्यवस्था: पहले और अब, हर आँकड़ा आधिकारिक स्रोत के साथ।",
    },
  },

  serviceBar: {
    label: { en: "Quick services", hi: "त्वरित सेवाएँ" },
    close: { en: "Close", hi: "बंद करें" },
    items: {
      shikayat: {
        title: { en: "Register a complaint", hi: "शिकायत दर्ज करें" },
        text: { en: "Road, water, power, pension: tell us the problem", hi: "सड़क, पानी, बिजली, पेंशन: अपनी समस्या बताएँ" },
      },
      track: {
        title: { en: "Track your complaint", hi: "शिकायत की स्थिति देखें" },
        text: { en: "Enter your ticket number", hi: "अपना टिकट नंबर डालें" },
      },
      ecard: {
        title: { en: "Make an e-card", hi: "ई-कार्ड बनाएँ" },
        text: { en: "Festival greetings with your name and photo", hi: "अपने नाम और फ़ोटो के साथ त्योहार की शुभकामनाएँ" },
      },
      vikas: {
        title: { en: "Vikas Yatra", hi: "विकास यात्रा" },
        text: { en: "India since 2014, UP since 2017, in figures", hi: "2014 के बाद भारत, 2017 के बाद उत्तर प्रदेश, आँकड़ों में" },
      },
    },
  },

  /* ---------------- e-Shikayat ---------------- */
  shikayat: {
    title: { en: "e-Shikayat: register a complaint", hi: "ई-शिकायत: अपनी शिकायत दर्ज करें" },
    seoTitle: { en: "e-Shikayat: register a complaint", hi: "ई-शिकायत: शिकायत दर्ज करें" },
    description: {
      en: "Register a public complaint with the office of the Block Pramukh, Harhua: roads, water, electricity, pension, ration and more. Get a ticket number and track its status.",
      hi: "ब्लॉक प्रमुख, हरहुआ के कार्यालय में अपनी जन-समस्या दर्ज करें: सड़क, पानी, बिजली, पेंशन, राशन आदि। टिकट नंबर पाएँ और स्थिति देखें।",
    },
    lead: {
      en: "Tell the office of the Block Pramukh about a problem in your village or ward. You get a ticket number at once, and can check what is being done with it at any time.",
      hi: "अपने गाँव या वार्ड की समस्या ब्लॉक प्रमुख कार्यालय तक पहुँचाएँ। आपको तुरंत एक टिकट नंबर मिलेगा, जिससे आप कभी भी देख सकेंगे कि शिकायत पर क्या कार्रवाई हुई।",
    },
    steps: [
      { t: { en: "Fill the form", hi: "फ़ॉर्म भरें" }, d: { en: "Your name, mobile, village and the problem.", hi: "नाम, मोबाइल, गाँव और समस्या।" } },
      { t: { en: "Get a ticket number", hi: "टिकट नंबर पाएँ" }, d: { en: "Keep it, or share it on WhatsApp.", hi: "इसे सँभालकर रखें या व्हाट्सऐप पर भेजें।" } },
      { t: { en: "Track the action", hi: "कार्रवाई देखें" }, d: { en: "Received, in progress, resolved.", hi: "प्राप्त, कार्यवाही जारी, निस्तारित।" } },
    ],
    form: {
      name: { en: "Full name", hi: "पूरा नाम" },
      mobile: { en: "Mobile number", hi: "मोबाइल नंबर" },
      mobileHint: { en: "10 digits. Used only to contact you about this complaint.", hi: "10 अंक। केवल इसी शिकायत के संबंध में संपर्क के लिए।" },
      village: { en: "Village / Gram Panchayat / Ward", hi: "गाँव / ग्राम पंचायत / वार्ड" },
      category: { en: "Type of problem", hi: "समस्या का प्रकार" },
      subject: { en: "Subject in one line", hi: "एक पंक्ति में विषय" },
      subjectPlaceholder: { en: "e.g. Handpump not working near the primary school", hi: "जैसे: प्राथमिक विद्यालय के पास का हैंडपंप ख़राब है" },
      details: { en: "Describe the problem", hi: "समस्या का विवरण" },
      detailsPlaceholder: {
        en: "Where exactly, since when, and whom it affects. Mention any earlier complaint number.",
        hi: "ठीक कहाँ, कब से, और किन लोगों पर असर है। पहले कोई शिकायत की हो तो उसका नंबर भी लिखें।",
      },
      consent: {
        en: "I agree that my name and mobile number may be used by the Block Pramukh’s office only to act on and respond to this complaint.",
        hi: "मैं सहमत हूँ कि मेरा नाम और मोबाइल नंबर ब्लॉक प्रमुख कार्यालय द्वारा केवल इस शिकायत पर कार्रवाई और उत्तर देने के लिए उपयोग किया जाए।",
      },
      submit: { en: "Register complaint", hi: "शिकायत दर्ज करें" },
      sending: { en: "Registering…", hi: "दर्ज हो रही है…" },
      required: { en: "Required", hi: "आवश्यक" },
      errors: {
        name: { en: "Enter your name (at least 2 letters).", hi: "अपना नाम लिखें (कम से कम 2 अक्षर)।" },
        mobile: { en: "Enter a valid 10-digit mobile number.", hi: "सही 10 अंकों का मोबाइल नंबर लिखें।" },
        village: { en: "Enter your village or ward.", hi: "अपना गाँव या वार्ड लिखें।" },
        category: { en: "Choose the type of problem.", hi: "समस्या का प्रकार चुनें।" },
        subject: { en: "Write the subject (at least 5 letters).", hi: "विषय लिखें (कम से कम 5 अक्षर)।" },
        details: { en: "Describe the problem (at least 15 letters).", hi: "समस्या का विवरण लिखें (कम से कम 15 अक्षर)।" },
        consent: { en: "Please tick the consent box to continue.", hi: "आगे बढ़ने के लिए सहमति पर टिक करें।" },
        server: { en: "The complaint could not be registered. Check your connection and try again.", hi: "शिकायत दर्ज नहीं हो सकी। इंटरनेट जाँचकर फिर से प्रयास करें।" },
        rate: { en: "Too many complaints from this connection. Please try again after some time.", hi: "इस कनेक्शन से बहुत अधिक शिकायतें आई हैं। कुछ समय बाद प्रयास करें।" },
      },
    },
    success: {
      title: { en: "Your complaint is registered", hi: "आपकी शिकायत दर्ज हो गई है" },
      ticket: { en: "Ticket number", hi: "टिकट नंबर" },
      keep: {
        en: "Note this number. With it and your mobile number you can check the status at any time.",
        hi: "यह नंबर नोट कर लें। इसी नंबर और अपने मोबाइल नंबर से आप कभी भी स्थिति देख सकते हैं।",
      },
      copy: { en: "Copy number", hi: "नंबर कॉपी करें" },
      copied: { en: "Copied", hi: "कॉपी हो गया" },
      whatsapp: { en: "Send to my WhatsApp", hi: "व्हाट्सऐप पर भेजें" },
      track: { en: "Check status", hi: "स्थिति देखें" },
      another: { en: "Register another complaint", hi: "एक और शिकायत दर्ज करें" },
      shareText: {
        en: "My complaint to the Block Pramukh office, Harhua is registered. Ticket: {ticket}. Track: {url}",
        hi: "ब्लॉक प्रमुख कार्यालय, हरहुआ में मेरी शिकायत दर्ज हुई। टिकट: {ticket}। स्थिति देखें: {url}",
      },
    },
    aside: {
      title: { en: "Before you write", hi: "लिखने से पहले" },
      points: [
        { en: "One complaint per problem makes it faster to act on.", hi: "एक समस्या के लिए एक शिकायत लिखें, इससे कार्रवाई जल्दी होती है।" },
        { en: "For emergencies call 112 (police), 108 (ambulance) or 1090 (women’s helpline).", hi: "आपातकाल में 112 (पुलिस), 108 (एम्बुलेंस) या 1090 (महिला हेल्पलाइन) पर कॉल करें।" },
        { en: "State-level grievances can also be filed on the IGRS portal, jansunwai.up.nic.in.", hi: "राज्य स्तर की शिकायत IGRS पोर्टल jansunwai.up.nic.in पर भी दर्ज की जा सकती है।" },
      ],
    },
  },

  categories: {
    road: { en: "Road / drain", hi: "सड़क / नाली" },
    water: { en: "Drinking water / handpump", hi: "पेयजल / हैंडपंप" },
    electricity: { en: "Electricity", hi: "बिजली" },
    pension: { en: "Pension", hi: "पेंशन" },
    ration: { en: "Ration card", hi: "राशन कार्ड" },
    housing: { en: "Housing (PM Awas)", hi: "आवास (पीएम आवास)" },
    health: { en: "Health / hospital", hi: "स्वास्थ्य / अस्पताल" },
    education: { en: "School / education", hi: "विद्यालय / शिक्षा" },
    sanitation: { en: "Cleanliness", hi: "साफ़-सफ़ाई" },
    police: { en: "Police / safety", hi: "पुलिस / सुरक्षा" },
    land: { en: "Land / revenue", hi: "भूमि / राजस्व" },
    other: { en: "Other", hi: "अन्य" },
  },

  statuses: {
    received: { en: "Received", hi: "प्राप्त" },
    progress: { en: "In progress", hi: "कार्यवाही जारी" },
    resolved: { en: "Resolved", hi: "निस्तारित" },
    rejected: { en: "Closed", hi: "बंद" },
  },

  track: {
    title: { en: "Track your complaint", hi: "शिकायत की स्थिति देखें" },
    description: {
      en: "Check the status of a complaint registered on e-Shikayat with your ticket number and mobile number.",
      hi: "ई-शिकायत पर दर्ज शिकायत की स्थिति टिकट नंबर और मोबाइल नंबर से देखें।",
    },
    lead: {
      en: "Enter the ticket number you received and the last four digits of the mobile number you gave.",
      hi: "आपको मिला टिकट नंबर और शिकायत में दिए मोबाइल नंबर के अंतिम चार अंक डालें।",
    },
    ticket: { en: "Ticket number", hi: "टिकट नंबर" },
    ticketPlaceholder: { en: "HRH-2610-XXXX", hi: "HRH-2610-XXXX" },
    last4: { en: "Last 4 digits of mobile", hi: "मोबाइल के अंतिम 4 अंक" },
    submit: { en: "Check status", hi: "स्थिति देखें" },
    checking: { en: "Checking…", hi: "जाँच हो रही है…" },
    notFound: {
      en: "No complaint matches this ticket number and mobile. Check both and try again.",
      hi: "इस टिकट नंबर और मोबाइल से कोई शिकायत नहीं मिली। दोनों जाँचकर फिर प्रयास करें।",
    },
    registered: { en: "Registered on", hi: "दर्ज करने की तिथि" },
    updated: { en: "Last update", hi: "अंतिम अपडेट" },
    reply: { en: "Reply from the office", hi: "कार्यालय का उत्तर" },
    noReply: { en: "The office has not added a reply yet.", hi: "कार्यालय ने अभी उत्तर नहीं जोड़ा है।" },
    history: { en: "Progress", hi: "प्रगति" },
    mine: { en: "Complaints from this device", hi: "इस डिवाइस से दर्ज शिकायतें" },
  },

  admin: {
    title: { en: "Office dashboard", hi: "कार्यालय डैशबोर्ड" },
    login: { en: "Sign in", hi: "साइन इन करें" },
    password: { en: "Office password", hi: "कार्यालय पासवर्ड" },
    wrong: { en: "Wrong password.", hi: "पासवर्ड ग़लत है।" },
    notSet: {
      en: "The dashboard is switched off: set ADMIN_PASSWORD in the environment variables.",
      hi: "डैशबोर्ड बंद है: एनवायरनमेंट वेरिएबल में ADMIN_PASSWORD सेट करें।",
    },
    logout: { en: "Sign out", hi: "साइन आउट" },
    all: { en: "All", hi: "सभी" },
    search: { en: "Search name, ticket, village", hi: "नाम, टिकट, गाँव खोजें" },
    empty: { en: "No complaints yet.", hi: "अभी कोई शिकायत नहीं।" },
    save: { en: "Save update", hi: "अपडेट सहेजें" },
    saved: { en: "Saved", hi: "सहेजा गया" },
    replyLabel: { en: "Reply shown to the citizen", hi: "नागरिक को दिखने वाला उत्तर" },
    demo: {
      en: "Demo storage: complaints are kept on this server only and can be lost on a restart. Connect Supabase (see README) before going live.",
      hi: "डेमो स्टोरेज: शिकायतें केवल इस सर्वर पर रखी हैं और रीस्टार्ट पर मिट सकती हैं। लाइव करने से पहले Supabase जोड़ें (README देखें)।",
    },
    total: { en: "Total", hi: "कुल" },
  },

  /* ---------------- e-card ---------------- */
  ecard: {
    title: { en: "e-Card: send greetings with your name", hi: "ई-कार्ड: अपने नाम से शुभकामनाएँ भेजें" },
    seoTitle: { en: "e-Card greetings", hi: "ई-कार्ड शुभकामनाएँ" },
    description: {
      en: "Make a festival greeting card with your name and photo alongside Vinod Kumar Upadhyay, and share it on WhatsApp.",
      hi: "विनोद कुमार उपाध्याय जी के साथ अपने नाम और फ़ोटो वाला त्योहार शुभकामना कार्ड बनाएँ और व्हाट्सऐप पर भेजें।",
    },
    lead: {
      en: "Choose an occasion, add your name and photo, and download the card or share it straight to WhatsApp.",
      hi: "अवसर चुनें, अपना नाम और फ़ोटो जोड़ें, और कार्ड डाउनलोड करें या सीधे व्हाट्सऐप पर भेजें।",
    },
    occasion: { en: "Occasion", hi: "अवसर" },
    yourName: { en: "Your name", hi: "आपका नाम" },
    namePlaceholder: { en: "e.g. Ramesh Yadav", hi: "जैसे: रमेश यादव" },
    yourPlace: { en: "Village / designation (optional)", hi: "गाँव / पद (वैकल्पिक)" },
    placePlaceholder: { en: "e.g. Booth President, Harhua", hi: "जैसे: बूथ अध्यक्ष, हरहुआ" },
    photo: { en: "Your photo (optional)", hi: "आपकी फ़ोटो (वैकल्पिक)" },
    photoHint: { en: "Stays on your phone; it is not uploaded.", hi: "फ़ोटो आपके फ़ोन में ही रहती है, कहीं अपलोड नहीं होती।" },
    removePhoto: { en: "Remove photo", hi: "फ़ोटो हटाएँ" },
    download: { en: "Download card", hi: "कार्ड डाउनलोड करें" },
    share: { en: "Share on WhatsApp", hi: "व्हाट्सऐप पर भेजें" },
    preparing: { en: "Preparing…", hi: "तैयार हो रहा है…" },
    preview: { en: "Card preview", hi: "कार्ड का पूर्वावलोकन" },
    shareFallback: {
      en: "Your card was downloaded. Attach it in WhatsApp from your gallery.",
      hi: "कार्ड डाउनलोड हो गया। व्हाट्सऐप में गैलरी से इसे जोड़कर भेजें।",
    },
    from: { en: "With best wishes", hi: "शुभेच्छु" },
    upcoming: { en: "Coming up", hi: "आने वाले अवसर" },
  },

  /* ---------------- Ideals ---------------- */
  ideals: {
    title: { en: "Our Ideals", hi: "हमारे आदर्श" },
    seoTitle: { en: "Our Ideals: the inspirations of our public life", hi: "हमारे आदर्श: हमारे सार्वजनिक जीवन के प्रेरणा स्रोत" },
    description: {
      en: "The great men and women whose lives and words guide our public life: leading lights of the Sangh and BJP, the great heroes of Bharat, the founders of Indian dharma, and the leaders of social and political awakening.",
      hi: "वे महापुरुष जिनका जीवन और विचार हमारे सार्वजनिक जीवन का मार्गदर्शन करते हैं: संघ एवं भाजपा के शिखर पुरुष, भारत वर्ष के महान नायक, भारतीय धर्म के महान प्रणेता और सामाजिक एवं राजनीतिक चेतना के जननायक।",
    },
    lead: {
      en: "Service to the last person, national unity and cultural pride: the ideas we work by come from these lives.",
      hi: "अंतिम व्यक्ति की सेवा, राष्ट्र की एकता और सांस्कृतिक गौरव: जिन विचारों पर हम चलते हैं, वे इन्हीं जीवनों से आते हैं।",
    },
    thought: { en: "Thought of the day", hi: "आज का विचार" },
    categories: { en: "Categories", hi: "श्रेणियाँ" },
    read: { en: "Read about", hi: "पढ़ें" },
    today: { en: "Today", hi: "आज" },
    inDays: { en: "in {n} days", hi: "{n} दिन में" },
    tomorrow: { en: "tomorrow", hi: "कल" },
    jayanti: { en: "Birth anniversary", hi: "जयंती" },
    punyatithi: { en: "Death anniversary", hi: "पुण्यतिथि" },
  },

  /* ---------------- Vichar ---------------- */
  vichar: {
    title: { en: "Vichar: articles on schemes and issues", hi: "विचार: योजनाओं और मुद्दों पर लेख" },
    seoTitle: { en: "Vichar: schemes, issues and our position", hi: "विचार: योजनाएँ, मुद्दे और हमारा दृष्टिकोण" },
    description: {
      en: "Articles on government schemes and public issues (education, women’s safety, employment, development) and the BJP’s position on them.",
      hi: "सरकारी योजनाओं और जन-मुद्दों (शिक्षा, महिला सुरक्षा, रोज़गार, विकास) पर लेख और उन पर भाजपा का दृष्टिकोण।",
    },
    lead: {
      en: "What each scheme is, who it is for, how to apply, and why we stand behind it.",
      hi: "हर योजना क्या है, किसके लिए है, आवेदन कैसे करें, और हम इसके साथ क्यों खड़े हैं।",
    },
    all: { en: "All", hi: "सभी" },
    readTime: { en: "{n} min read", hi: "{n} मिनट में पढ़ें" },
    what: { en: "What it is", hi: "योजना क्या है" },
    who: { en: "Who can benefit", hi: "किसे लाभ मिलेगा" },
    how: { en: "How to apply", hi: "आवेदन कैसे करें" },
    stance: { en: "Our position", hi: "भाजपा का दृष्टिकोण" },
    sources: { en: "Sources", hi: "स्रोत" },
    official: { en: "Official website", hi: "आधिकारिक वेबसाइट" },
    related: { en: "Read next", hi: "आगे पढ़ें" },
    latest: { en: "Latest articles", hi: "नए लेख" },
    viewAll: { en: "All articles", hi: "सभी लेख" },
    share: { en: "Share on WhatsApp", hi: "व्हाट्सऐप पर भेजें" },
    published: { en: "Published", hi: "प्रकाशित" },
  },

  /* ---------------- Vikas Yatra ---------------- */
  vikas: {
    title: { en: "Vikas Yatra: the change, in figures", hi: "विकास यात्रा: बदलाव, आँकड़ों में" },
    seoTitle: { en: "Vikas Yatra: India since 2014, Uttar Pradesh since 2017", hi: "विकास यात्रा: 2014 के बाद भारत, 2017 के बाद उत्तर प्रदेश" },
    description: {
      en: "How India has changed since 2014 and Uttar Pradesh since 2017: highways, airports, medical colleges, bank accounts, gas connections, the state economy. Every figure with its official source.",
      hi: "2014 के बाद भारत और 2017 के बाद उत्तर प्रदेश कैसे बदला: राजमार्ग, हवाई अड्डे, मेडिकल कॉलेज, बैंक खाते, गैस कनेक्शन, राज्य की अर्थव्यवस्था। हर आँकड़ा आधिकारिक स्रोत के साथ।",
    },
    lead: {
      en: "Figures, not slogans. Each number below comes from a government source, linked under it.",
      hi: "नारे नहीं, आँकड़े। नीचे का हर आँकड़ा सरकारी स्रोत से है, जिसका लिंक उसके नीचे दिया है।",
    },
    india: { en: "India: before and after 2014", hi: "भारत: 2014 से पहले और बाद" },
    indiaLead: {
      en: "Roads, airports, healthcare and banking for the poor, ten years apart.",
      hi: "सड़क, हवाई अड्डे, स्वास्थ्य और गरीबों के लिए बैंकिंग: दस वर्षों का अंतर।",
    },
    up: { en: "Uttar Pradesh: since 2017", hi: "उत्तर प्रदेश: 2017 के बाद" },
    upLead: {
      en: "The state’s economy has more than doubled, and expressways and investment have changed what UP is known for.",
      hi: "राज्य की अर्थव्यवस्था दोगुनी से अधिक हुई है, और एक्सप्रेसवे व निवेश ने उत्तर प्रदेश की पहचान बदली है।",
    },
    kashi: { en: "Kashi: our own region", hi: "काशी: हमारा अपना क्षेत्र" },
    kashiLead: {
      en: "From the Vishwanath Dham to the expressway and the looms of Banaras: the work that has reached our own region.",
      hi: "विश्वनाथ धाम से एक्सप्रेसवे और बनारस के करघों तक: वह कार्य जो हमारे अपने क्षेत्र तक पहुँचा है।",
    },
    heroCaption: { en: "Ganga Dwar, Shri Kashi Vishwanath Dham, Varanasi", hi: "गंगा द्वार, श्री काशी विश्वनाथ धाम, वाराणसी" },
    then: { en: "Then", hi: "तब" },
    now: { en: "Now", hi: "अब" },
    source: { en: "Source", hi: "स्रोत" },
    times: { en: "{x}× more", hi: "{x} गुना" },
    note: {
      en: "Figures are as published by the source on the date shown. Where a scheme did not exist before, the figure shows what it has reached since launch.",
      hi: "आँकड़े दर्शाई गई तिथि पर स्रोत द्वारा प्रकाशित हैं। जहाँ योजना पहले थी ही नहीं, वहाँ शुरुआत से अब तक की उपलब्धि दिखाई गई है।",
    },
    teaser: { en: "See all figures", hi: "सभी आँकड़े देखें" },
    sinceLaunch: { en: "since launch", hi: "शुरुआत से" },
  },

  home: {
    idealsTitle: { en: "The ideals we work by", hi: "जिन आदर्शों पर हम चलते हैं" },
    vikasTitle: { en: "Ten years of change, in figures", hi: "दस वर्षों का बदलाव, आँकड़ों में" },
    vicharTitle: { en: "On schemes and issues", hi: "योजनाओं और मुद्दों पर" },
    ecardTitle: { en: "Send greetings with your name", hi: "अपने नाम से शुभकामनाएँ भेजें" },
    ecardText: {
      en: "Make a greeting card with your photo next to Vinod ji for the coming festival, and share it with your village on WhatsApp.",
      hi: "आने वाले त्योहार के लिए विनोद जी के साथ अपनी फ़ोटो वाला शुभकामना कार्ड बनाएँ, और अपने गाँव में व्हाट्सऐप पर भेजें।",
    },
    ecardSteps: [
      { en: "Add your photo", hi: "अपनी फ़ोटो जोड़ें" },
      { en: "Write your name", hi: "अपना नाम लिखें" },
      { en: "Send on WhatsApp", hi: "व्हाट्सऐप पर भेजें" },
    ],
    ecardMock: {
      greeting: { en: "Warm greetings", hi: "हार्दिक शुभकामनाएँ" },
      name: { en: "Your name", hi: "आपका नाम" },
      village: { en: "Your village", hi: "आपका गाँव" },
      photo: { en: "Your photo", hi: "आपकी फ़ोटो" },
    },
    shikayatPhoto: {
      en: "Women and cattle on a village road",
      hi: "गाँव की सड़क पर महिलाएँ और मवेशी",
    },
    shikayatTitle: { en: "A problem in your village? Tell us.", hi: "गाँव में कोई समस्या? हमें बताइए।" },
    shikayatText: {
      en: "Every complaint gets a ticket number, reaches the Block Pramukh’s office, and can be tracked until it is resolved.",
      hi: "हर शिकायत को टिकट नंबर मिलता है, वह ब्लॉक प्रमुख कार्यालय तक पहुँचती है, और निस्तारण तक उसकी स्थिति देखी जा सकती है।",
    },
  },
} as const;

type Deep<T> = T extends { en: string; hi: string }
  ? string
  : T extends readonly (infer U)[]
    ? Deep<U>[]
    : { [K in keyof T]: Deep<T[K]> };

function pick<T>(value: T, lang: Lang): Deep<T> {
  if (Array.isArray(value)) return value.map((v) => pick(v, lang)) as Deep<T>;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.en === "string" && typeof obj.hi === "string") return obj[lang] as Deep<T>;
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, pick(v, lang)])) as Deep<T>;
  }
  return value as Deep<T>;
}

const cache: Partial<Record<Lang, Deep<typeof portal>>> = {};
/** All portal text in one language. */
export const pt = (lang: Lang) => (cache[lang] ??= pick(portal, lang));
export type PortalText = Deep<typeof portal>;

export type ComplaintCategory = keyof typeof portal.categories;
export const complaintCategories = Object.keys(portal.categories) as ComplaintCategory[];
export type ComplaintStatus = keyof typeof portal.statuses;
export const complaintStatuses = Object.keys(portal.statuses) as ComplaintStatus[];

/** Fill {placeholders} in a string. */
export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export type { L };
