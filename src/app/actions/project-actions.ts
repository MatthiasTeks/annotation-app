'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectDescription: z.string().min(1, 'Project description is required'),
  userId: z.string().min(1, 'User ID is required'),
});

export async function createProject(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    projectName: formData.get('project-name'),
    projectDescription: formData.get('project-description'),
    userId: formData.get('user-id'),
  });

  if (!validatedFields.success) {
    return { message: 'Failed to create project' };
  }

  let project;

  try {
    project = await prisma.annotationProject.create({
      data: {
        name: validatedFields.data.projectName,
        description: validatedFields.data.projectDescription,
        userId: validatedFields.data.userId,
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
