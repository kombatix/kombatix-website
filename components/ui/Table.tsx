import { type ReactNode, type HTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

// DESIGN.md §7.11 — Tables (feature comparison, pricing comparison).
// Semantic <table> with <caption> for accessibility.
// Header row: bg-navy, white text, body-sm, uppercase tracking-wide.
// Data rows: border-b gray-200.

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  caption?: string;  // Always provide a caption for screen readers
  captionHidden?: boolean;  // Visually hide caption (still readable by AT)
  children: ReactNode;
}

export function Table({ caption, captionHidden = false, className, children, ...rest }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-left", className)} {...rest}>
        {caption && (
          <caption className={cn("text-body-sm text-gray-500 mb-4 text-left", captionHidden && "sr-only")}>
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ className, children, ...rest }: TableHeadProps) {
  return (
    <thead
      className={cn(
        "bg-navy text-white text-body-sm font-semibold uppercase tracking-wide",
        className,
      )}
      {...rest}
    >
      {children}
    </thead>
  );
}

export function TableHeadCell({ className, children, ...rest }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th scope="col" className={cn("py-4 px-6", className)} {...rest}>
      {children}
    </th>
  );
}

export function TableBody({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...rest}>{children}</tbody>;
}

export function TableRow({ className, children, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("border-b border-gray-200", className)} {...rest}>
      {children}
    </tr>
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableCell({ className, children, ...rest }: TableCellProps) {
  return (
    <td className={cn("py-4 px-6 text-body text-navy", className)} {...rest}>
      {children}
    </td>
  );
}

// Convenience: check or em-dash for "included / not included" feature rows
export function TableCheck() {
  return <Check className="w-5 h-5 text-accent" aria-label="Included" />;
}

export function TableDash() {
  return <span className="text-gray-400" aria-label="Not included">—</span>;
}
