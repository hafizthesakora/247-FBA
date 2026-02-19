"use client";

import { useState } from "react";
import { SessionProvider } from "@/components/shared/session-provider";
import { OpsSidebar } from "@/components/ops/sidebar";
import { OpsHeader } from "@/components/ops/header";
import { OpsMobileSidebar } from "@/components/ops/mobile-sidebar";

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-surface-offwhite">
        <OpsSidebar />
        <OpsMobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <OpsHeader
            onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
