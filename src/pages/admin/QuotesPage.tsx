import { useEffect, useMemo, useState } from "react";
import { fetchAllQuotes, updateQuoteStatus } from "../../lib/api/quotes";
import type { ProjectType, QuoteRequest, QuoteStatus } from "../../types/quote";

const STATUS_FILTERS: { key: QuoteStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "quoted", label: "Quoted" },
  { key: "closed", label: "Closed" },
];

const STATUS_OPTIONS: QuoteStatus[] = ["new", "contacted", "quoted", "closed"];

const PROJECT_TYPE_OPTIONS: (ProjectType | "all")[] = [
  "all",
  "Landing Page",
  "Full Website",
  "E-commerce",
  "Web App",
  "Other",
];

function StatusBadge({ status }: { status: QuoteStatus }) {
  const styles: Record<QuoteStatus, string> = {
    new: "border-accent/40 text-accent",
    contacted: "border-hairline-strong text-fg",
    quoted: "border-hairline-strong text-fg",
    closed: "border-hairline text-caption",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "all">("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchAllQuotes();
      setQuotes(data);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load quote requests.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return quotes.filter((q) => {
      if (statusFilter !== "all" && q.status !== statusFilter) return false;
      if (typeFilter !== "all" && q.project_type !== typeFilter) return false;
      if (!term) return true;
      return (
        q.full_name.toLowerCase().includes(term) ||
        q.email.toLowerCase().includes(term) ||
        (q.company_name ?? "").toLowerCase().includes(term)
      );
    });
  }, [quotes, statusFilter, typeFilter, search]);

  async function handleStatusChange(id: string, status: QuoteStatus) {
    setUpdatingId(id);
    try {
      const updated = await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="m-0 font-display text-3xl font-bold tracking-[-0.03em] text-fg">Quote requests</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-caption">
          {quotes.length} total · {quotes.filter((q) => q.status === "new").length} new
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 ${
                statusFilter === f.key
                  ? "bg-fg text-bg"
                  : "border border-hairline-strong text-caption hover:text-fg"
              }`}
            >
              {f.label}
              {f.key !== "all" && (
                <span className="ml-1.5 opacity-60">{quotes.filter((q) => q.status === f.key).length}</span>
              )}
            </button>
          ))}
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ProjectType | "all")}
          className="rounded-full border border-hairline-strong bg-fill-a px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-fg outline-none focus:border-accent/60"
        >
          {PROJECT_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t} className="bg-fill-a">
              {t === "all" ? "All project types" : t}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, company…"
          className="min-w-[220px] flex-1 rounded-full border border-hairline-strong bg-fill-a px-4 py-2 text-sm text-fg placeholder:text-caption outline-none focus:border-accent/60"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-hairline">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-fill-a" />
            ))}
          </div>
        ) : loadError ? (
          <div className="p-6 text-sm text-accent">{loadError}</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="m-0 font-mono text-xs uppercase tracking-[0.1em] text-caption">
              No requests match these filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-hairline">
            {filtered.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <div key={q.id} className="px-5 py-5 sm:px-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="flex min-w-0 flex-1 items-center gap-4 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fill-a font-display text-sm font-medium text-fg">
                        {q.full_name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-fg">{q.full_name}</div>
                        <div className="mt-0.5 truncate font-mono text-xs text-caption">
                          {q.project_type} · {q.timeline} ·{" "}
                          {new Date(q.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </button>

                    <StatusBadge status={q.status} />

                    <select
                      value={q.status}
                      disabled={updatingId === q.id}
                      onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                      className="rounded-lg border border-hairline-strong bg-fill-a px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] text-fg outline-none transition-colors focus:border-accent/60 disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-fill-a">
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-fill-a p-4 text-sm sm:grid-cols-2">
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-caption">Email</div>
                        <div className="mt-1 text-body">
                          <a href={`mailto:${q.email}`} className="hover:text-fg">
                            {q.email}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-caption">Phone</div>
                        <div className="mt-1 text-body">{q.phone || "Not provided"}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-caption">
                          Company / business
                        </div>
                        <div className="mt-1 text-body">{q.company_name || "Not provided"}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-caption">
                          Budget range
                        </div>
                        <div className="mt-1 text-body">{q.budget_range}</div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-caption">
                          Project details
                        </div>
                        <div className="mt-1 whitespace-pre-wrap text-body">{q.project_details}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
