"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Map,
  Settings,
  ChevronLeft,
  ChevronRight,
  HardHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/ops", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ops/tasks", label: "My Tasks", icon: ClipboardList },
  { href: "/ops/shipments", label: "Shipments", icon: Package },
  { href: "/ops/floor", label: "Floor View", icon: Map },
  { href: "/ops/settings", label: "Settings", icon: Settings },
];

export function OpsSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-navy-950 text-white transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-white/10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange text-white">
          <HardHat className="h-5 w-5" />
        </div>
        {!collapsed && (
          <span className="font-heading text-sm font-bold truncate">
            Operations
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/ops"
              ? pathname === "/ops"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-white/10 text-white/50 hover:text-white transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
}
