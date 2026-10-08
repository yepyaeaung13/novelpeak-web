import type { MetaDescriptor } from "react-router";
import { excerpt } from "./content";
import { resolveImageUrl } from "./image";
import type { Book, Chapter } from "./types";

export const SITE_NAME = "NovelPeak";
export const SITE_TAGLINE = "Read novels online for free";

type PageMetaInput = {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  type?: string;
};

export function siteOrigin(request: Request): string {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "");

  return configured || new URL(request.url).origin;
}

export function absoluteUrl(origin: string, path: string): string {
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function bookPath(bookId: string): string {
  return `/books/${encodeURIComponent(bookId)}`;
}

export function chapterPath(bookId: string, chapterId: string): string {
  return `/books/${encodeURIComponent(bookId)}/chapters/${encodeURIComponent(chapterId)}`;
}

export function pageMeta({
  title,
  description,
  url,
  image,
  type = "website",
}: PageMetaInput): MetaDescriptor[] {
  const ogImage = image ? resolveImageUrl(image) : null;
  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }

  return meta;
}

export function webSiteJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: origin,
  };
}

export function bookJsonLd(book: Book, origin: string) {
  const image = resolveImageUrl(book.cover);

  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    url: absoluteUrl(origin, bookPath(book.id)),
    ...(book.author ? { author: { "@type": "Person", name: book.author } } : {}),
    ...(book.description ? { description: book.description } : {}),
    ...(image ? { image: [image] } : {}),
    ...(book.createdAt ? { datePublished: book.createdAt } : {}),
  };
}

export function chapterJsonLd(book: Book, chapter: Chapter, origin: string) {
  const image = resolveImageUrl(book.cover);

  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: chapter.title,
    headline: chapter.title,
    description: excerpt(chapter.content, 160),
    url: absoluteUrl(origin, chapterPath(book.id, chapter.id)),
    ...(image ? { image: [image] } : {}),
    isPartOf: {
      "@type": "Book",
      name: book.title,
      url: absoluteUrl(origin, bookPath(book.id)),
    },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(origin: string, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(origin, crumb.path),
    })),
  };
}
