import { BackgroundVideo } from "./components/BackgroundVideo";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Pricing } from "./components/Pricing";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";

function App() {
  return (
    <div className="relative text-fg overflow-x-hidden">
      <BackgroundVideo />
      <Header />
      <main>
        <Hero />
        <Work />
        <Pricing />
        <About />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

export default App;
