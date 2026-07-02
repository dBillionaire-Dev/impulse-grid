'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Add Project
        </Button>
      </div>

      <div className="border border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground mb-4">Projects management interface</p>
        <p className="text-xs text-muted-foreground">Similar structure to services - add, edit, and manage your featured projects</p>
      </div>
    </div>
  )
}
