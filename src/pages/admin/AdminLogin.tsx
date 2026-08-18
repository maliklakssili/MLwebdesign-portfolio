import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInAdmin } from "../../lib/api/adminAuth";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { authenticated, loading, refresh } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && authenticated) {
    return <Navigate to="/admin/quotes" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signInAdmin(email, password);
      await refresh();
      navigate("/admin/quotes", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-display text-lg font-medium tracking-[-0.01em] text-fg">MLwebdesign</span>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-fg">Admin</h1>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.1em] text-caption">Sign in to view quote requests</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-hairline-strong bg-fill-a p-7 sm:p-8">
          <div className="mb-5">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-caption">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@mlwebdesign.ca"
              className="w-full rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-sm text-fg placeholder:text-caption outline-none transition-colors focus:border-accent/60"
            />
          </div>
          <div className="mb-6">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-caption">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-sm text-fg placeholder:text-caption outline-none transition-colors focus:border-accent/60"
            />
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-opacity duration-300 hover:opacity-85 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.1em] text-caption">
          <a href="/" className="transition-colors hover:text-fg-hover">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
