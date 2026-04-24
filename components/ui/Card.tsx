import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "off-white";
type Padding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  padding?: Padding;
  children: ReactNode;
}

// DESIGN.md §7.4 / §7.5 — light and dark card variants.
const toneClasses: Record<Tone, string> = {
  light: "bg-white border border-gray-200",
  "off-white": "bg-off-white border border-gray-200",
  dark: "bg-navy-light border border-white/10",
};

const paddingClasses: Record<Padding, string> = {
  sm: "p-6",
  md: "p-8",
  lg: "p-8 md:p-12",
};

export function Card({
  tone = "light",
  padding = "lg",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn("rounded-xl", toneClasses[tone], paddingClasses[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
