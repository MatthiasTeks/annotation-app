import Typography from '@/components/others/Typography';
import { AnnotationProject } from '@prisma/client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProjectItem({ project }: { project: AnnotationProject }) {
  const timeAgo = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true, locale: fr });

  return (
    <Link href={`/annotation/projects/${project.id}`} className='flex flex-col gap-2'>
      <div className='border border-1 border-gray-500 rounded-lg p-4 flex flex-col items-center gap-2 h-[100px] w-[250px]'></div>
      <div>
        <Typography>{project.name}</Typography>
        <Typography variant='small'>Édité {timeAgo}</Typography>
      </div>
    </Link>
  );
}
