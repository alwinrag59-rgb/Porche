"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AudioVisualizer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePointerDown = () => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    console.error("Audio playback prevents via browser or missing source:", error);
                    setIsPlaying(false);
                });
            }
        }
    };

    const handlePointerUp = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden group cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
        >
            <img
                src="/images/gt3rs-end.jpg"
                alt="Porsche 911 GT3 RS on Track"
                className={`w-full h-full object-cover transition-transform duration-700 ease-out origin-center ${isPlaying ? "scale-105" : "scale-100"
                    }`}
            />

            {/* Dark overlay */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isPlaying ? 'opacity-20' : 'opacity-40'}`}></div>

            {/* UI Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                <motion.div
                    animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : { scale: 1, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center mb-4 backdrop-blur-sm"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/validator/" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M19.364 8.95a1.25 1.25 0 0 0-1.768-1.768 7.25 7.25 0 0 0 0 10.254 1.25 1.25 0 0 0 1.768-1.768 4.75 4.75 0 0 1 0-6.718ZM22.192 6.121a1.25 1.25 0 0 0-1.768-1.768 11.25 11.25 0 0 0 0 15.909 1.25 1.25 0 1 0 1.768-1.768 8.75 8.75 0 0 1 0-12.373Z" clipRule="evenodd" />
                            <path d="M13.435 3.016a1.25 1.25 0 0 0-1.89-1.025l-5.694 3.66H3.5a1.25 1.25 0 0 0-1.25 1.25v10.198a1.25 1.25 0 0 0 1.25 1.25h2.35l5.694 3.66a1.25 1.25 0 0 0 1.89-1.025V3.016Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                        </svg>
                    )}
                </motion.div>

                <h3 className="font-orbitron font-bold text-2xl tracking-widest uppercase mb-2">
                    {isPlaying ? '9,000 RPM' : 'Hear the Flat-Six'}
                </h3>
                <p className="font-sans font-medium text-gray-300 tracking-wider text-sm uppercase">
                    {isPlaying ? 'Release to pause' : 'Hold to experience'}
                </p>
            </div>

            <audio
                ref={audioRef}
                src="/sounds/gt3rs-engine.mp3"
                loop
                preload="auto"
            />
        </div>
    );
}
