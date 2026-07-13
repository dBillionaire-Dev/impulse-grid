"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getPortfolioContent,
  updatePortfolioContent,
} from "@/app/actions/portfolio";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroDescription: "",
    aboutText: "",
    ctaText: "",
  });

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    setLoading(true);
    const data = await getPortfolioContent();
    setFormData({
      heroTitle: data.heroTitle ?? "",
      heroDescription: data.heroDescription ?? "",
      aboutText: data.aboutText ?? "",
      ctaText: data.ctaText ?? "",
    });
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await updatePortfolioContent(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Edit your hero section, about text, and call-to-action copy.
        </p>
      </div>

      <div className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Hero Title
          </label>
          <textarea
            value={formData.heroTitle}
            onChange={(e) =>
              setFormData({ ...formData, heroTitle: e.target.value })
            }
            rows={3}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm font-mono"
          />
          <p className="text-xs text-muted-foreground mt-2">
            One phrase per line, each line gets its own color on the homepage.
            Example:
            <br />
            <span className="font-mono">
              I Automate.
              <br />
              I Design.
              <br />I Elevate Brands.
            </span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Hero Description
          </label>
          <textarea
            value={formData.heroDescription}
            onChange={(e) =>
              setFormData({ ...formData, heroDescription: e.target.value })
            }
            rows={3}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            About Text
          </label>
          <textarea
            value={formData.aboutText}
            onChange={(e) =>
              setFormData({ ...formData, aboutText: e.target.value })
            }
            rows={5}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Call-to-Action Text
          </label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) =>
              setFormData({ ...formData, ctaText: e.target.value })
            }
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {saved && <span className="text-sm text-green-400">Saved ✓</span>}
        </div>
      </div>
    </div>
  );
}
