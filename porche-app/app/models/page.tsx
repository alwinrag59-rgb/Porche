"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const models = [
    {
        id: "gt3-rs",
        name: "911 GT3 RS",
        tagline: "The Ultimate Track Weapon",
        power: "525 PS",
        torque: "465 Nm",
        acceleration: "3.2 s",
        topSpeed: "296 km/h",
        price: "From £182,000",
        tag: "TRACK",
        tagColor: "bg-red-600",
        image: "/images/model-gt3rs.png",
        gradient: "from-red-900/80",
    },
    {
        id: "gt3",
        name: "911 GT3",
        tagline: "Precision Engineered Performance",
        power: "510 PS",
        torque: "470 Nm",
        acceleration: "3.4 s",
        topSpeed: "318 km/h",
        price: "From £138,000",
        tag: "SPORT",
        tagColor: "bg-yellow-500",
        image: "/images/model-gt3.png",
        gradient: "from-yellow-900/80",
    },
    {
        id: "turbo-s",
        name: "911 Turbo S",
        tagline: "Everyday Supercar",
        power: "650 PS",
        torque: "800 Nm",
        acceleration: "2.7 s",
        topSpeed: "330 km/h",
        price: "From £188,000",
        tag: "ELITE",
        tagColor: "bg-blue-600",
        image: "/images/model-turbos.png",
        gradient: "from-blue-900/80",
    },
    {
        id: "carrera-s",
        name: "911 Carrera S",
        tagline: "Iconic All-Rounder",
        power: "450 PS",
        torque: "530 Nm",
        acceleration: "3.5 s",
        topSpeed: "308 km/h",
        price: "From £104,000",
        tag: "CLASSIC",
        tagColor: "bg-gray-500",
        image: "/images/model-carreras.png",
        gradient: "from-gray-900/80",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ModelsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Hero Bar */}
            <div className="border-b border-white/10 px-8 py-5 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md">
                <Link href="/" className="font-orbitron font-bold text-white tracking-widest text-sm hover:text-gray-300 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    BACK
                </Link>
                <span className="font-orbitron font-black text-white text-lg tracking-[0.5em] uppercase">911 LINEUP</span>
                <span className="font-rajdhani text-sm text-gray-500 tracking-widest">{models.length} MODELS</span>
            </div>

            {/* Page Title */}
            <div className="px-8 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-orbitron font-black text-5xl md:text-7xl tracking-tight mb-4"
                >
                    PORSCHE<span className="text-red-600"> 911</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-rajdhani text-gray-400 text-xl tracking-widest"
                >
                    CHOOSE YOUR LEGEND
                </motion.p>
            </div>

            {/* Models Grid */}
            <motion.div
                className="px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {models.map((model) => (
                    <motion.div
                        key={model.id}
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                        className="relative group rounded-sm overflow-hidden bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer shadow-2xl"
                    >
                        {/* Image */}
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${model.gradient} via-transparent to-transparent`}></div>

                            {/* Tag badge */}
                            <span className={`absolute top-4 left-4 ${model.tagColor} text-white font-orbitron font-bold text-xs px-3 py-1 tracking-widest`}>
                                {model.tag}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="font-orbitron font-black text-2xl tracking-tight mb-1">{model.name}</h2>
                                    <p className="font-rajdhani text-gray-400 text-sm tracking-widest uppercase">{model.tagline}</p>
                                </div>
                                <p className="font-sans font-bold text-white text-sm text-right">{model.price}</p>
                            </div>

                            {/* Spec strip */}
                            <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
                                {[
                                    { label: "POWER", value: model.power },
                                    { label: "TORQUE", value: model.torque },
                                    { label: "0–100", value: model.acceleration },
                                    { label: "V-MAX", value: model.topSpeed },
                                ].map((spec) => (
                                    <div key={spec.label} className="text-center">
                                        <p className="font-orbitron text-gray-500 text-[9px] tracking-widest mb-1">{spec.label}</p>
                                        <p className="font-sans font-bold text-white text-sm">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button className="mt-6 w-full border border-white/20 py-3 font-orbitron text-xs tracking-[0.3em] text-gray-300 hover:bg-white hover:text-black transition-all duration-300">
                                CONFIGURE MODEL
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <footer className="border-t border-white/10 py-8 text-center font-orbitron text-xs text-gray-600 tracking-widest">
                © {new Date().getFullYear()} PORSCHE DIGITAL SHOWCASE
            </footer>
        </main>
    );
}
