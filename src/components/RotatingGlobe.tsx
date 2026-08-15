import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingGlobeProps {
  className?: string;
}

const OCEAN_FILL = "#101116"; // --color-fill-a
const OUTLINE = "#ecebe7"; // --color-fg
const DOT_COLOR = "#f0873f"; // --color-accent

export function RotatingGlobe({ className = "" }: RotatingGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let containerWidth = wrap.clientWidth;
    let containerHeight = wrap.clientHeight;
    let radius = Math.min(containerWidth, containerHeight) / 2.3;

    const projection = d3.geoOrthographic().clipAngle(90);
    const path = d3.geoPath().projection(projection).context(context);

    const applySize = () => {
      containerWidth = wrap.clientWidth;
      containerHeight = wrap.clientHeight;
      radius = Math.min(containerWidth, containerHeight) / 2.3;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      projection.scale(radius).translate([containerWidth / 2, containerHeight / 2]);
    };
    applySize();

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      }

      if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) dots.push(point);
        }
      }
      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
    }

    const allDots: DotData[] = [];
    let landFeatures: any = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const scaleFactor = projection.scale() / radius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, projection.scale(), 0, 2 * Math.PI);
      context.fillStyle = OCEAN_FILL;
      context.fill();
      context.strokeStyle = OUTLINE;
      context.lineWidth = 1.5 * scaleFactor;
      context.globalAlpha = 0.5;
      context.stroke();
      context.globalAlpha = 1;

      if (!landFeatures) return;

      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = OUTLINE;
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.12;
      context.stroke();
      context.globalAlpha = 1;

      context.beginPath();
      landFeatures.features.forEach((feature: any) => path(feature));
      context.strokeStyle = OUTLINE;
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.55;
      context.stroke();
      context.globalAlpha = 1;

      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath();
          context.arc(projected[0], projected[1], 1.1 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = DOT_COLOR;
          context.fill();
        }
      });
    };

    const rotation = [0, -12];
    let autoRotate = true;
    const rotationSpeed = 0.35;

    const rotate = () => {
      if (!autoRotate) return;
      rotation[0] += rotationSpeed;
      projection.rotate(rotation as [number, number]);
      render();
    };
    const rotationTimer = d3.timer(rotate);

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");
        landFeatures = await response.json();

        landFeatures.features.forEach((feature: any) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });

        render();
      } catch {
        setError("Globe data unavailable right now.");
      }
    };
    loadWorldData();

    const handlePointerDown = (event: PointerEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [rotation[0], rotation[1]];

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const sensitivity = 0.4;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * sensitivity));

        projection.rotate(rotation as [number, number]);
        render();
      };

      const handlePointerUp = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(radius * 0.6, Math.min(radius * 2.4, projection.scale() * factor));
      projection.scale(newScale);
      render();
    };

    const handleResize = () => {
      applySize();
      render();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border border-hairline bg-fill-a p-8 ${className}`}>
        <p className="m-0 font-mono text-xs tracking-[0.1em] uppercase text-caption">{error}</p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full cursor-grab touch-none active:cursor-grabbing" />
    </div>
  );
}
