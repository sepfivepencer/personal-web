import { ArrowUpRight, Github, Instagram, Mail, MapPin, Radio, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink, Outlet } from 'react-router-dom';
import { siteConfig, socialProfiles } from '../content/site';
import { cn } from '../lib/cn';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
] as const;

const SOCIAL_ICONS = {
  GitHub: Github,
  X: Twitter,
  Instagram: Instagram,
} as const;

export function AppShell() {
  return (
    <div className="relative min-h-screen overflow-hidden text-stone-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-200/60 blur-3xl" />
        <div className="absolute right-[-10rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(95,82,65,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(95,82,65,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#f6f0e6]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex min-w-0 flex-col">
            <span className="font-serif text-2xl italic tracking-tight text-stone-950">{siteConfig.shortName}</span>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              personal website
            </span>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-stone-950 text-stone-50'
                      : 'text-stone-600 hover:bg-white/60 hover:text-stone-950',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:text-stone-950 sm:inline-flex"
          >
            <Mail className="h-4 w-4" />
            Say hello
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Outlet />
      </main>

      <footer className="mx-auto mb-8 mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_30px_120px_rgba(74,55,38,0.08)] backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Sepfive</p>
              <h2 className="max-w-xl font-serif text-3xl tracking-tight text-stone-950">{siteConfig.tagline}</h2>
              <p className="max-w-xl text-base leading-7 text-stone-600">{siteConfig.intro}</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Elsewhere</p>
              <div className="space-y-2">
                {socialProfiles.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label];

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-stone-900/10 bg-white/70 px-4 py-3 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium text-stone-800">
                        <Icon className="h-4 w-4 text-stone-500" />
                        {social.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-stone-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">At a glance</p>
              <div className="space-y-3 rounded-[1.5rem] border border-stone-900/10 bg-[#fffaf1] p-5">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <MapPin className="h-4 w-4 text-stone-500" />
                  {siteConfig.location}
                </div>
                <div className="flex items-start gap-3 text-sm text-stone-600">
                  <Radio className="mt-0.5 h-4 w-4 text-stone-500" />
                  <span>{siteConfig.availability}</span>
                </div>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
