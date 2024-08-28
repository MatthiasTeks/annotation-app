import { useAnnotationsStore } from '@/app/annotation/providers/annotation-store-provider';
import { getImageDisplayCoordinates } from '@/helpers/frame';
import { ClickedPosition, DisplaySize, FrameSizes, Marker } from '@/types/types';
import { useMemo } from 'react';

type AnnotationMarkerProps = {
  clickedPosition: ClickedPosition | null;
  frameSizes: FrameSizes;
  displaySizes: DisplaySize;
};

export default function AnnotationMarkers({ clickedPosition, frameSizes, displaySizes }: AnnotationMarkerProps) {
  const annotations = useAnnotationsStore((state) => state.annotations);

  // Place the markers on the canvas, only place the marker if a point is clicked, otherwise place a point per annotation.
  const markers = useMemo(() => {
    if (clickedPosition) {
      return [clickedPosition.position];
    }

    return annotations?.length > 0 ? annotations.map((annotation) => ({ x: annotation.posX, y: annotation.posY })) : [];
  }, [annotations, clickedPosition]);

  if (markers.length === 0) return null;

  return markers.map((marker, index) => (
    <CircleMarker key={index} marker={marker} frameSizes={frameSizes} displaySizes={displaySizes} />
  ));
}

type CircleMarkerProps = {
  marker: Marker;
  frameSizes: FrameSizes;
  displaySizes: DisplaySize;
};

const CircleMarker = ({ marker, frameSizes, displaySizes }: CircleMarkerProps) => {
  const baseClass =
    'bg-transparent z-50 shadow-lg absolute rounded-full w-6 h-6 border-8 cursor-pointer border-primary';

  const coordinates = getImageDisplayCoordinates(marker, frameSizes, displaySizes);

  return (
    <div
      className={baseClass}
      style={{
        top: coordinates.y - 3,
        left: coordinates.x - 3,
        position: 'absolute',
      }}
    />
  );
};
