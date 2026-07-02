"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { OrbitingIcons } from "./orbiting-icons";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-25 px-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight space-y-2">
              <div>
                <span className="text-white">I</span>
                <span className="text-purple-400 ml-3">Automate.</span>
              </div>
              <div>
                <span className="text-white">I</span>
                <span className="text-pink-400 ml-3">Design.</span>
              </div>
              <div>
                <span className="text-white">I</span>
                <span className="text-amber-400 ml-3">Elevate Brands.</span>
              </div>
            </h1>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
            AI automation with n8n. Stunning designs that communicate. Systems
            that scale your business.
          </p>

          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">
                AI & Workflow Automation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
              <span className="text-muted-foreground">
                SaaS Tools & Integrations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span className="text-muted-foreground">
                Process Optimization
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 w-full sm:w-auto">
            <a
              href="https://tally.so/r/q4YP12"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-lg w-full sm:w-auto",
              )}
            >
              Let&apos;s Work Together
            </a>
            <Button
              variant="outline"
              className="border-border hover:bg-card px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-lg w-full sm:w-auto"
            >
              <Link href="/portfolio">See My Work →</Link>
            </Button>
          </div>

          <p className="text-xs md:text-xs text-muted-foreground">
            Trusted by founders, entrepreneurs & businesses worldwide
          </p>
        </div>

        {/* Right - Portrait with Orbiting Tech Icons */}
        <div className="relative w-full flex items-center justify-center mt-12 lg:mt-0 min-h-80 sm:min-h-96 lg:min-h-auto">
          <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
            {/* Orbiting technology icons - hidden on mobile */}
            <div className="hidden sm:block">
              <OrbitingIcons />
            </div>

            {/* Gradient background glow */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30 rounded-full blur-2xl sm:blur-3xl" />

            {/* Portrait image */}
            <div className="relative z-20 rounded-full overflow-hidden w-48 h-64 sm:w-64 sm:h-80 mx-auto border-2 border-purple-500/50 bg-black/20 backdrop-blur-sm flex-shrink-0">
              <Image
                src="/hero-portrait.png"
                alt="Professional Portrait"
                width={400}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
