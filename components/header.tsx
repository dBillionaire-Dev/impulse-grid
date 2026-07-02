'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="IMPULSE GRID DIGITALS" 
            width={40} 
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-sm font-bold text-foreground hidden sm:inline">IMPULSE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition">
            Services
          </Link>
          <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">
            About
          </Link>
          <Link href="#work" className="text-sm text-muted-foreground hover:text-foreground transition">
            Portfolio
          </Link>
          <Link href="#process" className="text-sm text-muted-foreground hover:text-foreground transition">
            Process
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact
          </Link>
        </div>

        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30"
          asChild
        >
          <Link href="#contact">Let&apos;s Work Together</Link>
        </Button>
      </nav>
    </header>
  )
}
