import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AdminShell } from "@/components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminShell userEmail={session.user.email}>{children}</AdminShell>
    </div>
  );
}
