import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../content/site';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  noIndex?: boolean;
};

function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function Seo({
  title,
  description = siteConfig.description,
  path = '/',
  image = '/og-card.svg',
  type = 'website',
  publishedAt,
  updatedAt,
  tags = [],
  noIndex = false,
}: SeoProps) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {type === 'article' && publishedAt ? (
        <meta property="article:published_time" content={publishedAt} />
      ) : null}
      {type === 'article' && updatedAt ? (
        <meta property="article:modified_time" content={updatedAt} />
      ) : null}
      {type === 'article'
        ? tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)
        : null}
    </Helmet>
  );
}
