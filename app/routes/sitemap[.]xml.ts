import type { Route } from "./+types/sitemap[.]xml";
import { getBooks, getChapters } from "~/lib/api";
import { sortByChapterNumber } from "~/lib/types";
import { absoluteUrl, siteOrigin } from "~/lib/seo";

const MAX_URLS = 5000;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

type Entry = { loc: string; lastmod?: string };

export async function loader({ request }: Route.LoaderArgs) {
  const origin = siteOrigin(request);
  const entries: Entry[] = [{ loc: absoluteUrl(origin, "/") }];

  try {
    const books = await getBooks();

    const chapterLists = await Promise.all(
      books.map(async (book) => {
        try {
          return await getChapters(book.id);
        } catch {
          return [];
        }
      }),
    );

    for (const [index, book] of books.entries()) {
      if (entries.length >= MAX_URLS) break;

      entries.push({
        loc: absoluteUrl(origin, `/books/${book.id}`),
        ...(book.createdAt ? { lastmod: book.createdAt } : {}),
      });

      for (const chapter of sortByChapterNumber(chapterLists[index] ?? [])) {
        if (entries.length >= MAX_URLS) break;
        entries.push({
          loc: absoluteUrl(origin, `/books/${book.id}/chapters/${chapter.id}`),
        });
      }
    }
  } catch {
    // still emit the home page when the API is unavailable
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url><loc>${escapeXml(entry.loc)}</loc>${
        entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""
      }</url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
