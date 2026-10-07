import type { Book } from "~/lib/types";

export function BookMetadata({ book }: { book: Book }) {
  return (
    <div className="mt-4 space-y-3">
      <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {[["Type", book.bookType ?? "Novel"], ["Status", book.status ?? "Ongoing"], ["Language", book.language ?? "Burmese"]].map(([label, value]) => (
          <div key={label}><dt className="text-xs text-neutral-500">{label}</dt><dd className="mt-1 text-neutral-200">{value}</dd></div>
        ))}
      </dl>
      {!!book.genres?.length && <div aria-label="Genres" className="flex flex-wrap gap-2">
        {book.genres.map(genre => <span key={genre} className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">{genre}</span>)}
      </div>}
    </div>
  );
}
