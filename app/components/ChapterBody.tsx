import { withLazyImages } from "~/lib/content";

type ChapterBodyProps = {
  html: string;
};

export function ChapterBody({ html }: ChapterBodyProps) {
  return (
    <div
      className="chapter-content"
      dangerouslySetInnerHTML={{ __html: withLazyImages(html) }}
    />
  );
}
