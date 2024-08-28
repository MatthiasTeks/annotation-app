import React, { Fragment } from 'react';
import AnnotationModal from './AnnotationModal';
import { ClickedPosition, DisplaySize, FrameSizes } from '@/types/types';
import AnnotationMarkers from './AnnotationMarkers';

type Props = {
  children: React.ReactNode;
  clickedPosition: ClickedPosition | null;
  setClickedPosition: React.Dispatch<React.SetStateAction<ClickedPosition | null>>;
  frameSizes: FrameSizes;
  displaySizes: DisplaySize;
};

export default function AnnotationLayer({
  children,
  clickedPosition,
  setClickedPosition,
  frameSizes,
  displaySizes,
}: Props) {
  return (
    <Fragment>
      {children}
      {clickedPosition && (
        <AnnotationModal
          displaySizes={displaySizes}
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
        />
      )}
      <AnnotationMarkers clickedPosition={clickedPosition} frameSizes={frameSizes} displaySizes={displaySizes} />
    </Fragment>
  );
}
