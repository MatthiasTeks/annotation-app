import React from 'react';
import { FrameStoreProvider } from './providers/frame-store-provider';
import { SituationStoreProvider } from './providers/situation-store-provider';
import { UserActionStoreProvider } from './providers/action-store-provider';
import { AnnotationsStoreProvider } from './providers/annotation-store-provider';

export default function AnnotationLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserActionStoreProvider>
      <SituationStoreProvider>
        <FrameStoreProvider>
          <AnnotationsStoreProvider>
            <div className='relative flex gap-2 h-full w-full'>{children}</div>
          </AnnotationsStoreProvider>
        </FrameStoreProvider>
      </SituationStoreProvider>
    </UserActionStoreProvider>
  );
}
