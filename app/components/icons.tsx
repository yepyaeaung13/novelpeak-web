type IconProps = {
  className?: string;
};

export function PlayIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 5.5v13l10-6.5-10-6.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookOpenIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 6.5C10.5 5.2 8.5 4.5 6 4.5H3v13h3c2.5 0 4.5.7 6 2 1.5-1.3 3.5-2 6-2h3v-13h-3c-2.5 0-4.5.7-6 2Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" opacity="0.7" />
    </svg>
  );
}

export function StackIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.05 1.45-4.05 4.1v2.3H7.5V13h2.75v8h3.25Z" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.3 4.3 2.9 11.5c-.9.35-.88 1.63.02 1.95l4.6 1.6 1.75 5.3c.24.7 1.1.87 1.6.32l2.5-2.7 4.7 3.45c.66.48 1.6.12 1.83-.7l3.4-14.3c.24-.9-.7-1.65-1.8-1.32ZM9.5 14.7l8.9-5.6-7.3 6.8-.3 3.2-1.3-4.4Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.55 3.75 1.5 5.27L2 22l5.05-1.65a9.8 9.8 0 0 0 4.99 1.35h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm5.75 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.24-3.3-.7-2.78-1.1-4.55-3.94-4.69-4.13-.14-.2-1.12-1.5-1.12-2.86s.71-2.02.96-2.3c.25-.27.55-.34.73-.34l.53.01c.17 0 .4-.07.62.48.24.57.8 1.98.87 2.12.07.14.12.3.02.49-.1.19-.15.3-.29.47-.15.17-.31.37-.44.5-.15.14-.3.3-.13.6.17.29.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.35 1.46.3.14.47.12.64-.07.17-.19.73-.86.93-1.15.2-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.2 1.2" />
      <path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1.2-1.2" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}
