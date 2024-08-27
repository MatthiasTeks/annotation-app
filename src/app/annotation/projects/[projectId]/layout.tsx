import Section from '@/components/layouts/Section';
import React, { Fragment } from 'react';
import SituationPanel from './components/SituationPanel';
import AnnotationPanel from './components/annotation/AnnotationPanel';
import Toolbar from './components/Toolbar';

type LayoutProps = {
  children: React.ReactNode;
  params: { projectId: string };
};

export default function SituationIdLayout({ children, params }: LayoutProps) {
  const { projectId } = params;

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
              <Toolbar />
            </Section>
          </div>
        </div>
        <div className='flex h-full w-1/6'>
          <Section>
            <SituationPanel projectId={projectId} />
          </Section>
        </div>
      </Fragment>
    </div>
  );
}
