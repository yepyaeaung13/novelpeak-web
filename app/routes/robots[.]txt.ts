import type { Route } from "./+types/robots[.]txt";
import { absoluteUrl, siteOrigin } from "~/lib/seo";

export async function loader({ request }: Route.LoaderArgs) {
  const origin = siteOrigin(request);

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${absoluteUrl(origin, "/sitemap.xml")}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
