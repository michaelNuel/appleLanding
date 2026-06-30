import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three'
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ModelSwitcherProps {
   scale: number;
   isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;
// const SPRING_SETTINGS = { mass: 1, tension: 100, friction: 30 }; 

const fadeMeshes = (group: THREE.Object3D | null, opacity: number) => {
   if (!group) return;

   if (opacity > 0) {
      group.visible = true;
   }

   let completedCount = 0;
   const meshes: THREE.Mesh[] = [];

   group.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
         meshes.push(child);
      }
   });

   if (meshes.length === 0 && opacity === 0) {
      group.visible = false;
      return;
   }

   meshes.forEach((mesh) => {
      const mat = mesh.material as THREE.Material;
      mat.transparent = true;
      gsap.to(mat, {
         opacity,
         duration: ANIMATION_DURATION,
         onComplete: () => {
            completedCount++;
            if (opacity === 0 && completedCount === meshes.length) {
               group.visible = false;
            }
         }
      });
   });
}


const moveGroup = (group: THREE.Object3D | null, x: number) => {
   if (!group) return;

   gsap.to(group.position, {
      x,
      duration: ANIMATION_DURATION,
      // ease: 'power2.out',
   })
}

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
   // const SCALE_LARGE_DESKTOP = 0.8; 
   // const SCALE_SMALL_DESKTOP = 0.6;
   // const SCALE_LARGE_MOBILE = 0.05;
   // const SCALE_SMALL_MOBILE = 0.03;
   const smallMacbookRef = useRef<THREE.Group>(null)
   const largeMacbookRef = useRef<THREE.Group>(null)

   const showLargeMacbook = scale === 0.08 || scale === 0.05
   useGSAP(() => {

      if (showLargeMacbook) {

         moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
         moveGroup(largeMacbookRef.current, 0);

         fadeMeshes(smallMacbookRef.current, 0); 
         fadeMeshes(largeMacbookRef.current, 1);
      } else {
         moveGroup(smallMacbookRef.current, 0);
         moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

         fadeMeshes(smallMacbookRef.current, 1);
         fadeMeshes(largeMacbookRef.current, 0);
      }
   }, [scale])

   const controlsConfig = {
      snap: true,
      speed: isMobile ? 2.5 : 1.5,
      zoom: 1,
      polar: (isMobile ? [-Math.PI / 12, Math.PI / 12] : [-Math.PI / 6, Math.PI / 6]) as [number, number],
      azimuth: [-Infinity, Infinity] as [number, number],
      config: { mass: 1, tension: 170, friction: 26 }
   }

   return (
      <>
         <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef}>
               <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
         </PresentationControls>

         <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
               <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
         </PresentationControls>
      </>
   )
}

export default ModelSwitcher