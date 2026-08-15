import { Link } from "react-router-dom";

const LEFT_LINKS = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const RIGHT_LINKS = [
  { label: "Pricing", to: "/pricing" },
  { label: "Portfolio", to: "/portfolio" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-[22px] sm:px-9 lg:px-18 [mix-blend-mode:difference]">
      <nav className="flex items-center gap-6 sm:gap-8">
        <Link
          to="/"
          className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors"
        >
          ML — web design
        </Link>
        {LEFT_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <nav className="flex items-center gap-6 sm:gap-8">
        {RIGHT_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
