"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getTools,
  createTool,
  updateTool,
  deleteTool,
} from "@/app/actions/portfolio";

const emptyForm = { name: "", icon: "", category: "" };

function ToolIcon({ icon, name }: { icon: string; name: string }) {
  if (!icon) return <span className="text-xl">🔧</span>;
  if (icon.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={icon}
        alt={name}
        className="w-6 h-6 object-contain"
        loading="lazy"
      />
    );
  }
  return <span className="text-xl">{icon}</span>;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    setLoading(true);
    const data = await getTools();
    setTools(data);
    setLoading(false);
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(tool: any) {
    setEditingId(tool.id);
    setFormData({ name: tool.name, icon: tool.icon, category: tool.category });
    setShowForm(true);
  }

  async function handleSave() {
    if (!formData.name || !formData.category) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateTool(editingId, formData);
      } else {
        await createTool(formData);
      }
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadTools();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this tool?")) {
      await deleteTool(id);
      await loadTools();
    }
  }

  // Group tools by category for display
  const grouped = tools.reduce((acc: Record<string, any[]>, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Tools & Technologies
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage the tech stack shown on your portfolio
          </p>
        </div>
        <Button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {showForm ? "Cancel" : "Add Tool"}
        </Button>
      </div>

      {showForm && (
        <div className="border border-purple-500/30 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center flex-shrink-0">
              <ToolIcon
                icon={formData.icon}
                name={formData.name || "icon preview"}
              />
            </div>
            <input
              type="url"
              placeholder="Icon URL (e.g. https://cdn.jsdelivr.net/.../n8n.svg)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Paste a direct link to an SVG or PNG logo. You can also drop in a
            single emoji instead of a link if you don't have one handy.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name (e.g. Airtable)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
            <input
              type="text"
              placeholder="Category (e.g. Automation, Design, Work)"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Update Tool" : "Create Tool"}
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : tools.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No tools yet</p>
          <Button
            onClick={openCreateForm}
            variant="outline"
            className="border-border"
          >
            Add your first tool
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-wide text-purple-400 mb-3">
                {category}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {items.map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-border/50 rounded-lg p-4 bg-card/30 backdrop-blur-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <ToolIcon icon={tool.icon} name={tool.name} />
                      </div>
                      <span className="text-sm text-white">{tool.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => openEditForm(tool)}
                        variant="outline"
                        size="sm"
                        className="border-border"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(tool.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
