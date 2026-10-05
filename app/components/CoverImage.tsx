import { useState } from "react";
import { resolveImageUrl } from "~/lib/image";

type CoverImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export function CoverImage({
  src,
  alt,
  className,
  loading = "lazy",
}: CoverImageProps) {
  const url = resolveImageUrl(src);
  const [hasFailed, setHasFailed] = useState(false);

  if (!url || hasFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-100 text-[11px] font-medium uppercase tracking-widest text-neutral-400 ${className ?? ""}`}
      >
        No cover
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setHasFailed(true)}
      className={className}
    />
  );
}
