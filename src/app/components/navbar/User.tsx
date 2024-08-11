import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/helpers/auth';

export default async function User() {
  const session = await auth();

  if (!session?.user) return null;

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
