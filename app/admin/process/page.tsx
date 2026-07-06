'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getProcessSteps, createProcessStep, updateProcessStep, deleteProcessStep } from '@/app/actions/portfolio'

const emptyForm = { stepNumber: '', title: '', description: '' }

export default function ProcessPage() {
  const [steps, setSteps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSteps()
  }, [])

  async function loadSteps() {
    setLoading(true)
    const data = await getProcessSteps()
    setSteps(data)
    setLoading(false)
  }

  function openCreateForm() {
    setEditingId(null)
    setFormData({ ...emptyForm, stepNumber: String(steps.length + 1) })
    setShowForm(true)
  }

  function openEditForm(step: any) {
    setEditingId(step.id)
    setFormData({
      stepNumber: String(step.stepNumber),
      title: step.title,
      description: step.description,
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.title || !formData.description || !formData.stepNumber) return
    setSaving(true)
    try {
      const payload = {
        stepNumber: parseInt(formData.stepNumber, 10),
        title: formData.title,
        description: formData.description,
      }
      if (editingId) {
        await updateProcessStep(editingId, payload)
      } else {
        await createProcessStep(payload)
      }
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      await loadSteps()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this process step?')) {
      await deleteProcessStep(id)
      await loadSteps()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Process Steps</h1>
          <p className="text-muted-foreground mt-2">Manage your workflow process steps</p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? 'Cancel' : 'Add Step'}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4 max-w-xl">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="number"
              placeholder="Step #"
              value={formData.stepNumber}
              onChange={(e) => setFormData({ ...formData, stepNumber: e.target.value })}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="col-span-3 bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Step' : 'Create Step'}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : steps.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No process steps yet</p>
          <Button onClick={openCreateForm} variant="outline" className="border-border">
            Add your first step
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold flex-shrink-0">
                {step.stepNumber}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => openEditForm(step)} variant="outline" size="sm" className="border-border">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(step.id)}
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
