const IMG_WITHOUT_LOADING = /<img\b(?![^>]*\bloading=)/gi;

export function withLazyImages(html: string): string {
  return html.replace(IMG_WITHOUT_LOADING, '<img loading="lazy" decoding="async"');
}

export function excerpt(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
