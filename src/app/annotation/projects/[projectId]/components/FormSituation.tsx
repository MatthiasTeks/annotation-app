import { createSituation } from '@/app/actions/situation-actions';
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
import { useEffect, useState } from 'react';
import { useActionStore } from '../../providers/annotation-store-provider';
import { useFormState } from 'react-dom';

export default function FormSituation({ projectId }: { projectId: number }) {
  const setUserAction = useActionStore((state) => state.setUserAction);

  const [state, action] = useFormState(createSituation, { success: false });

  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setUserAction('viewOnly');
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      setUserAction('viewOnly');
    }
  }, [state.success, projectId, setUserAction]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New situation</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form action={action}>
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
              <input id='project-id' name='project-id' className='sr-only' type='text' defaultValue={projectId}></input>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
