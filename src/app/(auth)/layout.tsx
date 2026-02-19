import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-offwhite px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-white font-heading text-sm font-bold transition-all duration-300 group-hover:scale-105">
              24/7
            </div>
            <span className="font-heading text-lg font-bold text-navy-900">
              FBA Prep
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
