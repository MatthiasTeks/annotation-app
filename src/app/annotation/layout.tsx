import React from 'react';
import { FrameStoreProvider } from './projects/providers/frame-store-provider';
import { SituationStoreProvider } from './projects/providers/situation-store-provider';
import { UserActionStoreProvider } from './projects/providers/annotation-store-provider';

export default function AnnotationLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserActionStoreProvider>
      <SituationStoreProvider>
        <FrameStoreProvider>
          <div className='relative flex gap-2 h-full w-full'>{children}</div>
        </FrameStoreProvider>
      </SituationStoreProvider>
    </UserActionStoreProvider>
  );
}
