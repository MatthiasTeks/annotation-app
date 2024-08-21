import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import { useActionStore } from '../../providers/annotation-store-provider';
import { useFormState } from 'react-dom';
import AnnotationForm from './AnnotationForm';
import { createSituation } from '@/app/actions/situation-actions';
import { ClickedPosition } from '@/types/types';

type Props = {
  displaySizes: { width: number; height: number };
  clickedPosition: ClickedPosition | null;
};

export default function AnnotationModal({ displaySizes, clickedPosition }: Props) {
  const setUserAction = useActionStore((state) => state.setUserAction);

  const [state, action] = useFormState(createSituation, { success: false });

  const modalRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const [modalTop, setModalTop] = useState(0);
  const [modalLeft, setModalLeft] = useState(0);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setUserAction('viewOnly');
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (clickedPosition) {
      const positionModal = () => {
        if (modalRef.current) {
          const { globalPosition } = clickedPosition;

          const top = globalPosition.y;
          const left = globalPosition.x;

          setModalTop(top);
          setModalLeft(left);
        }
      };

      requestAnimationFrame(positionModal);
    }
  }, [clickedPosition, displaySizes]);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      setUserAction('viewOnly');
    }
  }, [state.success, setUserAction]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent ref={modalRef} style={{ position: 'absolute', top: modalTop, left: modalLeft, transform: 'none' }}>
        <DialogHeader>
          <DialogTitle>New situation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&pos;re done.</DialogDescription>
        </DialogHeader>
        <AnnotationForm action={action} />
      </DialogContent>
    </Dialog>
  );
}
