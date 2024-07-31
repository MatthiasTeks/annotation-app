import { prisma } from '@/lib/prisma';
import { AnnotationSituation } from '@prisma/client';

export default async function FrameView({ situation }: { situation: AnnotationSituation }) {
  const { id } = situation;
  const frames = await prisma.annotationFrame.findMany({
    where: {
      situationId: id,
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  return <div className='text-white'>Frame View : {frames.length}</div>;
}