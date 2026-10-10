import type { L } from "@/lib/i18n";

/**
 * Photographs used in the inner-page heroes. They are the same files that are already
 * published elsewhere on the site; nothing new is added to /public.
 */
export type HeroImage = {
  src: string;
  width: number;
  height: number;
  alt: L;
  position?: string;
};

export const heroImages = {
  portrait: {
    src: "/images/leader-portrait.webp",
    width: 1186,
    height: 1326,
    position: "50% 12%",
    alt: {
      en: "Portrait of Vinod Kumar Upadhyay, seated, in a white shirt, against a saffron backdrop",
      hi: "केसरिया पृष्ठभूमि के सामने सफ़ेद कमीज़ में बैठे विनोद कुमार उपाध्याय का चित्र",
    },
  },
  publicLife: {
    src: "/images/media/relief-distribution.webp",
    width: 1587,
    height: 991,
    alt: {
      en: "Vinod Kumar Upadhyay handing a packet of supplies to a man on a village road, with others around",
      hi: "गाँव की सड़क पर एक व्यक्ति को सामग्री का पैकेट सौंपते हुए विनोद कुमार उपाध्याय, आसपास अन्य लोग",
    },
  },
  media: {
    src: "/images/media/raksha-bandhan.webp",
    width: 1620,
    height: 1080,
    alt: {
      en: "Vinod Kumar Upadhyay in a marigold garland, surrounded by women tying rakhis on Raksha Bandhan",
      hi: "गेंदे की माला पहने विनोद कुमार उपाध्याय, रक्षाबंधन पर राखी बाँधती बहनों के बीच",
    },
  },
} satisfies Record<string, HeroImage>;
