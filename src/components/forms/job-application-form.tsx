"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TextField, TextAreaField } from "./field";
import { FileField } from "./file-field";
import { Button } from "@/components/ui/button";
import { submitJobApplication } from "@/app/actions/job-application";
import {
  ACCEPTED_CV_TYPES,
  jobApplicationSchema,
  type JobApplicationValues,
} from "@/lib/forms/job-application";

type Props = {
  jobSlug: string;
  jobTitle: string;
};

export function JobApplicationForm({ jobSlug, jobTitle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobApplicationValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { jobSlug },
  });

  const onSubmit = (_values: JobApplicationValues) => {
    setServerError(null);
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set("jobSlug", jobSlug);
    // Normalise checkbox value to "true" for the server.
    formData.set("consent", formData.get("consent") === "on" ? "true" : "false");

    startTransition(async () => {
      const res = await submitJobApplication(formData);
      if (res.ok) setSubmitted(true);
      else setServerError(res.message);
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="font-serif text-2xl text-ink-900">Application sent.</h3>
        <p className="max-w-md text-base text-ink-600">
          Thanks for applying to <strong>{jobTitle}</strong>. Our team reviews
          every application — you'll hear back within 2 weeks either way.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
    >
      <input type="hidden" name="jobSlug" value={jobSlug} />

      <TextField
        label="Full name"
        required
        placeholder="Your full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <TextField
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Phone"
        type="tel"
        required
        placeholder="+234"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <TextField
        label="LinkedIn (optional)"
        type="url"
        placeholder="https://linkedin.com/in/…"
        error={errors.linkedInUrl?.message}
        {...register("linkedInUrl")}
      />
      <TextField
        label="Portfolio / GitHub (optional)"
        type="url"
        placeholder="https://…"
        error={errors.portfolioUrl?.message}
        className="sm:col-span-2"
        {...register("portfolioUrl")}
      />

      <FileField
        label="Your CV"
        required
        name="cv"
        accept={ACCEPTED_CV_TYPES.join(",")}
        hint="PDF or Word — up to 5 MB"
        className="sm:col-span-2"
      />

      <TextAreaField
        label="Cover note (optional)"
        placeholder="Tell us in a few sentences why BiteExpress and why this role."
        hint="Optional but always read."
        error={errors.coverNote?.message}
        className="sm:col-span-2"
        {...register("coverNote")}
      />

      <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-red focus:ring-brand-red"
          {...register("consent")}
        />
        <span>
          I agree BiteExpress can contact me about this application and store
          my CV in line with the{" "}
          <a href="/privacy" className="text-brand-red underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-error sm:col-span-2">
          {errors.consent.message}
        </p>
      )}

      {serverError && (
        <div
          role="alert"
          className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error sm:col-span-2"
        >
          {serverError}
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
          {pending && <Loader2 size={18} className="animate-spin" />}
          {pending ? "Sending…" : "Submit application"}
        </Button>
      </div>
    </form>
  );
}
