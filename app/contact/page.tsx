import { Metadata } from 'next';
import { seoData } from '@/util/seo';
import { Github, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';

const templateSeo = seoData('Contact', '/contact', 'Get in touch with me');

export const metadata: Metadata = templateSeo;

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: 'https://www.linkedin.com/in/rostyk27/',
    label: 'LinkedIn',
    handle: 'rostyk27',
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:rostyk.dev@gmail.com',
    label: 'Email',
    handle: 'rostyk.dev@gmail.com',
  },
  {
    icon: <Github size={20} />,
    href: 'https://github.com/rostyk27/',
    label: 'Github',
    handle: 'rostyk27',
  },
];

const isBlank = (str: string) => {
  return str.includes('mailto') ? '_self' : '_blank';
};

export default function ContactPage() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      <div className="mx-auto flex min-h-screen max-w-screen-2xl items-center justify-center px-6">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 xl:gap-12 2xl:gap-16">
          {socials.map((s, i) => (
            <Card key={i}>
              <Link
                href={s.href}
                target={isBlank(s.href)}
                className="group relative flex flex-col items-center gap-4 p-4 duration-700 md:gap-8 md:p-16  md:py-24  lg:pb-48"
              >
                <span
                  className="absolute h-2/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="drop-shadow-orange relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                  {s.icon}
                </span>{' '}
                <div className="z-10 flex flex-col items-center">
                  <span className="font-display text-xl font-medium text-zinc-200 duration-150 group-hover:text-white lg:text-3xl">
                    {s.handle}
                  </span>

                  <span className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
