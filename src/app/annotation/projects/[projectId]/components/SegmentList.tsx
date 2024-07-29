import { prisma } from '@/lib/prisma';
import DialogUploadFile from './DialogUploadFile';

export default async function SegmentList({ projectId }: { projectId: string }) {
  const projectIdNumber = parseInt(projectId, 10);

  const situations = await prisma.annotationSituation.findMany({
    where: {
      projectId: projectIdNumber,
    },
  });

  return (
    <div className='text-white'>
      {situations.map((situation) => (
        <p key={situation.id}>{situation.name}</p>
      ))}
      {situations.length === 0 && <DialogUploadFile projectId={projectId} />}
    </div>
  );
}
