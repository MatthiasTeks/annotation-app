import { AnnotationSituation } from '@prisma/client';
import { SituationRow } from './SituationRow';

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
        <SituationRow key={situation.id} situation={situation} projectId={projectId} />
      ))}
    </div>
  );
}
