'use client';

import { AnnotationSituation } from '@prisma/client';
import { FileText } from 'lucide-react';
import Link from 'next/link';
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
import DeleteConfirmation from '@/app/components/DeleteConfirmation';
import { deleteSituation } from '@/app/actions/situation-actions';
import { useSituationStore } from '../../providers/situation-store-provider';

export const SituationRow = ({ situation, projectId }: { situation: AnnotationSituation; projectId: string }) => {
  const selectedSituation = useSituationStore((state) => state.selectedSituation);

  const isActiveLink = (situation: AnnotationSituation) => {
    return selectedSituation?.id === situation.id;
  };

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            href={`${projectId}/situation/${situation.id}`}
            key={situation.id}
            className={`link ${isActiveLink(situation) ? 'text-primary' : ''}`}
          >
            <p key={situation.id} className='text-sm flex items-center gap-2'>
              <FileText className='mr-2 h-4 w-4' />
              {situation.name}
            </p>
          </Link>
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
      <DeleteConfirmation onDelete={deleteSituation} id={situation.id} />
    </AlertDialog>
  );
};
