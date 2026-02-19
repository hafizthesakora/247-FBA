import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-sm transition-colors",
            "placeholder:text-text-secondary",
            "focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-surface-border",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
