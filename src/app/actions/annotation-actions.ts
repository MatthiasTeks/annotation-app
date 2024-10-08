'use server';

import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
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

  x: z
    .string()
    .min(1, 'Position X is required')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'Position X must be a valid number' }),

  y: z
    .string()
    .min(1, 'Position Y is required')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'Position Y must be a valid number' }),

  name: z.string().optional().default('Unnamed Annotation'),
});

export async function deleteAnnotation(annotationId: number) {
  try {
    await prisma.annotation.delete({
      where: {
        id: annotationId,
      },
    });

    revalidateTag('annotation');
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

export async function createAnnotation(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    frameId: formData.get('frame-id'),
    projectId: formData.get('project-id'),
    x: formData.get('x-position'),
    y: formData.get('y-position'),
    name: formData.get('annotation-name'),
  });

  if (!validatedFields.success) {
    return { message: 'Failed to create annotation' };
  }

  try {
    const annotation = await prisma.annotation.create({
      data: {
        posX: validatedFields.data.x,
        posY: validatedFields.data.y,
        name: validatedFields.data.name,
        frame: {
          connect: { id: validatedFields.data.frameId },
        },
      },
      include: {
        frame: true,
      },
    });

    revalidateTag('annotation');
    return { annotation: annotation };
  } catch (error) {
    console.error('Error creating annotation:', error);
    return { annotation: null };
  }
}
