'use client';

import { useEffect, useState } from 'react';
import { useSituationStore } from '../../providers/situation-store-provider';
import { AnnotationFrame } from '@prisma/client';
import Frame from './Frame';

export default function FrameView() {
  const selectedSituation = useSituationStore((state) => state.selectedSituation);

  const [frames, setFrames] = useState<AnnotationFrame[]>([]);

  useEffect(() => {
    const fetchFrames = async () => {
      const response = await fetch(`/api/frames/?situationId=${selectedSituation?.id}`);
      const frames = await response.json();
      setFrames(frames);
    };

    if (selectedSituation?.id) {
      fetchFrames();
    }
  }, [selectedSituation]);

  return <div className='text-white'>{frames?.length ? <Frame frames={frames} /> : null}</div>;
}
