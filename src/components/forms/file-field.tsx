"use client";

import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const FileField = forwardRef<HTMLInputElement, Props>(
  ({ label, hint, error, required, className, accept, onChange, ...rest }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);

    return (
      <label className={cn("flex flex-col gap-1.5", className)}>
        <span className="text-sm font-medium text-ink-900">
          {label}
          {required && <span className="ml-1 text-brand-red">*</span>}
        </span>

        <div
          className={cn(
            "group relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 border-dashed bg-white px-5 py-5 transition-colors",
            error
              ? "border-error/60 bg-error/5"
              : fileName
                ? "border-brand-red/40 bg-brand-red/5"
                : "border-ink-200 hover:border-brand-red hover:bg-ink-50",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                fileName ? "bg-brand-red text-white" : "bg-ink-100 text-ink-700",
              )}
            >
              {fileName ? <FileText size={18} /> : <Upload size={18} />}
            </span>
            <div className="text-left">
              <div className="text-sm font-medium text-ink-900">
                {fileName ?? "Drag a file here or click to browse"}
              </div>
              <div className="text-xs text-ink-600">
                {fileName ? "Click to replace" : "PDF or Word — up to 5 MB"}
              </div>
            </div>
          </div>

          {fileName && (
            <button
              type="button"
              aria-label="Remove file"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-700 hover:bg-error hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Reset the underlying input by re-keying via parent — we just
                // clear our display state; the form caller should also reset.
                setFileName(null);
                const input = (e.currentTarget.closest("label")?.querySelector(
                  'input[type="file"]',
                ) as HTMLInputElement) ?? null;
                if (input) input.value = "";
              }}
            >
              <X size={14} />
            </button>
          )}

          <input
            ref={ref}
            type="file"
            accept={accept}
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFileName(f ? f.name : null);
              onChange?.(e);
            }}
            {...rest}
          />
        </div>

        {error ? (
          <span className="text-xs text-error">{error}</span>
        ) : hint ? (
          <span className="text-xs text-ink-600">{hint}</span>
        ) : null}
      </label>
    );
  },
);
FileField.displayName = "FileField";
