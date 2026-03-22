"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Hotspot {
    id: number;
    x: number; // percentage from left
    y: number; // percentage from top
    title: string;
    description: string;
    value: string;
}

const hotspots: Hotspot[] = [
    {
        id: 1,
        x: 23, // Left dial
        y: 60,
        title: "Aerodynamics",
        description: "Active Drag Reduction System (DRS) and adjustable front diffuser.",
        value: "Low Downforce",
    },
    {
        id: 2,
        x: 50, // Center dial
        y: 53,
        title: "Engine Specifications",
        description: "Naturally aspirated 4.0-litre horizontally opposed flat-six engine.",
        value: "9,000 RPM",
    },
    {
        id: 3,
        x: 77, // Right dial
        y: 57,
        title: "Vehicle General",
        description: "Real-time telemetry monitoring temperatures, tire pressure, and battery voltage.",
        value: "Normal Mode",
    },
];

export default function InteractiveSpeedometer() {
    const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

    return (
        <div className="relative w-full max-w-6xl mx-auto my-24 rounded-sm shadow-2xl bg-black">
            {/* Background Image Container (Cropped aspect ratio) */}
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden rounded-sm">
                <img
                    src="/images/speedometer.jpg"
                    alt="Porsche GT3 RS Dashboard"
                    className="absolute inset-0 w-[120%] h-[150%] max-w-none ml-[-10%] mt-[-15%] object-cover object-[center_35%] opacity-90"
                />
            </div>

            {/* Hotspots Loop - Absolute positioned globally over the container */}
            {hotspots.map((spot) => (
                <div
                    key={spot.id}
                    className="absolute z-10"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                >
                    {/* Pulsing Number Dot */}
                    <div className="relative flex items-center justify-center w-10 h-10 cursor-pointer group">
                        <div className="absolute inset-0 bg-red-600 rounded-full opacity-60 animate-ping group-hover:scale-110 transition-transform"></div>
                        <div className="absolute inset-0 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)] border-2 border-white/50 group-hover:bg-porche-red group-hover:border-white transition-all"></div>
                        <span className="relative z-10 text-white font-orbitron font-bold text-lg drop-shadow-md">
                            {spot.id}
                        </span>
                    </div>

                    {/* Tooltip Popup */}
                    <AnimatePresence>
                        {activeHotspot === spot.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-14 left-1/2 -translate-x-1/2 w-64 p-5 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none"
                            >
                                <h4 className="font-orbitron font-bold text-red-500 mb-1 tracking-wider text-sm uppercase">
                                    {spot.title}
                                </h4>
                                <div className="h-px w-8 bg-red-600/50 mb-3"></div>
                                <p className="font-rajdhani text-gray-300 text-sm leading-relaxed mb-3">
                                    {spot.description}
                                </p>
                                <div className="inline-block bg-white/10 px-3 py-1 rounded-sm border border-white/5">
                                    <span className="font-sans font-bold text-white text-xs tracking-widest uppercase">
                                        {spot.value}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            {/* Title Overlay Hint */}
            <div className="absolute top-8 left-8 pointer-events-none">
                <h3 className="font-orbitron font-bold text-white/50 text-xl tracking-widest uppercase flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Interactive Telemetry
                </h3>
            </div>
        </div>
    );
}
