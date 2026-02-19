import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: "white" | "offwhite" | "navy" | "dark";
  padding?: "default" | "sm" | "lg" | "none";
}

export function Section({
  className,
  bg = "white",
  padding = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        {
          white: "bg-white",
          offwhite: "bg-surface-offwhite",
          navy: "bg-navy-900 text-white",
          dark: "bg-navy-950 text-white",
        }[bg],
        {
          default: "py-16 md:py-20 lg:py-24",
          sm: "py-10 md:py-12",
          lg: "py-20 md:py-28 lg:py-32",
          none: "",
        }[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
