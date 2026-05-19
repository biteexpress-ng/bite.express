"use client";

import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type CommonProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const baseField =
  "block w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 transition-shadow shadow-sm " +
  "focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25";

const okBorder = "border-ink-200";
const errBorder = "border-error focus:border-error focus:ring-error/25";

function Wrapper({
  label,
  hint,
  error,
  required,
  children,
}: CommonProps & { children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-900">
        {label}
        {required && <span className="ml-1 text-brand-red">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-error">{error}</span>
      ) : hint ? (
        <span className="text-xs text-ink-600">{hint}</span>
      ) : null}
    </label>
  );
}

type TextProps = CommonProps & InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextProps>(
  ({ label, hint, error, required, className, ...rest }, ref) => (
    <Wrapper label={label} hint={hint} error={error} required={required}>
      <input
        ref={ref}
        className={cn(baseField, error ? errBorder : okBorder, className)}
        aria-invalid={!!error}
        {...rest}
      />
    </Wrapper>
  ),
);
TextField.displayName = "TextField";

type AreaProps = CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaField = forwardRef<HTMLTextAreaElement, AreaProps>(
  ({ label, hint, error, required, className, ...rest }, ref) => (
    <Wrapper label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        rows={4}
        className={cn(baseField, "resize-y", error ? errBorder : okBorder, className)}
        aria-invalid={!!error}
        {...rest}
      />
    </Wrapper>
  ),
);
TextAreaField.displayName = "TextAreaField";

type SelectOpt = { value: string; label: string };
type SelectProps = CommonProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
    options: SelectOpt[];
    placeholder?: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, required, className, options, placeholder, ...rest }, ref) => (
    <Wrapper label={label} hint={hint} error={error} required={required}>
      <select
        ref={ref}
        className={cn(baseField, error ? errBorder : okBorder, className)}
        aria-invalid={!!error}
        defaultValue=""
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  ),
);
SelectField.displayName = "SelectField";
