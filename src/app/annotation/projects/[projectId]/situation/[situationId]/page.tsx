import { prisma } from '@/lib/prisma';
import FrameView from './components/FrameView';

export default async function Page({ params }: { params: { situationId: string } }) {
  const { situationId } = params;

  const situation = await prisma.annotationSituation.findUnique({
    where: {
      id: parseInt(situationId),
    },
  });

  return (
    <div>
      <p>Selected Situation ID: {situationId}</p>
      {situation?.id && <FrameView situation={situation} />}
    </div>
  );
}
