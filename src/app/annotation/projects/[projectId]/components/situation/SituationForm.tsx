import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  action: (payload: FormData) => void;
  projectId: number;
};

export default function SituationForm({ action, projectId }: Props) {
  return (
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
  );
}
