import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/fx/Preloader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Motion } from "@/components/fx/Motion";
import { Band } from "@/components/fx/Band";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact, Footer } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Preloader />
      <Background />
      <SmoothScroll />
      <Motion />
      <Cursor />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Band words={["Business systems", "3D websites", "Secure APIs", "NLP research"]} />
        <Projects />
        <Research />
        <Skills />
        <Band words={["React", "Next.js", "Node", "MongoDB", "Three.js", "GSAP"]} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
