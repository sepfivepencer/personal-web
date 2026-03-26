import { ArrowRight, ArrowUpRight, NotebookPen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { Seo } from '../components/Seo';
import { siteConfig, socialProfiles } from '../content/site';
import { allTags, featuredPosts, latestPosts, posts } from '../lib/content';
import { formatTag } from '../lib/format';

export function HomePage() {
  const featuredPost = featuredPosts[0] ?? latestPosts[0];
  const freshPosts = latestPosts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <>
      <Seo path="/" />

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.25rem] border border-stone-900/10 bg-white/75 p-7 shadow-[0_30px_120px_rgba(76,58,39,0.1)] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-[#fffaf1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
            <Sparkles className="h-3.5 w-3.5" />
            personal website and writing
          </div>

          <div className="mt-8 max-w-3xl space-y-6">
            <h1 className="font-serif text-5xl leading-[0.98] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              Building calm, durable interfaces for the internet.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">{siteConfig.intro}</p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/writing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-50 transition-transform hover:-translate-y-0.5"
            >
              Read the latest
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-stone-800 transition-transform hover:-translate-y-0.5"
            >
              About and contact
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-stone-900/10 bg-[#fffaf1] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Archive</p>
              <p className="mt-3 font-serif text-4xl text-stone-950">{String(posts.length).padStart(2, '0')}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">Essays, notes, and system thinking.</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-900/10 bg-[#f4fbf8] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Topics</p>
              <p className="mt-3 font-serif text-4xl text-stone-950">{String(allTags.length).padStart(2, '0')}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">Product, systems, writing, and interface craft.</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-900/10 bg-[#fff6f0] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Cadence</p>
              <p className="mt-3 font-serif text-4xl text-stone-950">Live</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">New essays land here as the system grows.</p>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-[2rem] border border-stone-900/10 bg-[#0f1720] p-6 text-stone-50 shadow-[0_30px_100px_rgba(15,23,32,0.22)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
              <NotebookPen className="h-4 w-4" />
              now
            </div>
            <div className="mt-5 space-y-4">
              {siteConfig.now.map((item) => (
                <p key={item} className="text-sm leading-7 text-stone-200">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Elsewhere</p>
            <div className="mt-5 space-y-3">
              {socialProfiles.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-3 rounded-2xl border border-stone-900/10 bg-[#fffaf1] px-4 py-3 transition-transform hover:-translate-y-0.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{social.label}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{social.note}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 text-stone-400" />
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      </section>

      {featuredPost ? (
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Featured essay</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight text-stone-950">Start here</h2>
            </div>
            <Link to="/writing" className="text-sm font-semibold text-stone-700 transition-colors hover:text-stone-950">
              Browse archive
            </Link>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Latest writing</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-stone-950">Recent notes from the archive</h2>
          </div>

          <div className="space-y-5">
            {freshPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Working principles</p>
            <div className="mt-6 space-y-5">
              {siteConfig.principles.map((principle) => (
                <div key={principle.title} className="rounded-[1.5rem] border border-stone-900/10 bg-[#fffaf1] p-5">
                  <h3 className="font-serif text-2xl tracking-tight text-stone-950">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-900/10 bg-[#fffaf1] p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Topics in rotation</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  to={`/writing?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-stone-900/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 transition-transform hover:-translate-y-0.5 hover:text-stone-900"
                >
                  {formatTag(tag)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
