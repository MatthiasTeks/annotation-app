import React from 'react';

export default function AnnotationLayout({ children }: { children: React.ReactNode }) {
  return <div className='relative flex gap-2 h-full w-full'>{children}</div>;
}
