type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="novelpeak-logo" x1="4" y1="2" x2="28" y2="30">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="url(#novelpeak-logo)" />
      <path
        d="M16 7.5 8.5 24.5h4.4l2.3-5.9 2.3 5.9h4.4L16 7.5Z"
        fill="#fff"
        fillOpacity="0.95"
      />
      <path
        d="M7 24.8c2.6-1.5 4.6-2.2 6-2.2 1.7 0 3 .8 3.4 2.2"
        stroke="#dbeafe"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-8 w-8"} />
      <span className="text-lg font-semibold tracking-tight text-neutral-50">
        Novel<span className="text-blue-400">Peak</span>
      </span>
    </span>
  );
}
