import ProjectItem from './ProjectItem';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import { getProjectsByUserId } from '@/app/actions/project-actions';

export const ProjectList = async () => {
  const session = await getServerSession(config);

  if (!session) return null;

  const projects = await getProjectsByUserId(session?.user?.id);

  return (
    <div className='pt-2 flex flex-wrap gap-4'>
      {projects && projects.length > 0 && projects.map((project) => <ProjectItem key={project.id} project={project} />)}
    </div>
  );
};
