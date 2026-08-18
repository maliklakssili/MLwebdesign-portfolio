import type { IncomingMessage, ServerResponse } from "node:http";
import { createSessionCookie, verifyCredentials } from "../_lib/admin-auth.js";
import { readJsonBody, sendJson, methodNotAllowed, handleError } from "../_lib/http.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  try {
    const { email, password } = await readJsonBody<{ email?: string; password?: string }>(req);
    if (!email || !password || !verifyCredentials(email, password)) {
      sendJson(res, 401, { error: "Incorrect email or password." });
      return;
    }
    res.setHeader("Set-Cookie", createSessionCookie());
    sendJson(res, 200, { ok: true });
  } catch (err) {
    handleError(res, err);
  }
}
