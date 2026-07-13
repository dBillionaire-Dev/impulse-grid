"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/app/actions/portfolio";

const emptyForm = { title: "", description: "", icon: "🚀", color: "#8B5CF6" };

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(service: any) {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      color: service.color,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!formData.title || !formData.description) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadServices();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      await loadServices();
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service offerings
          </p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? "Cancel" : "Add Service"}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4">
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              maxLength={2}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 h-10"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Service"
                : "Create Service"}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : services.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No services yet</p>
          <Button
            onClick={openCreateForm}
            variant="outline"
            className="border-border"
          >
            Create your first service
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl mb-2">{service.icon}</p>
                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditForm(service)}
                    variant="outline"
                    size="sm"
                    className="border-border"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(service.id)}
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: service.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {service.color}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
