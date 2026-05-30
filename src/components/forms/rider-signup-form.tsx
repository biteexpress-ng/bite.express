"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { TextField, SelectField } from "./field";
import { SuccessState } from "./vendor-signup-form";
import { Button } from "@/components/ui/button";
import { submitRiderApplication } from "@/app/actions/partner-signup";
import {
  riderSchema,
  vehicleTypes,
  availabilityOptions,
  type RiderFormValues,
} from "@/lib/forms/schemas";
import { cities } from "@/lib/cities";

const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));

export function RiderSignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiderFormValues>({
    resolver: zodResolver(riderSchema),
  });

  const onSubmit = (values: RiderFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitRiderApplication(values);
      if (res.ok) setSubmitted(true);
      else setServerError(res.message);
    });
  };

  if (submitted) return <SuccessState audience="rider" />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
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
        label="City"
        required
        placeholder="Pick your city"
        options={cityOptions}
        error={errors.city?.message}
        {...register("city")}
      />
      <SelectField
        label="What do you ride?"
        required
        placeholder="Pick one"
        options={vehicleTypes.map((v) => ({ value: v.value, label: v.label }))}
        error={errors.vehicleType?.message}
        {...register("vehicleType")}
      />
      <SelectField
        label="When can you ride?"
        required
        placeholder="Pick your availability"
        options={availabilityOptions.map((a) => ({ value: a.value, label: a.label }))}
        error={errors.availability?.message}
        {...register("availability")}
      />

      <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-red focus:ring-brand-red"
          {...register("hasSmartphone")}
        />
        <span>
          I have a working smartphone to run the BiteExpress Rider app.
        </span>
      </label>
      {errors.hasSmartphone && (
        <p className="-mt-3 text-xs text-error sm:col-span-2">
          {errors.hasSmartphone.message}
        </p>
      )}

      <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-red focus:ring-brand-red"
          {...register("consent")}
        />
        <span>
          I agree BiteExpress can contact me about riding, and I&apos;ve read the{" "}
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
          {pending ? "Sending…" : "Apply to ride"}
        </Button>
      </div>
    </form>
  );
}
