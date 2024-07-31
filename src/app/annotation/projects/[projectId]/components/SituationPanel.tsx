import { prisma } from '@/lib/prisma';
import SituationList from './SituationList';

export default async function SituationPanel({ projectId }: { projectId: string }) {
  const projectIdNumber = parseInt(projectId, 10);

  const situations = await prisma.annotationSituation.findMany({
    where: {
      projectId: projectIdNumber,
    },
  });

  return (
    <div className='text-white'>
      <h1>Segment Panel</h1>
      {situations.length > 0 && <SituationList situations={situations} projectId={projectId} />}
    </div>
  );
}
