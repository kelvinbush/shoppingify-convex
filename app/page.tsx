"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isLoading && !isAuthenticated && (
        <>
          <SignInButton mode={"modal"}>
            <Button variant={"ghost"} size={"sm"}>
              Log in
            </Button>
          </SignInButton>
          <SignInButton mode={"modal"}>
            <Button size={"sm"}>Get Started</Button>
          </SignInButton>
        </>
      )}
      {!isLoading && isAuthenticated && (
        <>
          <Button variant={"ghost"} size={"sm"} asChild>
            <Link href={"/dashboard/items"}>Enter Dashboard</Link>
          </Button>
          <UserButton afterSignOutUrl={"/"} />
        </>
      )}
    </main>
  );
}
