'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="IMPULSE GRID DIGITALS" 
                width={40} 
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-sm font-bold text-foreground">IMPULSE</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI automation expert with n8n. Graphic & brand designer. Helping businesses scale.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#services" className="text-muted-foreground hover:text-foreground transition">Services</Link></li>
              <li><Link href="#work" className="text-muted-foreground hover:text-foreground transition">Portfolio</Link></li>
              <li><Link href="#process" className="text-muted-foreground hover:text-foreground transition">Process</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">AI Automation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Design Systems</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Brand Identity</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Consulting</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Let&apos;s Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">Instagram</a></li>
              <li><a href="mailto:contact@nex.ai" className="text-muted-foreground hover:text-foreground transition">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2025 IMPULSE GRID DIGITALS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
