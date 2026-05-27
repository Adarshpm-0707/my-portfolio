import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PageTransition from './components/ui/PageTransition';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-primary text-white selection:bg-accent-blue/30 overflow-x-hidden">
          <Navbar />
          <main className="relative z-10">
            <PageTransition>
              <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
