import { Button } from '@/components/ui/button';
import { auth, signIn, signOut } from '@/helpers/auth';

export default async function AuthButton() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        {session?.user?.name} <br />
        <Button variant='outline' type='submit'>
          Sign out
        </Button>
      </form>
    );
  }
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button variant='outline' type='submit'>
        Sign in
      </Button>
    </form>
  );
}
