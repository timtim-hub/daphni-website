import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Acting from "@/components/sections/Acting";
import Live from "@/components/sections/Live";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Grain />
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Work />
        <Acting />
        <Live />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
