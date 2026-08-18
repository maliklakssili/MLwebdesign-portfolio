import { Link, Navigate, useParams } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";
import { useSEO } from "../hooks/useSEO";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useSEO({
    title: project ? `${project.title} — MLwebdesign Portfolio` : "Project not found — MLwebdesign",
    description: project ? project.desc : "This case study could not be found.",
    path: `/portfolio/${slug ?? ""}`,
  });

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <section className="relative z-10 min-h-[100svh] px-5 pt-32 pb-24 sm:px-9 sm:pt-40 lg:px-18 lg:pb-32">
      <Reveal className="mb-12 sm:mb-16">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-caption transition-colors hover:text-fg-hover"
        >
          ← All projects
        </Link>
        <div className="mt-6 flex flex-wrap items-baseline gap-4">
          <h1 className="m-0 font-display font-bold text-[clamp(30px,5vw,60px)] tracking-[-0.04em]">
            {project.title}
          </h1>
          <span className="font-mono text-xs text-caption">{project.year}</span>
        </div>
        <p className="mt-4 mb-0 max-w-[42em] text-[15px] leading-[1.6] text-muted">{project.desc}</p>
      </Reveal>

      <div className="mx-auto flex max-w-[980px] flex-col gap-16">
        {project.pages.map((pg, i) => (
          <Reveal key={pg.label}>
            <div className="mb-3 font-mono text-[11px] tracking-[0.14em] uppercase text-slot-caption">
              {(i + 1).toString().padStart(2, "0")} — {pg.label}
            </div>
            <div
              className="overflow-hidden border border-hairline bg-fill-a shadow-lg"
              style={{ aspectRatio: `${pg.width} / ${pg.height}` }}
            >
              <img
                src={pg.image}
                alt={`${project.title} — ${pg.label}`}
                width={pg.width}
                height={pg.height}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
