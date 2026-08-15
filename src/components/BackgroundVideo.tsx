import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://assets.21st.dev/ascii-recipes/videos/user_2xJxXqdwWohYrdd6fiMYrS9hbmO/2e358adb-cfc9-4ec4-a600-1abc8836f02b.mp4";
const POSTER_SRC =
  "https://assets.21st.dev/ascii-recipes/thumbnails/user_2xJxXqdwWohYrdd6fiMYrS9hbmO/eae3b158-33e1-442d-8e17-3b4fb6656a7f.webp";

/** Fixed full-page ASCII-art video background with subtle cursor parallax on fine pointers. */
export function BackgroundVideo() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const baseline = bgRef.current;
    if (baseline) baseline.style.transform = "translateX(-50%)";

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const el = bgRef.current;
      if (el) {
        el.style.transform = `translateX(-50%) translate3d(${(cx * 26).toFixed(2)}px, ${(cy * 18).toFixed(2)}px, 0) scale(1.08)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed top-0 left-1/2 w-screen h-[100svh] z-0 overflow-hidden bg-bg"
    >
      <video
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Animated ASCII art"
        className="block w-full h-full object-cover object-center"
      />
    </div>
  );
}
