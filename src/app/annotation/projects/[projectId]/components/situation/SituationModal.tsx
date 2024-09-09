'use client';

import { AnnotationSituation } from '@prisma/client';
import { useActionStore } from '../../../../providers/action-store-provider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createSituation } from '@/app/actions/situation-actions';
import SituationForm from './SituationForm';
import { useSituationStore } from '@/app/annotation/providers/situation-store-provider';

type SituationModalProps = {
  projectId: number;
  situations: AnnotationSituation[] | null;
};

export default function SituationModal({ projectId, situations }: SituationModalProps) {
  const userAction = useActionStore((state) => state.userAction);
  const setUserAction = useActionStore((state) => state.setUserAction);
  const setSelectedSituation = useSituationStore((state) => state.setSelectedSituation);

  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(createSituation, { success: false, situationId: null });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setUserAction('viewOnly');
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (userAction === 'addingSituation') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [userAction]);

  useEffect(() => {
    if (state.success) {
      const createdSituation = situations?.find((situation) => situation.id === state.situationId);
      setOpen(false);
      setUserAction('viewOnly');
      if (createdSituation) {
        setSelectedSituation(createdSituation);
      }
    }
  }, [state, projectId, setUserAction, situations, setSelectedSituation]);

  if (userAction !== 'addingSituation') return null;

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
