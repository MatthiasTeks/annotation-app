'use client';

import { AnnotationSituation } from '@prisma/client';
import { useActionStore } from '../../../../providers/action-store-provider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createSituation } from '@/app/actions/situation-actions';
import SituationForm from './SituationForm';

type SituationModalProps = {
  situations: AnnotationSituation[] | null;
  projectId: number;
};

export default function SituationModal({ situations, projectId }: SituationModalProps) {
  const userAction = useActionStore((state) => state.userAction);
  const setUserAction = useActionStore((state) => state.setUserAction);
  const hasSituations = situations && situations.length > 0;

  const [open, setOpen] = useState(true);
  const [state, action] = useFormState(createSituation, { success: false });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setUserAction('viewOnly');
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      setUserAction('viewOnly');
    }
  }, [state.success, projectId, setUserAction]);

  if (userAction !== 'addingSituation' && hasSituations) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New situation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <SituationForm projectId={projectId} action={action} />
      </DialogContent>
    </Dialog>
  );
}
