import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-offwhite px-4">
      <div className="text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange/10 mx-auto mb-6">
          <span className="font-heading text-3xl font-bold text-orange">404</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="h-4 w-4" /> Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy-900 px-6 py-3 font-semibold text-navy-900 transition-all duration-300 hover:bg-navy-900 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
