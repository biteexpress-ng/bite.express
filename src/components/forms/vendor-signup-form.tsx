"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "./field";
import { AntiSpamFields } from "./anti-spam-fields";
import { Button } from "@/components/ui/button";
import { submitVendorApplication } from "@/app/actions/partner-signup";
import { vendorSchema, vendorTypes, type VendorFormValues } from "@/lib/forms/schemas";
import { cities } from "@/lib/cities";

const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));

export function VendorSignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const mathA = 3;
  const mathB = 8;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      numberOfLocations: "1",
      website: "",
      mathA,
      mathB,
      startedAt: 1,
    },
  });

  const onSubmit = (values: VendorFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitVendorApplication(values);
      if (res.ok) setSubmitted(true);
      else setServerError(res.message);
    });
  };

  if (submitted) return <SuccessState audience="vendor" />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <TextField
        label="Business name"
        required
        placeholder="e.g. Sahel Grills"
        error={errors.businessName?.message}
        {...register("businessName")}
      />
      <TextField
        label="Your name"
        required
        placeholder="Full name"
        error={errors.contactName?.message}
        {...register("contactName")}
      />
      <TextField
        label="Business email"
        type="email"
        required
        placeholder="you@business.com"
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
        label="What kind of business?"
        required
        placeholder="Pick one"
        options={vendorTypes.map((t) => ({ value: t.value, label: t.label }))}
        error={errors.vendorType?.message}
        {...register("vendorType")}
      />
      <TextField
        label="Number of locations"
        type="number"
        min={1}
        max={999}
        required
        hint="Locations under one brand, start at 1."
        error={errors.numberOfLocations?.message}
        {...register("numberOfLocations")}
      />
      <div />
      <TextAreaField
        label="Anything else we should know?"
        placeholder="Cuisine, daily volume, special equipment…"
        hint="Optional"
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

      <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-red focus:ring-brand-red"
          {...register("consent")}
        />
        <span>
          I agree BiteExpress can contact me about partnering, and I&apos;ve read the{" "}
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

function SuccessState({ audience }: { audience: "vendor" | "rider" | "agent" }) {
  const messages = {
    vendor:
      "We'll be in touch within 2 business days with next steps for onboarding your business.",
    rider:
      "We'll be in touch within 2 business days with rider verification next steps.",
    agent:
      "We'll review your application and reach out within 5 business days.",
  };
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 size={28} />
      </span>
      <h3 className="font-serif text-2xl text-ink-900">Thanks, we got it.</h3>
      <p className="max-w-md text-base text-ink-600">{messages[audience]}</p>
    </div>
  );
}

export { SuccessState };
