import type { IncomingMessage, ServerResponse } from "node:http";
import { isAuthorized } from "../../_lib/admin-auth.js";
import { updateQuoteStatus, STATUSES, type QuoteStatus } from "../../_lib/quotes-store.js";
import { readJsonBody, sendJson, methodNotAllowed, handleError } from "../../_lib/http.js";

export default async function handler(req: IncomingMessage & { query?: Record<string, string> }, res: ServerResponse) {
  if (!isAuthorized(req.headers.cookie)) {
    sendJson(res, 401, { error: "Not authorized" });
    return;
  }
  if (req.method !== "PATCH") return methodNotAllowed(res);
  try {
    const id = req.query?.id ?? new URL(req.url ?? "", "http://localhost").pathname.split("/").pop();
    if (!id) {
      sendJson(res, 400, { error: "Missing id" });
      return;
    }
    const { status } = await readJsonBody<{ status?: QuoteStatus }>(req);
    if (!status || !STATUSES.includes(status)) {
      sendJson(res, 400, { error: "Invalid status" });
      return;
    }
    const updated = await updateQuoteStatus(id, status);
    if (!updated) {
      sendJson(res, 404, { error: "Quote not found" });
      return;
    }
    sendJson(res, 200, updated);
  } catch (err) {
    handleError(res, err);
  }
}
