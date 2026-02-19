"use client";

import { useState } from "react";
import { SessionProvider } from "@/components/shared/session-provider";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminMobileSidebar } from "@/components/admin/mobile-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-surface-offwhite">
        <AdminSidebar />
        <AdminMobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader
            onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
