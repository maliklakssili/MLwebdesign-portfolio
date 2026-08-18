export interface ProjectPage {
  label: string;
  image: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  desc: string;
  pages: ProjectPage[];
  /** Optional dedicated grid-card thumbnail, for when pages[0] is a full-page capture too tall for the cover crop. Defaults to pages[0]. */
  cover?: ProjectPage;
}

export const projects: Project[] = [
  {
    slug: "seraya-private-island",
    title: "Seraya Private Island",
    year: "2026",
    desc: "A private-island resort site built around a live Three.js property map you can orbit and click through, plus a drag-to-look 360° panorama tour reused across four suites, the spa, and a private yacht charter.",
    pages: [
      { label: "Home", image: "/work/seraya-hero.jpg", width: 1000, height: 625 },
      { label: "Property", image: "/work/seraya-property.jpg", width: 1000, height: 625 },
      { label: "Interactive 3D map", image: "/work/seraya-map3d.jpg", width: 1000, height: 625 },
      { label: "Suites & villas", image: "/work/seraya-suites.jpg", width: 1000, height: 625 },
      { label: "360° room tour", image: "/work/seraya-room-tour.jpg", width: 1000, height: 625 },
      { label: "Experiences", image: "/work/seraya-experiences.jpg", width: 1000, height: 697 },
      { label: "360° yacht tour", image: "/work/seraya-yacht-tour.jpg", width: 1000, height: 625 },
      { label: "Dining", image: "/work/seraya-dining.jpg", width: 1000, height: 625 },
      { label: "Spa & wellness", image: "/work/seraya-spa.jpg", width: 1000, height: 625 },
      { label: "Gallery", image: "/work/seraya-gallery.jpg", width: 1000, height: 625 },
      { label: "Enquiry", image: "/work/seraya-enquiry.jpg", width: 1000, height: 625 },
    ],
  },
  {
    slug: "ventura-coffee",
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
    slug: "studio-twh",
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
    slug: "baddna",
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
    slug: "apex-gloss-mia",
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
    name: "Starter",
    price: "From $500",
    desc: "Landing pages, single-page & portfolio sites.",
    features: ["Clean, custom design", "Mobile-responsive", "Basic SEO setup"],
    featured: false,
  },
  {
    name: "Standard",
    price: "From $1,000",
    desc: "Multi-page websites, 5–8 pages.",
    features: ["Custom design", "Contact forms", "CMS integration if needed"],
    featured: true,
  },
  {
    name: "Full Build",
    price: "From $2,000+",
    desc: "E-commerce, web apps, custom functionality.",
    features: [
      "Supabase backend, auth, dashboards",
      "Advanced animations & interactions",
      "Ongoing support options",
    ],
    featured: false,
  },
];

export const steps = [
  { n: "01", title: "Scope", desc: "Get in a call, then a written plan with fixed price and dates." },
  { n: "02", title: "Structure", desc: "Sitemap, copy outline and wireframes before any visuals." },
  { n: "03", title: "Design", desc: "Two directions, one chosen, refined to a full page set." },
  { n: "04", title: "Build", desc: "Hand-coded, tested on real devices, handed over with docs." },
];
