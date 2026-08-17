import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Portfolio } from "./pages/Portfolio";
import { useSEO } from "./hooks/useSEO";

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

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
