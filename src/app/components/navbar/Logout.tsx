import { DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { signOut } from '@/helpers/auth';
import { LogOut } from 'lucide-react';

export default function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <DropdownMenuItem>
        <button type='submit' className='flex items-center gap-2'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </button>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </form>
  );
}
