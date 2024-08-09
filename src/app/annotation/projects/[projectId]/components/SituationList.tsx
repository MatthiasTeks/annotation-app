'use client';

import { AnnotationSituation } from '@prisma/client';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export default function SituationList({
  situations,
  projectId,
}: {
  situations: AnnotationSituation[];
  projectId: string;
}) {
  return (
    <div className='text-white'>
      {situations.map((situation) => (
        <SituationRow key={situation.id} situation={situation} projectId={projectId} />
      ))}
    </div>
  );
}

const SituationRow = ({ situation, projectId }: { situation: AnnotationSituation; projectId: string }) => {
  const pathname = usePathname();

  const isActiveLink = (situation: AnnotationSituation) => {
    return pathname === `/annotation/projects/${projectId}/situation/${situation.id}`;
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
