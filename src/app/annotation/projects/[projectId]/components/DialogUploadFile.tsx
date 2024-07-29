'use client';

import { createSituation } from '@/app/actions/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function DialogNewSituation({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New situation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form action={createSituation}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-6 items-center gap-4'>
              <Label htmlFor='project-name' className='text-left col-span-1'>
                Name
              </Label>
              <Input id='project-name' required name='project-name' defaultValue='My project' className='col-span-5' />
            </div>
            <div className='grid grid-cols-6 items-center gap-4'>
              <Label htmlFor='project-file' className='text-left col-span-1'>
                File
              </Label>
              <Input id='project-file' name='project-file' type='file' className='col-span-5' required />
              <input id='project-id' name='project-id' className='sr-only' type='text' value={projectId}></input>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={() => setOpen(false)}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
