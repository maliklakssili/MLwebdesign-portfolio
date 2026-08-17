import { useEffect } from "react";

const SITE_URL = "https://www.mlwebdesign.ca";
const DEFAULT_TITLE = "MLwebdesign — Web design, done right.";
const DEFAULT_DESCRIPTION =
  "MLwebdesign — web design and front-end development for studios, founders, and small teams.";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Sets the document title, meta description, canonical URL, and OG/Twitter tags for the current route. */
export function useSEO(options: { title?: string; description?: string; path?: string }) {
  const { title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = "/" } = options;

  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMeta("name", "description", description);
    setCanonical(url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, path]);
}
