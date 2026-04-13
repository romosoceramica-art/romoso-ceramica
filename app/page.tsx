"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, easeInOut } from "framer-motion";
import { FaGem, FaLeaf, FaHandshake, FaShieldAlt, FaDraftingCompass, FaGlobe } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: easeInOut, delay: i * 0.12 } }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: easeInOut } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: easeInOut } },
};

const heroImages = [
  "/assets/images/all_tiles_product/ONICE-COBALTO_1-scaled.jpg",
  "/assets/images/all_tiles_product/ORANGE-SAPPHIRE_1-scaled.jpg",
  "/assets/images/all_tiles_product/ARENARIA_STONE_IVORY_1-scaled.jpg",
];

const featuredProducts = [
  { title: "Black Gold", category: "PRECIOUS", desc: "Timeless elegance for luxury interiors. A masterpiece in dark tones and golden veins.", img: "/assets/images/all_tiles_product/BLACK-GOLD_1-scaled.jpg", tag: "BESTSELLER" },
  { title: "Emotion Euphoria", category: "MARBLE", desc: "Bold statement with deep blue veins. Designed for spaces that demand presence.", img: "/assets/images/all_tiles_product/EMOTION_EUPHORIA_1.jpg", tag: "NEW" },
  { title: "Jade", category: "STONE", desc: "High-durability for outdoor and flooring applications with natural elegance.", img: "/assets/images/all_tiles_product/JADE_1-scaled.jpg", tag: "" },
  { title: "Jade Green", category: "MARBLE", desc: "Vibrant, nature-inspired wall cladding that brings organic luxury indoors.", img: "/assets/images/all_tiles_product/GREEN-MAJESTIC_1-scaled.jpg", tag: "POPULAR" },
];

const whyChoose = [
  { icon: <FaShieldAlt />, title: "Certified Quality", desc: "Built to last a lifetime with cutting-edge production techniques and stress-tested materials." },
  { icon: <FaDraftingCompass />, title: "Design Prowess", desc: "A perfect blend of high-end aesthetics, artistic vision, and modern architectural needs." },
  { icon: <FaGlobe />, title: "Global Sustainability", desc: "Committed to sustainability through environmentally friendly and low-waste manufacturing." },
  { icon: <FaHandshake />, title: "Client Partnership", desc: "Personalized service, expert consultation, and support for your entire project." },
];

const whoWeAreImages = ["/assets/images/home/sections/use1.jpg", "/assets/images/home/sections/use2.jpg"];
const whyChooseUsImages = ["/assets/images/home/sections/use3.jpg", "/assets/images/home/sections/use4.jpg"];

/* Reusable tile-bg section wrapper */
const TileBgSection = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ position: "relative", ...style }}>
    {/* Fixed tile background */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      backgroundImage: `url('/assets/images/background/back3.jpg')`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }} />
    {/* Dark tint so gold + cream text stays legible */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 1,
      background: "rgba(12,11,9,0.82)",
    }} />
    {/* Subtle gold vignette to tie into palette */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 2,
      background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
    }} />
    <div style={{ position: "relative", zIndex: 3 }}>
      {children}
    </div>
  </div>
);

export default function HomeLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const [currentHero, setCurrentHero] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentHero(p => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0c0b09", fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        :root { --gold:#c9a96e; --gold-light:#e8d5a3; --cream:#f5f0e8; --dark:#0c0b09; --dark-2:#161410; --dark-3:#1e1c18; --dark-4:#252118; --muted:#7a7060; }

        .noise { position:fixed; inset:0; pointer-events:none; z-index:999; opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .divider { height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); }

        /* grid-bg used for plain dark sections */
        .grid-bg { background-image: linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(201,169,110,0.03) 1px,transparent 1px); background-size:80px 80px; }

        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .gold-shimmer { background:linear-gradient(90deg,var(--gold) 0%,var(--gold-light) 45%,var(--gold) 85%); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s ease infinite; }

        /* ── STATS ── */
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        @media(max-width:640px) {
          .stats-grid { grid-template-columns:repeat(2,1fr); }
          .stat-card { border-left:none !important; border-bottom:1px solid rgba(201,169,110,0.08) !important; }
          .stat-card:nth-child(2n) { border-left:1px solid rgba(201,169,110,0.08) !important; }
          .stat-card:nth-child(3), .stat-card:nth-child(4) { border-bottom:none !important; }
        }
        .stat-card { text-align:center; padding:28px 16px; border:none; }

        /* ── HERO THUMBNAILS – hidden on mobile ── */
        .hero-thumbnails { display:flex; }
        @media(max-width:768px) { .hero-thumbnails { display:none !important; } }

        .hero-dot { width:6px; height:6px; border-radius:50%; background:rgba(201,169,110,0.3); transition:all 0.4s; cursor:pointer; border:none; }
        .hero-dot.active { background:var(--gold); width:24px; border-radius:3px; }

        .ghost-btn { display:inline-flex; align-items:center; gap:10px; padding:14px 36px; border:1px solid rgba(201,169,110,0.45); color:var(--gold-light); background:rgba(201,169,110,0.04); font-family:'Montserrat',sans-serif; font-size:11px; letter-spacing:0.22em; font-weight:500; cursor:pointer; text-decoration:none; transition:background 0.3s,border-color 0.3s,gap 0.3s; }
        .ghost-btn:hover { background:rgba(201,169,110,0.1); border-color:rgba(201,169,110,0.7); gap:16px; }

        /* ══ SIGNATURE GRID ══ */
        .sig-grid { display:grid; gap:16px; grid-template-areas: "hero s1 s2" "hero s3 s4"; grid-template-columns:1.7fr 1fr 1fr; grid-template-rows:1fr 1fr; height:680px; }
        @media(max-width:960px) { .sig-grid { grid-template-areas:"s1 s2" "s3 s4"; grid-template-columns:1fr 1fr; grid-template-rows:auto auto; height:auto; } .sig-hero { display:none !important; } }
        @media(max-width:560px) { .sig-grid { grid-template-areas:"s1" "s2" "s3" "s4"; grid-template-columns:1fr; } }

        .sig-card { position:relative; overflow:hidden; cursor:pointer; border:1px solid rgba(201,169,110,0.08); background:var(--dark-3); border-radius:2px; }
        .sig-img { display:block; width:100%; height:100%; object-fit:cover; transition:transform 0.9s cubic-bezier(0.22,1,0.36,1); }
        .sig-card:hover .sig-img { transform:scale(1.07); }
        .sig-info { position:absolute; bottom:0; left:0; right:0; padding:60px 24px 22px; background:linear-gradient(to top,rgba(12,11,9,0.94) 0%,transparent 100%); }
        .sig-desc { font-family:'Montserrat',sans-serif; font-size:11px; color:rgba(245,240,232,0.5); line-height:1.8; max-height:0; overflow:hidden; opacity:0; transition:max-height 0.5s ease,opacity 0.4s ease,margin 0.3s; }
        .sig-card:hover .sig-desc { max-height:64px; opacity:1; margin-bottom:12px; }
        .sig-arrow { display:flex; align-items:center; gap:8px; max-height:0; overflow:hidden; opacity:0; transition:max-height 0.4s ease 0.1s,opacity 0.4s ease 0.1s; }
        .sig-card:hover .sig-arrow { max-height:32px; opacity:1; }
        .sig-card::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); transition:width 0.5s ease; }
        .sig-card:hover::after { width:100%; }
        .sig-tag { position:absolute; top:14px; right:14px; font-family:'Montserrat',sans-serif; font-size:8px; letter-spacing:0.22em; font-weight:700; padding:5px 10px; background:var(--gold); color:var(--dark); }
        .sig-num { position:absolute; top:12px; left:16px; font-size:3.5rem; font-weight:300; color:rgba(201,169,110,0.06); line-height:1; pointer-events:none; transition:color 0.4s; }
        .sig-card:hover .sig-num { color:rgba(201,169,110,0.13); }
        @media(max-width:960px) { .sig-card .sig-img { height:260px !important; } }
        @media(max-width:560px) { .sig-card .sig-img { height:220px !important; } }

        /* ── WHY CARDS ── */
        .why-card { background:rgba(30,28,24,0.85); border:1px solid rgba(201,169,110,0.1); backdrop-filter:blur(8px); padding:36px 28px; position:relative; overflow:hidden; transition:border-color 0.4s,transform 0.4s; }
        .why-card::before { content:''; position:absolute; top:0; left:0; width:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); transition:width 0.5s ease; }
        .why-card:hover { border-color:rgba(201,169,110,0.3); transform:translateY(-5px); }
        .why-card:hover::before { width:100%; }

        /* ── HIGHLIGHT CARDS (WHO WE ARE mini) ── */
        .feat-card { background:rgba(30,28,24,0.8); border:1px solid rgba(201,169,110,0.1); backdrop-filter:blur(6px); padding:18px 12px; text-align:center; border-top:2px solid var(--gold); }

        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--dark)} ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .float{animation:float 6s ease-in-out infinite} .float-delay{animation:float 6s ease-in-out 1.5s infinite}

        /* ── SECTION DIVIDER WITH TILE PEEK ── */
        .tile-peek-divider {
          position: relative;
          height: 120px;
          overflow: hidden;
        }
        .tile-peek-divider .bg {
          position: absolute; inset: 0;
          background-image: url('/assets/images/background/back3.jpg');
          background-size: cover; background-position: center;
          background-attachment: fixed;
          filter: brightness(0.25) saturate(0.6);
        }
        .tile-peek-divider .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, var(--dark-2) 0%, transparent 40%, transparent 60%, var(--dark) 100%);
        }
        .tile-peek-divider .label {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          gap: 20px;
        }
      `}</style>

      <div className="noise" />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, scale: 1.12 }}>
          <AnimatePresence mode="sync">
            <motion.img key={currentHero} src={heroImages[currentHero]} alt="hero"
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg,rgba(12,11,9,0.88) 0%,rgba(12,11,9,0.65) 55%,rgba(12,11,9,0.82) 100%)" }} />
        </motion.div>

        <div style={{ position: "absolute", top: 40, right: 60, fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "var(--gold-light)" }}>HOME</span>
          <span style={{ color: "var(--gold)", opacity: 0.4 }}>—</span>
          <span>ROMOSO CERAMICA</span>
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-end">
          <div style={{ padding: "0 clamp(24px,5vw,60px) 80px", width: "100%", maxWidth: 900 }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.4em", color: "var(--gold)", marginBottom: 20 }}>
              CRAFTSMANSHIP · QUALITY · LEGACY
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{ fontSize: "clamp(2.6rem,8.5vw,9rem)", fontWeight: 300, lineHeight: 0.9, color: "var(--cream)", letterSpacing: "-0.02em" }}>
              Romoso Ceramica
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              style={{ fontSize: "clamp(1.1rem,3vw,2.2rem)", fontStyle: "italic", fontWeight: 300, color: "var(--gold)", marginBottom: 32, marginTop: 12 }}>
              Crafting Elegance in Tiles &amp; Slabs
            </motion.p>
            <div className="divider" style={{ width: 100, marginBottom: 36 }} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/catalogue" className="ghost-btn">EXPLORE COLLECTION <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
              <Link href="/about_us" className="ghost-btn" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}>OUR STORY</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ display: "flex", gap: 8, marginTop: 48 }}>
              {heroImages.map((_, i) => <button key={i} onClick={() => setCurrentHero(i)} className={`hero-dot ${i === currentHero ? "active" : ""}`} />)}
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: 40, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", writingMode: "vertical-rl" }}>SCROLL DOWN</span>
          <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: 1, height: 48, background: "linear-gradient(to bottom,var(--gold),transparent)", transformOrigin: "top" }} />
        </motion.div>

        <div className="hero-thumbnails" style={{ position: "absolute", top: "12%", right: 60, flexDirection: "column", gap: 12 }}>
          {heroImages.map((src, i) => (
            <motion.div key={i} onClick={() => setCurrentHero(i)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: i === currentHero ? 1 : 0.35, x: 0, scale: i === currentHero ? 1 : 0.92 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              style={{ width: 56, height: 72, border: i === currentHero ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.1)", overflow: "hidden", cursor: "pointer" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ STATS STRIP — on tile background ══════════════════════ */}
      <TileBgSection>
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(16px,4vw,60px)" }}>
            <div className="stats-grid">
              {[{ num: "500+", label: "TILE VARIETIES" }, { num: "15+", label: "YEARS CRAFTING" }, { num: "98%", label: "CLIENT SATISFACTION" }, { num: "40+", label: "COUNTRIES REACHED" }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="stat-card" style={{ borderLeft: i > 0 ? "1px solid rgba(201,169,110,0.12)" : "none" }}>
                  <p className="gold-shimmer" style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 300, marginBottom: 6 }}>{s.num}</p>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "var(--muted)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </TileBgSection>

      {/* ══ WHO WE ARE — plain dark ════════════════════════════════ */}
      <div className="grid-bg" style={{ padding: "130px clamp(24px,5vw,60px)", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 80, alignItems: "center" }}>
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ flex: "1 1 420px", position: "relative", minHeight: 480 }}>
            <div className="float" style={{ position: "absolute", top: 0, left: 0, width: "66%", zIndex: 2, border: "1px solid rgba(201,169,110,0.15)", overflow: "hidden" }}>
              <img src={whoWeAreImages[0]} alt="Interior" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
            </div>
            <div className="float-delay" style={{ position: "absolute", bottom: 0, right: 0, width: "66%", border: "1px solid rgba(201,169,110,0.15)", overflow: "hidden" }}>
              <img src={whoWeAreImages[1]} alt="Exterior" style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }} />
            </div>
            {/* <div style={{ position: "absolute", top: "20%", left: "58%", width: 72, height: 72, border: "1px solid rgba(201,169,110,0.2)", zIndex: 3, background: "var(--dark)" }} /> */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ position: "absolute", bottom: "28%", left: "5%", zIndex: 4, background: "var(--dark-4)", border: "1px solid rgba(201,169,110,0.3)", padding: "16px 20px", minWidth: 120 }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 4 }}>EST.</p>
              <p style={{ fontSize: "2rem", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>2010</p>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ flex: "1 1 380px" }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.35em", color: "var(--gold)", marginBottom: 16 }}>OUR VISION &amp; HERITAGE</p>
            <h2 style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05, marginBottom: 20 }}>
              Craftsmanship<br /><em className="gold-shimmer" style={{ fontStyle: "italic" }}>Beyond Compare</em>
            </h2>
            <div className="divider" style={{ width: 80, marginBottom: 28 }} />
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, letterSpacing: "0.05em", color: "var(--muted)", lineHeight: 2, fontWeight: 300, marginBottom: 36 }}>
              Romoso Ceramica combines artistry with precision engineering to redefine modern architecture. From stunning exteriors to elegant interiors, our designs reflect timeless craftsmanship and innovation for every living space.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 40 }}>
              {[{ icon: <FaGem />, label: "Premium Quality" }, { icon: <FaLeaf />, label: "Modern Design" }, { icon: <FaGlobe />, label: "Global Reach" }].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="feat-card">
                  <div style={{ color: "var(--gold)", fontSize: "1.1rem", marginBottom: 8 }}>{f.icon}</div>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "var(--cream)" }}>{f.label.toUpperCase()}</p>
                </motion.div>
              ))}
            </div>
            <Link href="/about_us" className="ghost-btn">LEARN MORE <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </motion.div>
        </div>
      </div>

      {/* ══ TILE PEEK DIVIDER ══════════════════════════════════════ */}
      <div className="tile-peek-divider">
        <div className="bg" />
        <div className="overlay" />
        <div className="label">
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(201,169,110,0.4))" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(201,169,110,0.5)" }}>CURATED SURFACES</span>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(201,169,110,0.4))" }} />
        </div>
      </div>

      {/* ══ SIGNATURE COLLECTIONS ═════════════════════════════════ */}
      <div style={{ padding: "130px clamp(24px,5vw,60px)", background: "var(--dark-2)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, gap: 24 }}>
            <div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.35em", color: "var(--gold)", marginBottom: 14 }}>CURATED SELECTION</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>
                Signature<em className="gold-shimmer" style={{ fontStyle: "italic", marginLeft: 14 }}>Collections</em>
              </h2>
            </div>
            <Link href="/catalogue" className="ghost-btn" style={{ flexShrink: 0 }}>
              VIEW ALL <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
          <div className="divider" style={{ marginBottom: 40 }} />

          <div className="sig-grid">
            <motion.div className="sig-card sig-hero" style={{ gridArea: "hero" }}
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
              onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <img src={featuredProducts[0].img} alt={featuredProducts[0].title} className="sig-img" style={{ height: "100%", minHeight: 540 }} />
              <span className="sig-num">01</span>
              {featuredProducts[0].tag && <span className="sig-tag">{featuredProducts[0].tag}</span>}
              <div className="sig-info">
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--gold)", marginBottom: 6 }}>{featuredProducts[0].category}</p>
                <p style={{ fontSize: "1.7rem", color: "var(--cream)", fontWeight: 300, lineHeight: 1.1, marginBottom: 8 }}>{featuredProducts[0].title}</p>
                <p className="sig-desc">{featuredProducts[0].desc}</p>
                <div className="sig-arrow"><div style={{ width: 18, height: 1, background: "var(--gold)" }} /><span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)" }}></span></div>
              </div>
            </motion.div>

            {[1, 2, 3].map((idx, pos) => (
              <motion.div key={idx} className="sig-card" style={{ gridArea: `s${idx}` }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 * (pos + 1) }}>
                <img src={featuredProducts[idx].img} alt={featuredProducts[idx].title} className="sig-img" />
                <span className="sig-num">0{idx + 1}</span>
                {featuredProducts[idx].tag && <span className="sig-tag">{featuredProducts[idx].tag}</span>}
                <div className="sig-info">
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--gold)", marginBottom: 4 }}>{featuredProducts[idx].category}</p>
                  <p style={{ fontSize: "1.2rem", color: "var(--cream)", fontWeight: 300, marginBottom: 8 }}>{featuredProducts[idx].title}</p>
                  <p className="sig-desc">{featuredProducts[idx].desc}</p>
                  <div className="sig-arrow"><div style={{ width: 16, height: 1, background: "var(--gold)" }} /><span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)" }}>EXPLORE</span></div>
                </div>
              </motion.div>
            ))}

            <motion.div style={{ gridArea: "s4", background: "var(--dark-4)", border: "1px solid rgba(201,169,110,0.15)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center", position: "relative", overflow: "hidden" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
              <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.1)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <FaGem style={{ color: "var(--gold)", fontSize: "2rem", marginBottom: 16, position: "relative" }} />
              <p className="gold-shimmer" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1, marginBottom: 8 }}>500+</p>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "var(--muted)", marginBottom: 20 }}>UNIQUE SURFACES</p>
              <div className="divider" style={{ width: 50, marginBottom: 20 }} />
              <Link href="/catalogue" className="ghost-btn" style={{ padding: "10px 24px", fontSize: 10 }}>
                FULL CATALOGUE <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ TILE PEEK DIVIDER 2 ════════════════════════════════════ */}
      <div className="tile-peek-divider">
        <div className="bg" />
        <div className="overlay" style={{ background: "linear-gradient(to bottom, var(--dark-2) 0%, transparent 40%, transparent 60%, var(--dark) 100%)" }} />
        <div className="label">
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(201,169,110,0.4))" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(201,169,110,0.5)" }}>THE ROMOSO ADVANTAGE</span>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(201,169,110,0.4))" }} />
        </div>
      </div>

      {/* ══ WHY CHOOSE US — on tile background ════════════════════ */}
      <TileBgSection style={{ padding: "130px clamp(24px,5vw,60px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 80, alignItems: "center" }}>
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ flex: "1 1 380px" }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.35em", color: "var(--gold)", marginBottom: 16 }}>THE ROMOSO ADVANTAGE</p>
              <h2 style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05, marginBottom: 20 }}>
                The Pillars of<br /><em className="gold-shimmer" style={{ fontStyle: "italic" }}>Excellence</em>
              </h2>
              <div className="divider" style={{ width: 80, marginBottom: 28 }} />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 2, fontWeight: 300, marginBottom: 44 }}>
                Our commitment goes beyond just manufacturing. We stand for supreme quality, cutting-edge design, sustainable practices, and unparalleled client support — elevating your project from concept to breathtaking completion.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {whyChoose.map((w, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="why-card">
                    <div style={{ fontSize: "1.3rem", color: "var(--gold)", marginBottom: 14 }}>{w.icon}</div>
                    <p style={{ fontSize: "1.05rem", color: "var(--cream)", marginBottom: 8 }}>{w.title}</p>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ flex: "1 1 420px", position: "relative", minHeight: 480 }}>
              <div className="float" style={{ position: "absolute", top: 0, left: 0, width: "66%", zIndex: 2, border: "1px solid rgba(201,169,110,0.2)", overflow: "hidden" }}>
                <img src={whyChooseUsImages[0]} alt="Tile 1" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
              </div>
              <div className="float-delay" style={{ position: "absolute", bottom: 0, right: 0, width: "66%", border: "1px solid rgba(201,169,110,0.2)", overflow: "hidden" }}>
                <img src={whyChooseUsImages[1]} alt="Tile 2" style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }} />
              </div>
              {/* <div style={{ position: "absolute", bottom: "22%", left: "58%", width: 72, height: 72, border: "1px solid rgba(201,169,110,0.25)", background: "rgba(12,11,9,0.6)", backdropFilter: "blur(4px)" }} /> */}
              <motion.div initial={{ opacity: 0, rotate: -8, scale: 0.8 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.7 }}
                style={{ position: "absolute", top: "32%", right: "8%", zIndex: 5, background: "rgba(37,33,24,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,110,0.4)", padding: "20px", textAlign: "center", minWidth: 100 }}>
                <div style={{ fontSize: "1.4rem", color: "var(--gold)", marginBottom: 6 }}><FaShieldAlt /></div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "var(--gold-light)" }}>CERTIFIED</p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "var(--muted)" }}>QUALITY</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </TileBgSection>

      {/* ══ CTA — on tile background ═══════════════════════════════ */}
      <TileBgSection style={{ padding: "150px clamp(24px,5vw,60px)", textAlign: "center" }}>
        {/* Extra dark vignette for CTA readability */}
        <div style={{ position: "absolute", inset: 0, zIndex: 4, background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(12,11,9,0.5) 0%, rgba(12,11,9,0.2) 100%)", pointerEvents: "none" }} />

        {/* Corner brackets */}
        {[
          { top: "48px", left: "60px", borderTop: "1px solid rgba(201,169,110,0.25)", borderLeft: "1px solid rgba(201,169,110,0.25)" },
          { top: "48px", right: "60px", borderTop: "1px solid rgba(201,169,110,0.25)", borderRight: "1px solid rgba(201,169,110,0.25)" },
          { bottom: "48px", left: "60px", borderBottom: "1px solid rgba(201,169,110,0.25)", borderLeft: "1px solid rgba(201,169,110,0.25)" },
          { bottom: "48px", right: "60px", borderBottom: "1px solid rgba(201,169,110,0.25)", borderRight: "1px solid rgba(201,169,110,0.25)" },
        ].map((s, i) => <div key={i} style={{ position: "absolute", zIndex: 5, width: 50, height: 50, ...s }} />)}

        <div style={{ position: "relative", zIndex: 5, padding: "50px 60px 60px 50px" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.35em", color: "var(--gold)", marginBottom: 20 }}>READY TO BEGIN</p>
            <h2 style={{ fontSize: "clamp(2.8rem,7vw,7.5rem)", fontWeight: 300, lineHeight: 0.92, color: "var(--cream)", letterSpacing: "-0.02em", marginBottom: 24 }}>
              Transform Your<br /><em className="gold-shimmer" style={{ fontStyle: "italic", fontWeight: 400 }}>Space Today</em>
            </h2>
            <div className="divider" style={{ width: 80, margin: "0 auto 36px" }} />
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 52, letterSpacing: "0.1em", lineHeight: 2 }}>
              Discover our premium tiles and slabs collection designed to inspire.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/catalogue" className="ghost-btn" style={{ background: "rgba(12,11,9,0.5)", backdropFilter: "blur(8px)" }}>
                EXPLORE CATALOGUE <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/contact" className="ghost-btn" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", background: "rgba(12,11,9,0.4)", backdropFilter: "blur(8px)" }}>
                CONTACT US
              </Link>
            </div>
          </motion.div>
        </div>
      </TileBgSection>
    </div>
  );
}