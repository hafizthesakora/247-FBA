"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ClipboardList, Package, Map,
  Settings, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/ops",           label: "Dashboard",  icon: LayoutDashboard },
  { href: "/ops/tasks",     label: "My Tasks",   icon: ClipboardList },
  { href: "/ops/shipments", label: "Shipments",  icon: Package },
  { href: "/ops/floor",     label: "Floor View", icon: Map },
  { href: "/ops/settings",  label: "Settings",   icon: Settings },
];

export function OpsSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden md:flex flex-col bg-navy-950 text-white transition-all duration-300 ease-in-out h-screen sticky top-0 shrink-0",
      collapsed ? "w-[68px]" : "w-60"
    )}>
      {/* Header */}
      <div className="flex items-center h-16 border-b border-white/10 px-3 gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 font-heading text-[11px] font-bold text-white">
          OPS
        </div>
        {!collapsed && (
          <span className="font-heading text-sm font-bold text-white truncate flex-1">
            Operations
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <PanelLeftOpen className="h-4 w-4" />
            : <PanelLeftClose className="h-4 w-4" />
          }
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === "/ops"
            ? pathname === "/ops"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange text-white shadow-sm"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
