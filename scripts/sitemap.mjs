/**
 * Sitemap generator - run after `vite build`.
 */

import { existsSync, mkdirSync, writeFileSync } from "fs"
import { resolve } from "path"

const DIST = resolve("dist")
const SITE_URL = process.env.SITE_URL || "https://marbritaesthetic.com"

const ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
]

function generate() {
  const now = new Date().toISOString().split("T")[0]

  const urls = ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  ).join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`

  if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true })
  writeFileSync(resolve(DIST, "sitemap.xml"), xml, "utf-8")
  console.log("sitemap.xml generated with", ROUTES.length, "URL")
}

try {
  generate()
} catch (err) {
  console.warn("sitemap generation skipped:", err.message)
}
