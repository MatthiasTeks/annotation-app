import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useActionStore } from '../../../../providers/action-store-provider';
import { useFormState } from 'react-dom';
import AnnotationForm from './AnnotationForm';
import { ClickedPosition, DisplaySize, FrameSizes } from '@/types/types';
import { calculateModalPosition, getImageDisplayCoordinates } from '@/helpers/frame';
import { createAnnotation } from '@/app/actions/annotation-actions';

type Props = {
  displaySizes: DisplaySize;
  frameSizes: FrameSizes;
  clickedPosition: ClickedPosition;
  setClickedPosition: React.Dispatch<React.SetStateAction<ClickedPosition | null>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export default function AnnotationCreationModal({
  clickedPosition,
  setClickedPosition,
  displaySizes,
  frameSizes,
  canvasRef,
}: Props) {
  const { position } = clickedPosition;

  const setUserAction = useActionStore((state) => state.setUserAction);

  const [state, action] = useFormState(createAnnotation, { annotation: null });

  const modalRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const [modalTop, setModalTop] = useState(0);
  const [modalLeft, setModalLeft] = useState(0);

  const coordinates = getImageDisplayCoordinates(position, frameSizes, displaySizes);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setClickedPosition(null);
    }
    setOpen(isOpen);
  };

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
      setUserAction('viewOnly');
      setClickedPosition(null);
    }
  }, [state.annotation, setUserAction, setClickedPosition]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={modalRef}
        style={{ position: 'absolute', top: modalTop, left: modalLeft, transform: 'none' }}
        disableOverlay
      >
        <DialogHeader>
          <DialogTitle>New annotation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&pos;re done.</DialogDescription>
        </DialogHeader>
        <AnnotationForm action={action} xPosition={position.x} yPosition={position.y} />
      </DialogContent>
    </Dialog>
  );
}
