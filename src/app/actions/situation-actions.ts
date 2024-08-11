'use server';

import { prisma } from '@/lib/prisma';
import { AnnotationSituation } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';

export async function createSituation(formData: FormData) {
  const rawFormData = {
    projectId: formData.get('project-id'),
    name: formData.get('project-name'),
    file: formData.get('project-file') as File,
  };

  if (!rawFormData.projectId) {
    throw new Error('Project ID is required to create a situation');
  }

  const projectId = parseInt(rawFormData.projectId as string);

  if (isNaN(projectId)) {
    throw new Error('Project ID must be a valid number');
  }

  const arrayBuffer = await rawFormData.file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${rawFormData.file.name}`, buffer);

  try {
    const situation = await prisma.annotationSituation.create({
      data: {
        name: rawFormData.name as string,
        project: {
          connect: { id: projectId },
        },
      },
    });
    await prisma.annotationFrame.create({
      data: {
        filename: rawFormData.file.name,
        timestamp: new Date(),
        situation: {
          connect: { id: situation.id },
        },
      },
      include: {
        situation: true,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create situation' };
  }

  revalidatePath(`/annotation/projects/${rawFormData.projectId}`);
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
