import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Languages from "./components/Languages";
import Lab from "./components/Lab";
import Skills from "./components/Skills";
import About from "./components/About";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />

      <main>
        <Hero />

        <Experience />

        <Projects />

        <Languages />

        <Lab />

        <Skills />

        <About />

        <Location />

        <Contact />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;
