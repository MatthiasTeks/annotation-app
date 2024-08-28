import clsx from 'clsx';
import React from 'react';

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('bg-card border border-border p-2 rounded-xl w-full h-full', className)}>{children}</div>;
}
