'use client';

import Typography from '@/components/others/Typography';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NotebookPenIcon } from 'lucide-react';
import { Session } from 'next-auth';
import { useState } from 'react';
import ProjectForm from './ProjectForm';

export default function ProjectModal({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);

  if (!session?.user?.id) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='cursor-pointer flex items-center px-4 gap-4 py-4 w-[300px] bg-card p-2 rounded-xl border border-border h-full'>
          <div className='bg-green-500 rounded-full h-10 w-10 flex justify-center items-center'>
            <NotebookPenIcon className='h-5 w-5' />
          </div>
          <div className='flex flex-col gap-1'>
            <Typography>New annotation project</Typography>
            <Typography variant='small'>New annotation project</Typography>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <ProjectForm userId={session.user.id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
