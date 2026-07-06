'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getPackages, createPackage, updatePackage, deletePackage } from '@/app/actions/portfolio'

const emptyForm = { title: '', description: '', featuresInput: '' }

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadPackages()
  }, [])

  async function loadPackages() {
    setLoading(true)
    const data = await getPackages()
    setPackages(data)
    setLoading(false)
  }

  function openCreateForm() {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  function openEditForm(pkg: any) {
    setEditingId(pkg.id)
    setFormData({
      title: pkg.title,
      description: pkg.description,
      featuresInput: Array.isArray(pkg.features) ? pkg.features.join('\n') : '',
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.title || !formData.description) return
    setSaving(true)
    const features = formData.featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)

    try {
      const payload = { title: formData.title, description: formData.description, features }
      if (editingId) {
        await updatePackage(editingId, payload)
      } else {
        await createPackage(payload)
      }
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      await loadPackages()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this package?')) {
      await deletePackage(id)
      await loadPackages()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Packages</h1>
          <p className="text-muted-foreground mt-2">Manage your service packages / pricing tiers</p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? 'Cancel' : 'Add Package'}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Package Title (e.g. Starter)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <textarea
            placeholder={'One feature per line, e.g.\nUnlimited revisions\n2 week turnaround'}
            value={formData.featuresInput}
            onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
            rows={4}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Package' : 'Create Package'}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : packages.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No packages yet</p>
          <Button onClick={openCreateForm} variant="outline" className="border-border">
            Add your first package
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-3"
            >
              <h3 className="text-lg font-semibold text-white">{pkg.title}</h3>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
              {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  {pkg.features.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2 pt-2">
                <Button onClick={() => openEditForm(pkg)} variant="outline" size="sm" className="border-border">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(pkg.id)}
                  variant="outline"
                  size="sm"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
