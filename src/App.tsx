import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Lab from "./components/Lab";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />

      <main>
        <Hero />

        <Projects />

        <Lab />

        <Skills />

        <About />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;