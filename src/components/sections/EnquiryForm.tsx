"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * ENQUIRY FORM — WhatsApp hand-off.
 *
 * There is no backend behind this site, so this form does not pretend to
 * submit anywhere. It assembles what you type into a WhatsApp message and
 * opens the chat with Vignesh, with everything pre-filled. Nothing is stored,
 * sent or transmitted anywhere else, and the visitor is told so before they
 * press the button.
 *
 * If a backend is added later, `buildMessage()` is the only piece that needs
 * to change — swap the window.open for a POST.
 */

const GOALS = [
  "Fat Loss",
  "Muscle Gain",
  "Strength",
  "Body Recomposition",
  "General Fitness",
  "Athletic Performance",
  "Recovery / Sports Massage",
];

const COACHING = [
  "Personal Training",
  "Online Coaching",
  "Nutrition",
  "Body Recomposition",
  "Sports Massage / Recovery",
  "Offline Coaching",
];

const EXPERIENCE = [
  "Complete beginner",
  "Restarting after a break",
  "Training under 1 year",
  "Training 1–3 years",
  "Training 3+ years",
];

interface FormState {
  name: string;
  phone: string;
  whatsapp: string;
  age: string;
  goal: string;
  coaching: string;
  experience: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  whatsapp: "",
  age: "",
  goal: "",
  coaching: "",
  experience: "",
  message: "",
};

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const message = useMemo(() => buildMessage(form), [form]);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.whatsapp.trim()) {
      next.whatsapp = "A WhatsApp number is needed to continue the conversation.";
    } else if (form.whatsapp.replace(/\D/g, "").length < 8) {
      next.whatsapp = "That number looks incomplete.";
    }
    if (!form.coaching) next.coaching = "Pick the coaching you are interested in.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector<HTMLElement>("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError?.focus?.();
      return;
    }

    const url = whatsappLink(message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    // Popup blockers are common on mobile — always leave a working link behind.
    if (!opened) setFallbackUrl(url);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={form.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
          placeholder="Your full name"
        />
        <Field
          id="age"
          label="Age"
          value={form.age}
          onChange={(v) => set("age", v)}
          inputMode="numeric"
          placeholder="Optional"
        />
        <Field
          id="whatsapp"
          label="WhatsApp number"
          required
          value={form.whatsapp}
          onChange={(v) => set("whatsapp", v)}
          error={errors.whatsapp}
          type="tel"
          autoComplete="tel"
          placeholder="+91 00000 00000"
        />
        <Field
          id="phone"
          label="Phone (if different)"
          value={form.phone}
          onChange={(v) => set("phone", v)}
          type="tel"
          placeholder="Optional"
        />
      </div>

      <Select
        id="goal"
        label="Training goal"
        value={form.goal}
        onChange={(v) => set("goal", v)}
        options={GOALS}
        placeholder="Select your main goal"
      />

      {/* Preferred coaching — chips rather than a dropdown, since this is the
          single most useful answer for Vignesh to see first. */}
      <fieldset data-error={errors.coaching ? "true" : undefined}>
        <legend className="label text-bone/50">
          Preferred coaching <span className="text-accent-text">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {COACHING.map((option) => {
            const active = form.coaching === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => set("coaching", option)}
                aria-pressed={active}
                className={cn(
                  "rounded-sm border px-4 py-3 text-left font-display text-[0.75rem] font-bold uppercase tracking-[0.06em] transition-colors duration-300",
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-ink-line bg-ink text-bone/65 hover:border-bone/40 hover:text-bone",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {errors.coaching && <ErrorText>{errors.coaching}</ErrorText>}
      </fieldset>

      <Select
        id="experience"
        label="Current training experience"
        value={form.experience}
        onChange={(v) => set("experience", v)}
        options={EXPERIENCE}
        placeholder="Where are you starting from?"
      />

      <div>
        <label htmlFor="message" className="label text-bone/50">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Anything Vignesh should know — injuries, schedule, what you have tried before."
          className="mt-3 w-full resize-y rounded-sm border border-ink-line bg-ink px-4 py-3.5 text-body-sm text-bone placeholder:text-bone/55 transition-colors focus:border-accent focus:outline-none"
        />
      </div>

      {/* Plain-language explanation of exactly what the button does. */}
      <div className="rounded-sm border border-ink-line bg-ink-elevated p-4 sm:p-5">
        <p className="label text-bone/55">Before you send</p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-bone/65">
          Submitting this enquiry will open WhatsApp with your details so you
          can continue the conversation with {site.brand}. Nothing is stored on
          this website and nothing is sent until you press send inside WhatsApp.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="w-full sm:w-auto" whatsapp arrow={false}>
          Open WhatsApp With My Details
        </Button>
        <p className="index text-[0.75rem] text-bone/55">
          Or call {site.phoneDisplay}
        </p>
      </div>

      {fallbackUrl && (
        <p
          role="status"
          className="rounded-sm border border-accent/40 bg-ink-elevated p-4 text-[0.875rem] leading-relaxed text-bone/75"
        >
          Your browser blocked the new tab.{" "}
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-semibold text-accent-text"
          >
            Tap here to open WhatsApp
          </a>{" "}
          with your details.
        </p>
      )}
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function buildMessage(form: FormState): string {
  const lines = [
    `Hi ${site.trainerShort}, I would like to enquire about coaching with ${site.brand}.`,
    "",
    `Name: ${form.name.trim()}`,
  ];

  if (form.age.trim()) lines.push(`Age: ${form.age.trim()}`);
  lines.push(`WhatsApp: ${form.whatsapp.trim()}`);
  if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`);
  if (form.goal) lines.push(`Goal: ${form.goal}`);
  if (form.coaching) lines.push(`Preferred coaching: ${form.coaching}`);
  if (form.experience) lines.push(`Experience: ${form.experience}`);

  if (form.message.trim()) {
    lines.push("", `Message: ${form.message.trim()}`);
  }

  return lines.join("\n");
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[0.8125rem] text-accent-text">{children}</p>;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "text";
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-bone/50">
        {label} {required && <span className="text-accent-text">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-error={error ? "true" : undefined}
        className={cn(
          "mt-3 h-[3.25rem] w-full rounded-sm border bg-ink px-4 py-3.5 text-body-sm text-bone placeholder:text-bone/55 transition-colors focus:outline-none",
          error ? "border-accent" : "border-ink-line focus:border-accent",
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8125rem] text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-bone/50">
        {label}
      </label>
      <div className="relative mt-3">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-sm border border-ink-line bg-ink px-4 py-3.5 pr-11 text-body-sm text-bone transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone/55"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  );
}
