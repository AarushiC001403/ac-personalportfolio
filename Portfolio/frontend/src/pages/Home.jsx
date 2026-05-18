import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default Home;
