import type { QuoteRecord } from "./quotes-store.js";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_DASHBOARD_URL = process.env.ADMIN_DASHBOARD_URL ?? "https://www.mlwebdesign.ca/admin/quotes";

async function sendEmail(payload: { to: string; subject: string; html: string }): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend request failed (${res.status}): ${body}`);
  }
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function adminEmailHtml(q: QuoteRecord): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#7c7f88;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#111;font-size:14px;">${escapeHtml(value)}</td></tr>`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="margin:0 0 16px;">New quote request</h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Name", q.full_name)}
        ${row("Email", q.email)}
        ${row("Phone", q.phone ?? "Not provided")}
        ${row("Company", q.company_name ?? "Not provided")}
        ${row("Project type", q.project_type)}
        ${row("Budget", q.budget_range)}
        ${row("Timeline", q.timeline)}
      </table>
      <p style="margin:16px 0 4px;color:#7c7f88;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Project details</p>
      <p style="margin:0 0 20px;color:#111;font-size:14px;white-space:pre-wrap;">${escapeHtml(q.project_details)}</p>
      <a href="${ADMIN_DASHBOARD_URL}" style="display:inline-block;background:#111;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-size:13px;">View in dashboard</a>
    </div>
  `;
}

function clientEmailHtml(q: QuoteRecord): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="margin:0 0 12px;">Thanks, ${escapeHtml(q.full_name.split(" ")[0])}.</h2>
      <p style="margin:0 0 12px;color:#333;font-size:14px;line-height:1.6;">
        Your quote request has been received. We'll review the details and follow up within a couple of
        business days with next steps.
      </p>
      <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">
        — MLwebdesign
      </p>
    </div>
  `;
}

export async function sendQuoteNotifications(q: QuoteRecord): Promise<void> {
  if (!RESEND_API_KEY || !ADMIN_EMAIL || !FROM_EMAIL) {
    console.error("Missing RESEND_API_KEY, ADMIN_EMAIL, or FROM_EMAIL — skipping notification emails.");
    return;
  }
  await Promise.all([
    sendEmail({ to: ADMIN_EMAIL, subject: `New quote request — ${q.full_name}`, html: adminEmailHtml(q) }),
    sendEmail({ to: q.email, subject: "We received your quote request — MLwebdesign", html: clientEmailHtml(q) }),
  ]);
}
