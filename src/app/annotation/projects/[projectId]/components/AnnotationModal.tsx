import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useActionStore } from '../../providers/annotation-store-provider';
import { useFormState } from 'react-dom';
import AnnotationForm from './AnnotationForm';
import { ClickedPosition } from '@/types/types';
import { calculateModalPosition } from '@/services/frame-service';
import { createAnnotation } from '@/app/actions/annotation-actions';

type Props = {
  displaySizes: { width: number; height: number };
  clickedPosition: ClickedPosition;
  setClickedPosition: React.Dispatch<React.SetStateAction<ClickedPosition | null>>;
};

export default function AnnotationModal({ displaySizes, clickedPosition, setClickedPosition }: Props) {
  const { position } = clickedPosition;

  const setUserAction = useActionStore((state) => state.setUserAction);
  const [state, action] = useFormState(createAnnotation, { annotation: null });

  const modalRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const [modalTop, setModalTop] = useState(0);
  const [modalLeft, setModalLeft] = useState(0);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setClickedPosition(null);
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (clickedPosition) {
      const positionModal = () => {
        if (modalRef.current) {
          const { globalPosition } = clickedPosition;
          const { top, left } = calculateModalPosition(globalPosition, modalRef.current, 20);
          setModalTop(top);
          setModalLeft(left);
        }
      };

      requestAnimationFrame(positionModal);
    }
  }, [clickedPosition, displaySizes]);

  useEffect(() => {
    if (state.annotation?.id) {
      setOpen(false);
      setUserAction('viewOnly');
    }
  }, [state.annotation, setUserAction]);

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
