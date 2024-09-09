import SituationList from './SituationList';
import { Separator } from '@/components/ui/separator';
import SituationModal from './SituationModal';
import Typography from '@/components/Typography';
import { AnnotationSituation } from '@prisma/client';

type Props = {
  situations: AnnotationSituation[] | null;
  projectId: number;
};

export default async function SituationPanel({ situations, projectId }: Props) {
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
      <SituationModal projectId={projectId} situations={situations} />
    </div>
  );
}
