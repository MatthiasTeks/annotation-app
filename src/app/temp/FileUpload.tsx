import Section from '@/components/layouts/Section';
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
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';

export default function NewProject() {
  async function createProject(formData: FormData) {
    'use server';
    const file = formData.get('file') as File;
    console.log(file);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${file.name}`, buffer);

    revalidatePath('/');

    const rawFormData = {
      projectName: formData.get('project-name'),
      filename: file.name,
    };

    console.log(rawFormData);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Section className='cursor-pointer flex items-center px-4 gap-4 py-4 w-[300px]'>
          <div className='bg-green-500 rounded-full h-10 w-10 flex justify-center items-center'>
            <NotebookPenIcon className='h-5 w-5' />
          </div>
          <div className='flex flex-col gap-1'>
            <Typography>New annotation project</Typography>
            <Typography variant='small'>New annotation project</Typography>
          </div>
        </Section>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form action={createProject}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-6 items-center gap-4'>
              <Label htmlFor='project-name' className='text-left'>
                Name
              </Label>
              <Input id='project-name' name='project-name' defaultValue='My project' className='col-span-5' />
            </div>
            <div className='grid grid-cols-6 items-center gap-4'>
              <Label htmlFor='file' className='text-left'>
                File
              </Label>
              <Input id='file' type='file' name='file' className='col-span-5' />
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
