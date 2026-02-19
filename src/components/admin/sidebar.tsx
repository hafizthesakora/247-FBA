"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  HardHat,
  Activity,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/shipments", label: "Shipments", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const opsNavItems = [
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/operators", label: "Operators", icon: HardHat },
  { href: "/admin/activity", label: "Activity Log", icon: Activity },
  { href: "/admin/floor", label: "Floor Mgmt", icon: Map },
];

export function AdminSidebar() {
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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange text-white font-heading text-xs font-bold">
          24/7
        </div>
        {!collapsed && (
          <span className="font-heading text-sm font-bold truncate">
            Admin Panel
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
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

        {!collapsed && (
          <div className="pt-4 pb-2 px-3">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              Operations
            </span>
          </div>
        )}
        {collapsed && <div className="border-t border-white/10 my-2" />}

        {opsNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

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
