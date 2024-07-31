'use client';

import { AnnotationSituation } from '@prisma/client';
import DialogUploadFile from './DialogUploadFile';
import Link from 'next/link';

export default function SituationList({
  situations,
  projectId,
}: {
  situations: AnnotationSituation[];
  projectId: string;
}) {
  return (
    <div className='text-white'>
      {situations.map((situation) => (
        <Link href={`${projectId}/situation/${situation.id}`} key={situation.id}>
          <p key={situation.id}>{situation.name}</p>
        </Link>
      ))}
      {situations.length === 0 && <DialogUploadFile projectId={projectId} />}
    </div>
  );
}
