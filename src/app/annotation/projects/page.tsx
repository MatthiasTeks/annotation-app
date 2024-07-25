import { prisma } from '@/lib/prisma';
import { AnnotationProject } from '@prisma/client';
import ProjectItem from './components/ProjectItem';
import Typography from '@/components/others/Typography';

export default async function Page() {
  const projects = await prisma.annotationProject.findMany();

  return <ProjectList projects={projects} />;
}

const ProjectList = ({ projects }: { projects: AnnotationProject[] }) => {
  return (
    <div className='text-white w-full'>
      <Typography variant='subheading'>Recent</Typography>
      <hr className='border-1 border-gray-500 my-2 w-full' />
      <div className='pt-2'>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
