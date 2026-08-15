import { Link } from "react-router-dom";
import { RotatingGlobe } from "./RotatingGlobe";

export function Hero() {
  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col justify-center px-5 pt-24 pb-12 sm:px-9 lg:px-18">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(115% 85% at 50% 10%, rgba(11,11,13,.12) 0%, rgba(11,11,13,.62) 70%)",
        }}
      />

      <h1 className="m-0 text-center font-display font-medium text-[clamp(22px,4.4vw,52px)] leading-none tracking-[-0.04em]">
        MLwebdesign
      </h1>

      <div className="relative mx-auto mt-4 w-full max-w-[520px] h-[min(52svh,440px)] min-h-[220px]">
        <RotatingGlobe />
      </div>

      <div className="relative flex flex-wrap items-baseline justify-between gap-7 mt-8 sm:mt-12 lg:mt-18">
        <p className="m-0 font-mono text-xs tracking-[0.18em] uppercase text-fg">
          Web design, done right.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-3.5 rounded-full border border-fg px-6.5 py-4 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
        >
          View our work <span className="text-[15px]">→</span>
        </Link>
      </div>
    </section>
  );
}
