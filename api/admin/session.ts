import type { IncomingMessage, ServerResponse } from "node:http";
import { isAuthorized } from "../_lib/admin-auth.js";
import { sendJson, methodNotAllowed } from "../_lib/http.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET") return methodNotAllowed(res);
  sendJson(res, 200, { authenticated: isAuthorized(req.headers.cookie) });
}
