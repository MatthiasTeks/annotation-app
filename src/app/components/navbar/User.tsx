import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getServerSession } from 'next-auth';

export default async function User() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session && (
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      {!session && <p>Not signed in</p>}
    </div>
  );
}
