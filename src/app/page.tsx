import { Nav } from "@/components/Nav";
import { SiteEffects } from "@/components/SiteEffects";
import { Hero } from "@/components/hero/Hero";
import { Proof, Sites, Work } from "@/components/sections/Work";
import { Research } from "@/components/sections/Research";
import { About, Contact, Faq, Footer, Services } from "@/components/sections/More";

export default function Page() {
  return (
    <>
      <SiteEffects />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Proof />
        <Work />
        <Sites />
        <Research />
        <Services />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
