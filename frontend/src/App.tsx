// frontend/src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
const Contact = lazy(() => import("./components/Contact"));
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useTheme } from "./hooks/useTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { theme, toggleTheme } = useTheme();
  const { ref: contactRef, inView: shouldLoadContact } = useInView({
    triggerOnce: true,
    rootMargin: "800px 0px",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <ScrollToTop />
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Testimonials />
              <Blog />
              <div id="contact" ref={contactRef}>
                {shouldLoadContact && (
                  <Suspense fallback={null}>
                    <Contact />
                  </Suspense>
                )}
              </div>
            </main>

            <Footer />
            <ToastContainer
              position="bottom-right"
              theme={theme === "dark" ? "dark" : "light"}
            />
          </div>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
