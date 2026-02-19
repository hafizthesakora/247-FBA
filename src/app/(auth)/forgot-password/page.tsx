"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-navy-900 mb-2">
          Check your email
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent password
          reset instructions.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-orange hover:text-orange-600 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-2">
        Forgot password?
      </h1>
      <p className="text-text-secondary text-sm mb-6">
        Enter your email and we&apos;ll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors"
            placeholder="you@company.com"
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
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-orange hover:text-orange-600 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
