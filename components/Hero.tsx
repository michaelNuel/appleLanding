'use client'
import { useEffect, useRef } from "react"

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 3;

        const playVideo = () => {
            if (video.paused) {
                video.play().catch((err) => {
                    console.log("Autoplay prevented or interrupted:", err);
                });
            }
        };

        // Play when ready
        if (video.readyState >= 3) {
            playVideo();
        } else {
            video.addEventListener('canplay', playVideo);
        }

        // Recover from stalling
        const handleWaiting = () => {
            setTimeout(() => {
                if (video && video.paused && !video.ended) {
                    video.play().catch(() => {});
                }
            }, 100);
        };

        video.addEventListener('waiting', handleWaiting);

        return () => {
            video.removeEventListener('canplay', playVideo);
            video.removeEventListener('waiting', handleWaiting);
        };
    }, [])
    return ( 
        <section id="hero" >
           <div>
            <h1>MacBook Pro</h1>
            <img src="/title.png" alt="MacBook Title" />
           </div>

           <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

           <button>Buy</button>
           <p>From $1599 or $133/mo for 12 months</p>
        </section>
    )
}

export default Hero