"use client";
import { useEffect, useState } from "react";

// Assuming you have a default white logo for dark background
const LOGO_SRC = "/assets/images/company_logo/logo_white.png";

interface PreloaderProps {
    // A global state setter to tell the parent (Layout/Page) when loading is done
    onLoadingComplete: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1. Simulate the initial page load time (e.g., waiting for data fetch)
        const timer = setTimeout(() => {
            // 2. Start the fade-out animation
            setIsVisible(false);

            // 3. Wait for the fade-out duration (500ms from the CSS transition) before removing the component
            const fadeOutTimer = setTimeout(() => {
                onLoadingComplete();
            }, 500);

            return () => clearTimeout(fadeOutTimer);

        }, 1500); // Display the loader for 1.5 seconds

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    // Use the isVisible state for the opacity class
    const opacityClass = isVisible ? 'opacity-100' : 'opacity-0';

    return (
        // Fixed, full-screen, transparent dark overlay with transition
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm 
                  transition-opacity duration-500 ${opacityClass}`}
        >

            {/* Logo with pulsing animation */}
            <img
                src={LOGO_SRC}
                alt="Romoso Ceramica Loading"
                className="h-80 w-auto object-contain animate-pulse duration-1000 ease-in-out"
            />

            {/* Animated Loading Dots */}
            <div className="flex space-x-2 mt-8">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
            </div>
        </div>
    );
}