import SituationList from './SituationList';
import { Separator } from '@/components/ui/separator';
import { getSituations } from '@/app/actions/situation-actions';
import SituationModal from './SituationModal';
import Typography from '@/components/Typography';

export default async function SituationPanel({ projectId }: { projectId: string }) {
  const projectIdNumber = parseInt(projectId, 10);

  const situations = await getSituations(projectIdNumber);

  return (
    <div className='text-white p-2'>
      <div>
        <div className='space-y-1'>
          <Typography variant='heading'>Situations</Typography>
          <Typography variant='subheading'>Curated Situations for AI Annotation.</Typography>
        </div>
        <Separator className='my-4' />
      </div>
      <div className='mt-2'>{situations && situations.length > 0 && <SituationList situations={situations} />}</div>
      <SituationModal situations={situations} projectId={projectIdNumber} />
    </div>
  );
}
