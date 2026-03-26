import { ArrowUpRight, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Seo } from '../components/Seo';
import { siteConfig, socialProfiles } from '../content/site';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="About Sepfive Pencer, current work, principles, and ways to get in touch."
        path="/about"
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2.25rem] border border-stone-900/10 bg-white/80 p-7 shadow-[0_30px_120px_rgba(76,58,39,0.1)] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">About</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-stone-950 sm:text-6xl">{siteConfig.name}</h1>
          <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-stone-600">
            <p>
              I care about products that feel intentional from the first screen to the last implementation detail. My work usually sits at the intersection of product thinking, frontend systems, and interface design.
            </p>
            <p>
              This site exists to make my thinking legible: what I value in tooling, how I think about density and hierarchy, and why I prefer systems that remain understandable long after the initial launch.
            </p>
            <p>
              The stack is deliberately small. The standard is not. I want the content workflow to stay simple enough that publishing remains easy, and the output polished enough that the site still feels authored.
            </p>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-[2rem] border border-stone-900/10 bg-[#0f1720] p-6 text-stone-50 shadow-[0_30px_100px_rgba(15,23,32,0.22)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200/80">Availability</p>
            <p className="mt-4 text-sm leading-7 text-stone-200">{siteConfig.availability}</p>
            <div className="mt-5 space-y-3 text-sm text-stone-200">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-teal-200/80" />
                {siteConfig.location}
              </div>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 font-medium text-white">
                <Mail className="h-4 w-4 text-teal-200/80" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Workbench</p>
            <div className="mt-5 space-y-3">
              {siteConfig.workbench.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-stone-900/10 bg-[#fffaf1] px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <p className="text-sm leading-6 text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-stone-900/10 bg-[#fffaf1] p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">What I care about</p>
          <div className="mt-6 space-y-5">
            {siteConfig.principles.map((principle) => (
              <div key={principle.title}>
                <h2 className="font-serif text-3xl tracking-tight text-stone-950">{principle.title}</h2>
                <p className="mt-3 text-base leading-7 text-stone-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-900/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(76,58,39,0.08)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Reach out</p>
          <div className="mt-6 space-y-4">
            {socialProfiles.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-3 rounded-[1.5rem] border border-stone-900/10 bg-[#fffaf1] px-5 py-4 transition-transform hover:-translate-y-0.5"
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
      </section>
    </>
  );
}
