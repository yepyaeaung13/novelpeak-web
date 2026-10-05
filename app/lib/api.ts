import type { Book, Chapter } from "./types";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
);

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    let message = response.statusText || "Request failed";
    try {
      const body: unknown = await response.json();
      if (body && typeof body === "object" && "message" in body) {
        const detail = (body as { message?: unknown }).message;
        if (typeof detail === "string" && detail) message = detail;
      }
    } catch {
      message = response.statusText || "Request failed";
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

export function getBooks(): Promise<Book[]> {
  return apiFetch<Book[]>("/books");
}

export function getBook(bookId: string): Promise<Book> {
  return apiFetch<Book>(`/books/${encodeURIComponent(bookId)}`);
}

export function getChapters(bookId: string): Promise<Chapter[]> {
  return apiFetch<Chapter[]>(`/books/${encodeURIComponent(bookId)}/chapters`);
}

export function getChapter(bookId: string, chapterId: string): Promise<Chapter> {
  return apiFetch<Chapter>(
    `/books/${encodeURIComponent(bookId)}/chapters/${encodeURIComponent(chapterId)}`,
  );
}
