import Image from 'next/image';
import Links from './Links';
import User from './User';

export default function Navbar() {
  return (
    <div className='w-full text-gray-200 flex items-center justify-between py-2'>
      <div className='flex items-center gap-4'>
        <Image src='/logo.png' alt='Logo' width={175} height={25} />
        <Links />
      </div>
      <div>
        <User />
      </div>
    </div>
  );
}
