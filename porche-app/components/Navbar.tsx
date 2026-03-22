"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-porche-black/70 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-orbitron font-bold tracking-widest text-white">
                    PORSCHE
                </div>
                <button className="px-6 py-2 border border-porche-gold text-porche-gold tracking-widest text-sm hover:bg-porche-gold hover:text-porche-black transition-colors duration-300 font-medium">
                    INQUIRE
                </button>
            </div>
        </motion.nav>
    );
}
