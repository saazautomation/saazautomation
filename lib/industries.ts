export type Industry = {
  id: string;
  name: string;
  shortLabel: string;
  domain: string;
  href: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  galleryImage: string;
  backgroundImage: string;
  accent: string;
};

export const industries: Industry[] = [
  {
    id: "construction",
    name: "Construction",
    shortLabel: "Build",
    domain: "construction.saazautomation.com",
    href: "https://construction.saazautomation.com",
    tagline: "Site ops that run themselves",
    description:
      "AI voice agents, lead routing, and job-site automation for contractors — quotes, follow-ups, and scheduling without the admin drag.",
    highlights: ["Bid follow-up in minutes", "Crew & schedule sync", "Job lead capture 24/7"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    imageAlt: "Construction workers on a modern building site",
    galleryImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    accent: "#e8a54b",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    shortLabel: "Property",
    domain: "real-estate.saazautomation.com",
    href: "https://real-estate.saazautomation.com",
    tagline: "Every lead answered. Every listing worked.",
    description:
      "Voice AI and workflow automation built for agents and teams — inbound calls, nurture drips, showing coordination, and CRM sync.",
    highlights: ["Instant lead response", "Showing coordination", "CRM-native workflows"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    imageAlt: "Modern luxury home exterior at dusk",
    galleryImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    accent: "#6ec6ff",
  },
  {
    id: "medical",
    name: "Medical",
    shortLabel: "Care",
    domain: "medical.saazautomation.com",
    href: "https://medical.saazautomation.com",
    tagline: "Patient intake without the hold music",
    description:
      "Appointment booking, reminder calls, and intake automation for clinics — HIPAA-minded workflows that free your front desk.",
    highlights: ["Auto appointment booking", "Reminder & no-show cut", "Intake before arrival"],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    imageAlt: "Modern medical clinic corridor",
    galleryImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
    accent: "#5eead4",
  },
  {
    id: "automotive",
    name: "Automotive",
    shortLabel: "Drive",
    domain: "automotive.saazautomation.com",
    href: "https://automotive.saazautomation.com",
    tagline: "Service bays filled. Sales desks free.",
    description:
      "Dealership and service automation — service appointment booking, sales follow-up, and parts inquiries handled by AI voice agents.",
    highlights: ["Service booking AI", "Sales lead nurture", "Parts & inquiry routing"],
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    imageAlt: "Luxury car on a dark showroom floor",
    galleryImage:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    accent: "#fb7185",
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    shortLabel: "Commerce",
    domain: "ecommerce.saazautomation.com",
    href: "https://ecommerce.saazautomation.com",
    tagline: "Orders, support, and ops on autopilot",
    description:
      "Post-purchase support, abandoned cart recovery, and ops workflows for online stores — agents that sell and support around the clock.",
    highlights: ["Cart recovery calls", "Order support AI", "Ops & refund flows"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    imageAlt: "Online shopping and checkout experience",
    galleryImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=80",
    accent: "#c084fc",
  },
];
