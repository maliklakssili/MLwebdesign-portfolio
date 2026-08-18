import { Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { signOutAdmin } from "../../lib/api/adminAuth";

export default function AdminLayout() {
  const { refresh } = useAdminAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOutAdmin();
    await refresh();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-bg/95 px-5 py-4 backdrop-blur-sm sm:px-9">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm font-medium tracking-[-0.01em] text-fg">MLwebdesign</span>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-caption">Admin</span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full border border-hairline-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fill-a"
        >
          Sign out
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-9 sm:py-14">
        <Outlet />
      </main>
    </div>
  );
}
