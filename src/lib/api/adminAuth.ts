export async function signInAdmin(email: string, password: string): Promise<void> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Unable to sign in.");
  }
}

export async function signOutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
}

export async function checkSession(): Promise<boolean> {
  const res = await fetch("/api/admin/session", { credentials: "include" });
  if (!res.ok) return false;
  const body = await res.json().catch(() => null);
  return Boolean(body?.authenticated);
}
