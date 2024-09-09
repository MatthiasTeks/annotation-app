import Section from '@/components/Section';
import React, { Fragment } from 'react';
import SituationPanel from './components/situation/SituationPanel';
import AnnotationPanel from './components/annotation/AnnotationPanel';
import Toolbar from './components/Toolbar';
import { getSituations } from '@/app/actions/situation-actions';

type LayoutProps = {
  children: React.ReactNode;
  params: { projectId: string };
};

export default async function SituationIdLayout({ children, params }: LayoutProps) {
  const { projectId } = params;

  const projectIdNumber = parseInt(projectId, 10);

  const situations = await getSituations(projectIdNumber);

  return (
    <div className='relative flex gap-2 h-full w-full'>
      <Fragment>
        <div className='flex h-full w-1/6'>
          <Section>
            <AnnotationPanel />
          </Section>
        </div>
        <div className='flex h-full w-4/6 relative'>
          {children}
          <div className='absolute left-1/2 bottom-0 -translate-x-1/2'>
            <Section>
              <Toolbar situations={situations} />
            </Section>
          </div>
        </div>
        <div className='flex h-full w-1/6'>
          <Section>
            <SituationPanel situations={situations} projectId={projectIdNumber} />
          </Section>
        </div>
      </Fragment>
    </div>
  );
}
