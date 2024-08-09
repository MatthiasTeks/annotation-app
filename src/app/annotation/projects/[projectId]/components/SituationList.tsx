'use client';

import { AnnotationSituation } from '@prisma/client';
import { FileText } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SituationList({
  situations,
  projectId,
}: {
  situations: AnnotationSituation[];
  projectId: string;
}) {
  const pathname = usePathname();

  const isActiveLink = (situation: AnnotationSituation) => {
    return pathname === `/annotation/projects/${projectId}/situation/${situation.id}`;
  };

  return (
    <div className='text-white'>
      {situations.map((situation) => (
        <Link
          href={`${projectId}/situation/${situation.id}`}
          key={situation.id}
          className={`link ${isActiveLink(situation) ? 'text-primary' : ''}`}
        >
          <p key={situation.id} className='text-sm flex items-center gap-2'>
            <FileText className='mr-2 h-4 w-4' />
            {situation.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
