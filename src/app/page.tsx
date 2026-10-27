import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { SiteEffects } from "@/components/SiteEffects";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact, Footer } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Background />
      <SiteEffects />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <Research />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
