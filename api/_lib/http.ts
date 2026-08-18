import type { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  const raw = Buffer.concat(chunks).toString("utf-8");
  if (!raw) return {} as T;
  return JSON.parse(raw) as T;
}

export function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function methodNotAllowed(res: ServerResponse): void {
  sendJson(res, 405, { error: "Method not allowed" });
}

export function handleError(res: ServerResponse, err: unknown): void {
  console.error(err);
  sendJson(res, 500, { error: err instanceof Error ? err.message : "Unexpected error" });
}
