import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import AnnotationForm from './AnnotationForm';
import { DisplaySize, FrameSizes } from '@/types/types';
import { calculateModalPosition, getImageDisplayCoordinates } from '@/helpers/frame';
import { createAnnotation } from '@/app/actions/annotation-actions';
import { useAnnotationsStore } from '@/app/annotation/providers/annotation-store-provider';
import { Annotation } from '@prisma/client';

type Props = {
  displaySizes: DisplaySize;
  frameSizes: FrameSizes;
  annotationSelected: Annotation;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export default function AnnotationEditionModal({ displaySizes, frameSizes, canvasRef, annotationSelected }: Props) {
  const { posX, posY } = annotationSelected;

  const position = { x: posX, y: posY };

  const setAnnotationSelected = useAnnotationsStore((state) => state.setAnnotationSelected);

  const [state, action] = useFormState(createAnnotation, { annotation: null });

  const modalRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const [modalTop, setModalTop] = useState(0);
  const [modalLeft, setModalLeft] = useState(0);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setAnnotationSelected(null);
    }
    setOpen(isOpen);
  };

  const coordinates = getImageDisplayCoordinates(position, frameSizes, displaySizes);

  // Position the modal so that it does not reach the edge of the screen.
  useEffect(() => {
    if (coordinates) {
      const positionModal = () => {
        if (modalRef.current) {
          const { top, left } = calculateModalPosition(coordinates, modalRef.current!, canvasRef.current!, 20);
          setModalTop(top);
          setModalLeft(left);
        }
      };

      requestAnimationFrame(positionModal);
    }
  }, [coordinates, displaySizes, canvasRef]);

  // If the form submission is successful, reset several states.
  useEffect(() => {
    if (state.annotation?.id) {
      setOpen(false);
      setAnnotationSelected(null);
    }
  }, [state.annotation, setAnnotationSelected]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={modalRef}
        style={{ position: 'absolute', top: modalTop, left: modalLeft, transform: 'none' }}
        disableOverlay
      >
        <DialogHeader>
          <DialogTitle>Edit annotation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&pos;re done.</DialogDescription>
        </DialogHeader>
        <AnnotationForm action={action} xPosition={position.x} yPosition={position.y} />
      </DialogContent>
    </Dialog>
  );
}
