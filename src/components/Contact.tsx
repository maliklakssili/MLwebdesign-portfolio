import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 border-t border-hairline px-5 pt-24 pb-12 sm:px-9 sm:pt-32 lg:px-18 lg:pt-44"
      style={{ background: "linear-gradient(rgba(11,11,13,.86) 0%, rgba(11,11,13,.6) 100%)" }}
    >
      <Reveal className="max-w-[22em]">
        <h2 className="m-0 font-display font-bold text-[clamp(38px,8vw,110px)] leading-[.95] tracking-[-0.045em]">
          Let's build something.
        </h2>
        <a
          href="mailto:hello@mlwebdesign.com"
          className="inline-flex items-center gap-3.5 mt-9 rounded-full border border-fg px-7.5 py-4.5 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
        >
          hello@mlwebdesign.com
        </a>
      </Reveal>

      <div className="flex flex-wrap justify-between gap-5 mt-16 sm:mt-24 lg:mt-32 pt-5.5 border-t border-hairline font-mono text-xs text-caption">
        <span>© 2026 MLwebdesign</span>
        <div className="flex gap-6">
          <a href="#contact" className="hover:text-fg-hover transition-colors">Instagram</a>
          <a href="#contact" className="hover:text-fg-hover transition-colors">Dribbble</a>
          <a href="#contact" className="hover:text-fg-hover transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
