import { Annotation } from '@prisma/client';

export async function fetchAnnotations(frameId: number): Promise<Annotation[]> {
  const response = await fetch(`/api/annotations/?frameId=${frameId}`, {
    next: { tags: ['annotation'] },
  });
  return await response.json();
}
