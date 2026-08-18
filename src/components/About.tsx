import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      className="relative z-10 bg-bg/86 backdrop-blur-[2px] px-5 pt-32 pb-20 sm:px-9 sm:pt-40 sm:pb-28 lg:px-18 lg:pb-40 grid gap-10 sm:gap-14 lg:gap-20"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
    >
      <Reveal>
        <h1 className="m-0 mb-7 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">About</h1>
        <p className="m-0 mb-4.5 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-body max-w-[34em]">
          We're a web design studio building sites for studios, founders and small teams. Ten years in, our work
          sits where clear structure meets typography that carries weight.
        </p>
        <p className="m-0 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-muted max-w-[34em]">
          Every project ships as design and code under one roof, so nothing gets lost in translation.
        </p>
      </Reveal>

      <Reveal>
        <div className="border border-hairline p-7 sm:p-8">
          <div className="font-display text-5xl font-bold tracking-[-0.03em] text-fg">10</div>
          <p className="m-0 mt-2 font-mono text-xs uppercase tracking-[0.14em] text-caption">
            Years building for the web
          </p>
          <div className="my-6 h-px w-full bg-hairline" />
          <p className="m-0 font-mono text-xs uppercase tracking-[0.14em] text-caption">Who we build for</p>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[15px] leading-[1.5] text-body">
            <li className="flex items-baseline gap-2.5">
              <span className="text-caption">—</span>
              Studios &amp; agencies
            </li>
            <li className="flex items-baseline gap-2.5">
              <span className="text-caption">—</span>
              Founders &amp; startups
            </li>
            <li className="flex items-baseline gap-2.5">
              <span className="text-caption">—</span>
              Small teams
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
