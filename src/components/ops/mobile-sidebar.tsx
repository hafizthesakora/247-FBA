"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Map,
  Settings,
  X,
  HardHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/ops", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ops/tasks", label: "My Tasks", icon: ClipboardList },
  { href: "/ops/shipments", label: "Shipments", icon: Package },
  { href: "/ops/floor", label: "Floor View", icon: Map },
  { href: "/ops/settings", label: "Settings", icon: Settings },
];

interface OpsMobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function OpsMobileSidebar({ open, onClose }: OpsMobileSidebarProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-64 z-50 bg-navy-950 text-white md:hidden">
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white">
              <HardHat className="h-5 w-5" />
            </div>
            <span className="font-heading text-sm font-bold">Operations</span>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/ops"
                ? pathname === "/ops"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
