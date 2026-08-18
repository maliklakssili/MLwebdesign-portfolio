import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";
import { useSEO } from "../hooks/useSEO";

export function Portfolio() {
  useSEO({
    title: "Portfolio — MLwebdesign",
    description: "A selection of recent projects — full case studies from MLwebdesign, page by page.",
    path: "/portfolio",
  });

  return (
    <section className="relative z-10 min-h-[100svh] px-5 pt-32 pb-24 sm:px-9 sm:pt-40 lg:px-18 lg:pb-32">
      <Reveal className="mb-12 sm:mb-16">
        <h1 className="m-0 font-display font-bold text-[clamp(34px,6vw,74px)] tracking-[-0.04em]">Portfolio</h1>
        <p className="mt-3 mb-0 max-w-[36em] text-[15px] leading-[1.5] text-muted">
          A selection of recent projects. Click a project to view every page in full.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, projectIdx) => {
          const cover = p.cover ?? p.pages[0];
          return (
            <Reveal key={p.title}>
              <Link
                to={`/portfolio/${p.slug}`}
                className="group block w-full text-left"
                aria-label={`Open ${p.title} case study`}
              >
                <div
                  className="relative overflow-hidden border border-hairline bg-fill-a"
                  style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
                >
                  <img
                    src={cover.image}
                    alt={`${p.title} — ${cover.label}`}
                    width={cover.width}
                    height={cover.height}
                    draggable={false}
                    loading={projectIdx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="m-5 font-mono text-[11px] tracking-[0.16em] uppercase text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View case study →
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-4">
                  <h3 className="m-0 font-display font-medium text-lg tracking-[-0.02em]">{p.title}</h3>
                  <span className="font-mono text-[11px] text-caption">{p.year}</span>
                </div>
                <p className="mt-1.5 mb-0 text-sm leading-[1.5] text-muted">{p.desc}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
