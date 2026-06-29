import { Hero, NavBar, ProductView } from "@/components";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Highlights from "@/components/Highlights";
import Performance from "@/components/Performance";
import Showcase from "@/components/Showcase";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"; 

gsap.registerPlugin(ScrollTrigger)
export default function Home() {
  return (
  <main>
    <NavBar />
    <Hero />
    <ProductView/>
    <Showcase /> 
    <Performance /> 
    <Features />
    <Highlights />
    <Footer />
  </main>
  );
}
