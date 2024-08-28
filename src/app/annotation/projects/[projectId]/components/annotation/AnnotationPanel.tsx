import { Separator } from '@/components/ui/separator';
import AnnotationList from './AnnotationList';
import Typography from '@/components/others/Typography';

export default function AnnotationPanel() {
  return (
    <div className='text-white p-2 h-full'>
      <div>
        <div className='space-y-1'>
          <Typography variant='heading'>Annotations</Typography>
          <Typography variant='subheading'>Annotation situation list.</Typography>
        </div>
        <Separator className='my-4' />
      </div>
      <div className='mt-2'>
        <AnnotationList />
      </div>
    </div>
  );
}
