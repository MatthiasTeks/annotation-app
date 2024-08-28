'use client';

import { useEffect } from 'react';
import { useFrameStore } from '../../../../providers/frame-store-provider';
import { CrosshairIcon } from 'lucide-react';
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
import { fetchAnnotations } from '@/services/annotation-service';
import { useAnnotationsStore } from '@/app/annotation/providers/annotation-store-provider';
import Typography from '@/components/others/Typography';

export default function AnnotationList() {
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  const annotations = useAnnotationsStore((state) => state.annotations);
  const setAnnotations = useAnnotationsStore((state) => state.setAnnotations);

  useEffect(() => {
    const fetchSituations = async () => {
      if (!selectedFrame?.id) return;

      const data = await fetchAnnotations(selectedFrame.id);
      setAnnotations(data);
    };

    fetchSituations();
  }, [selectedFrame, setAnnotations]);

  return (
    <div className='text-white p-2 gap-2 flex flex-col'>
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
          <Typography key={annotation.id} variant='paragraph' className='flex items-center gap-2'>
            <CrosshairIcon className='mr-2 h-4 w-4' />
            {annotation.name}
          </Typography>
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
