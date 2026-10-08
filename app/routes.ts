import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("books/:bookId", "routes/books.$bookId.tsx"),
  route(
    "books/:bookId/chapters/:chapterId",
    "routes/books.$bookId.chapters.$chapterId.tsx",
  ),
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
] satisfies RouteConfig;
