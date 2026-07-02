import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Chef } from "@/components/Chef";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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
