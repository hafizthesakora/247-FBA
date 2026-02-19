"use client";

import { useSession } from "next-auth/react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Admin Settings
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Platform configuration
        </p>
      </div>

      <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Account Information
        </h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-text-secondary text-xs">Name</p>
            <p className="text-navy-900">{session?.user?.name || "—"}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Email</p>
            <p className="text-navy-900">{session?.user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Role</p>
            <p className="text-navy-900 font-medium">Administrator</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Platform Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-surface-border">
            <div>
              <p className="text-sm font-medium text-navy-900">Email Notifications</p>
              <p className="text-xs text-text-secondary">Send email on shipment status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-surface-border">
            <div>
              <p className="text-sm font-medium text-navy-900">Auto-create Orders</p>
              <p className="text-xs text-text-secondary">Automatically create orders for received shipments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-navy-900">Client Registration</p>
              <p className="text-xs text-text-secondary">Allow new clients to self-register</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
