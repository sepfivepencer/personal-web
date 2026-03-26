import { ArrowUpRight, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../lib/content';
import { cn } from '../lib/cn';
import { formatLongDate, formatTag } from '../lib/format';

type PostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'group overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/75 shadow-[0_24px_80px_rgba(71,55,38,0.08)] backdrop-blur-xl',
        featured ? 'p-7 sm:p-8' : 'p-6',
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
        <span>{formatLongDate(post.publishedAt)}</span>
        <span className="text-stone-300">/</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4" />
          {post.readingTime} min read
        </span>
      </div>

      <div className={cn('mt-5 flex flex-col gap-4', featured ? 'lg:flex-row lg:items-start lg:justify-between' : '')}>
        <div className="max-w-2xl">
          <Link
            to={`/writing/${post.slug}`}
            className={cn(
              'font-serif tracking-tight text-stone-950 transition-colors group-hover:text-teal-900',
              featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
            )}
          >
            {post.title}
          </Link>
          <p className="mt-4 text-base leading-7 text-stone-600">{post.description}</p>
        </div>

        <Link
          to={`/writing/${post.slug}`}
          className="inline-flex items-center gap-2 self-start rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-stone-50 transition-transform hover:-translate-y-0.5"
        >
          Read essay
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-stone-900/10 bg-[#f7f0e1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600"
          >
            {formatTag(tag)}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
