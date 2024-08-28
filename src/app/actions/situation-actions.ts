'use server';

import { prisma } from '@/lib/prisma';
import { AnnotationSituation } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import { z } from 'zod';

const schema = z.object({
  projectId: z
    .string()
    .min(1, 'Project ID is required')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'Project ID must be a valid number' }),
  name: z.string().min(1, 'Situation name is required'),
  file: z.instanceof(File).refine((file) => file.size > 0, 'File is required'),
});

export async function createSituation(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    projectId: formData.get('project-id'),
    name: formData.get('project-name'),
    file: formData.get('project-file') as File,
  });

  if (!validatedFields.success) {
    return { message: 'Failed to create situation' };
  }

  try {
    const arrayBuffer = await validatedFields.data.file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${validatedFields.data.file.name}`, buffer);

    const situation = await prisma.annotationSituation.create({
      data: {
        name: validatedFields.data.name as string,
        project: {
          connect: { id: validatedFields.data.projectId },
        },
      },
    });
    await prisma.annotationFrame.create({
      data: {
        filename: validatedFields.data.file.name,
        timestamp: new Date(),
        situation: {
          connect: { id: situation.id },
        },
      },
      include: {
        situation: true,
      },
    });

    revalidatePath(`/annotation/projects/${validatedFields.data.projectId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getSituations(projectId: number): Promise<AnnotationSituation[] | null> {
  let situations: AnnotationSituation[] = [];
  try {
    situations = await prisma.annotationSituation.findMany({
      where: {
        projectId: projectId,
      },
    });

    return situations;
  } catch (error) {
    console.error('Error getting situations:', error);
    return null;
  }
}

export async function deleteSituation(situationId: number) {
  try {
    await prisma.annotationSituation.delete({
      where: {
        id: situationId,
      },
    });

    revalidatePath('/annotation/projects/[projectId]');
    return { message: 'Successfully deleted situation' };
  } catch (error) {
    console.error('Error deleting situation:', error);
    return { message: 'Failed to delete situation' };
  }
}
