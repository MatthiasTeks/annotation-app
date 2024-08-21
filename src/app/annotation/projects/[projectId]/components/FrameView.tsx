'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSituationStore } from '../../providers/situation-store-provider';
import Frame from './Frame';
import { useFrameStore } from '../../providers/frame-store-provider';
import { calculateDisplayStreamSizes, getNativeCoordinatesFromClick } from '@/services/frame-service';
import { useResizeDetector } from 'react-resize-detector';
import { useActionStore } from '../../providers/annotation-store-provider';
import AnnotationLayer from './AnnotationLayer';
import { ClickedPosition } from '@/types/types';

export default function FrameView() {
  const userAction = useActionStore((state) => state.userAction);
  const selectedSituation = useSituationStore((state) => state.selectedSituation);
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const [clickedPosition, setClickedPosition] = useState<ClickedPosition | null>(null);
  const [frameSizes, setFrameSizes] = useState({ width: 0, height: 0, ratio: 0 });

  const { width, height, ref: containerRef } = useResizeDetector();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const displaySizes = useMemo(() => {
    const { width: frameWidth, height: frameHeight, ratio: frameRatio } = frameSizes;
    return calculateDisplayStreamSizes(frameWidth, frameHeight, frameRatio, width, height);
  }, [width, height, frameSizes]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (userAction !== 'editingSegment') return;

    const nativeCoordinates = getNativeCoordinatesFromClick(canvasRef, e, frameSizes, displaySizes);
    const globalCoordinates = { x: e.clientX, y: e.clientY };

    if (nativeCoordinates) {
      setClickedPosition({
        position: nativeCoordinates,
        globalPosition: globalCoordinates,
      });
    }
  };

  useEffect(() => {
    const fetchFrames = async () => {
      const response = await fetch(`/api/frames/?situationId=${selectedSituation?.id}`);
      const frames = await response.json();

      setSelectedFrame(frames[0]);
    };

    if (selectedSituation?.id) {
      fetchFrames();
    }
  }, [selectedSituation, setSelectedFrame]);

  return (
    <div
      className='flex flex-col items-center justify-center flex-auto overflow-hidden w-full h-full'
      onClick={handleClick}
      ref={containerRef}
    >
      <div style={{ width: displaySizes.width, height: displaySizes.height }} className='relative w-full h-full'>
        <AnnotationLayer clickedPosition={clickedPosition} displaySizes={displaySizes}>
          <Frame canvasRef={canvasRef} setFrameSizes={setFrameSizes} />
        </AnnotationLayer>
      </div>
    </div>
  );
}
