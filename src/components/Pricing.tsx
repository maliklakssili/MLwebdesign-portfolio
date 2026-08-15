import { Reveal } from "./Reveal";
import { plans } from "../data/projects";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative z-10 bg-bg/86 backdrop-blur-[2px] border-t border-hairline px-5 py-20 sm:px-9 sm:py-28 lg:px-18 lg:py-40"
    >
      <Reveal className="mb-9 sm:mb-16">
        <h2 className="m-0 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">Pricing</h2>
      </Reveal>

      <div className="grid gap-5 sm:gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
        {plans.map((plan) => (
          <Reveal key={plan.name}>
            <div
              className={`flex h-full flex-col border p-7 sm:p-8 ${plan.featured ? "border-fg" : "border-hairline"}`}
            >
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-caption">{plan.name}</span>
              <div className="mt-4 font-display font-bold text-4xl tracking-[-0.03em]">{plan.price}</div>
              <p className="mt-2 mb-6 text-[15px] leading-[1.5] text-muted">{plan.desc}</p>
              <ul className="m-0 mb-8 flex flex-1 list-none flex-col gap-3 p-0">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm leading-[1.5] text-body">
                    <span className="text-caption">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3.5 font-mono text-[13px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  plan.featured ? "border-fg bg-fg text-bg hover:bg-fg-hover" : "border-fg text-fg hover:bg-fg hover:text-bg"
                }`}
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
