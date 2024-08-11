import Typography from '@/components/others/Typography';
import NewProject from './components/NewProject';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectList } from './components/ProjectList';

export default async function Page() {
  return (
    <div className='text-white w-full'>
      <div className='inline-block'>
        <Suspense fallback={<Skeleton className='w-[300px] h-[20px] rounded-xl' />}>
          <NewProject />
        </Suspense>
      </div>
      <div className='pt-10'>
        <Typography variant='subheading'>Recent</Typography>
        <hr className='border-1 border-gray-500 my-2 w-full' />
        <Suspense fallback={<SkeletonProjectList />}>
          <ProjectList />
        </Suspense>
      </div>
    </div>
  );
}

const SkeletonProjectList = () => {
  return (
    <div className='pt-2 flex flex-wrap gap-4'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-[100px] w-[250px] rounded-lg' />
        <div>
          <Skeleton className='h-[5px] w-[100px] rounded-lg' />
          <Skeleton className='h-[5px] w-[150px] rounded-lg' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-[100px] w-[250px] rounded-lg' />
        <div>
          <Skeleton className='h-[5px] w-[100px] rounded-lg' />
          <Skeleton className='h-[5px] w-[150px] rounded-lg' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-[100px] w-[250px] rounded-lg' />
        <div>
          <Skeleton className='h-[5px] w-[100px] rounded-lg' />
          <Skeleton className='h-[5px] w-[150px] rounded-lg' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-[100px] w-[250px] rounded-lg' />
        <div>
          <Skeleton className='h-[5px] w-[100px] rounded-lg' />
          <Skeleton className='h-[5px] w-[150px] rounded-lg' />
        </div>
      </div>
    </div>
  );
};
