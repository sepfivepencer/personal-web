import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Not found" description="The page you requested could not be found." path="/404" noIndex />

      <section className="rounded-[2.25rem] border border-stone-900/10 bg-white/80 p-7 shadow-[0_30px_120px_rgba(76,58,39,0.1)] backdrop-blur-xl sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">404</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight text-stone-950 sm:text-6xl">This page is missing.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
          The route may have changed while the site was being rebuilt, or the link points to something that was never published.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-50 transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-stone-700 transition-transform hover:-translate-y-0.5"
          >
            Open the archive
          </Link>
        </div>
      </section>
    </>
  );
}
