import { useState, type FormEvent } from "react";
import { submitQuoteRequest } from "../lib/api/quotes";
import type { BudgetRange, ProjectType, QuoteRequestInsert, Timeline } from "../types/quote";

interface FormValues {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  project_type: ProjectType | "";
  budget_range: BudgetRange | "";
  timeline: Timeline | "";
  project_details: string;
}

const EMPTY_VALUES: FormValues = {
  full_name: "",
  email: "",
  phone: "",
  company_name: "",
  project_type: "",
  budget_range: "",
  timeline: "",
  project_details: "",
};

const PROJECT_TYPES: ProjectType[] = ["Landing Page", "Full Website", "E-commerce", "Web App", "Other"];

const BUDGET_RANGES: BudgetRange[] = [
  "Starter — from $500",
  "Standard — from $1,000",
  "Full Build — from $2,000+",
];

const TIMELINES: Timeline[] = ["ASAP", "1–2 months", "2–3 months", "Flexible"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.full_name.trim()) errors.full_name = "Enter your name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email.";
  }
  if (!values.project_type) errors.project_type = "Select a project type.";
  if (!values.budget_range) errors.budget_range = "Select a budget range.";
  if (!values.timeline) errors.timeline = "Select a timeline.";
  if (!values.project_details.trim()) errors.project_details = "Tell us a bit about the project.";
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload: QuoteRequestInsert = {
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        company_name: values.company_name.trim() || null,
        project_type: values.project_type as ProjectType,
        budget_range: values.budget_range as BudgetRange,
        timeline: values.timeline as Timeline,
        project_details: values.project_details.trim(),
      };
      await submitQuoteRequest(payload);
      setSubmitted(true);
      setValues(EMPTY_VALUES);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-hairline-strong bg-fill-a px-4 py-3 text-sm text-fg placeholder:text-caption outline-none transition-colors focus:border-accent/60";
  const labelClass = "mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-caption";
  const errorClass = "mt-1.5 font-mono text-xs text-accent";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline-strong bg-fill-a p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.02em] text-fg">Request sent.</h3>
        <p className="mx-auto mt-2 max-w-[32em] text-sm leading-[1.6] text-muted">
          Thanks — a confirmation is on its way to your inbox. We'll follow up within a couple of business days
          with next steps.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-fg transition-colors hover:bg-fill-b"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-hairline-strong bg-fill-a p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            value={values.full_name}
            onChange={(e) => onChange("full_name", e.target.value)}
            placeholder="Jordan Smith"
            className={inputClass}
          />
          {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@email.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Phone <span className="normal-case text-caption/70">(optional)</span>
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(514) 555-0123"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Company / business <span className="normal-case text-caption/70">(optional)</span>
          </label>
          <input
            type="text"
            value={values.company_name}
            onChange={(e) => onChange("company_name", e.target.value)}
            placeholder="Your business name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Project type</label>
          <select
            value={values.project_type}
            onChange={(e) => onChange("project_type", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-fill-a">
                {t}
              </option>
            ))}
          </select>
          {errors.project_type && <p className={errorClass}>{errors.project_type}</p>}
        </div>

        <div>
          <label className={labelClass}>Budget range</label>
          <select
            value={values.budget_range}
            onChange={(e) => onChange("budget_range", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b} className="bg-fill-a">
                {b}
              </option>
            ))}
          </select>
          {errors.budget_range && <p className={errorClass}>{errors.budget_range}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Timeline</label>
          <select
            value={values.timeline}
            onChange={(e) => onChange("timeline", e.target.value)}
            className={`${inputClass} appearance-none sm:max-w-[calc(50%-10px)]`}
          >
            <option value="" disabled>
              Select one
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-fill-a">
                {t}
              </option>
            ))}
          </select>
          {errors.timeline && <p className={errorClass}>{errors.timeline}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Project details</label>
          <textarea
            value={values.project_details}
            onChange={(e) => onChange("project_details", e.target.value)}
            placeholder="What are you building, and what does success look like?"
            rows={5}
            className={`${inputClass} resize-none`}
          />
          {errors.project_details && <p className={errorClass}>{errors.project_details}</p>}
        </div>
      </div>

      {submitError && (
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-opacity duration-300 hover:opacity-85 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
