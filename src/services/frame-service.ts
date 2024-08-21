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

// Function to get the coordinates of the mouse click relative to the image container
export const getRelativeImageCoordinates = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const rect = (e.target as HTMLDivElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

// Function to translate display coordinates into native image coordinates
export const getNativeImageCoordinates = (
  displayCoordinates: { x: number; y: number },
  cameraDimensions: { width: number; height: number },
  displayDimensions: { width: number; height: number },
) => {
  const displayRatio = cameraDimensions.width / displayDimensions.width;
  return { x: displayCoordinates.x * displayRatio, y: displayCoordinates.y * displayRatio };
};

// Generic function to handle a click on the image frame, returning the native coordinates
export const getNativeCoordinatesFromClick = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  frameSizes: { width: number; height: number },
  displaySizes: { width: number; height: number },
) => {
  if (canvasRef.current) {
    const clickCoordinates = getRelativeImageCoordinates(e);
    const nativeCoordinates = getNativeImageCoordinates(clickCoordinates, frameSizes, displaySizes);
    return nativeCoordinates;
  }
  return null;
};

export function calculateModalPosition(
  clickPosition: { x: number; y: number },
  modalElement: HTMLDivElement,
  offset: number = 20,
): { top: number; left: number } {
  const modalRect = modalElement.getBoundingClientRect();

  let top = clickPosition.y + offset;
  let left = clickPosition.x + offset;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (left + modalRect.width > viewportWidth) {
    left = clickPosition.x - modalRect.width - 20;
  }

  if (top + modalRect.height > viewportHeight) {
    top = clickPosition.y - modalRect.height - 20;
  }

  if (left < 0) {
    left = 20;
  }

  if (top < 0) {
    top = 20;
  }

  return { top, left };
}
