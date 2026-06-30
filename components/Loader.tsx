'use client'
import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

const Loader = () => {
    const { progress } = useProgress()
    const [hidden, setHidden] = useState(false)
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        if (progress === 100) {
            // Smooth fade out delay
            const timer = setTimeout(() => {
                setHidden(true)
            }, 500)
            
            // Fully remove from DOM
            const renderTimer = setTimeout(() => {
                setShouldRender(false)
            }, 1200)

            return () => {
                clearTimeout(timer)
                clearTimeout(renderTimer)
            }
        }
    }, [progress])

    if (!shouldRender) return null

    return (
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col items-center gap-5">
                {/* Sleek SVG Apple Logo */}
                <svg className="w-12 h-12 text-white animate-pulse" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.35-6.15-3.57-2.85-7.39-7.51-11.47-13.98-12.74-20.24-19.12-42.63-19.12-67.17 0-14.99 3.86-27.14 11.58-36.46 7.72-9.33 17.29-14 28.71-14 6.26 0 12.85 1.76 19.78 5.27 6.93 3.52 11.58 5.27 13.98 5.27 2.12 0 6.64-1.65 13.56-4.95 6.92-3.3 13.06-4.85 18.42-4.66 15.66.78 27.56 6.59 35.68 17.43-13.88 8.44-20.73 19.98-20.54 34.61.19 11.79 4.8 21.67 13.83 29.67 9.02 8 19.46 12.27 31.32 12.83-2.67 7.79-5.72 15.15-9.13 22.09zM118.62 33.79c0-8.38 3.01-16.14 9.02-22.28 6.02-6.15 13.43-9.42 22.23-9.8 0.13 0.95.2 1.79.2 2.51 0 8.04-3.1 15.75-9.31 22.09-6.2 6.35-13.79 9.66-22.15 9.94-0.12-.89-.18-1.72-.18-2.46z"/>
                </svg>
                
                {/* Horizontal Progress Bar */}
                <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-white transition-all duration-300 ease-out" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                {/* Percentage Counter */}
                <span className="text-[10px] text-neutral-400 font-mono tracking-widest">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    )
}

export default Loader
