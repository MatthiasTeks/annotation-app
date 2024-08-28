import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFrameStore } from '../../../../providers/frame-store-provider';
import { useParams } from 'next/navigation';

type Props = {
  // eslint-disable-next-line no-unused-vars
  action: (payload: FormData) => void;
  xPosition: number;
  yPosition: number;
};

export default function AnnotationForm({ action, xPosition, yPosition }: Props) {
  const params = useParams<{ projectId: string }>();
  const selectedFrame = useFrameStore((state) => state.selectedFrame);

  if (!selectedFrame) return null;

  return (
    <form action={action}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-6 items-center gap-4'>
          <Label htmlFor='annotation-name' className='text-left col-span-1'>
            Name
          </Label>
          <Input
            id='annotation-name'
            required
            name='annotation-name'
            defaultValue='My annotation'
            className='col-span-5'
          />
        </div>
        <div className='grid grid-cols-6 items-start gap-4'>
          <Label htmlFor='annotation-description' className='text-left col-span-1'>
            Description
          </Label>
          <Textarea
            id='annotation-description'
            name='annotation-description'
            placeholder='Type your description here.'
            className='col-span-5'
            required
          />
          <input id='x-position' name='x-position' className='sr-only' type='text' defaultValue={xPosition}></input>
          <input id='y-position' name='y-position' className='sr-only' type='text' defaultValue={yPosition}></input>
          <input id='frame-id' name='frame-id' className='sr-only' type='text' defaultValue={selectedFrame.id}></input>
          <input
            id='project-id'
            name='project-id'
            className='sr-only'
            type='text'
            defaultValue={params.projectId}
          ></input>
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Submit</Button>
      </DialogFooter>
    </form>
  );
}
