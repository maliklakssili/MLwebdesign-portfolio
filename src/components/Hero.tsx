import { useRef, useState } from "react";
import { useHero3D } from "../hooks/useHero3D";

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useHero3D(stageRef, "#f0873f", "MLwebdesign", () => setFailed(true));

  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col justify-center px-5 pt-24 pb-12 sm:px-9 lg:px-18">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(115% 85% at 50% 10%, rgba(11,11,13,.12) 0%, rgba(11,11,13,.62) 70%)",
        }}
      />

      <div ref={stageRef} className="relative w-full h-[min(52svh,440px)] min-h-[220px]">
        {failed && (
          <div className="h-full flex items-center justify-center font-display font-bold text-[clamp(40px,11vw,140px)] leading-none tracking-[-0.04em]">
            MLwebdesign
          </div>
        )}
      </div>

      <div className="relative flex flex-wrap items-baseline justify-between gap-7 mt-8 sm:mt-12 lg:mt-18">
        <p className="m-0 font-display font-medium text-[clamp(26px,4.4vw,52px)] leading-[1.05] tracking-[-0.035em] max-w-[16em]">
          Web design, done right.
        </p>
        <a
          href="#work"
          className="inline-flex items-center gap-3.5 rounded-full border border-fg px-6.5 py-4 font-mono text-[13px] tracking-[0.14em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
        >
          View our work <span className="text-[15px]">→</span>
        </a>
      </div>
    </section>
  );
}
