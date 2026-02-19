import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <hr
      className={cn(
        "border-surface-border",
        orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
        className
      )}
      {...props}
    />
  );
}
