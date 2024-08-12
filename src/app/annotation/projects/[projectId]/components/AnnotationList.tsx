'use client';

import { useEffect, useState } from 'react';
import { useFrameStore } from '../../providers/frame-store-provider';
import { Pin } from 'lucide-react';
import { Annotation } from '@prisma/client';
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
import { deleteAnnotation } from '@/app/actions/annotation-actions';
import DeleteConfirmation from '@/app/components/DeleteConfirmation';

export default function AnnotationList() {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    const fetchSituations = async () => {
      const response = await fetch(`/api/annotations/?frameId=${selectedFrame?.id}`);
      const data = await response.json();
      setAnnotations(data);
    };

    if (selectedFrame?.id) {
      fetchSituations();
    }
  }, [selectedFrame]);

  return (
    <div className='text-white p-2'>
      {annotations?.length > 0 &&
        annotations.map((annotation) => <AnnotationRow key={annotation.id} annotation={annotation} />)}
    </div>
  );
}

const AnnotationRow = ({ annotation }: { annotation: Annotation }) => {
  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <p key={annotation.id} className='text-sm flex items-center gap-2'>
            <Pin className='mr-2 h-4 w-4' />
            {annotation.name}
          </p>
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
      <DeleteConfirmation onDelete={deleteAnnotation} id={annotation.id} />
    </AlertDialog>
  );
};
