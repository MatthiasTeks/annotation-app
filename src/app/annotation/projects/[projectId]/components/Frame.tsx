'use client';

import { useFrameStore } from '../../providers/frame-store-provider';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { calculateDisplayStreamSizes, drawFrame } from '@/services/frame-service';

export default function Frame() {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameSizes, setFrameSizes] = useState({ width: 0, height: 0, ratio: 0 });
  const { width, height, ref: containerRef } = useResizeDetector();

  // Size that maintains responsiveness while preserving the aspect ratio of the base frame.
  const displaySizes = useMemo(() => {
    const { width: frameWidth, height: frameHeight, ratio: frameRatio } = frameSizes;
    return calculateDisplayStreamSizes(frameWidth, frameHeight, frameRatio, width, height);
  }, [width, height, frameSizes]);

  useEffect(() => {
    if (selectedFrame === null) return;

    const drawAndSetFrameSizes = async () => {
      const sizes = await drawFrame({ selectedFrame, canvasRef });
      if (sizes) {
        setFrameSizes(sizes);
      }
    };

    drawAndSetFrameSizes();
  }, [selectedFrame]);

  return (
    <div
      className='flex flex-col items-center justify-center flex-auto overflow-hidden w-full h-full'
      ref={containerRef}
    >
      <div style={{ width: displaySizes.width, height: displaySizes.height }} className='relative w-full h-full'>
        <canvas ref={canvasRef} className='w-full h-full' />
      </div>
    </div>
  );
}
