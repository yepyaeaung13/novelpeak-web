type LogoMarkProps = {
  className?: string;
  src?: string;
};

export function LogoMark({ className, src }: LogoMarkProps) {
  return (
    <img
      src={src ?? "/novelpeak-logo-256.png"}
      srcSet="/novelpeak-logo-256.png 1x, /novelpeak-logo@2x.png 2x"
      alt=""
      width={256}
      height={256}
      decoding="async"
      className={className}
    />
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-9 w-9 object-contain"} />
      <span className="text-lg font-semibold tracking-tight text-neutral-50">
        Novel<span className="text-amber-400">Peak</span>
      </span>
    </span>
  );
}
