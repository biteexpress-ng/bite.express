"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "@/components/forms/field";
import { AntiSpamFields } from "@/components/forms/anti-spam-fields";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/app/actions/contact";
import {
  contactSchema,
  contactTopics,
  type ContactFormValues,
} from "@/lib/forms/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const mathA = 4;
  const mathB = 7;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website: "",
      mathA,
      mathB,
      startedAt: 1,
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
          We aim to reply within 1 business day, sooner during business hours.
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

      <AntiSpamFields
        register={register}
        setValue={setValue}
        mathA={mathA}
        mathB={mathB}
        error={errors.mathAnswer?.message}
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
