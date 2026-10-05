import { Link, NavLink } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
  }`;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          Novel<span className="text-blue-600">Peak</span>
        </Link>
        <nav className="flex items-center gap-5">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-400">
        NovelPeak — read novels online.
      </div>
    </footer>
  );
}
