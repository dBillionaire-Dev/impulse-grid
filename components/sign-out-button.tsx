"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/portal");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs text-purple-400 hover:text-purple-300 mt-4 block"
    >
      Sign out
    </button>
  );
}
