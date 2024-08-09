import React from 'react';
import { FrameStoreProvider } from './projects/providers/frame-store-provider';

export default function AnnotationLayout({ children }: { children: React.ReactNode }) {
  return (
    <FrameStoreProvider>
      <div className='relative flex gap-2 h-full w-full'>{children}</div>
    </FrameStoreProvider>
  );
}
