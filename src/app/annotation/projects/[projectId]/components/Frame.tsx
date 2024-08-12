'use client';

import { useFrameStore } from '@/app/annotation/projects/providers/frame-store-provider';
import { AnnotationFrame } from '@prisma/client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Frame({ frames }: { frames: AnnotationFrame[] }) {
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  useEffect(() => {
    if (frames.length > 0) {
      setSelectedFrame(frames[0]);
    }
  }, [frames, setSelectedFrame]);

  return (
    <div>
      <Image src={`/uploads/${frames[0].filename}`} width={500} height={500} alt='annotation' />
    </div>
  );
}
