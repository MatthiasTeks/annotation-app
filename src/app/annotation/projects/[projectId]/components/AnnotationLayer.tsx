import React, { Fragment } from 'react';
import AnnotationModal from './AnnotationModal';

type Props = {
  children: React.ReactNode;
  clickedPosition: { position: { x: number; y: number } } | null;
  displaySizes: { width: number; height: number };
};

export default function AnnotationLayer({ children, clickedPosition, displaySizes }: Props) {
  return (
    <Fragment>
      {children}
      {clickedPosition && <AnnotationModal displaySizes={displaySizes} clickedPosition={clickedPosition.position} />}
    </Fragment>
  );
}
