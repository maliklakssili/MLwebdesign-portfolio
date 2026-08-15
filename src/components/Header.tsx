import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LEFT_LINKS = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const RIGHT_LINKS = [
  { label: "Pricing", to: "/pricing" },
  { label: "Portfolio", to: "/portfolio" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-[22px] sm:px-9 lg:px-18 [mix-blend-mode:difference]">
        <Link
          to="/"
          className="font-mono text-xs tracking-[0.18em] uppercase text-fg hover:text-fg-hover transition-colors"
        >
          ML — web design
        </Link>

        <nav className="hidden items-center gap-6 sm:flex sm:gap-8">
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

        <nav className="hidden items-center gap-6 sm:flex sm:gap-8">
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="font-mono text-xs tracking-[0.18em] uppercase text-fg sm:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-bg sm:hidden">
          {ALL_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-display text-3xl font-medium tracking-[-0.02em] text-fg"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
