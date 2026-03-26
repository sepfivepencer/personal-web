import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { Seo } from '../components/Seo';
import { getPostBySlug, getRelatedPosts } from '../lib/content';
import { formatLongDate, formatTag } from '../lib/format';
import { NotFoundPage } from './NotFoundPage';

export function PostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
  }

  const relatedPosts = getRelatedPosts(post, 2);

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/writing/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        tags={post.tags}
      />

      <article className="space-y-8">
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>

        <div className="rounded-[2.25rem] border border-stone-900/10 bg-white/80 p-7 shadow-[0_30px_120px_rgba(76,58,39,0.1)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone-900/10 bg-[#f7f0e1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600"
                >
                  {formatTag(tag)}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-5xl leading-[1] tracking-tight text-stone-950 sm:text-6xl">{post.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-stone-600">{post.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-stone-500">
              <span>{formatLongDate(post.publishedAt)}</span>
              <span className="text-stone-300">/</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="rounded-[2rem] border border-stone-900/10 bg-white/85 p-7 shadow-[0_24px_100px_rgba(76,58,39,0.08)] backdrop-blur-xl sm:p-8">
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href = '', children, ...props }) => {
                    const isExternal = href.startsWith('http');

                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noreferrer' : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-stone-900/10 bg-[#fffaf1] p-5 shadow-[0_20px_80px_rgba(76,58,39,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Keep going</p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                If this piece is useful, the rest of the archive follows the same line of thought: systems first, surface second.
              </p>
              <Link
                to="/writing"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition-colors hover:text-teal-900"
              >
                Open the archive
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-5 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Filed under</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/writing?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-stone-900/10 bg-[#fffaf1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 transition-transform hover:-translate-y-0.5"
                  >
                    {formatTag(tag)}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">More writing</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-stone-950">Continue with a nearby idea</h2>
          </div>
          <div className="space-y-5">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
