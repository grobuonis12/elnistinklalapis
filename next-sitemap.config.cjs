const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/*',
    '/posts/*',
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
    ],
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: 'daily',
        priority: path === '/' ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
      }
    },
  },
  sitemapSize: 7000,
  generateIndexSitemap: true,
  outDir: 'public',
}
