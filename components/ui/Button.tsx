import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost-dark" | "ghost-light" | "link" | "punch";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

// Shared by all non-link variants — keeps text + icon on one line,
// vertically centered, with consistent gap. inline-flex prevents the
// button from being stretched by a flex parent's align-items: stretch
// default. whitespace-nowrap stops the label from wrapping when the
// container is narrow (causes the awkward "two-line clipped" look).
const flexBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap";

const variantClasses: Record<Variant, string> = {
  primary:
    `${flexBase} bg-accent text-white font-semibold hover:bg-accent-hover transition-colors ` +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
  "ghost-dark":
    `${flexBase} border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors ` +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
  "ghost-light":
    `${flexBase} border border-gray-200 text-navy font-semibold hover:bg-gray-50 transition-colors ` +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  link:
    "inline-flex items-center gap-1 text-accent font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded",
  punch:
    `${flexBase} bg-accent text-white font-semibold shadow-accent-glow hover:shadow-accent-glow-strong transition-shadow ` +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 rounded-lg",
  lg: "px-8 py-4 text-lg rounded-lg",
};

// Punch buttons use a larger hit area in the footer CTA band
const punchSizeClasses: Record<Size, string> = {
  sm: "px-6 py-3 rounded-lg",
  md: "px-8 py-4 text-lg rounded-lg",
  lg: "px-10 py-5 text-lg rounded-lg",
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

function resolveSize(variant: Variant, size: Size): string {
  return variant === "punch" ? punchSizeClasses[size] : sizeClasses[size];
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "md", className, children, ...rest } = props;
    const composed = cn(variantClasses[variant], resolveSize(variant, size), className);

    if ("href" in props && props.href) {
      const { href, ...anchorRest } = rest as AnchorProps;
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={composed}
            {...anchorRest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={composed} {...anchorRest}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={composed} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  },
);

export { Button };
