import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const frameId = searchParams.get('frameId');

  if (!frameId) {
    return NextResponse.json({ annotations: [] });
  }

  const annotations = await prisma.annotation.findMany({
    where: { frameId: parseInt(frameId, 10) },
  });

  return NextResponse.json(annotations);
}
