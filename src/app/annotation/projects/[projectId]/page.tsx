import { Fragment } from 'react';
import Section from '@/components/layouts/Section';
import SegmentPanel from './components/SegmentPanel';

export default function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  return (
    <Fragment>
      <div className='flex h-full w-1/6'>
        <Section>
          <SegmentPanel projectId={projectId} />
        </Section>
      </div>

      <div className='flex h-full w-4/6'></div>

      <div className='flex h-full w-1/6'>
        <Section> </Section>
      </div>
    </Fragment>
  );
}
