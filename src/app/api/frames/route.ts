import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const situationId = searchParams.get('situationId');

  if (!situationId) {
    return NextResponse.json({ frames: [] });
  }

  const frames = await prisma.annotationFrame.findMany({
    where: {
      situationId: parseInt(situationId, 10),
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  return NextResponse.json(frames);
}
