import type { IncomingMessage, ServerResponse } from "node:http";
import { insertQuote, PROJECT_TYPES, BUDGET_RANGES, TIMELINES, type QuoteInsert } from "./_lib/quotes-store.js";
import { sendQuoteNotifications } from "./_lib/email.js";
import { readJsonBody, sendJson, methodNotAllowed, handleError } from "./_lib/http.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<QuoteInsert>): string | null {
  if (!body.full_name?.trim()) return "Full name is required.";
  if (!body.email?.trim() || !EMAIL_PATTERN.test(body.email.trim())) return "A valid email is required.";
  if (!body.project_type || !PROJECT_TYPES.includes(body.project_type)) return "A valid project type is required.";
  if (!body.budget_range || !BUDGET_RANGES.includes(body.budget_range)) return "A valid budget range is required.";
  if (!body.timeline || !TIMELINES.includes(body.timeline)) return "A valid timeline is required.";
  if (!body.project_details?.trim()) return "Project details are required.";
  return null;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  try {
    const body = await readJsonBody<Partial<QuoteInsert>>(req);
    const error = validate(body);
    if (error) {
      sendJson(res, 400, { error });
      return;
    }

    const quote = await insertQuote({
      full_name: body.full_name!.trim(),
      email: body.email!.trim(),
      phone: body.phone?.trim() || null,
      company_name: body.company_name?.trim() || null,
      project_type: body.project_type!,
      budget_range: body.budget_range!,
      timeline: body.timeline!,
      project_details: body.project_details!.trim(),
    });

    try {
      await sendQuoteNotifications(quote);
    } catch (err) {
      // Don't fail the request over email — the request is already saved.
      console.error("Failed to send quote notification emails:", err);
    }

    sendJson(res, 201, { ok: true });
  } catch (err) {
    handleError(res, err);
  }
}
