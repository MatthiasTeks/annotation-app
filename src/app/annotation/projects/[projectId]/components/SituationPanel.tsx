import SituationList from './SituationList';
import DialogUploadFile from './DialogUploadFile';
import { Separator } from '@/components/ui/separator';
import { getSituations } from '@/app/actions/actions';

export default async function SituationPanel({ projectId }: { projectId: string }) {
  const projectIdNumber = parseInt(projectId, 10);

  const situations = await getSituations(projectIdNumber);

  return (
    <div className='text-white p-2'>
      <div>
        <div className='space-y-1'>
          <h4 className='text-sm font-medium leading-none'>Radix Primitives</h4>
          <p className='text-sm text-muted-foreground'>An open-source UI component library.</p>
        </div>
        <Separator className='my-4' />
        <div className='flex h-5 items-center space-x-4 text-sm'>
          <div>Blog</div>
          <Separator orientation='vertical' />
          <div>Docs</div>
          <Separator orientation='vertical' />
          <div>Source</div>
        </div>
      </div>
      <div className='mt-2'>
        {situations && situations.length > 0 && <SituationList situations={situations} projectId={projectId} />}
      </div>

      {situations && situations.length === 0 && <DialogUploadFile projectId={projectId} />}
    </div>
  );
}
