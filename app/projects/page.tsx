import Link from 'next/link';
import { Metadata } from 'next';
import { seoData } from '@/util/seo';
import { allProjects } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';
import { Article } from './article';
import { Redis } from '@upstash/redis';
import { Eye } from 'lucide-react';

const templateSeo = seoData(
  'Projects',
  '/projects',
  'Here are some of my projects, showcasing my passion for creating remarkable digital experiences'
);

export const metadata: Metadata = templateSeo;

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map(p => ['pageviews', 'projects', p.slug].join(':'))
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find(project => project.slug === 'nextjs-shop')!;
  const top2 = allProjects.find(project => project.slug === 'react-shop')!;
  const top3 = allProjects.find(project => project.slug === 'todo-app')!;
  const sorted = allProjects
    .filter(p => p.published)
    .filter(
      project =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />

      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-20 md:space-y-12 md:pt-24 lg:space-y-16 lg:px-8 lg:pt-32">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h1>

          <p className="mt-4 text-zinc-400">
            Here are some of my projects, showcasing my passion for creating
            remarkable digital experiences.
          </p>
        </div>
        <div className="h-px w-full bg-zinc-800" />

        <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative h-full w-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="h-4 w-4" />{' '}
                    {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                      views[featured.slug] ?? 0
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 font-display text-3xl font-bold text-zinc-100 group-hover:text-white lg:text-4xl"
                >
                  {featured.title}
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-zinc-400 duration-150 group-hover:text-zinc-300 lg:text-base lg:leading-8">
                  {featured.description}
                </p>

                <div className="absolute bottom-4 hidden md:bottom-8 md:block">
                  <p className="text-zinc-200 hover:text-zinc-50">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="mx-auto flex w-full flex-col gap-4 border-t border-gray-900/10 md:gap-8 lg:mx-0 lg:border-t-0">
            {[top2, top3].map(project => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden h-px w-full bg-zinc-800 md:block" />

        <div className="mx-auto !mt-4 grid grid-cols-1 gap-4 md:!mt-12 md:grid-cols-3 lg:mx-0 lg:!mt-16">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map(project => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map(project => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map(project => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
