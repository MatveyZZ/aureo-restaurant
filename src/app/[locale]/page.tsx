import { Header } from "@/components/Header";
import { Hero } from "@/components/cms/Hero";
import { About } from "@/components/cms/About";
import { Menu } from "@/components/cms/Menu";
import { Chef } from "@/components/cms/Chef";
import { Gallery } from "@/components/cms/Gallery";
import { Contact } from "@/components/cms/Contact";
import { Footer } from "@/components/cms/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-auto overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Chef />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
