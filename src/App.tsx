import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Portfolio } from "./pages/Portfolio";
import { ProjectPage } from "./pages/ProjectPage";
import { useSEO } from "./hooks/useSEO";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import QuotesPage from "./pages/admin/QuotesPage";

function AboutPage() {
  useSEO({
    title: "About — MLwebdesign",
    description:
      "A web design studio building sites for studios, founders and small teams. Ten years building for the web.",
    path: "/about",
  });
  return (
    <>
      <About />
      <Process />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicLayout() {
  return (
    <div className="relative min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<QuotesPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
