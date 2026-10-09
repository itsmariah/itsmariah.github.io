import { useEffect } from 'react';
import { About } from './components/About';
import { Backdrop } from './components/Backdrop';
import { BackToTop } from './components/BackToTop';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectFilterProvider } from './components/projects/ProjectFilter';
import { Projects } from './components/projects/Projects';
import { Resume } from './components/Resume';
import { Skills } from './components/Skills';
import { useI18n } from './i18n/I18nProvider';

export function App() {
  const { t } = useI18n();

  // O conteúdo é montado depois do carregamento, então o navegador não acha a âncora
  // de links como /#projetos sozinho — rolamos até ela manualmente.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <ProjectFilterProvider>
      <a href="#conteudo" className="skip-link">{t.a11y.skipToContent}</a>
      <Backdrop />
      <Navbar />
      <Hero />
      <main id="conteudo" tabIndex={-1}>
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ProjectFilterProvider>
  );
}
