-- ============================================================
-- MLwebdesign — quote request schema (Neon / Vercel Postgres)
-- Run this in the Neon SQL editor (or Vercel dashboard > Storage
-- > your database > Query).
-- Safe to re-run: uses IF NOT EXISTS.
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  project_type text not null check (
    project_type in ('Landing Page', 'Full Website', 'E-commerce', 'Web App', 'Other')
  ),
  budget_range text not null check (
    budget_range in ('Starter — from $500', 'Standard — from $1,000', 'Full Build — from $2,000+')
  ),
  timeline text not null check (timeline in ('ASAP', '1–2 months', '2–3 months', 'Flexible')),
  project_details text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists idx_quote_requests_created_at on quote_requests (created_at desc);
create index if not exists idx_quote_requests_status on quote_requests (status);

-- No row-level security here: this database is only ever reached from
-- server-side Vercel functions (api/*), never directly from the browser,
-- so access control lives in the API routes (admin cookie check), not RLS.
