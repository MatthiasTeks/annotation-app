'use client';

import { AnnotationSituation } from '@prisma/client';
import { FileText } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import DeleteModal from '@/components/DeleteModal';
import { deleteSituation } from '@/app/actions/situation-actions';
import { useSituationStore } from '../../../../providers/situation-store-provider';
import { useMemo } from 'react';

export const SituationRow = ({ situation }: { situation: AnnotationSituation }) => {
  const selectedSituation = useSituationStore((state) => state.selectedSituation);
  const setSelectedSituation = useSituationStore((state) => state.setSelectedSituation);

  const isActiveLink = useMemo(() => {
    return selectedSituation?.id === situation.id;
  }, [selectedSituation, situation.id]);

  const handleClick = () => {
    setSelectedSituation(situation);
  };

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            key={situation.id}
            className={`${isActiveLink ? 'text-primary' : ''} cursor-pointer`}
            onClick={handleClick}
          >
            <p key={situation.id} className='text-sm flex items-center gap-2'>
              <FileText className='mr-2 h-4 w-4' />
              {situation.name}
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>

          <AlertDialogTrigger asChild>
            <ContextMenuItem inset>
              Delete
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </AlertDialogTrigger>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
        </ContextMenuContent>
      </ContextMenu>
      <DeleteModal onDelete={deleteSituation} id={situation.id} />
    </AlertDialog>
  );
};
