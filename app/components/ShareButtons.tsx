import { useEffect, useState } from "react";
import { shareLinks } from "~/lib/share";
import {
  CheckIcon,
  FacebookIcon,
  LinkIcon,
  ShareIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "./icons";

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

const iconButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function",
    );
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      return;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share"
          title="Share"
          className={`${iconButtonClass} h-auto w-auto gap-2 px-3 text-xs font-medium`}
        >
          <ShareIcon className="h-4 w-4" />
          Share
        </button>
      ) : null}

      {shareLinks({ url, title }).map((target) => {
        const Icon =
          target.label === "Facebook"
            ? FacebookIcon
            : target.label === "Telegram"
            ? TelegramIcon
            : WhatsAppIcon;

        return (
          <a
            key={target.label}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${target.label}`}
            title={`Share on ${target.label}`}
            className={iconButtonClass}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className={`${iconButtonClass} ${copied ? "text-green-400" : ""}`}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
