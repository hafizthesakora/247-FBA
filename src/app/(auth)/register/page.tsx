"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-2">
        Create an account
      </h1>
      <p className="text-text-secondary text-sm mb-6">
        Register for your client portal access
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-navy-900 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-navy-900 mb-1.5"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => updateForm("company", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
            placeholder="+49 (0) 123 456789"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors pr-10"
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-navy-900 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => updateForm("confirmPassword", e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-orange hover:text-orange-600 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
