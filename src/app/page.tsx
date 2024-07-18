import AuthButton from "@/components/buttons/AuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h2>My Amazing App</h2>

      {session && (
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}

      {!session && (
        <p>Not signed in</p>
      )}

    </div>
      <AuthButton />
    </main>
  );
}
