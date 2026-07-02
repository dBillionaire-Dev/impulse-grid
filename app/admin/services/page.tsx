'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getServices, createService, deleteService } from '@/app/actions/portfolio'
import { useEffect } from 'react'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '', icon: '🚀', color: '#8B5CF6' })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    setLoading(true)
    const data = await getServices()
    setServices(data)
    setLoading(false)
  }

  async function handleCreate() {
    if (!formData.title || !formData.description) return
    await createService(formData)
    setFormData({ title: '', description: '', icon: '🚀', color: '#8B5CF6' })
    setShowForm(false)
    await loadServices()
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this service?')) {
      await deleteService(id)
      await loadServices()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Services</h1>
          <p className="text-muted-foreground mt-2">Manage your service offerings</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? 'Cancel' : 'Add Service'}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4">
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              maxLength={2}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="bg-background border border-border rounded-lg px-4 py-2 h-10"
            />
          </div>
          <Button onClick={handleCreate} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
            Create Service
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : services.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No services yet</p>
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="border-border"
          >
            Create your first service
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl mb-2">{service.icon}</p>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                </div>
                <Button
                  onClick={() => handleDelete(service.id)}
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: service.color }}
                />
                <span className="text-xs text-muted-foreground">{service.color}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
