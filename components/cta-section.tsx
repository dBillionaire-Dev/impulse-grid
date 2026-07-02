"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils'

export function CTASection() {
  return (
    <section id="contact" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl blur-2xl" />

        <div className="relative border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="text-white">Let&apos;s </span>
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text">
              Automate Your Success
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to save time, scale faster, and build systems that run without
            you? Let&apos;s talk about your automation & design needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href="https://tally.so/r/q4YP12/" 
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), 
                  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-8 py-6 text-base"
                )}
                >
                Book a Strategy Call
              </a>
              <a 
                href="mailto:impulse.grid@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), 
                  'border-border bg-background hover:bg-card px-8 py-6 text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                )}
                >
                Send an Email
              </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Response time: Usually within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}
