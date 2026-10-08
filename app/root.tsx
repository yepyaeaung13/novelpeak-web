import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Myanmar:wght@100..900&family=Noto+Serif+Myanmar:wght@400;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col bg-neutral-950 text-neutral-200 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The page you are looking for does not exist."
        : typeof error.data === "string"
          ? error.data
          : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
    if (import.meta.env.DEV) stack = error.stack;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">
        {message}
      </h1>
      <p className="mt-3 text-neutral-400">{details}</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
      >
        Back to home
      </Link>
      {stack ? (
        <pre className="mt-6 w-full overflow-x-auto rounded-lg bg-neutral-900 p-4 text-xs">
          <code>{stack}</code>
        </pre>
      ) : null}
    </div>
  );
}
