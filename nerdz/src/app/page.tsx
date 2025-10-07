import { About } from "@/components/About";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Resources } from "@/components/resources";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar />
      <Hero/>
      <Features/>
      <About/>
      <Resources/>
      <Footer/> 
    </div>
  );
}
