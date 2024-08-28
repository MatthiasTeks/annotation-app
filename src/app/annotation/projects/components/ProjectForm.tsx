import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  userId: string;
  setOpen: (open: boolean) => void;
  action: (payload: FormData) => void;
};

export default function ProjectForm({ userId, setOpen, action }: Props) {
  return (
    <form action={action}>
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
          <input id='user-id' name='user-id' className='sr-only' type='text' defaultValue={userId}></input>
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Submit</Button>
      </DialogFooter>
    </form>
  );
}
