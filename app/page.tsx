import { Hero, NavBar, ProductView } from "@/components";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all"; 

gsap.registerPlugin(ScrollTrigger)
export default function Home() {
  return (
  <main>
    <NavBar />
    <Hero />
    <ProductView/>
  </main>
  );
}
