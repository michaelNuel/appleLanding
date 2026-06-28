import { create } from "zustand";

interface Props {
    color: string
    scale: number
    setColor: (color: string) => void
    setScale: (scale: number) => void
    reset: () => void
}

const useMacBookStore = create<Props>((set) => ({
    color: 'rgba(46, 44, 46, 1)', 
    setColor: (color:string) => set({color}),

    scale: 0.08, 
    setScale: (scale:number) => set({scale}), 

    reset: () => set({color: '#2e2c2e', scale: 0.08}),
}))

export default useMacBookStore