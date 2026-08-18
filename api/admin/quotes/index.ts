import type { IncomingMessage, ServerResponse } from "node:http";
import { isAuthorized } from "../../_lib/admin-auth.js";
import { listQuotes } from "../../_lib/quotes-store.js";
import { sendJson, methodNotAllowed, handleError } from "../../_lib/http.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!isAuthorized(req.headers.cookie)) {
    sendJson(res, 401, { error: "Not authorized" });
    return;
  }
  if (req.method !== "GET") return methodNotAllowed(res);
  try {
    sendJson(res, 200, await listQuotes());
  } catch (err) {
    handleError(res, err);
  }
}
