import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Motion } from "@/components/fx/Motion";
import { SectionTracker } from "@/components/SectionTracker";
import { MobileBar } from "@/components/MobileBar";
import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact, Footer } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Motion />
      <SectionTracker />
      <MobileBar />
      <div className="shell">
        <Sidebar />
        <div className="col">
          <main id="main" tabIndex={-1}>
            <About />
            <Projects />
            <Research />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
