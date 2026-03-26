import { Link, useSearchParams } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { Seo } from '../components/Seo';
import { allTags, posts } from '../lib/content';
import { formatTag, formatLongDate } from '../lib/format';

function groupPostsByYear(items: typeof posts) {
  return items.reduce<Record<string, typeof posts>>((groups, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    const currentYearPosts = groups[year] ?? [];
    groups[year] = [...currentYearPosts, post];
    return groups;
  }, {});
}

export function WritingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const visiblePosts = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;
  const groupedPosts = groupPostsByYear(visiblePosts);

  return (
    <>
      <Seo
        title="Writing"
        description="Essays and notes on product, systems, interface design, and building durable software."
        path={activeTag ? `/writing?tag=${encodeURIComponent(activeTag)}` : '/writing'}
      />

      <section className="space-y-6 rounded-[2.25rem] border border-stone-900/10 bg-white/75 p-7 shadow-[0_30px_120px_rgba(76,58,39,0.1)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Writing archive</p>
          <h1 className="font-serif text-5xl tracking-tight text-stone-950 sm:text-6xl">A growing index of ideas in public.</h1>
          <p className="text-lg leading-8 text-stone-600">
            Short essays, system notes, and practical reflections on design, frontend architecture, and the craft of publishing on the web.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              !activeTag
                ? 'bg-stone-950 text-stone-50'
                : 'border border-stone-900/10 bg-white/70 text-stone-600 hover:text-stone-950'
            }`}
          >
            All topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchParams({ tag })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                activeTag === tag
                  ? 'bg-stone-950 text-stone-50'
                  : 'border border-stone-900/10 bg-white/70 text-stone-600 hover:text-stone-950'
              }`}
            >
              {formatTag(tag)}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="rounded-[2rem] border border-dashed border-stone-900/15 bg-white/60 p-8 text-center text-stone-600">
            No essays matched this filter yet.
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-stone-900/10 bg-[#fffaf1] p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Archive view</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-stone-950">Chronological overview</h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Useful when you want the shape of the writing over time instead of a single filtered view.
          </p>
        </div>

        <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
          <div className="space-y-8">
            {Object.entries(groupedPosts).map(([year, yearPosts]) => (
              <div key={year} className="grid gap-4 md:grid-cols-[84px_1fr]">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">{year}</div>
                <div className="space-y-3">
                  {yearPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/writing/${post.slug}`}
                      className="flex flex-col gap-2 rounded-[1.5rem] border border-stone-900/10 bg-[#fffaf1] px-5 py-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                        <span>{formatLongDate(post.publishedAt)}</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <p className="font-serif text-2xl tracking-tight text-stone-950">{post.title}</p>
                      <p className="text-sm leading-6 text-stone-600">{post.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
