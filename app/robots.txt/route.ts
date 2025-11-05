import { siteConfig } from "../../config/site"

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
