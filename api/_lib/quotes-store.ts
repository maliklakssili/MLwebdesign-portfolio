import { sql } from "./db.js";

export type ProjectType = "Landing Page" | "Full Website" | "E-commerce" | "Web App" | "Other";
export type BudgetRange = "Starter — from $500" | "Standard — from $1,000" | "Full Build — from $2,000+";
export type Timeline = "ASAP" | "1–2 months" | "2–3 months" | "Flexible";
export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";

export interface QuoteRecord {
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
}

export const PROJECT_TYPES: ProjectType[] = ["Landing Page", "Full Website", "E-commerce", "Web App", "Other"];
export const BUDGET_RANGES: BudgetRange[] = [
  "Starter — from $500",
  "Standard — from $1,000",
  "Full Build — from $2,000+",
];
export const TIMELINES: Timeline[] = ["ASAP", "1–2 months", "2–3 months", "Flexible"];
export const STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "closed"];

export interface QuoteInsert {
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_type: ProjectType;
  budget_range: BudgetRange;
  timeline: Timeline;
  project_details: string;
}

export async function insertQuote(values: QuoteInsert): Promise<QuoteRecord> {
  const rows = await sql`
    insert into quote_requests
      (full_name, email, phone, company_name, project_type, budget_range, timeline, project_details)
    values
      (${values.full_name}, ${values.email}, ${values.phone}, ${values.company_name},
       ${values.project_type}, ${values.budget_range}, ${values.timeline}, ${values.project_details})
    returning *
  `;
  return rows[0] as QuoteRecord;
}

export async function listQuotes(): Promise<QuoteRecord[]> {
  const rows = await sql`select * from quote_requests order by created_at desc`;
  return rows as QuoteRecord[];
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<QuoteRecord | null> {
  const rows = await sql`
    update quote_requests set status = ${status} where id = ${id} returning *
  `;
  return (rows[0] as QuoteRecord) ?? null;
}
