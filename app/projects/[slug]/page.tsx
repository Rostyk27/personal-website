import { allProjects } from 'contentlayer/generated';
import { Redis } from '@upstash/redis';
import { Metadata } from 'next';
import { seoData } from '@/util/seo';
import { notFound } from 'next/navigation';
import './mdx.css';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import { ReportView } from './view';

type ProductSingleProps = {
  params: {
    slug: string;
  };
};

const getProjectBySlug = async (slug: string) => {
  const project = allProjects.find(
    project => project.slug === slug && project.published
  );

  return project;
};

export async function generateMetadata({
  params,
}: ProductSingleProps): Promise<Metadata> {
  const slug = params?.slug;
  const project = await getProjectBySlug(slug);
  const templateTitle =
    slug === 'rostyk.dev' ? 'Personal website' : (project?.title as string);

  const templateSeo = seoData(
    templateTitle,
    '/projects/' + slug,
    project?.description as string
  );

  return templateSeo;
}

export const revalidate = 60;

const redis = Redis.fromEnv();

export default async function PostPage({ params }: ProductSingleProps) {
  const slug = params?.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(['pageviews', 'projects', slug].join(':'))) ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="prose prose-zinc prose-quoteless mx-auto px-4 py-12">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
