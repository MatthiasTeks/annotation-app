'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSituationStore } from '../../../providers/situation-store-provider';
import Frame from './Frame';
import { useFrameStore } from '../../../providers/frame-store-provider';
import { calculateDisplayStreamSizes, handleImageClickAndGetImageCoords } from '@/services/frame-service';
import { useResizeDetector } from 'react-resize-detector';
import { useActionStore } from '../../../providers/action-store-provider';
import AnnotationLayer from './annotation/AnnotationLayer';
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
    if (clickedPosition !== null) return;

    const coordinates = handleImageClickAndGetImageCoords(canvasRef, e, frameSizes, displaySizes);

    if (coordinates) {
      setClickedPosition({ position: coordinates, clientPosition: { x: e.clientX, y: e.clientY } });
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
      ref={containerRef}
    >
      <div
        style={{ width: displaySizes.width, height: displaySizes.height }}
        onClick={handleClick}
        className='relative w-full h-full'
      >
        <AnnotationLayer
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
          frameSizes={frameSizes}
          displaySizes={displaySizes}
        >
          <Frame canvasRef={canvasRef} setFrameSizes={setFrameSizes} />
        </AnnotationLayer>
      </div>
    </div>
  );
}
