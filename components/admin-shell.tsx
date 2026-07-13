"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "./sign-out-button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/console", icon: "🏠" },
  { label: "Services", href: "/console/services", icon: "⚙️" },
  { label: "Packages", href: "/console/packages", icon: "📦" },
  { label: "Projects", href: "/console/projects", icon: "📁" },
  { label: "Statistics", href: "/console/stats", icon: "📊" },
  { label: "Testimonials", href: "/console/testimonials", icon: "⭐" },
  { label: "Process Steps", href: "/console/process", icon: "🔄" },
  { label: "Tools", href: "/console/tools", icon: "🛠️" },
  { label: "Hero Image", href: "/console/contact", icon: "🖼️" },
  { label: "Settings", href: "/console/settings", icon: "⚡" },
];

export function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } border-r border-border/50 bg-card/30 backdrop-blur-sm p-4 fixed left-0 top-0 h-screen overflow-auto transition-all duration-200 flex flex-col`}
      >
        <div
          className={`flex items-center mb-8 ${collapsed ? "flex-col gap-3" : "justify-between"}`}
        >
          {!collapsed && (
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="IMPULSE GRID ADMIN"
                  width={40}
                  height={40}
                  className="h-20 w-auto"
                />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-700 via-pink-900 to-orange-500 bg-clip-text text-transparent">
                  Admin
                </span>
              </div>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/50 transition flex-shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div
          className={`mt-8 pt-6 border-t border-border/50 ${collapsed ? "text-center" : ""}`}
        >
          {!collapsed && (
            <>
              <p className="text-xs text-muted-foreground mb-1">
                Logged in as:
              </p>
              <p className="text-sm font-medium text-foreground truncate mb-4">
                {userEmail}
              </p>
            </>
          )}
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`${collapsed ? "ml-20" : "ml-64"} flex-1 transition-all duration-200`}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
