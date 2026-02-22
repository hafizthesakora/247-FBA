"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Warehouse, ShoppingCart,
  FileText, Settings, Bell, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/portal",              label: "Dashboard",    icon: LayoutDashboard },
  { href: "/portal/shipments",    label: "Shipments",    icon: Package },
  { href: "/portal/inventory",    label: "Inventory",    icon: Warehouse },
  { href: "/portal/orders",       label: "Orders",       icon: ShoppingCart },
  { href: "/portal/invoices",     label: "Invoices",     icon: FileText },
  { href: "/portal/notifications",label: "Notifications",icon: Bell },
  { href: "/portal/settings",     label: "Settings",     icon: Settings },
];

export function PortalSidebar() {
  const pathname  = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden md:flex flex-col bg-navy-900 text-white transition-all duration-300 ease-in-out h-screen sticky top-0 shrink-0",
      collapsed ? "w-[68px]" : "w-60"
    )}>
      {/* Header */}
      <div className="flex items-center h-16 border-b border-white/10 px-3 gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange font-heading text-[11px] font-bold text-white">
          24/7
        </div>
        {!collapsed && (
          <span className="font-heading text-sm font-bold text-white truncate flex-1">
            Client Portal
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
          const isActive = item.href === "/portal"
            ? pathname === "/portal"
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
