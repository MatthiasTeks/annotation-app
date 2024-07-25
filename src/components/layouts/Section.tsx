import React from 'react';

export default function Section({ children }: { children: React.ReactNode }) {
  return <div className='bg-card p-2 rounded-xl w-full h-full'>{children}</div>;
}
