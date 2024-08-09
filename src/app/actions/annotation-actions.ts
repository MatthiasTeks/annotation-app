'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteAnnotation(annotationId: number) {
  try {
    await prisma.annotation.delete({
      where: {
        id: annotationId,
      },
    });

    revalidatePath('/annotation/projects/[projectId]');
    return { message: 'Successfully deleted annotation' };
  } catch (error) {
    console.error('Error deleting annotation:', error);
    return { message: 'Failed to delete annotation' };
  }
}
