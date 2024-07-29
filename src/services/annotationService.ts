import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  // Extract the first annotation frame from the nested objects
  if (project && project.situations.length > 0) {
    for (const situation of project.situations) {
      if (situation.frames.length > 0) {
        return situation.frames[0];
      }
    }
  }

  return null; // Return null if no frame is found
}
