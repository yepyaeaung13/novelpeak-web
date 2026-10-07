import { Link } from "react-router";
import { CoverImage } from "./CoverImage";
import type { Book } from "~/lib/types";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      to={`/books/${book.id}`}
      prefetch="intent"
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/40"
    >
      <CoverImage
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="aspect-2/3 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-neutral-100 group-hover:text-blue-400">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-xs text-neutral-400">{book.author}</p>
      </div>
    </Link>
  );
}
