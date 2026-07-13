"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/actions/portfolio";

const emptyForm = { author: "", company: "", content: "", image: "" };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);
    const data = await getTestimonials();
    setTestimonials(data);
    setLoading(false);
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(t: any) {
    setEditingId(t.id);
    setFormData({
      author: t.author,
      company: t.company,
      content: t.content,
      image: t.image ?? "",
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!formData.author || !formData.company || !formData.content) return;
    setSaving(true);
    try {
      const payload = {
        author: formData.author,
        company: formData.company,
        content: formData.content,
        image: formData.image || undefined,
      };
      if (editingId) {
        await updateTestimonial(editingId, payload);
      } else {
        await createTestimonial(payload);
      }
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadTestimonials();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      await loadTestimonials();
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Testimonials</h1>
          <p className="text-muted-foreground mt-2">
            Manage client testimonials & reviews
          </p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? "Cancel" : "Add Testimonial"}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4 max-w-xl">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="text"
              placeholder="Company / Role"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <textarea
            placeholder="Testimonial content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={4}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Testimonial"
                : "Create Testimonial"}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : testimonials.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No testimonials yet</p>
          <Button
            onClick={openCreateForm}
            variant="outline"
            className="border-border"
          >
            Add your first testimonial
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-3"
            >
              <p className="text-sm text-muted-foreground italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditForm(t)}
                    variant="outline"
                    size="sm"
                    className="border-border"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(t.id)}
                    variant="outline"
                    size="sm"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
