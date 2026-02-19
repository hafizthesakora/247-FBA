"use client";

import { useState } from "react";
import { SessionProvider } from "@/components/shared/session-provider";
import { PortalSidebar } from "@/components/portal/sidebar";
import { PortalHeader } from "@/components/portal/header";
import { MobileSidebar } from "@/components/portal/mobile-sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-surface-offwhite">
        <PortalSidebar />
        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader
            onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
