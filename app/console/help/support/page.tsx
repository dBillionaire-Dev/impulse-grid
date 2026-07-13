import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Support</h1>
          <p className="text-muted-foreground mt-2">
            Something not working, or need a change to how the admin panel
            behaves? Reach out directly.
          </p>
        </div>
        <Link
          href="/admin"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-border",
          )}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Need Help?</h2>
          <a
            href="https://nex.is-a.dev/#contact"
            target="_blank"
            className={cn(
              buttonVariants(),
              "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
            )}
          >
            Contact The Developer
          </a>
        </div>

        <div className="pt-4 border-t border-border/50">
          <h2 className="text-lg font-semibold text-white mb-2">
            Before you reach out
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If something isn't saving or showing up, check the{" "}
            <Link
              href="/admin/help/documentation"
              className="text-purple-400 hover:text-purple-300"
            >
              Documentation
            </Link>{" "}
            page first, most issues come down to a field not being filled in, or
            content simply not being published yet. If it still looks like a
            real bug, include what page you were on and what you clicked when
            you email.
          </p>
        </div>
      </div>
    </div>
  );
}
