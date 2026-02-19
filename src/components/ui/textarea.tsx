import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors",
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

Textarea.displayName = "Textarea";

export { Textarea };
