'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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

const annotationSchema = z.object({
  frameId: z
    .string()
    .min(1, 'Frame ID is required')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'Frame ID must be a valid number' }),

  projectId: z
    .string()
    .min(1, 'Project ID is required')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'Project ID must be a valid number' }),

  posX: z
    .string()
    .min(1, 'Position X is required')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'Position X must be a valid number' }),

  posY: z
    .string()
    .min(1, 'Position Y is required')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'Position Y must be a valid number' }),

  name: z.string().optional().default('Unnamed Annotation'),
});

export async function createAnnotation(prevState: any, formData: FormData) {
  const rawFormData = {
    frameId: formData.get('frame-id'),
    projectId: formData.get('project-id'),
    posX: formData.get('x-position'),
    posY: formData.get('y-position'),
    name: formData.get('annotation-name'),
  };

  const parsedData = annotationSchema.parse(rawFormData);

  try {
    const annotation = await prisma.annotation.create({
      data: {
        posX: parsedData.posX,
        posY: parsedData.posY,
        name: parsedData.name,
        frame: {
          connect: { id: parsedData.frameId },
        },
      },
      include: {
        frame: true,
      },
    });

    revalidatePath(`/annotation/projects/${rawFormData.projectId}`);
    return { annotation: annotation };
  } catch (error) {
    console.error('Error creating annotation:', error);
    return { annotation: null };
  }
}
