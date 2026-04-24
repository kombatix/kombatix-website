import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

// DESIGN.md §7.10 — Forms
// - Inputs: white bg, gray-200 border, px-4 py-3, focus ring accent/20
// - Labels: body-sm navy semibold, mb-2 block
// - Required: red asterisk
// - Error: border-red-500 + body-sm red-600 error message below
// - Submit behavior is managed by parent form, not this component.

interface BaseFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

// ------------------------------------------------------------------
// Text / email / tel inputs
// ------------------------------------------------------------------
type TextFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, required, error, helperText, id, className, ...rest },
    ref,
  ) {
    const fieldId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={fieldId}
          className="text-body-sm text-navy font-semibold mb-2 block"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full bg-white rounded-lg px-4 py-3",
            "text-body text-navy placeholder:text-gray-500",
            "focus:ring-2 focus:ring-accent/20 focus:outline-none",
            error
              ? "border border-red-500 focus:border-red-500"
              : "border border-gray-200 focus:border-accent",
          )}
          {...rest}
        />
        {helperText && !error && (
          <p id={helperId} className="text-body-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-body-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

// ------------------------------------------------------------------
// Textarea
// ------------------------------------------------------------------
type TextareaFieldProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField(
    { label, required, error, helperText, id, className, rows = 4, ...rest },
    ref,
  ) {
    const fieldId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={fieldId}
          className="text-body-sm text-navy font-semibold mb-2 block"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full bg-white rounded-lg px-4 py-3",
            "text-body text-navy placeholder:text-gray-500",
            "focus:ring-2 focus:ring-accent/20 focus:outline-none resize-y",
            error
              ? "border border-red-500 focus:border-red-500"
              : "border border-gray-200 focus:border-accent",
          )}
          {...rest}
        />
        {helperText && !error && (
          <p id={helperId} className="text-body-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-body-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

// ------------------------------------------------------------------
// Select (dropdown)
// ------------------------------------------------------------------
type SelectFieldProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
    children: ReactNode;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    { label, required, error, helperText, id, className, children, ...rest },
    ref,
  ) {
    const fieldId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={fieldId}
          className="text-body-sm text-navy font-semibold mb-2 block"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full bg-white rounded-lg px-4 py-3 pr-10",
              "text-body text-navy appearance-none",
              "focus:ring-2 focus:ring-accent/20 focus:outline-none",
              error
                ? "border border-red-500 focus:border-red-500"
                : "border border-gray-200 focus:border-accent",
            )}
            {...rest}
          >
            {children}
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
          </svg>
        </div>
        {helperText && !error && (
          <p id={helperId} className="text-body-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-body-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

// ------------------------------------------------------------------
// Honeypot field — invisible to humans, visible to bots
// DESIGN.md §7.10: tabIndex=-1, autoComplete=off, display:none
// ------------------------------------------------------------------
interface HoneypotProps {
  name?: string;
}

export function Honeypot({ name = "website" }: HoneypotProps) {
  return (
    <input
      type="text"
      name={name}
      tabIndex={-1}
      autoComplete="off"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
