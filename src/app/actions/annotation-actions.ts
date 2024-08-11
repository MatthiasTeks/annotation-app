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

export async function getFirstAnnotationFrameByProjectId(projectId: number) {
  const project = await prisma.annotationProject.findUnique({
    where: { id: projectId },
    include: {
      situations: {
        include: {
          frames: {
            orderBy: {
              timestamp: 'asc',
            },
            take: 1,
          },
        },
      },
    },
  });

  if (project && project.situations.length > 0) {
    for (const situation of project.situations) {
      if (situation.frames.length > 0) {
        return situation.frames[0];
      }
    }
  }

  return null;
}
