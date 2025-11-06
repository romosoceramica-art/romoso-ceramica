"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import tilesData from "./tiles.json";
import Link from "next/link";

const categories = [
    "ALL TILES",
    "PRECIOUS",
    "MARBLE",
    "CONCRETE",
    "STONE",
    "STRUCTURED",
    "SOLID COLOR",
];

export default function TilesCatalogue() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("ALL TILES");
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

    useEffect(() => {
        const currentTab = tabRefs.current[activeTab];
        if (currentTab) {
            setUnderlineStyle({
                width: currentTab.offsetWidth,
                left: currentTab.offsetLeft,
            });
        }
    }, [activeTab]);

    // Filter logic
    const filteredByCategory =
        activeTab === "ALL TILES"
            ? tilesData
            : tilesData.filter((tile) =>
                tile.categories.some(
                    (cat) => cat.toUpperCase() === activeTab.toUpperCase()
                )
            );

    const filteredTiles = filteredByCategory.filter((tile) =>
        tile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative bg-gray-50 min-h-screen overflow-hidden">
            {/*  Background Image Layer */}
            <div
                className="absolute inset-0 -z-30 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url('/assets/images/background/back3.jpg')`, // 👈 set your background image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed", // creates subtle parallax feel
                }}
            ></div>

            {/*  Soft Gradient Overlay Layer */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-gray-100/80 via-gray-200/70 to-gray-50/80 backdrop-blur-[2px]"></div>


            {/* Hero Section */}
            <div className="relative h-[28rem] w-full overflow-hidden">

                {/* 1. Background Image */}
                <img
                    src="/assets/images/catalogue/catalogue.jpg"
                    alt="Modern, architectural background representing connection"
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105" // 👈 Added subtle hover effect
                />

                {/* 2. Gradient Overlay for Typography Clarity and Depth */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-black/80 to-gray-900/80"
                />

                <div className="absolute inset-0 max-w-7xl mx-auto flex flex-col justify-center px-6 sm:px-12">

                    <div className="flex flex-col sm:flex-row justify-between items-center w-full">

                        {/* Heading: Centered on Mobile, Left-aligned on Desktop */}
                        <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl text-center sm:text-left mb-4 sm:mb-0">
                            Catalogue
                            <div className="w-16 h-1 bg-white mt-3 rounded-full mx-auto sm:mx-0" />
                        </h1>

                        {/* Breadcrumb: Aligns nicely with heading on Mobile, to the right on Desktop */}
                        <div className="md:mt-[30%] flex items-center space-x-2 text-base md:text-xl text-gray-300">

                            <Link
                                href="/"
                                className="text-white hover:text-gray-400 transition-colors duration-300 font-medium"
                            >
                                Home
                            </Link>

                            <span className="text-gray-400 font-light">/</span>

                            <span className="font-bold text-gray-500 tracking-wider">
                                Catalogue
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="p-6 md:p-10 max-w-7xl mx-auto relative z-10">
                {/* Search Field */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search tiles by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/2 p-4 rounded-2xl shadow-md placeholder-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                    />
                </div>

                {/* Tabs */}
                <div className="mb-10 relative overflow-x-auto">
                    <div className="flex gap-4 min-w-max relative">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                ref={(el) => {
                                    tabRefs.current[cat] = el;
                                }}
                                onClick={() => setActiveTab(cat)}
                                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${activeTab === cat
                                    ? "text-white bg-gray-800 shadow-lg"
                                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Animated underline */}
                        <motion.div
                            layout
                            className="absolute bottom-0 h-1 bg-gray-800 rounded-full"
                            animate={{
                                width: underlineStyle.width,
                                left: underlineStyle.left,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </div>
                </div>

                {/* Tiles Grid */}
                <div className="relative p-6 rounded-3xl bg-white/90 shadow-2xl backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-200/10 to-gray-50 -z-10 rounded-3xl" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        <AnimatePresence>
                            {filteredTiles.length > 0 ? (
                                filteredTiles.map((tile) => (
                                    <motion.div
                                        key={tile.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                                    >
                                        {/* Tile Image */}
                                        <img
                                            src={tile.file}
                                            alt={tile.name}
                                            className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                            <span className="text-white text-center px-3 text-lg md:text-xl font-semibold">
                                                {tile.name}
                                            </span>
                                        </div>

                                        {/* Glassmorphic Category Badge */}
                                        <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-md border border-white/20 text-black text-xs md:text-sm px-3 py-1 rounded-full shadow">
                                            {tile.categories.join(", ")}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    className="col-span-full text-center text-gray-500 py-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-lg mb-2 font-medium">No tiles found</p>
                                    <div className="mx-auto w-28 h-28 border-4 border-dashed border-gray-400 rounded-full animate-pulse"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Tailwind Custom Animation */}
            <style jsx>{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientBackground {
          background-size: 400% 400%;
          animation: gradientBackground 25s ease infinite;
        }
      `}</style>
        </div>
    );
}
