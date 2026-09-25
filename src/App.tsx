import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { BuildingPhases } from "@/components/phases/BuildingPhases";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { OpenSource } from "@/components/opensource/OpenSource";
import { Now } from "@/components/now/Now";
import { Writing } from "@/components/writing/Writing";
import { Hackathons } from "@/components/hackathons/Hackathons";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { GitHubSection } from "@/components/github/GitHubSection";
import { Contact } from "@/components/contact/Contact";
import { useReveal } from "@/lib/useReveal";
import { initTheme } from "@/lib/theme";
import { useEffect } from "react";

export default function App() {
  useReveal();
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <BuildingPhases />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <OpenSource />
        <Now />
        <Writing />
        <Hackathons />
        <Testimonials />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
