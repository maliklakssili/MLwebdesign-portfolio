import { Reveal } from "./Reveal";
import { steps } from "../data/projects";

export function Process() {
  return (
    <section className="relative z-10 bg-bg/86 backdrop-blur-[2px] border-t border-hairline px-5 py-20 sm:px-9 sm:py-28 lg:px-18 lg:py-40">
      <Reveal>
        <h2 className="m-0 mb-9 sm:mb-16 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">Process</h2>
      </Reveal>
      <div className="grid gap-6 sm:gap-8 lg:gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
        {steps.map((s) => (
          <Reveal key={s.n} className="border-t border-hairline-strong pt-5">
            <span className="font-mono text-xs text-fg">{s.n}</span>
            <h3 className="mt-3.5 mb-2 font-display font-medium text-[22px] tracking-[-0.02em]">{s.title}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-muted">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
