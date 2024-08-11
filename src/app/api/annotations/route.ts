import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * Handler for GET requests to fetch annotations based on the frame ID.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const frame = searchParams.get('frame');

  if (!frame) {
    return NextResponse.json({ annotations: [] });
  }

  const annotations = await prisma.annotation.findMany({
    where: { frameId: parseInt(frame, 10) },
  });

  return NextResponse.json(annotations);
}
