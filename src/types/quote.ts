export type ProjectType = "Landing Page" | "Full Website" | "E-commerce" | "Web App" | "Other";

export type BudgetRange = "Starter — from $500" | "Standard — from $1,000" | "Full Build — from $2,000+";

export type Timeline = "ASAP" | "1–2 months" | "2–3 months" | "Flexible";

export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";

export type QuoteRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_type: ProjectType;
  budget_range: BudgetRange;
  timeline: Timeline;
  project_details: string;
  status: QuoteStatus;
  created_at: string;
};

export type QuoteRequestInsert = {
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_type: ProjectType;
  budget_range: BudgetRange;
  timeline: Timeline;
  project_details: string;
};

export const PROJECT_TYPES: ProjectType[] = ["Landing Page", "Full Website", "E-commerce", "Web App", "Other"];

export const BUDGET_RANGES: BudgetRange[] = [
  "Starter — from $500",
  "Standard — from $1,000",
  "Full Build — from $2,000+",
];

export const TIMELINES: Timeline[] = ["ASAP", "1–2 months", "2–3 months", "Flexible"];
