"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import AnimatedNumber from "@/components/AnimatedNumber";
import AudioVisualizer from "@/components/AudioVisualizer";
import InteractiveSpeedometer from "@/components/InteractiveSpeedometer";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-porche-black min-h-screen text-white">
      <Navbar />

      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-porche-black relative">
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/images/zonda-sequence"
          />
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE (Scrolls naturally after sequence) */}
      <div className="relative z-20 bg-white text-porche-black py-24">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Main Specs Section (Matching Image 3) */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-32">
            <div className="w-full lg:w-1/3 space-y-16">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedNumber value={3.2} decimals={1} className="text-7xl font-old-standard tracking-tight italic" />
                  <span className="text-2xl font-sans font-bold">s</span>
                </div>
                <p className="text-gray-600 font-sans font-medium text-lg">Acceleration 0 - 100 km/h</p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedNumber value={386} className="text-7xl font-old-standard tracking-tight italic" />
                  <span className="text-2xl font-sans font-bold">kW</span>
                  <span className="text-4xl font-old-standard mx-2 text-gray-300 italic">/</span>
                  <AnimatedNumber value={525} className="text-7xl font-old-standard tracking-tight italic" />
                  <span className="text-2xl font-sans font-bold">PS</span>
                </div>
                <p className="text-gray-600 font-sans font-medium text-lg">Power (kW) / Power (PS)</p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedNumber value={296} className="text-7xl font-old-standard tracking-tight italic" />
                  <span className="text-2xl font-sans font-bold">km/h</span>
                </div>
                <p className="text-gray-600 font-sans font-medium text-lg">Top speed</p>
              </div>

              <div className="pt-8">
                <button className="border border-porche-black px-8 py-4 font-rajdhani font-medium hover:bg-porche-black hover:text-white transition-colors duration-300 tracking-wide">
                  View all technical details
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/3 mt-16 lg:mt-0 flex justify-end">
              <div className="relative w-full max-w-3xl aspect-[4/3] rounded-sm overflow-hidden shadow-2xl group">
                <img src="/images/gt3rs-track.jpg" alt="Porsche 911 GT3 RS Track" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Engine Detailing Pictures (Downside) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-[#f8f8f8] rounded-sm overflow-hidden flex items-center justify-center p-8 aspect-video">
              <img src="/images/gt3rs-engine.png" alt="Porsche Engine Deck Open" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="bg-[#f8f8f8] rounded-sm overflow-hidden flex items-center justify-center p-8 aspect-video">
              <img src="/images/gt3rs-side.png" alt="Porsche Side Profile" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <InteractiveSpeedometer />

          <div className="mb-24 rounded-sm overflow-hidden">
            <AudioVisualizer />
          </div>

          <footer className="border-t border-porche-black/10 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-orbitron tracking-widest">
            <p>&copy; {new Date().getFullYear()} PORSCHE DIGITAL SHOWCASE</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="/models" className="hover:text-porche-black transition-colors">MODELS</a>
              <a href="#" className="hover:text-porche-black transition-colors">DEALERS</a>
              <a href="#" className="hover:text-porche-black transition-colors">PRIVACY</a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
