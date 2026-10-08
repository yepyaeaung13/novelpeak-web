import { data, Link } from "react-router";
import type { Route } from "./+types/home";
import { getBooks } from "~/lib/api";
import { resolveImageUrl } from "~/lib/image";
import { BookCard } from "~/components/BookCard";
import { CoverImage } from "~/components/CoverImage";
import { JsonLd } from "~/components/JsonLd";
import {
  ArrowRightIcon,
  BookOpenIcon,
  PlayIcon,
  SparkIcon,
  StackIcon,
} from "~/components/icons";
import {
  absoluteUrl,
  pageMeta,
  SITE_NAME,
  SITE_TAGLINE,
  siteOrigin,
  webSiteJsonLd,
} from "~/lib/seo";
import type { Book } from "~/lib/types";

export function meta({ loaderData }: Route.MetaArgs) {
  const origin = loaderData?.origin ?? "";
  const cover = loaderData?.featuredCover ?? null;

  return pageMeta({
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: `Browse and read novels online for free on ${SITE_NAME}. Read every chapter on any device.`,
    url: absoluteUrl(origin, "/"),
    image: cover,
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  const origin = siteOrigin(request);

  try {
    const books = await getBooks();
    const [featured] = [...books].sort(byNewest);

    return {
      books,
      origin,
      featuredCover: featured ? resolveImageUrl(featured.cover) : null,
    };
  } catch (error) {
    throw data(
      error instanceof Error ? error.message : "Could not load novels",
      { status: 503 },
    );
  }
}

const byNewest = (a: Book, b: Book) =>
  (b.createdAt ?? "").localeCompare(a.createdAt ?? "");

const addedOn = (value?: string) =>
  value ? new Date(value).toISOString().slice(0, 10) : null;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { books, origin } = loaderData;

  if (books.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <JsonLd data={webSiteJsonLd(origin)} />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
          <BookOpenIcon className="h-6 w-6 text-neutral-500" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-50">
          The library is empty
        </h1>
        <p className="mt-6 text-sm text-neutral-400">
          No novels have been published yet. Check back soon.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = [...books].sort(byNewest);
  const featuredDate = addedOn(featured.createdAt);

  return (
    <div>
      <JsonLd
        data={[
          webSiteJsonLd(origin),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: books.map((book, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(origin, `/books/${book.id}`),
              name: book.title,
            })),
          },
        ]}
      />

      {/* Featured novel */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:py-16">
          <div className="mx-auto w-52 md:mx-0 md:w-full">
            <Link
              to={`/books/${featured.id}`}
              prefetch="intent"
              className="block overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-neutral-800 transition duration-300 hover:-translate-y-1 hover:ring-blue-400/50"
            >
              <CoverImage
                src={featured.cover}
                alt={`Cover of ${featured.title}`}
                loading="eager"
                className="aspect-2/3 w-full object-cover"
              />
            </Link>
          </div>

          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="inline-flex items-center justify-center gap-1.5 self-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-amber-300 md:self-start">
              <SparkIcon className="h-3.5 w-3.5" />
              Featured novel
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
              {featured.title}
            </h1>
            <p className="mt-1.5 text-sm text-neutral-400">
              by {featured.author}
              {featuredDate ? (
                <span className="text-neutral-600"> · added {featuredDate}</span>
              ) : null}
            </p>

            {featured.description ? (
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:mx-0">
                {featured.description}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to={`/books/${featured.id}`}
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                <PlayIcon className="h-4 w-4" />
                Start reading
              </Link>
              <Link
                to={`/books/${featured.id}`}
                prefetch="intent"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-800"
              >
                <BookOpenIcon className="h-4 w-4" />
                View chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      {rest.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">
                <StackIcon className="h-4 w-4" />
                More novels
              </h2>
            </div>
            <span className="text-xs text-neutral-500">
              {books.length} {books.length === 1 ? "novel" : "novels"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {rest.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <Link
            to={`/books/${featured.id}`}
            prefetch="intent"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-neutral-800 px-5 py-4 text-sm text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-900"
          >
            <span>
              Looking for more? Browse the chapters of{" "}
              <span className="text-neutral-100">{featured.title}</span>.
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
          </Link>
        </section>
      )}
    </div>
  );
}
