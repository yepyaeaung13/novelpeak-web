import { Link, NavLink } from "react-router";
import { Logo } from "./Logo";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-100"
  }`;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" aria-label="NovelPeak home">
          <Logo />
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
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-500">
        NovelPeak — read novels online.
      </div>
    </footer>
  );
}
