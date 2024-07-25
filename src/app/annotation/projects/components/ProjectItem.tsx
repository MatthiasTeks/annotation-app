import { AnnotationProject } from '@prisma/client';
import Link from 'next/link';

export default function ProjectItem({ project }: { project: AnnotationProject }) {
  return (
    <Link href={`/annotation/projects/${project.id}`}>
      <div className='border border-1 border-gray-500 rounded-lg p-4 flex flex-col gap-2'>
        <h1 className='text-lg text-foreground font-bold'>{project.name}</h1>
      </div>
    </Link>
  );
}
