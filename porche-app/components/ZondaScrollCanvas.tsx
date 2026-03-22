"use client";

import { useRef, useEffect } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const renderRequestedRef = useRef(false);

    // Preload Images
    useEffect(() => {
        const preloadImages = async () => {
            const promises = [];
            const imageArray: HTMLImageElement[] = [];

            for (let i = 1; i <= totalFrames; i++) {
                const url = `${imageFolderPath}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
                const img = new Image();
                img.src = url;
                promises.push(
                    new Promise((resolve) => {
                        img.onload = () => {
                            imageArray[i - 1] = img;
                            resolve(true);
                        };
                        img.onerror = () => {
                            resolve(false); // Resolve even on error to not block everything
                        };
                    })
                );
            }

            await Promise.all(promises);
            imagesRef.current = imageArray;

            // Initial draw
            drawFrame(0);
        };

        preloadImages();

        // Resize handler
        const handleResize = () => {
            // Re-initialize canvas dimensions based on container
            if (canvasRef.current && imagesRef.current.length > 0) {
                setupCanvas(canvasRef.current);
                // redraw current frame based on scroll
                const currentFrame = Math.floor(scrollYProgress.get() * (totalFrames - 1));
                drawFrame(Math.max(0, Math.min(currentFrame, totalFrames - 1)));
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [totalFrames, imageFolderPath]); // intentionally missing scrollYProgress to avoid reload

    // Drawing logic
    const drawFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        if (imagesRef.current.length === 0 || !imagesRef.current[frameIndex]) {
            return;
        }

        const img = imagesRef.current[frameIndex];

        renderRequestedRef.current = false;

        // Clear canvas
        ctx.fillStyle = "#1a1a1a"; // Match background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate object-fit: cover logic for the image
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        // We can use image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    const setupCanvas = (canvas: HTMLCanvasElement) => {
        const dpr = window.devicePixelRatio || 1;
        // We want the canvas to fill its container (the window here, or its relative parent)
        const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Normalize coordinate system to use css pixels
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    };

    // Initially set up the canvas dimensions before React runs useEffect
    useEffect(() => {
        if (canvasRef.current) {
            setupCanvas(canvasRef.current);
        }
    }, []);

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (imagesRef.current.length === 0) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(latest * (totalFrames - 1)))
        );

        if (!renderRequestedRef.current) {
            renderRequestedRef.current = true;
            requestAnimationFrame(() => drawFrame(frameIndex));
        }
    });

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-cover touch-none pointer-events-none"
        />
    );
}
