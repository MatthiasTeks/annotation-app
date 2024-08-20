'use client';

import { useEffect, useState } from 'react';
import { useSituationStore } from '../../providers/situation-store-provider';
import { AnnotationFrame } from '@prisma/client';
import Frame from './Frame';
import { useFrameStore } from '../../providers/frame-store-provider';

export default function FrameView() {
  const selectedSituation = useSituationStore((state) => state.selectedSituation);
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const [frames, setFrames] = useState<AnnotationFrame[]>([]);

  useEffect(() => {
    const fetchFrames = async () => {
      const response = await fetch(`/api/frames/?situationId=${selectedSituation?.id}`);
      const frames = await response.json();
      setFrames(frames);
      setSelectedFrame(frames[0]);
    };

    if (selectedSituation?.id) {
      fetchFrames();
    }
  }, [selectedSituation, setSelectedFrame]);

  return <div className='text-white w-full h-full'>{frames?.length ? <Frame /> : null}</div>;
}
