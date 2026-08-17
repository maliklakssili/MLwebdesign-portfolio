import { Reveal } from "./Reveal";

export function About() {
  return (
    <section className="relative z-10 bg-bg/86 backdrop-blur-[2px] px-5 pt-32 pb-20 sm:px-9 sm:pt-40 sm:pb-28 lg:px-18 lg:pb-40">
      <Reveal>
        <h2 className="m-0 mb-7 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">About</h2>
        <p className="m-0 mb-4.5 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-body max-w-[34em]">
          We're a web design studio building sites for studios, founders and small teams. Ten years in, our work
          sits where clear structure meets typography that carries weight.
        </p>
        <p className="m-0 text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-muted max-w-[34em]">
          Every project ships as design and code under one roof, so nothing gets lost in translation.
        </p>
      </Reveal>
    </section>
  );
}
