'use client'
import { Canvas } from "@react-three/fiber"
import StudioLights from "./three/StudioLights"
import { features, featureSequence } from "@/constant"
import clsx from "clsx"
import { Suspense, useEffect, useRef } from "react"
import { Html } from "@react-three/drei"
import MacbookModel from "./models/Macbook"
import { useMediaQuery } from "react-responsive"
import useMacBookStore from "@/store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const ModelScroll = () => {
    const groupRef = useRef(null) 
    const isMobile = useMediaQuery({ query: '(max-width:1024px)'})
    const {setTexture} = useMacBookStore()

    //Preload all future videos during component mount 
    useEffect(() => {
      featureSequence.forEach((feature) => {
        const v = document.createElement('video');
        Object.assign(v, {
          src: feature.videoPath, 
          muted: true, 
          playsInline: true,
          preload: 'auto',
          crossOrigin: 'anonymous',
      
        })

        //append video to DOM
        v.load()
        
      })
    })

    useGSAP(() => {
      //3D model Rotation animation
      const modelTimeline = gsap
    })
    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html>
                <h1 className="text-white text-3xl uppercase">
                  loading....
                </h1> 
            </Html>}>
              <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

const Features = () => {
    return (
        <section id="features">
             <h2>See it all in a new light.</h2>

             <Canvas id="f-canvas" camera={{}}>
               <StudioLights />
               <ambientLight intensity={0.5} />
               <ModelScroll />
             </Canvas>

             <div className="absolute inset-0">
               {features.map((feature, index) => (
                <div className={clsx('box', `box${index + 1}`, feature.styles)}>{feature.text}</div>  
               ))}
             </div>
        </section>
    )
}

export default Features