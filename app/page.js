import IntroScreen    from './components/IntroScreen';
import ScrollProgress from './components/ScrollProgress';
import BackToTop      from './components/BackToTop';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import TechStack     from './components/TechStack';
import Experience    from './components/Experience';
import CaseStudies   from './components/CaseStudies';
import Architecture  from './components/Architecture';
import Values        from './components/Values';
import Contact       from './components/Contact';
import Footer        from './components/Footer';

export default function Home() {
  return (
    <main className="bg-bg overflow-x-hidden">
      <IntroScreen />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <CaseStudies />
      <Architecture />
      <Values />
      <Contact />
      <Footer />
    </main>
  );
}
