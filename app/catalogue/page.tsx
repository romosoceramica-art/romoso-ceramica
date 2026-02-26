"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, cubicBezier } from "framer-motion";
import tilesData from "./tiles.json";
import Link from "next/link";

const categories = [
    "ALL",
    "PRECIOUS",
    "MARBLE",
    "CONCRETE",
    "STONE",
    "STRUCTURED",
    "SOLID COLOR",
];

// Stagger children animation
const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.07 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) } },
    exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.3 } },
};

export default function TilesCatalogue() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("ALL");
    const [hoveredTile, setHoveredTile] = useState<string | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const filteredByCategory =
        activeTab === "ALL"
            ? tilesData
            : tilesData.filter((tile) =>
                tile.categories.some((cat) => cat.toUpperCase() === activeTab.toUpperCase())
            );

    const filteredTiles = filteredByCategory.filter((tile) =>
        tile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className="min-h-screen"
            style={{
                background: "#0c0b09",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
        >
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold: #c9a96e;
          --gold-light: #e8d5a3;
          --cream: #f5f0e8;
          --dark: #0c0b09;
          --dark-2: #161410;
          --dark-3: #1e1c18;
          --text-muted: #7a7060;
        }

        * { box-sizing: border-box; }

        .tile-card-img {
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tile-card:hover .tile-card-img {
          transform: scale(1.08);
        }

        .search-input::placeholder { color: #5a5040; }
        .search-input:focus { outline: none; }

        .tab-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          background: transparent;
          position: relative;
          padding: 10px 20px;
          color: #7a7060;
        }

        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }

        .tab-btn.active {
          color: var(--gold-light);
        }
        .tab-btn.active::after {
          width: 100%;
        }

        .tab-btn:hover:not(.active) {
          color: #c0b090;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1000;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .count-badge {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .gold-shimmer {
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 40%, var(--gold) 80%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
        }

        .hero-vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--gold);
          opacity: 0.7;
        }

        .grid-line-bg {
          background-image:
            linear-gradient(rgba(201, 169, 110, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 110, 0.04) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--dark); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
      `}</style>

            {/* Film grain overlay */}
            <div className="noise-overlay" />

            {/* ─── HERO ─────────────────────────────────────────────── */}
            <div ref={heroRef} className="relative h-screen overflow-hidden" style={{ maxHeight: "100svh" }}>
                {/* Parallax BG */}
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 scale-110"
                >
                    <img
                        src="/assets/images/catalogue/catalogue.jpg"
                        alt="Tiles catalogue"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(12,11,9,0.3) 0%, rgba(12,11,9,0.5) 50%, rgba(12,11,9,0.95) 100%)",
                        }}
                    />
                </motion.div>

                {/* Hero content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 flex flex-col justify-center pb-20 px-10 md:px-24"
                >
                    {/* Top nav row */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-10 md:px-24">
                        <span className="hero-vertical-text hidden md:block" style={{ height: 120 }}>COLLECTION 2025</span>
                        <nav
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 11,
                                letterSpacing: "0.2em",
                                color: "rgba(255,255,255,0.55)",
                            }}
                            className="flex items-center gap-3 mt-1"
                        >
                            <Link href="/" className="hover:text-white transition-colors duration-200" style={{ color: "inherit" }}>
                                HOME
                            </Link>
                            <span style={{ color: "var(--gold)", opacity: 0.6 }}>—</span>
                            <span style={{ color: "var(--gold-light)" }}>CATALOGUE</span>
                        </nav>
                    </div>

                    {/* Main headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    >
                        <p
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 11,
                                letterSpacing: "0.35em",
                                color: "var(--gold)",
                                marginBottom: 20,
                            }}
                        >
                            STONE · MARBLE · LUXURY SURFACES
                        </p>

                        <h1
                            style={{
                                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                                fontWeight: 300,
                                lineHeight: 0.9,
                                color: "var(--cream)",
                                letterSpacing: "-0.02em",
                                marginBottom: 32,
                            }}
                        >
                            The Art of
                            <br />
                            <em
                                className="gold-shimmer"
                                style={{
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                }}
                            >
                                Surface.
                            </em>
                        </h1>

                        <div className="divider-line" style={{ width: 120, marginBottom: 28 }} />

                        <p
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 12,
                                letterSpacing: "0.12em",
                                color: "rgba(245,240,232,0.45)",
                                maxWidth: 340,
                                lineHeight: 1.9,
                                fontWeight: 300,
                            }}
                        >
                            Curated stone and tile collections for spaces that demand distinction. Each piece, a conversation with the earth.
                        </p>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute bottom-10 right-10 md:right-24 flex flex-col items-center gap-2"
                    >
                        <span
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 9,
                                letterSpacing: "0.25em",
                                color: "var(--text-muted)",
                            }}
                        >
                            SCROLL
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{
                                width: 1,
                                height: 40,
                                background: "linear-gradient(to bottom, var(--gold), transparent)",
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* ─── CATALOGUE SECTION ────────────────────────────────── */}
            <div className="grid-line-bg" style={{ background: "var(--dark)", position: "relative" }}>
                <div className="max-w-screen-2xl mx-auto px-6 md:px-16 py-20">

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
                    >
                        <div>
                            <p
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 10,
                                    letterSpacing: "0.35em",
                                    color: "var(--gold)",
                                    marginBottom: 12,
                                }}
                            >
                                BROWSE COLLECTION
                            </p>
                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 5vw, 4rem)",
                                    fontWeight: 300,
                                    color: "var(--cream)",
                                    lineHeight: 1,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                Our Tiles
                                <span
                                    style={{ fontStyle: "italic", color: "var(--gold)", marginLeft: 12 }}
                                >
                                    &amp; Surfaces
                                </span>
                            </h2>
                        </div>

                        {/* Search */}
                        <div className="relative" style={{ minWidth: 280 }}>
                            <svg
                                style={{
                                    position: "absolute",
                                    left: 16,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--text-muted)",
                                }}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search tiles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                style={{
                                    width: "100%",
                                    padding: "12px 16px 12px 40px",
                                    background: "var(--dark-3)",
                                    border: "1px solid rgba(201,169,110,0.15)",
                                    borderRadius: 2,
                                    color: "var(--cream)",
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 12,
                                    letterSpacing: "0.08em",
                                    transition: "border-color 0.3s",
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)")}
                            />
                        </div>
                    </motion.div>

                    <div className="divider-line mb-0" />

                    {/* Category Tabs */}
                    <div
                        className="flex items-center gap-0 overflow-x-auto mb-12 mt-0"
                        style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`tab-btn ${activeTab === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Tile count */}
                        <div className="ml-auto flex-shrink-0 pr-2">
                            <span className="count-badge" style={{ color: "var(--text-muted)" }}>
                                {filteredTiles.length} RESULTS
                            </span>
                        </div>
                    </div>

                    {/* ─── TILES GRID ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        key={activeTab + searchQuery}
                        className="grid gap-5"
                        style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredTiles.length > 0 ? (
                                filteredTiles.map((tile, i) => (
                                    <motion.div
                                        key={tile.name}
                                        variants={cardVariants}
                                        layout
                                        className="tile-card"
                                        style={{
                                            position: "relative",
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            background: "var(--dark-3)",
                                            cursor: "pointer",
                                            border: "1px solid rgba(201,169,110,0.08)",
                                            // Alternating heights for editorial layout
                                            gridRow: i % 7 === 0 ? "span 2" : "span 1",
                                        }}
                                        onMouseEnter={() => setHoveredTile(tile.name)}
                                        onMouseLeave={() => setHoveredTile(null)}
                                    >
                                        {/* Image */}
                                        <div
                                            style={{
                                                overflow: "hidden",
                                                height: i % 7 === 0 ? "100%" : "260px",
                                                minHeight: 220,
                                            }}
                                        >
                                            <img
                                                src={tile.file}
                                                alt={tile.name}
                                                className="tile-card-img w-full h-full"
                                                style={{ objectFit: "cover", display: "block" }}
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Overlay */}
                                        <motion.div
                                            initial={false}
                                            animate={{ opacity: hoveredTile === tile.name ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background:
                                                    "linear-gradient(to top, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.4) 60%, transparent 100%)",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                padding: 20,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontFamily: "'Montserrat', sans-serif",
                                                    fontSize: 9,
                                                    letterSpacing: "0.25em",
                                                    color: "var(--gold)",
                                                    marginBottom: 6,
                                                }}
                                            >
                                                {tile.categories.join(" · ")}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: 400,
                                                    color: "var(--cream)",
                                                    letterSpacing: "0.02em",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {tile.name}
                                            </p>
                                            <div
                                                style={{
                                                    marginTop: 14,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 24,
                                                        height: 1,
                                                        background: "var(--gold)",
                                                    }}
                                                />
                                                <span
                                                    style={{
                                                        fontFamily: "'Montserrat', sans-serif",
                                                        fontSize: 9,
                                                        letterSpacing: "0.2em",
                                                        color: "var(--gold)",
                                                    }}
                                                >

                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Category pill — visible at rest */}
                                        <AnimatePresence>
                                            {hoveredTile !== tile.name && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    style={{
                                                        position: "absolute",
                                                        top: 12,
                                                        left: 12,
                                                        background: "rgba(12,11,9,0.75)",
                                                        backdropFilter: "blur(8px)",
                                                        border: "1px solid rgba(201,169,110,0.2)",
                                                        padding: "4px 10px",
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontFamily: "'Montserrat', sans-serif",
                                                            fontSize: 9,
                                                            letterSpacing: "0.2em",
                                                            color: "var(--gold-light)",
                                                        }}
                                                    >
                                                        {tile.categories[0]}
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        gridColumn: "1 / -1",
                                        textAlign: "center",
                                        padding: "120px 0",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 60,
                                            height: 60,
                                            border: "1px solid rgba(201,169,110,0.3)",
                                            borderRadius: "50%",
                                            margin: "0 auto 24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                    </div>
                                    <p
                                        style={{
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 11,
                                            letterSpacing: "0.25em",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        NO TILES FOUND
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Footer rule */}
                    <div className="divider-line mt-20 mb-10" />
                    <p
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 10,
                            letterSpacing: "0.25em",
                            color: "var(--text-muted)",
                            textAlign: "center",
                        }}
                    >
                        © 2025 TILES COLLECTION · ALL SURFACES RESERVED
                    </p>
                </div>
            </div>
        </div>
    );
}