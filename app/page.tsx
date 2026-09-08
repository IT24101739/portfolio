import { LoadingScreen } from "@/components/loading-screen";
import { NeuralBackground } from "@/components/neural-background";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { AIFocus } from "@/components/ai-focus";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

export default function Home() {
  return (
    <main className="relative selection:bg-[var(--color-accent-dim)] selection:text-[var(--color-accent)]">
      <LoadingScreen />
      <NeuralBackground />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <AIFocus />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
