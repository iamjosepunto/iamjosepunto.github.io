import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Languages from "./components/Languages";
import Skills from "./components/Skills";
import Lab from "./components/Lab";
import Location from "./components/Location";
import Downloads from "./components/Downloads";
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

        <About />

        <Experience />

        <Projects />

        <Education />

        <Languages />

        <Skills />

        <Lab />

        <Downloads />

        <Location />

        <Contact />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;
