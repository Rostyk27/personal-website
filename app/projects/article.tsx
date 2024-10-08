import type { Project } from '@/.contentlayer/generated';
import Link from 'next/link';
import { Eye, View } from 'lucide-react';

type Props = {
  project: Project;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <span className="drop-shadow-orange mb-1 block text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                }).format(new Date(project.date))}
              </time>
            ) : (
              <span>Ongoing</span>
            )}
          </span>

          <span className="flex items-center  gap-1 text-xs text-zinc-500">
            <Eye className="h-4 w-4" />{' '}
            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
          </span>
        </div>

        <h3 className="z-20 font-display text-2xl font-medium text-zinc-200 duration-1000 group-hover:text-white lg:text-3xl">
          {project.title}
        </h3>

        <p className="z-20 mt-4 text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
