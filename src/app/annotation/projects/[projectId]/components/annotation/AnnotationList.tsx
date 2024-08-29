'use client';

import React, { useEffect, useMemo } from 'react';
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
import DeleteModal from '@/components/DeleteModal';
import { fetchAnnotations } from '@/services/annotation-service';
import { useAnnotationsStore } from '@/app/annotation/providers/annotation-store-provider';
import Typography from '@/components/Typography';

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
  const annotationSelected = useAnnotationsStore((state) => state.annotationSelected);
  const setAnnotationSelected = useAnnotationsStore((state) => state.setAnnotationSelected);

  const isActiveLink = useMemo(() => {
    return annotationSelected?.id === annotation.id;
  }, [annotationSelected, annotation.id]);

  const handleClick = () => {
    setAnnotationSelected(annotation);
  };

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Typography
            key={annotation.id}
            variant='paragraph'
            className={`${isActiveLink ? 'text-primary' : ''} flex items-center gap-2 cursor-pointer`}
            onClick={handleClick}
          >
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
      <DeleteModal onDelete={deleteAnnotation} id={annotation.id} />
    </AlertDialog>
  );
};
