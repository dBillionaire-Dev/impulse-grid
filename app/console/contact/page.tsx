"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getPortfolioContent,
  updatePortfolioContent,
} from "@/app/actions/portfolio";

export default function HeroImagePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    setLoading(true);
    const data = await getPortfolioContent();
    setContent(data);
    setImageUrl(data.heroImageUrl ?? "/hero-portrait.png");
    setLoading(false);
  }

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    try {
      await updatePortfolioContent({
        heroTitle: content.heroTitle,
        heroDescription: content.heroDescription,
        heroImageUrl: imageUrl,
        aboutText: content.aboutText,
        ctaText: content.ctaText,
        socialLinks: content.socialLinks,
      });
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
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Hero Image</h1>
        <p className="text-muted-foreground mt-2">
          The portrait shown on the right side of your homepage hero section.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-muted-foreground self-start">
            Live preview
          </p>
          <div className="relative w-48 h-64 rounded-full overflow-hidden border-2 border-purple-500/50 bg-black/20">
            {imageUrl && !imageError ? (
              // Using a plain img here (not next/image) since the URL is
              // arbitrary and unknown at build time — no domain to configure.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Hero preview"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center px-4">
                {imageUrl ? "Couldn't load this URL" : "No image set"}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageError(false);
              }}
              placeholder="https://res.cloudinary.com/.../portrait.jpg"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground text-sm"
            />
          </div>

          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              Works best with a portrait-oriented image, since it's cropped into
              a tall circle.
            </p>
            <p>
              <strong className="text-foreground">Cloudinary:</strong> upload in
              your Cloudinary Media Library, then copy the "Delivery URL" — it
              looks like{" "}
              <code className="text-purple-300">
                https://res.cloudinary.com/&lt;cloud-name&gt;/image/upload/...
              </code>
              .
            </p>
            <p>
              <strong className="text-foreground">Unsplash:</strong> open any
              photo, click Download, right-click the full-size image and copy
              its address, or use the direct
              <code className="text-purple-300">
                {" "}
                images.unsplash.com/photo-...
              </code>{" "}
              link from the browser's dev tools if you want to avoid hotlinking
              the wrong size.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || !imageUrl}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Hero Image"}
          </Button>
          {saved && (
            <p className="text-sm text-green-400 text-center">Saved ✓</p>
          )}
        </div>
      </div>
    </div>
  );
}
