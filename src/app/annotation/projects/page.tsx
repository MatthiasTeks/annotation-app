import { prisma } from '@/lib/prisma';
import { AnnotationProject } from '@prisma/client';
import ProjectItem from './components/ProjectItem';

export default async function Page() {
  const projects = await prisma.annotationProject.findMany();

  return <ProjectList projects={projects} />;
}

const ProjectList = ({ projects }: { projects: AnnotationProject[] }) => {
  return (
    <div className='text-white'>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};
