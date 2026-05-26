"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/app/actions/contact";
import {
  contactSchema,
  contactTopics,
  type ContactFormValues,
} from "@/lib/forms/contact";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Stable per-mount: math challenge + render timestamp.
  const { mathA, mathB, startedAt } = useMemo(
    () => ({ mathA: rand(1, 9), mathB: rand(1, 9), startedAt: Date.now() }),
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website: "",
      mathA,
      mathB,
      startedAt,
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitContactMessage(values);
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
        <h3 className="font-serif text-2xl text-ink-900">Message received.</h3>
        <p className="max-w-md text-base text-ink-600">
          We aim to reply within 1 business day — sooner during business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative grid gap-5 sm:grid-cols-2"
    >
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
      <SelectField
        label="What's this about?"
        required
        placeholder="Pick a topic"
        options={contactTopics.map((t) => ({ value: t.value, label: t.label }))}
        error={errors.topic?.message}
        className="sm:col-span-2"
        {...register("topic")}
      />
      <TextAreaField
        label="Your message"
        required
        rows={6}
        placeholder="Tell us what you need…"
        error={errors.message?.message}
        className="sm:col-span-2"
        {...register("message")}
      />

      {/* Honeypot — visually hidden, off-screen, no autofill. Bots fill it; humans don't see it. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <input type="hidden" {...register("mathA", { valueAsNumber: true })} />
      <input type="hidden" {...register("mathB", { valueAsNumber: true })} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <TextField
        label={`Spam check: what is ${mathA} + ${mathB}?`}
        type="number"
        inputMode="numeric"
        required
        placeholder="Your answer"
        error={errors.mathAnswer?.message}
        className="sm:col-span-2"
        {...register("mathAnswer", { valueAsNumber: true })}
      />

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
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
