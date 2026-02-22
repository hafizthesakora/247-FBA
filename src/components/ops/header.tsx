"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, Menu, HardHat } from "lucide-react";

interface OpsHeaderProps {
  onMobileMenuToggle?: () => void;
}

export function OpsHeader({ onMobileMenuToggle }: OpsHeaderProps) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-surface-border px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-surface-offwhite transition-colors"
        >
          <Menu className="h-5 w-5 text-navy-900" />
        </button>
        <div className="flex items-center gap-2">
          <HardHat className="h-4 w-4 text-amber-500" />
          <h2 className="font-heading text-lg font-semibold text-navy-900 hidden sm:block">
            Operations
          </h2>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-offwhite transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
            <User className="h-4 w-4 text-amber-600" />
          </div>
          <span className="text-sm font-medium text-navy-900 hidden sm:block">
            {session?.user?.name || "Operator"}
          </span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black/5 py-1 z-50">
            <div className="px-4 py-2 border-b border-surface-border">
              <p className="text-sm font-medium text-navy-900 truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
