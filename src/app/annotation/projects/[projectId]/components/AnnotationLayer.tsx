import React, { Fragment } from 'react';
import AnnotationModal from './AnnotationModal';
import { ClickedPosition } from '@/types/types';

type Props = {
  children: React.ReactNode;
  clickedPosition: ClickedPosition | null;
  displaySizes: { width: number; height: number };
};

export default function AnnotationLayer({ children, clickedPosition, displaySizes }: Props) {
  return (
    <Fragment>
      {children}
      {clickedPosition && <AnnotationModal displaySizes={displaySizes} clickedPosition={clickedPosition} />}
    </Fragment>
  );
}
