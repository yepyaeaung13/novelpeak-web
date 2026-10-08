import { Link } from "react-router";
import { CoverImage } from "./CoverImage";
import { ArrowRightIcon } from "./icons";
import type { Book } from "~/lib/types";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      to={`/books/${book.id}`}
      prefetch="intent"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 outline-none transition duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/50 focus-visible:ring-2 focus-visible:ring-blue-400"
    >
      <div className="relative overflow-hidden">
        <CoverImage
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="aspect-2/3 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-100 transition group-hover:text-blue-300">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-xs text-neutral-400">{book.author}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition group-hover:text-blue-300">
          Read
          <ArrowRightIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </div>
    </Link>
  );
}
