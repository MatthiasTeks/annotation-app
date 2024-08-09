import { Separator } from '@/components/ui/separator';
import AnnotationList from './AnnotationList';

export default function AnnotationPanel() {
  return (
    <div className='text-white p-2'>
      <div>
        <div className='space-y-1'>
          <h4 className='text-sm font-medium leading-none'>Annotations</h4>
          <p className='text-sm text-muted-foreground'>Annotation situation list.</p>
        </div>
        <Separator className='my-4' />
      </div>
      <div className='mt-2'>
        <AnnotationList />
      </div>
    </div>
  );
}
