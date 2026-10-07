import { data, Link } from "react-router";
import type { Route } from "./+types/books.$bookId";
import { getBook, getChapters, isNotFoundError } from "~/lib/api";
import { sortByChapterNumber, toChapterSummary } from "~/lib/types";
import { CoverImage } from "~/components/CoverImage";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "Novel not found — NovelPeak" }];
  }
  const { book } = loaderData;
  return [
    { title: `${book.title} — NovelPeak` },
    { name: "description", content: book.description || `Read ${book.title} online.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const bookId = params.bookId;
  if (!bookId) {
    throw data("Novel not found", { status: 404 });
  }

  try {
    const [book, chapters] = await Promise.all([
      getBook(bookId),
      getChapters(bookId),
    ]);

    return { book, chapters: sortByChapterNumber(chapters).map(toChapterSummary) };
  } catch (error) {
    if (isNotFoundError(error)) {
      throw data("Novel not found", { status: 404 });
    }
    throw data(
      error instanceof Error ? error.message : "Could not load this novel",
      { status: 503 },
    );
  }
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  const { book, chapters } = loaderData;
  const firstChapter = chapters[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-neutral-500">
        <Link to="/" className="hover:text-neutral-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-100">{book.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        <div>
          <CoverImage
            src={book.cover}
            alt={`Cover of ${book.title}`}
            loading="eager"
            className="aspect-2/3 w-full rounded-xl border border-neutral-800 object-cover shadow-lg shadow-black/40"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">
            {book.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-400">by {book.author}</p>

          {book.description ? (
            <p className="mt-4 max-w-2xl text-neutral-300">{book.description}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {firstChapter ? (
              <Link
                to={`/books/${book.id}/chapters/${firstChapter.id}`}
                prefetch="intent"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                {chapters.length > 1 ? "Start reading" : "Read chapter"}
              </Link>
            ) : (
              <span className="text-sm text-neutral-500">No chapters yet.</span>
            )}
            <span className="text-sm text-neutral-500">
              {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}
            </span>
          </div>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Chapters
          </h2>
          {chapters.length === 0 ? (
            <p className="mt-4 text-neutral-500">
              This novel has no chapters published yet.
            </p>
          ) : (
            <ol className="mt-4 divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    to={`/books/${book.id}/chapters/${chapter.id}`}
                    prefetch="intent"
                    className="flex items-center justify-between gap-4 px-4 py-3 transition hover:bg-neutral-800"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        Chapter {chapter.chapterNumber}
                      </span>
                      <span className="block truncate text-sm font-medium text-neutral-100">
                        {chapter.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-neutral-500">Read</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
