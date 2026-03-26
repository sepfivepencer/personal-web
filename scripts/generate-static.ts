import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { siteConfig } from '../src/content/site';

type Frontmatter = {
  title?: string;
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
};

type StaticPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  excerpt: string;
  readingTime: number;
  body: string;
};

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function estimateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function buildExcerpt(content: string) {
  const collapsed = content.replace(/\s+/g, ' ').trim();
  return collapsed.slice(0, 180).trimEnd() + (collapsed.length > 180 ? '…' : '');
}

async function collectPosts() {
  const contentDir = path.resolve('src/content/blog');
  const files = await readdir(contentDir);

  const posts: Array<StaticPost | null> = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const source = await readFile(path.join(contentDir, file), 'utf8');
        const { data, content } = matter(source);
        const frontmatter = data as Frontmatter;

        if (frontmatter.draft) {
          return null;
        }

        if (!frontmatter.title || !frontmatter.description || !frontmatter.publishedAt) {
          throw new Error(`Missing required frontmatter in ${file}`);
        }

        return {
          slug: file.replace(/\.md$/, ''),
          title: frontmatter.title,
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt,
          updatedAt: frontmatter.updatedAt,
          tags: Array.isArray(data.tags) ? data.tags : [],
          featured: Boolean(frontmatter.featured),
          excerpt: buildExcerpt(content),
          readingTime: estimateReadingTime(content),
          body: content.trim(),
        } satisfies StaticPost;
      }),
  );

  return posts
    .filter((post): post is StaticPost => Boolean(post))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function generateSitemap(siteUrl: string, posts: StaticPost[]) {
  const routes = ['/', '/writing', '/about', ...posts.map((post) => `/writing/${post.slug}`)];
  const now = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const post = posts.find((entry) => route === `/writing/${entry.slug}`);
    const lastmod = post?.updatedAt ?? post?.publishedAt ?? now;

    return `  <url>
    <loc>${escapeXml(`${siteUrl}${route}`)}</loc>
    <lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod>
  </url>`;
  })
  .join('\n')}
</urlset>
`;
}

function generateFeed(siteUrl: string, posts: StaticPost[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${siteUrl}/writing/${post.slug}`)}</link>
      <guid>${escapeXml(`${siteUrl}/writing/${post.slug}`)}</guid>
      <pubDate>${escapeXml(new Date(post.publishedAt).toUTCString())}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
}

async function main() {
  const siteUrl = siteConfig.url.replace(/\/$/, '');
  const publicDir = path.resolve('public');
  const generatedContentDir = path.resolve('src/content/generated');
  const posts = await collectPosts();

  await mkdir(publicDir, { recursive: true });
  await mkdir(generatedContentDir, { recursive: true });
  await writeFile(path.join(generatedContentDir, 'posts.json'), JSON.stringify(posts, null, 2));
  await writeFile(path.join(publicDir, 'sitemap.xml'), generateSitemap(siteUrl, posts));
  await writeFile(path.join(publicDir, 'feed.xml'), generateFeed(siteUrl, posts));
  await writeFile(
    path.join(publicDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
