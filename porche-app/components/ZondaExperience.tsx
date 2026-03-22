"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface ExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ExperienceProps) {
    // HERO PHASE (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.33], ["0%", "-50%"]);

    // DESIGN PHASE (33% - 66%)
    const designOpacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.33, 0.66], ["10%", "-10%"]);

    // ENGINE PHASE (66% - 100%)
    const engineOpacity = useTransform(scrollYProgress, [0.58, 0.66, 0.9, 1], [0, 1, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.66, 1], ["10%", "0%"]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center container mx-auto px-6 h-full">
            {/* 1. HERO */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                className="absolute inset-x-6 top-1/2 -translate-y-1/2"
            >
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h1 className="font-orbitron text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2">
                            PORSCHE 911<br />
                            <span className="text-porche-gold">GT3 RS</span>
                        </h1>
                    </div>
                    <div className="text-right mt-6 md:mt-0">
                        <p className="text-sm tracking-widest text-gray-400 mb-1">STARTING AT</p>
                        <p className="font-orbitron font-bold text-3xl tracking-wider">€ 250,000</p>
                    </div>
                </div>
            </motion.div>

            {/* 2. DESIGN */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute inset-x-6 top-1/2 -translate-y-1/2"
            >
                <div className="max-w-xl">
                    <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">
                        Aerodynamic <br />
                        <span className="text-porche-gold">Excellence</span>
                    </h2>
                    <div className="h-px w-24 bg-porche-gold mb-6" />
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed tracking-wide">
                        Designed for maximum downforce and unparalleled track performance.
                        Featuring active aerodynamics and extensive carbon fiber construction
                        to reduce weight and increase agility.
                    </p>
                </div>
            </motion.div>

            {/* 3. ENGINE */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY }}
                className="absolute inset-x-6 top-1/2 -translate-y-1/2"
            >
                <div className="flex justify-end">
                    <div className="w-full md:w-1/2 lg:w-1/3 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-sm">
                        <h2 className="font-orbitron text-3xl font-bold text-white mb-8 border-b border-white/20 pb-4">
                            HEART OF THE BEAST
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { label: "ENGINE", value: "4.0L Flat-Six" },
                                { label: "POWER", value: "525 HP" },
                                { label: "0-100 KM/H", value: "3.2s" },
                                { label: "TOP SPEED", value: "296 KM/H" },
                            ].map((spec) => (
                                <li key={spec.label} className="flex justify-between items-center text-sm md:text-base tracking-widest">
                                    <span className="text-gray-400">{spec.label}</span>
                                    <span className="font-orbitron text-white text-right">{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
