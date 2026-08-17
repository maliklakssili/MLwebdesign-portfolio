import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      className="relative z-10 min-h-[100svh] px-5 pt-32 pb-12 sm:px-9 sm:pt-40 lg:px-18 lg:pt-44"
      style={{ background: "linear-gradient(rgba(11,11,13,.86) 0%, rgba(11,11,13,.6) 100%)" }}
    >
      <Reveal className="max-w-[22em]">
        <h2 className="m-0 font-display font-medium text-[clamp(38px,8vw,110px)] leading-[.95] tracking-[-0.045em]">
          Let's build something.
        </h2>
        <div className="flex flex-wrap gap-4 mt-9">
          <a
            href="mailto:contact@mlwebdesign.ca"
            className="inline-flex items-center gap-3.5 rounded-full border border-fg px-7.5 py-4.5 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            contact@mlwebdesign.ca
          </a>
          <a
            href="tel:+15146647622"
            className="inline-flex items-center gap-3.5 rounded-full border border-fg px-7.5 py-4.5 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            (514) 664-7622
          </a>
          <a
            href="https://wa.me/15146647622"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3.5 rounded-full border border-fg px-7.5 py-4.5 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            WhatsApp
          </a>
        </div>
      </Reveal>

      <div className="flex flex-wrap justify-between gap-5 mt-16 sm:mt-24 lg:mt-32 pt-5.5 border-t border-hairline font-mono text-xs text-caption">
        <span>© 2026 MLwebdesign</span>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/webdesign.ml/" target="_blank" rel="noopener" className="hover:text-fg-hover transition-colors">Instagram</a>
          <a href="#contact" target="_blank" rel="noopener" className="hover:text-fg-hover transition-colors">Fiverr</a>
          <a href="#contact" className="hover:text-fg-hover transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
