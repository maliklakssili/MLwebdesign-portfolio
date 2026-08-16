export interface ProjectPage {
  label: string;
  image: string;
  width: number;
  height: number;
}

export interface Project {
  title: string;
  year: string;
  desc: string;
  pages: ProjectPage[];
  /** Optional dedicated grid-card thumbnail, for when pages[0] is a full-page capture too tall for the cover crop. Defaults to pages[0]. */
  cover?: ProjectPage;
}

export const projects: Project[] = [
  {
    title: "Ventura Coffee",
    year: "2026",
    desc: "Marketing microsite for a neighborhood coffee shop, built around warm serif type, a full-bleed editorial hero, and a menu that reads like a zine.",
    pages: [
      { label: "Home", image: "/work/coffee-home.jpg", width: 1000, height: 625 },
      { label: "Philosophy", image: "/work/coffee-philosophy.jpg", width: 1000, height: 706 },
      { label: "Menu teaser", image: "/work/coffee-menuband.jpg", width: 1000, height: 377 },
      { label: "Visit", image: "/work/coffee-visit.jpg", width: 1000, height: 481 },
      { label: "Menu", image: "/work/coffee-menu.jpg", width: 1000, height: 666 },
    ],
  },
  {
    title: "Studio TWH",
    year: "2026",
    desc: "Landing page for a women's boxing studio — bold condensed type, a stone-and-black palette, and a class-booking flow that gets out of the way.",
    pages: [
      { label: "Home", image: "/work/twh-home.jpg", width: 1000, height: 666 },
      { label: "About", image: "/work/twh-about.jpg", width: 1000, height: 593 },
      { label: "Classes", image: "/work/twh-classes.jpg", width: 1000, height: 443 },
      { label: "Pricing", image: "/work/twh-pricing.jpg", width: 1000, height: 521 },
    ],
  },
  {
    title: "BADDNA",
    year: "2026",
    desc: "Brand site for a Vancouver-based fashion label — a sultry, fluid-particle WebGL background behind a minimal, monochrome wordmark, built to feel as luxurious after dark as the pieces themselves.",
    pages: [
      { label: "Home", image: "/work/baddna-home.jpg", width: 1000, height: 666 },
      { label: "About", image: "/work/baddna-about.jpg", width: 1000, height: 666 },
      { label: "Store", image: "/work/baddna-store.jpg", width: 1000, height: 666 },
      { label: "Admin", image: "/work/baddna-admin.jpg", width: 1000, height: 400 },
    ],
  },
  {
    title: "Apex Gloss Mia",
    year: "2026",
    desc: "Site for a Miami auto-detailing and ceramic-coating studio — high-contrast black and hot pink, built to sell $1.4K–$6.5K packages to a clientele that photographs everything.",
    cover: { label: "Home", image: "/work/apex-gloss-cover.jpg", width: 1000, height: 666 },
    pages: [
      { label: "Home", image: "/work/apex-gloss-home.jpg", width: 1000, height: 4253 },
      { label: "Services", image: "/work/apex-gloss-services.jpg", width: 1000, height: 4062 },
      { label: "Pricing", image: "/work/apex-gloss-pricing.jpg", width: 1000, height: 3085 },
      { label: "About", image: "/work/apex-gloss-about.jpg", width: 1000, height: 3790 },
    ],
  },
];

export const skills = [
  "Figma",
  "React",
  "Three.js",
  "Webflow",
  "TypeScript",
  "Shopify",
  "Motion design",
  "Art direction",
  "Typography",
  "Accessibility",
];

export const plans = [
  {
    name: "Landing",
    price: "$499",
    desc: "One page, done right.",
    features: [
      "1 custom designed landing page",
      "Contact form",
      "Desktop & mobile optimized",
      "Service and pricing section",
      "Google map and social links",
    ],
    featured: false,
  },
  {
    name: "Business",
    price: "$1,499",
    desc: "Full site, ready to sell.",
    features: [
      "Up to 7 custom design pages",
      "Online payments, automated confirmation email",
      "SEO set up",
      "Mobile and speed optimisation",
    ],
    featured: true,
  },
  {
    name: "Standard",
    price: "$999",
    desc: "Up to 5 pages, full brand.",
    features: [
      "Up to 5 custom design pages",
      "Contact and quote forms",
      "Everything essential",
      "Custom page layout",
      "Gallery / portfolio",
    ],
    featured: false,
  },
];

export const steps = [
  { n: "01", title: "Scope", desc: "A short call, then a written plan with fixed price and dates." },
  { n: "02", title: "Structure", desc: "Sitemap, copy outline and wireframes before any visuals." },
  { n: "03", title: "Design", desc: "Two directions, one chosen, refined to a full page set." },
  { n: "04", title: "Build", desc: "Hand-coded, tested on real devices, handed over with docs." },
];
