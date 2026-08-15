const NAV_LINKS = [
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-[22px] sm:px-9 lg:px-18 [mix-blend-mode:difference]">
      <span className="font-mono text-xs tracking-[0.18em] uppercase text-fg">ML — web design</span>
      <nav className="flex items-center gap-6 sm:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors">
          Get in touch
        </a>
      </nav>
    </header>
  );
}
