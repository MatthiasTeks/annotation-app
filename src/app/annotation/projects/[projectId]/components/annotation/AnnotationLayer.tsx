import React, { Fragment } from 'react';
import AnnotationModal from './AnnotationModal';
import { ClickedPosition } from '@/types/types';
import AnnotationMarkers from './AnnotationMarkers';

type Props = {
  children: React.ReactNode;
  clickedPosition: ClickedPosition | null;
  setClickedPosition: React.Dispatch<React.SetStateAction<ClickedPosition | null>>;
  displaySizes: { width: number; height: number };
};

export default function AnnotationLayer({ children, clickedPosition, setClickedPosition, displaySizes }: Props) {
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
      <AnnotationMarkers clickedPosition={clickedPosition} />
    </Fragment>
  );
}
