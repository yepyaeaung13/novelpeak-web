import { data } from "react-router";
import type { Route } from "./+types/home";
import { getBooks } from "~/lib/api";
import { BookCard } from "~/components/BookCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NovelPeak — read novels online" },
    {
      name: "description",
      content: "Browse and read novels online for free.",
    },
  ];
}

export async function loader() {
  try {
    const books = await getBooks();
    return { books };
  } catch (error) {
    throw data(
      error instanceof Error ? error.message : "Could not load novels",
      { status: 503 },
    );
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { books } = loaderData;

  return (
    <div>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Read your next chapter
          </h1>
          <p className="mt-3 max-w-xl text-neutral-600">
            Explore the library and read every chapter online, on any device.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Browse novels
        </h2>

        {books.length === 0 ? (
          <p className="mt-6 text-neutral-500">No novels published yet.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
