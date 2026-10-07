import { data, Link } from "react-router";
import type { Route } from "./+types/books.$bookId.chapters.$chapterId";
import { getBook, getChapter, getChapters, isNotFoundError } from "~/lib/api";
import { excerpt } from "~/lib/content";
import {
  sortByChapterNumber,
  toChapterSummary,
  type ChapterSummary,
} from "~/lib/types";
import { ChapterBody } from "~/components/ChapterBody";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "Chapter not found — NovelPeak" }];
  }
  const { book, chapter } = loaderData;
  return [
    { title: `${chapter.title} · ${book.title} — NovelPeak` },
    { name: "description", content: excerpt(chapter.content, 150) },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { bookId, chapterId } = params;
  if (!bookId || !chapterId) {
    throw data("Chapter not found", { status: 404 });
  }

  try {
    const [book, chapters, chapter] = await Promise.all([
      getBook(bookId),
      getChapters(bookId),
      getChapter(bookId, chapterId),
    ]);

    const ordered = sortByChapterNumber(chapters);
    const index = ordered.findIndex((item) => item.id === chapter.id);
    const previous: ChapterSummary | null = index > 0 ? toChapterSummary(ordered[index - 1]) : null;
    const next: ChapterSummary | null =
      index >= 0 && index < ordered.length - 1 ? toChapterSummary(ordered[index + 1]) : null;

    return { book, chapter, previous, next };
  } catch (error) {
    if (isNotFoundError(error)) {
      throw data("Chapter not found", { status: 404 });
    }
    throw data(
      error instanceof Error ? error.message : "Could not load this chapter",
      { status: 503 },
    );
  }
}

export default function ReadChapter({ loaderData }: Route.ComponentProps) {
  const { book, chapter, previous, next } = loaderData;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-neutral-500">
        <Link to="/" className="hover:text-neutral-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/books/${book.id}`} className="hover:text-neutral-100">
          {book.title}
        </Link>
      </nav>

      <article className="mt-8">
        <header className="border-b border-neutral-800 pb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Chapter {chapter.chapterNumber}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">
            {chapter.title}
          </h1>
        </header>

        <ChapterBody html={chapter.content || "<p>No content.</p>"} />
      </article>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-neutral-800 pt-6">
        {previous ? (
          <Link
            to={`/books/${book.id}/chapters/${previous.id}`}
            prefetch="intent"
            className="min-w-0 rounded-lg border border-neutral-800 px-4 py-2 text-sm transition hover:bg-neutral-800"
          >
            <span className="block text-xs text-neutral-500">Previous</span>
            <span className="block truncate font-medium text-neutral-100">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            to={`/books/${book.id}/chapters/${next.id}`}
            prefetch="intent"
            className="min-w-0 rounded-lg border border-neutral-800 px-4 py-2 text-right text-sm transition hover:bg-neutral-800"
          >
            <span className="block text-xs text-neutral-500">Next</span>
            <span className="block truncate font-medium text-neutral-100">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            to={`/books/${book.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Back to novel
          </Link>
        )}
      </nav>
    </div>
  );
}
