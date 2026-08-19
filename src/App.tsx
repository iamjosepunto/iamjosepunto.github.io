import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Availability from "./components/Availability";
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
    <div
      className="min-h-screen text-slate-100 overflow-x-hidden"
      style={{ backgroundColor: "#111d33" }}
    >
      <Nav />

      <main className="pt-16">
        <Hero />

        <About />

        <Availability />

        <Experience />

        <Projects />

        <Education />

        <Languages />

        <Skills />

        <Lab />

        <Downloads />

        <Location />

        <Contact />
        <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-yellow-400" />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;
