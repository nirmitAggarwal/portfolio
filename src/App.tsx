import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
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
import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { BlogPostPage } from "@/components/blog/BlogPostPage";
import { useReveal } from "@/lib/useReveal";
import { initTheme } from "@/lib/theme";
import { useRoute } from "@/lib/router";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useEffect, useState } from "react";

export default function App() {
  const route = useRoute();
  useDocumentTitle(route);

  // Boot splash — shown once per browser session, then skipped.
  const [splash, setSplash] = useState<"loading" | "fading" | "gone">(() => {
    try {
      return sessionStorage.getItem("booted") === "1" ? "gone" : "loading";
    } catch {
      return "loading";
    }
  });

  useEffect(() => {
    if (splash !== "loading") return;
    const show = window.setTimeout(() => {
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      setSplash("fading");
    }, 1000);
    const hide = window.setTimeout(() => setSplash("gone"), 1500); // 1000ms + 500ms fade
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [splash]);
  const isBlog = route.name !== "home";

  useReveal();
  useEffect(() => {
    initTheme();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name, route.name === "blogPost" ? route.slug : ""]);

  return (
    <>
      {splash !== "gone" && <LoadingScreen done={splash !== "loading"} />}

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      {route.name === "home" && (
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
      )}

      {route.name === "blogIndex" && (
        <main>
          <BlogIndexPage />
        </main>
      )}

      {route.name === "blogPost" && (
        <main>
          <BlogPostPage slug={route.slug} />
        </main>
      )}

      {!isBlog && <Footer />}
    </>
  );
}
