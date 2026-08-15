import { Reveal } from "./Reveal";
import { skills } from "../data/projects";

export function About() {
  return (
    <section
      className="relative z-10 bg-bg/86 backdrop-blur-[2px] px-5 pt-32 pb-20 sm:px-9 sm:pt-40 sm:pb-28 lg:px-18 lg:pb-40 grid gap-8 sm:gap-14 lg:gap-20"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
    >
      <Reveal>
        <h2 className="m-0 mb-7 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">About</h2>
        <p className="m-0 mb-4.5 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-body max-w-[34em]">
          I'm a designer and front-end developer building sites for studios, founders and small teams. Ten years in,
          my work sits where clear structure meets typography that carries weight.
        </p>
        <p className="m-0 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-muted max-w-[34em]">
          Every project ships as design and code from the same hands, so nothing gets lost in translation.
        </p>
      </Reveal>
      <Reveal>
        <span className="font-mono text-xs tracking-[0.16em] uppercase text-caption">Skills &amp; tools</span>
        <div className="flex flex-wrap gap-2.5 mt-5">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-hairline-strong px-4 py-2.5 font-mono text-xs text-body">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
