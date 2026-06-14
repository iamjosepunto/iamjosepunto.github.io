import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Lab from "./components/Lab";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Location from "./components/Location";
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

        <Experience />

        <Lab />

        <Skills />

        <About />

        <Contact />

        <Location />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;
