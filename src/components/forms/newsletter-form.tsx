"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import {
  newsletterSchema,
  type NewsletterValues,
} from "@/lib/forms/newsletter";
import { cn } from "@/lib/cn";

type Props = {
  /** "dark" for use on the dark footer, "light" for white surfaces. */
  variant?: "light" | "dark";
  className?: string;
};

export function NewsletterForm({ variant = "dark", className }: Props) {
  const [submitted, setSubmitted] = useState<null | { already: boolean }>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (values: NewsletterValues) => {
    setServerError(null);
    startTransition(async () => {
      const res = await subscribeToNewsletter(values);
      if (res.ok) setSubmitted({ already: !!res.alreadySubscribed });
      else setServerError(res.message);
    });
  };

  const isDark = variant === "dark";
  const labelClass = isDark ? "text-white/70" : "text-ink-600";

  if (submitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm",
          isDark ? "text-white" : "text-ink-900",
          className,
        )}
        role="status"
      >
        <CheckCircle2 size={18} className="text-success" />
        {submitted.already
          ? "You're already on the list — thanks for the enthusiasm."
          : "You're in. Look out for a welcome email shortly."}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("flex flex-col gap-2", className)}
    >
      <label className={cn("text-xs font-medium uppercase tracking-wider", labelClass)}>
        Newsletter
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          className={cn(
            "h-11 flex-1 rounded-full px-4 text-sm shadow-soft transition-[box-shadow,border-color] duration-200 ease-out-expo focus:outline-none focus:ring-4 focus:ring-brand-red/15",
            isDark
              ? "border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-brand-red/60"
              : "border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:border-brand-red",
          )}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-pill bg-brand-red px-5 text-sm font-medium text-white shadow-glow-sm transition-[transform,box-shadow,background-color] duration-200 ease-out-expo hover:-translate-y-px hover:bg-brand-red-600 hover:shadow-glow active:translate-y-0 disabled:opacity-60 disabled:shadow-none"
        >
          {pending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <p className="text-xs text-error">{errors.email.message}</p>
      )}
      {serverError && (
        <p role="alert" className="text-xs text-error">
          {serverError}
        </p>
      )}
      <p className={cn("text-xs", labelClass)}>
        No spam. Unsubscribe any time.
      </p>
    </form>
  );
}
