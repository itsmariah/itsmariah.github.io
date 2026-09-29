import { useEffect } from 'react';
import { About } from './components/About';
import { Background } from './components/Background';
import { BackToTop } from './components/BackToTop';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/projects/Projects';
import { Resume } from './components/Resume';
import { Skills } from './components/Skills';

export function App() {
  // O conteúdo é montado depois do carregamento, então o navegador não acha a âncora
  // de links como /#projetos sozinho — rolamos até ela manualmente.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
