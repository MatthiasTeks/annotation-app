import Links from './Links';
import UserMenu from './UserMenu';
import ModeToggle from './ModeToggle';
import Logo from './Logo';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='w-full text-gray-200 flex items-center justify-between py-2'>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Logo />
        </Link>
        <Links />
      </div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        <UserMenu />
      </div>
    </div>
  );
}
