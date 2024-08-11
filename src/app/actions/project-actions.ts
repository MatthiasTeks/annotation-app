'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function getProjectsByUserId(userId: string) {
  try {
    const projects = await prisma.annotationProject.findMany({
      where: {
        userId: userId,
      },
    });

    return projects;
  } catch (error) {
    console.error('Error getting projects by user ID:', error);
    return null;
  }
}
