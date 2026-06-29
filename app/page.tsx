import { Hero, NavBar, ProductView } from "@/components";
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
  </main>
  );
}
