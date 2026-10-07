export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  createdAt: string;
  bookType?: "Novel" | "Light Novel" | "Short Story";
  genres?: string[];
  status?: "Ongoing" | "Completed" | "Hiatus" | "Dropped";
  language?: "Burmese" | "English";
  publicationStatus?: "Draft" | "Published";
};

export type Chapter = {
  id: string;
  bookId: string;
  title: string;
  content: string;
  chapterNumber: number;
};

export type ChapterSummary = Omit<Chapter, "content">;

export function toChapterSummary(chapter: Chapter): ChapterSummary {
  return {
    id: chapter.id,
    bookId: chapter.bookId,
    title: chapter.title,
    chapterNumber: chapter.chapterNumber,
  };
}

export function sortByChapterNumber<T extends { chapterNumber: number }>(chapters: T[]): T[] {
  return [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
}
