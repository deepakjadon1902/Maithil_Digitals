import { useEffect } from "react";
import type { SEO as SEOType } from "../types/content";

type Props = {
  seo: SEOType;
  schema?: object | object[];
};

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function SEO({ seo, schema }: Props) {
  useEffect(() => {
    document.title = seo.title;
    upsertMeta('meta[name="description"]', "name", "description", seo.description);
    upsertMeta('meta[name="robots"]', "name", "robots", seo.robots ?? "index,follow");
    upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    if (seo.image) {
      upsertMeta('meta[property="og:image"]', "property", "og:image", seo.image);
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", seo.image);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical ?? window.location.href;

    document.querySelectorAll("script[data-schema='page']").forEach((node) => node.remove());
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = "page";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [schema, seo]);

  return null;
}
