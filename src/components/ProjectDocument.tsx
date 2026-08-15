import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";

interface ProjectDocumentProps {
  project: Project;
  initialPage: number;
  onClose: () => void;
}

export function ProjectDocument({ project, initialPage, onClose }: ProjectDocumentProps) {
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    pageRefs.current[initialPage]?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-bg/95 px-5 py-4 backdrop-blur-sm sm:px-9">
        <div className="flex items-baseline gap-3">
          <h3 className="m-0 font-display font-medium text-lg tracking-[-0.02em]">{project.title}</h3>
          <span className="font-mono text-[11px] text-caption">{project.year}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-fg transition-colors hover:bg-fg hover:text-bg"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[980px] px-5 py-10 sm:px-9 sm:py-14">
          <p className="mt-0 mb-12 max-w-[42em] text-[15px] leading-[1.6] text-muted">{project.desc}</p>

          <div className="flex flex-col gap-16">
            {project.pages.map((pg, i) => (
              <div
                key={pg.label}
                ref={(el) => {
                  pageRefs.current[i] = el;
                }}
                className="scroll-mt-24"
              >
                <div className="mb-3 font-mono text-[11px] tracking-[0.14em] uppercase text-slot-caption">
                  {(i + 1).toString().padStart(2, "0")} — {pg.label}
                </div>
                <div className="overflow-hidden border border-hairline bg-fill-a shadow-lg">
                  <img src={pg.image} alt={`${project.title} — ${pg.label}`} className="h-auto w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
