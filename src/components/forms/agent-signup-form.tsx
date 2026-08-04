"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "./field";
import { AntiSpamFields } from "./anti-spam-fields";
import { SuccessState } from "./vendor-signup-form";
import { Button } from "@/components/ui/button";
import { submitAgentApplication } from "@/app/actions/partner-signup";
import { agentSchema, type AgentFormValues } from "@/lib/forms/schemas";
import { cities } from "@/lib/cities";

const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));

export function AgentSignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const mathA = 2;
  const mathB = 9;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: { website: "", mathA, mathB, startedAt: 1 },
  });

  const onSubmit = (values: AgentFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitAgentApplication(values);
      if (res.ok) setSubmitted(true);
      else setServerError(res.message);
    });
  };

  if (submitted) return <SuccessState audience="agent" />;

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
      <TextField
        label="Phone number"
        type="tel"
        required
        placeholder="+234"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <SelectField
        label="City / area"
        required
        placeholder="Pick your city"
        options={cityOptions}
        error={errors.city?.message}
        {...register("city")}
      />
      <TextAreaField
        label="Tell us about your network"
        required
        placeholder="Where do you have reach? Restaurants, riders, community groups… anyone you could onboard to BiteExpress."
        hint="At least 20 characters."
        error={errors.network?.message}
        className="sm:col-span-2"
        {...register("network")}
      />

      <AntiSpamFields
        register={register}
        setValue={setValue}
        mathA={mathA}
        mathB={mathB}
        error={errors.mathAnswer?.message}
      />

      <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-red focus:ring-brand-red"
          {...register("consent")}
        />
        <span>
          I agree BiteExpress can contact me about the agent programme, and
          I&apos;ve read the{" "}
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
          {pending ? "Sending…" : "Apply to be an agent"}
        </Button>
      </div>
    </form>
  );
}
