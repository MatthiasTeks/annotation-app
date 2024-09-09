import React from 'react';
import Typography from '@/components/Typography';
import { AnnotationProject } from '@prisma/client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import DeleteModal from '@/components/DeleteModal';
import { deleteProject } from '@/app/actions/project-actions';
import { getFirstAnnotationFrameByProjectId } from '@/app/actions/annotation-actions';

const FILE_DIR = process.env.NEXT_PUBLIC_FILE_DIR;

console.log('file', FILE_DIR);

export default async function ProjectItem({ project }: { project: AnnotationProject }) {
  const projetPreview = await getFirstAnnotationFrameByProjectId(project.id);

  const timeAgo = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true, locale: fr });

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`/annotation/projects/${project.id}`} className='flex flex-col gap-2'>
            <div className='border border-1 border-gray-500 rounded-lg p-4 flex flex-col items-center gap-2 h-[100px] w-[250px] relative'>
              {projetPreview && (
                <Image
                  src={`${FILE_DIR}${projetPreview.filename}`}
                  alt='Preview'
                  fill
                  sizes='(min-width: 200px) 50vw, 100vw'
                  style={{
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
            <div>
              <Typography variant='paragraph'>{project.name}</Typography>
              <Typography variant='small'>Édité {timeAgo}</Typography>
            </div>
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
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-48'>
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value='pedro'>
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value='pedro'>Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteModal onDelete={deleteProject} id={project.id} />
    </AlertDialog>
  );
}
