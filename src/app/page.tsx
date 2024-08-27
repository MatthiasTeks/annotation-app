import { auth } from '@/helpers/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect('/annotation/projects');
  return <div>You must be signed in to access to the application</div>;
}
