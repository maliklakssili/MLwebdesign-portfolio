import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { ProjectDocument } from "./ProjectDocument";
import { projects } from "../data/projects";

const SWIPE_THRESHOLD = 50;

export function Work() {
  const [index, setIndex] = useState(0);
  const [doc, setDoc] = useState<{ projectIdx: number; pageIdx: number } | null>(null);
  const count = projects.length;
  const dragX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (doc !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, doc]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    if (delta > SWIPE_THRESHOLD) go(-1);
    else if (delta < -SWIPE_THRESHOLD) go(1);
    dragX.current = null;
  };

  const active = projects[index];

  return (
    <section
      id="work"
      className="relative z-10 bg-bg/86 backdrop-blur-[2px] border-t border-hairline px-5 py-20 sm:px-9 sm:py-28 lg:px-18 lg:py-40"
    >
      <Reveal className="flex items-baseline justify-between gap-5 mb-9 sm:mb-16">
        <h2 className="m-0 font-display font-bold text-[clamp(30px,5vw,66px)] tracking-[-0.04em]">Selected work</h2>
        <span className="font-mono text-xs text-caption" aria-live="polite">
          {(index + 1).toString().padStart(2, "0")} / {count.toString().padStart(2, "0")}
        </span>
      </Reveal>

      <Reveal>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <div
            className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.7,.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((p, projectIdx) => {
              const cover = p.pages[0];
              return (
                <div key={p.title} className="w-full shrink-0">
                  <button
                    type="button"
                    onClick={() => setDoc({ projectIdx, pageIdx: 0 })}
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
                        draggable={false}
                        className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                        <span className="m-5 font-mono text-[11px] tracking-[0.16em] uppercase text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          View case study →
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-6 mt-6">
          <div className="max-w-[42em]">
            <div className="flex items-baseline gap-4">
              <h3 className="m-0 font-display font-medium text-xl tracking-[-0.02em]">{active.title}</h3>
              <span className="font-mono text-[11px] text-caption">{active.year}</span>
            </div>
            <p className="mt-1.5 mb-0 text-[15px] leading-[1.5] text-muted">{active.desc}</p>
          </div>

          <div className="flex gap-4 shrink-0">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="h-16 w-16 rounded-full border border-hairline-strong flex items-center justify-center text-fg text-2xl transition-colors hover:bg-fg hover:text-bg"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="h-16 w-16 rounded-full border border-hairline-strong flex items-center justify-center text-fg text-2xl transition-colors hover:bg-fg hover:text-bg"
            >
              →
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${p.title}`}
              className={`h-1 flex-1 rounded-full transition-colors ${i === index ? "bg-fg" : "bg-hairline-strong"}`}
            />
          ))}
        </div>
      </Reveal>

      {doc !== null && (
        <ProjectDocument
          project={projects[doc.projectIdx]}
          initialPage={doc.pageIdx}
          onClose={() => setDoc(null)}
        />
      )}
    </section>
  );
}
