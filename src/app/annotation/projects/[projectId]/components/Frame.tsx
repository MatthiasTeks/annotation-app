'use client';

import { useFrameStore } from '../../../providers/frame-store-provider';
import React, { useEffect } from 'react';
import { drawFrame } from '@/services/frame-service';

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  // eslint-disable-next-line no-unused-vars
  setFrameSizes: (frameSizes: { width: number; height: number; ratio: number }) => void;
};

export default function Frame({ canvasRef, setFrameSizes }: Props) {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  useEffect(() => {
    if (selectedFrame === null) return;

    const drawAndSetFrameSizes = async () => {
      const sizes = await drawFrame({ selectedFrame, canvasRef });
      if (sizes) {
        setFrameSizes(sizes);
      }
    };

    drawAndSetFrameSizes();
  }, [canvasRef, selectedFrame, setFrameSizes]);

  return <canvas id='annotation-canvas' ref={canvasRef} className='w-full h-full' />;
}
