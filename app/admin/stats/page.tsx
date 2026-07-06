'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getStats, createStat, updateStat, deleteStat } from '@/app/actions/portfolio'

const emptyForm = { label: '', value: '', suffix: '' }

export default function StatsPage() {
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setLoading(true)
    const data = await getStats()
    setStats(data)
    setLoading(false)
  }

  function openCreateForm() {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  function openEditForm(stat: any) {
    setEditingId(stat.id)
    setFormData({ label: stat.label, value: stat.value, suffix: stat.suffix ?? '' })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.label || !formData.value) return
    setSaving(true)
    try {
      if (editingId) {
        await updateStat(editingId, formData)
      } else {
        await createStat(formData)
      }
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      await loadStats()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this statistic?')) {
      await deleteStat(id)
      await loadStats()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Statistics</h1>
          <p className="text-muted-foreground mt-2">Manage the metrics shown on your portfolio</p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? 'Cancel' : 'Add Statistic'}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Label (e.g. Projects Delivered)"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Value (e.g. 50)"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="text"
              placeholder="Suffix (e.g. +, %)"
              value={formData.suffix}
              onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Statistic' : 'Create Statistic'}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : stats.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No statistics yet</p>
          <Button onClick={openCreateForm} variant="outline" className="border-border">
            Add your first statistic
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-3"
            >
              <p className="text-3xl font-bold text-white">
                {stat.value}
                <span className="text-purple-400">{stat.suffix}</span>
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => openEditForm(stat)} variant="outline" size="sm" className="border-border">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(stat.id)}
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
