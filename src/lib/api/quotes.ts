import type { QuoteRequest, QuoteRequestInsert, QuoteStatus } from "../../types/quote";

async function parseJsonOrThrow(res: Response): Promise<unknown> {
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const message = body && typeof body === "object" && "error" in body ? String((body as { error: unknown }).error) : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

export async function submitQuoteRequest(values: QuoteRequestInsert): Promise<void> {
  const res = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  await parseJsonOrThrow(res);
}

export async function fetchAllQuotes(): Promise<QuoteRequest[]> {
  const res = await fetch("/api/admin/quotes", { credentials: "include" });
  return (await parseJsonOrThrow(res)) as QuoteRequest[];
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<QuoteRequest> {
  const res = await fetch(`/api/admin/quotes/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return (await parseJsonOrThrow(res)) as QuoteRequest;
}
