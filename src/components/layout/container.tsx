import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({ className, size = "default", children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          default: "max-w-7xl",
          narrow: "max-w-4xl",
          wide: "max-w-[1400px]",
        }[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
