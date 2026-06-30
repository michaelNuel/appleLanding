'use client'
import { useRef, useEffect, useState } from "react"
import useMacBookStore from "@/store"
import { Box, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import clsx from "clsx"
import MacbookModel14 from "./models/Macbook-14"
import StudioLights from "./three/StudioLights"
import ModelSwitcher from "./three/ModelSwitcher"
import { useMediaQuery } from "react-responsive"

const ProductView = () => {
    const {color, scale, setColor, setScale } = useMacBookStore()
    const isMobile = useMediaQuery({query: '(max-width: 1024px)'})
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, {
            rootMargin: '200px', // load/start rendering slightly before scrolling in
            threshold: 0
        })

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    return(
        <section id="product-viewer">
             <h2>Take a Closer look.</h2>

             <div className="controls">
                <p className="info">Macbook Pro Available in 14" & 16" in Space Grey & Silver {color}</p>

                <div className="flex-center gap-5 mt-5">
                  <div className="color-control"> 
                    <div onClick={() => setColor('#adb5bd')} className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}/>
                    <div onClick={() => setColor('#2e2c2e')} className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}/>
                  </div>

                  <div className="size-control"> 
                    <div onClick={() => setScale(0.06)} className={clsx(scale === 0.06 ? 'bg-white text-black': 'bg-transparent text-white')}><p>14"</p></div>
                    <div onClick={() => setScale(0.08)} className={clsx(scale === 0.08 ? 'bg-white text-black': 'bg-transparent text-white')}><p>16"</p></div>
                  </div>
                </div>
             </div> 

             <div ref={containerRef} className="w-full h-[80vh] lg:h-dvh relative z-40">
                 <Canvas 
                     id="canvas" 
                     style={{ display: isVisible ? 'block' : 'none' }}
                     camera={{position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}
                 >  
                    <StudioLights />
                    <ModelSwitcher scale={isMobile ? scale -0.03 : scale} isMobile={isMobile}/>
                 </Canvas>
             </div>
        </section>
    )
}


export default ProductView  