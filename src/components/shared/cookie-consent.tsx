"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      setShow(true);
    }
  }, []);

  function acceptAll() {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(fullConsent));
    setShow(false);
  }

  function acceptSelected() {
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShow(false);
  }

  function rejectOptional() {
    const minConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(minConsent));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
        <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
          Cookie Settings
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          We use cookies to improve your experience. You can choose which
          categories to allow.
        </p>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked
              disabled
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-text-dark">
              Necessary{" "}
              <span className="text-text-secondary font-normal">
                (always active)
              </span>
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) =>
                setConsent({ ...consent, analytics: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
            />
            <span className="text-sm font-medium text-text-dark">
              Analytics
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) =>
                setConsent({ ...consent, marketing: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
            />
            <span className="text-sm font-medium text-text-dark">
              Marketing
            </span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={acceptAll}
            className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={acceptSelected}
            className="px-5 py-2.5 rounded-lg border border-surface-border text-sm font-semibold text-text-dark hover:bg-surface-offwhite transition-colors"
          >
            Save Preferences
          </button>
          <button
            onClick={rejectOptional}
            className="px-5 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-dark transition-colors"
          >
            Reject Optional
          </button>
        </div>
      </div>
    </div>
  );
}
