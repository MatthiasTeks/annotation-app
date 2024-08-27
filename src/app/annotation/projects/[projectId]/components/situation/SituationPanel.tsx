import SituationList from './SituationList';
import { Separator } from '@/components/ui/separator';
import { getSituations } from '@/app/actions/situation-actions';
import SituationModal from './SituationModal';

export default async function SituationPanel({ projectId }: { projectId: string }) {
  const projectIdNumber = parseInt(projectId, 10);

  const situations = await getSituations(projectIdNumber);

  return (
    <div className='text-white p-2'>
      <div>
        <div className='space-y-1'>
          <h4 className='text-sm font-medium leading-none'>Situations</h4>
          <p className='text-sm text-muted-foreground'>Curated Situations for AI Annotation.</p>
        </div>
        <Separator className='my-4' />
      </div>
      <div className='mt-2'>{situations && situations.length > 0 && <SituationList situations={situations} />}</div>
      <SituationModal situations={situations} projectId={projectIdNumber} />
    </div>
  );
}
