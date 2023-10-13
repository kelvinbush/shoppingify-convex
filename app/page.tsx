import { UserButton } from "@clerk/nextjs";
import getItems from "@/lib/items";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
      Link to <a href="/dashboard">dashboard</a>
    </main>
  );
}
