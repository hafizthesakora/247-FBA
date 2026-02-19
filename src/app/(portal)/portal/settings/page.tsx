"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetch("/api/portal/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setForm({
            name: data.user.name || "",
            company: data.user.company || "",
            phone: data.user.phone || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/portal/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        await update();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // ignore
    }

    setLoading(false);
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSaved(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/portal/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setPasswordError(data.error || "Failed to update password");
      } else {
        setPasswordSaved(true);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setPasswordSaved(false), 3000);
      }
    } catch {
      setPasswordError("Something went wrong");
    }

    setPasswordLoading(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Settings
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your account settings
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Profile Information
        </h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-text-secondary bg-surface-offwhite text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4" />
            ) : null}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Change Password
        </h2>
        {passwordError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {passwordError}
          </div>
        )}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            />
          </div>
          <button
            type="submit"
            disabled={passwordLoading}
            className="px-5 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {passwordLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : passwordSaved ? (
              <Check className="h-4 w-4" />
            ) : null}
            {passwordSaved ? "Updated" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
