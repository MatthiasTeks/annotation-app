import React, { Fragment, useMemo } from 'react';
import { ClickedPosition, DisplaySize, FrameSizes } from '@/types/types';
import AnnotationMarkers from './AnnotationMarkers';
import { useAnnotationsStore } from '@/app/annotation/providers/annotation-store-provider';
import AnnotationCreationModal from './AnnotationCreationModal';
import AnnotationEditionModal from './AnnotationEditionModal';

type Props = {
  children: React.ReactNode;
  clickedPosition: ClickedPosition | null;
  setClickedPosition: React.Dispatch<React.SetStateAction<ClickedPosition | null>>;
  frameSizes: FrameSizes;
  displaySizes: DisplaySize;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export default function AnnotationLayer({
  children,
  clickedPosition,
  setClickedPosition,
  frameSizes,
  displaySizes,
  canvasRef,
}: Props) {
  const annotationSelected = useAnnotationsStore((state) => state.annotationSelected);

  const isModalOpen = useMemo(() => {
    return clickedPosition !== null || annotationSelected !== null;
  }, [clickedPosition, annotationSelected]);

  const handleDisplayModal = () => {
    if (clickedPosition) {
      return (
        <AnnotationCreationModal
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
          displaySizes={displaySizes}
          frameSizes={frameSizes}
          canvasRef={canvasRef}
        />
      );
    } else if (annotationSelected) {
      return (
        <AnnotationEditionModal
          annotationSelected={annotationSelected}
          displaySizes={displaySizes}
          frameSizes={frameSizes}
          canvasRef={canvasRef}
        />
      );
    }
  };

  return (
    <Fragment>
      {children}
      {isModalOpen && handleDisplayModal()}
      <AnnotationMarkers clickedPosition={clickedPosition} frameSizes={frameSizes} displaySizes={displaySizes} />
    </Fragment>
  );
}
