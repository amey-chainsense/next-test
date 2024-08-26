import About from "@/components/About";
import Business from "@/components/Business";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import Locations from "@/components/Locations";
import ProdInfo from "@/components/ProdInfo";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Story from "@/components/Story";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/20 antialiased bg-grid-white/[0.02] flex-col max-w-[100vw]">
      <HeroSection />
      <Products />
      <About />
      <Services />
      <ProdInfo />
      <Story />
      <Business />
      <Locations />
      <Contact />
    </main>
  );
}
