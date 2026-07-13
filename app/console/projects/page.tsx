"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/app/actions/portfolio";

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  category: "",
  tagsInput: "", // comma-separated in the form, converted to string[] on save
  order: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(project: any) {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl ?? "",
      category: project.category,
      tagsInput: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      order: String(project.order ?? 0),
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!formData.title || !formData.description || !formData.category) return;

    setSaving(true);
    const tags = formData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingId) {
        await updateProject(editingId, {
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl || undefined,
          category: formData.category,
          tags,
          order:
            formData.order === "" ? undefined : parseInt(formData.order, 10),
        });
      } else {
        await createProject({
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl || undefined,
          category: formData.category,
          tags,
          order:
            formData.order === "" ? undefined : parseInt(formData.order, 10),
        });
      }
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadProjects();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this project?")) {
      await deleteProject(id);
      await loadProjects();
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects
          </p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
          <textarea
            placeholder="Project Description"
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
              placeholder="Category (e.g. Automation, Design, etc.)"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Display order (lower number shows first, leave blank to add at the end)"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: e.target.value })
              }
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Controls the order projects appear in on the homepage and
              /portfolio page.
            </p>
          </div>
          <input
            type="text"
            placeholder="Tags, comma separated (e.g. n8n, Automation, Canva etc.)"
            value={formData.tagsInput}
            onChange={(e) =>
              setFormData({ ...formData, tagsInput: e.target.value })
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
                ? "Update Project"
                : "Create Project"}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <Button
            onClick={openCreateForm}
            variant="outline"
            className="border-border"
          >
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-purple-400 mb-1">
                    {project.category}{" "}
                    <span className="text-muted-foreground normal-case">
                      · order {project.order}
                    </span>
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditForm(project)}
                    variant="outline"
                    size="sm"
                    className="border-border"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
