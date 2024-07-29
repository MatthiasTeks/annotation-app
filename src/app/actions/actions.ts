'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProject(userId: any, formData: FormData) {
  const rawFormData = {
    projectName: formData.get('project-name'),
    projectDescription: formData.get('project-description'),
  };

  if (!userId) {
    throw new Error('User ID is required to create a project');
  }

  try {
    const project = await prisma.annotationProject.create({
      data: {
        name: rawFormData.projectName as string,
        description: rawFormData.projectDescription as string,
        userId: userId,
      },
    });

    revalidatePath('/annotation/projects');
    return { message: 'Successfully created project', data: project };
  } catch (error) {
    return { message: 'Failed to create todo' };
  }
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
