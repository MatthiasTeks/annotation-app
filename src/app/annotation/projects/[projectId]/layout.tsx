import Section from '@/components/layouts/Section';
import React, { Fragment } from 'react';
import SituationPanel from './components/SituationPanel';
import AnnotationPanel from './components/AnnotationPanel';

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

        <div className='flex h-full w-4/6'>{children}</div>

        <div className='flex h-full w-1/6'>
          <Section>
            <SituationPanel projectId={projectId} />
          </Section>
        </div>
      </Fragment>
    </div>
  );
}
