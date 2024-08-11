'use client';

import Typography from '@/components/others/Typography';
import { NotebookPenIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createProject } from '@/app/actions/project-actions';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Session } from 'next-auth';

export default function NewProject({ session }: { session: Session }) {
  const { pending } = useFormStatus();

  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  const createProjectWithUserId = createProject.bind(null, session?.user?.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='cursor-pointer flex items-center px-4 gap-4 py-4 w-[300px] bg-card p-2 rounded-xl  h-full'>
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
        <form action={createProjectWithUserId}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-6 items-center gap-4'>
              <Label htmlFor='project-name' className='text-left col-span-1'>
                Name
              </Label>
              <Input id='project-name' required name='project-name' defaultValue='My project' className='col-span-5' />
            </div>
            <div className='grid grid-cols-6 items-start gap-4'>
              <Label htmlFor='project-description' className='text-left col-span-1'>
                Description
              </Label>
              <Textarea
                id='project-description'
                name='project-description'
                placeholder='Type your message here.'
                className='col-span-5'
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={pending} onClick={() => setOpen(false)}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
