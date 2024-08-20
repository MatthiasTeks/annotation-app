import { AnnotationFrame } from '@prisma/client';
import React from 'react';

export const drawFrame = async ({
  selectedFrame,
  canvasRef,
}: {
  selectedFrame: AnnotationFrame;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  if (canvasRef.current === null) return;
  const context = canvasRef.current.getContext('2d');
  if (context === null) return;

  const framePath = `/uploads/${selectedFrame.filename}`;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = framePath;

  return new Promise<{ width: number; height: number; ratio: number }>((resolve) => {
    img.onload = () => {
      if (canvasRef.current === null) return;

      const { width, height } = img;
      const ratio = width / height;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

      resolve({ width, height, ratio });
    };

    img.onerror = () => {
      console.error('Failed to load image:', framePath);
      resolve({ width: 0, height: 0, ratio: 0 });
    };
  });
};

export const calculateDisplayStreamSizes = (
  frameWidth: number,
  frameHeight: number,
  frameRatio: number,
  width: number | undefined,
  height: number | undefined,
) => {
  const MARGINS = 0.1;

  if (frameWidth > 0 && frameHeight > 0 && width && height) {
    const maxDisplayDimensions = {
      width: width * (1 - MARGINS * 2),
      height: height * (1 - MARGINS * 2),
    };

    if (maxDisplayDimensions.width / frameWidth < maxDisplayDimensions.height / frameHeight) {
      maxDisplayDimensions.height = maxDisplayDimensions.width / frameRatio;
    } else {
      maxDisplayDimensions.width = maxDisplayDimensions.height * frameRatio;
    }

    return maxDisplayDimensions;
  } else {
    return {
      width: 0,
      height: 0,
    };
  }
};
