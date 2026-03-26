export const siteConfig = {
  name: 'Sepfive Pencer',
  shortName: 'Sepfive',
  title: 'Sepfive Pencer | Personal Website and Blog',
  description:
    'A personal website about building calm digital products, thoughtful interfaces, and durable systems for the web.',
  url: 'https://www.sepfivepencer.org',
  locale: 'en_US',
  email: 'hello@sepfivepencer.org',
  location: 'Shangdong, China',
  tagline: 'Notes on product, design systems, and the craft of building things that last.',
  intro:
    'This is my home on the web. I write about frontend systems, interface density, product thinking, and the slower work of making software feel inevitable.',
  availability:
    'Available for selected collaborations in product strategy, frontend architecture, and design systems.',
  now: [
    'Turning a visual prototype into a real publishing system with clean content workflows.',
    'Writing shorter, sharper essays more often instead of waiting for “complete” ideas.',
    'Refining dense interfaces that stay readable on both mobile and desktop.',
  ],
  principles: [
    {
      title: 'Density with clarity',
      description: 'Interfaces can carry a lot of information without feeling loud, if hierarchy is disciplined.',
    },
    {
      title: 'Systems over tricks',
      description: 'The best websites age well because the content model and information architecture are solid.',
    },
    {
      title: 'A personal site should feel personal',
      description: 'A blog should read like one person thinking in public, not a startup landing page wearing a disguise.',
    },
  ],
  workbench: [
    'React and TypeScript for application surfaces',
    'Design systems and editorial UI patterns',
    'Markdown-first content pipelines',
    'Static deployment workflows that stay simple',
  ],
} as const;

export type SocialProfile = {
  label: string;
  href: string;
  note: string;
};

export const socialProfiles: SocialProfile[] = [
  { label: 'GitHub', href: 'https://github.com/sepfivepencer', note: 'Code, experiments, and side projects.' },
  { label: 'X', href: 'https://x.com/Sepfivepencer', note: 'Short notes and links worth keeping.' },
  { label: 'Instagram', href: 'https://www.instagram.com/pencersepfive/', note: 'Visual fragments and offline references.' },
];
