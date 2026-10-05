import { API_BASE_URL } from "./api";

const IMAGE_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_IMAGE_BASE_URL || "",
);

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function resolveImageUrl(source?: string | null): string | null {
  const value = source?.trim();
  if (!value) return null;
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  const base = IMAGE_BASE_URL || API_BASE_URL;
  return `${base}${value.startsWith("/") ? value : `/${value}`}`;
}
