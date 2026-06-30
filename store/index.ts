import { create } from "zustand";

interface Props {
    color: string
    scale: number
    setColor: (color: string) => void
    setScale: (scale: number) => void
    texture: string
    setTexture: (texture: string) => void
    reset: () => void
}

const useMacBookStore = create<Props>((set) => ({
    color: '#2e2c2e', 
    setColor: (color:string) => set({color}),

    scale: 0.08, 
    setScale: (scale:number) => set({scale}),
    
    texture: '/videos/feature-1.mp4', 
    setTexture: (texture:string) => set({texture}),

    reset: () => set({color: '#2e2c2e', scale: 0.08, texture: '/videos/feature-1.mp4'}),
}))

export default useMacBookStore