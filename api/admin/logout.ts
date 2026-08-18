import type { IncomingMessage, ServerResponse } from "node:http";
import { clearSessionCookie } from "../_lib/admin-auth.js";
import { sendJson, methodNotAllowed } from "../_lib/http.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  res.setHeader("Set-Cookie", clearSessionCookie());
  sendJson(res, 200, { ok: true });
}
