import { prisma } from '@/lib/prisma';

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
    </div>
  );
}
