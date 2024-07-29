'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';

export async function createProject(userId: any, formData: FormData) {
  const rawFormData = {
    projectName: formData.get('project-name'),
    projectDescription: formData.get('project-description'),
  };

  if (!userId) {
    throw new Error('User ID is required to create a project');
  }

  let project;

  try {
    project = await prisma.annotationProject.create({
      data: {
        name: rawFormData.projectName as string,
        description: rawFormData.projectDescription as string,
        userId: userId,
      },
    });
  } catch (error) {
    return { message: 'Failed to create project' };
  }

  revalidatePath('/annotation/projects');
  redirect(`/annotation/projects/${project.id}`);
}

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

export async function deleteProject(projectId: number) {
  try {
    await prisma.annotationProject.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath('/annotation/projects');
    return { message: 'Successfully deleted project' };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { message: 'Failed to delete project' };
  }
}
