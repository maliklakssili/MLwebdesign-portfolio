import { useEffect, type RefObject } from "react";

/** Mounts the rotating 3D wordmark into `containerRef`. Ported from the design handoff's hero3d.js. */
export function useHero3D(
  containerRef: RefObject<HTMLDivElement | null>,
  accent: string,
  text: string,
  onFail?: () => void
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let dispose: (() => void) | undefined;

    import("./hero3dImpl")
      .then((m) => m.initHero3D(container, accent, text))
      .then((d) => {
        if (disposed) {
          d();
        } else {
          dispose = d;
        }
      })
      .catch((e) => {
        console.warn("3D hero unavailable", e);
        onFail?.();
      });

    return () => {
      disposed = true;
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, accent, text]);
}
