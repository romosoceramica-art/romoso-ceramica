"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useInView, easeOut } from "framer-motion";
import { FiPhone, FiMapPin, FiMail, FiClock, FiPlus, FiSend, FiArrowRight } from "react-icons/fi";

/* ════════════════════════════════════════════════
   REUSABLE COMPONENTS (same system as Home/About)
════════════════════════════════════════════════ */

const TileBgSection = ({
  children, style = {}, tintOpacity = 0.84,
}: { children: React.ReactNode; style?: React.CSSProperties; tintOpacity?: number }) => (
  <div style={{ position: "relative", ...style }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url('/assets/images/background/back3.jpg')`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `rgba(12,11,9,${tintOpacity})` }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.045) 0%, transparent 70%)" }} />
    <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
  </div>
);

const TilePeekDivider = ({ label }: { label: string }) => (
  <div style={{ position: "relative", height: 110, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/assets/images/background/back3.jpg')`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", filter: "brightness(0.22) saturate(0.5)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0c0b09 0%, transparent 38%, transparent 62%, #0c0b09 100%)" }} />
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(201,169,110,0.45))", transformOrigin: "right" }} />
      <motion.span initial={{ opacity: 0, letterSpacing: "0.1em" }} whileInView={{ opacity: 1, letterSpacing: "0.35em" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(201,169,110,0.55)", whiteSpace: "nowrap" }}>{label}</motion.span>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(201,169,110,0.45))", transformOrigin: "left" }} />
    </div>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut, delay: i * 0.11 } }),
};

/* ════════════════════════════════════════════════
   ANIMATED COUNTER
════════════════════════════════════════════════ */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / 50);
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(t); }
      else setVal(start);
    }, 28);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════ */
export default function ContactUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact_us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, subject, message }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setFullName(""); setEmail(""); setSubject(""); setMessage("");
        setTimeout(() => setSent(false), 5000);
      }
    } catch (err) { console.error(err); }
    finally { setSending(false); }
  };

  const contactInfo = [
    { icon: <FiPhone />, label: "CALL CENTER", value: "+971 56 702 7043", sub: "Available Mon–Fri" },
    { icon: <FiMapPin />, label: "OUR LOCATION", value: "Warehouse-16", sub: "Al Sajja, Sharjah" },
    { icon: <FiMail />, label: "EMAIL US", value: "info@romosoceramica.com", sub: "24hr response" },
    { icon: <FiClock />, label: "WORKING HOURS", value: "9AM – 6PM", sub: "Monday to Friday" },
  ];

  const faqs = [
    { q: "How can I contact customer support?", a: "You can reach us via phone, email, or by filling out the contact form. Our team usually responds within 24 hours on business days." },
    { q: "Where are you located?", a: "We are located at Warehouse-16, Al Sajja, Sharjah. Visit us during our working hours for a personal consultation and showroom experience." },
    { q: "What is the average response time?", a: "Our average response time is within 12–24 hours on business days. For urgent queries, calling our hotline is the fastest option." },
    { q: "Do you offer 24/7 support?", a: "Currently we provide support during business hours Mon–Fri, 9AM–6PM. For urgent issues, please call our hotline directly." },
  ];

  const stats = [
    { num: 500, suffix: "+", label: "Tile Varieties" },
    { num: 15, suffix: "+", label: "Years Crafting" },
    { num: 98, suffix: "%", label: "Satisfaction" },
    { num: 40, suffix: "+", label: "Countries" },
  ];

  return (
    <div style={{ background: "#0c0b09", fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        :root { --gold:#c9a96e; --gold-light:#e8d5a3; --cream:#f5f0e8; --dark:#0c0b09; --dark-2:#161410; --dark-3:#1e1c18; --dark-4:#242018; --muted:#7a7060; }

        .noise { position:fixed; inset:0; pointer-events:none; z-index:999; opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .divider { height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); }
        .grid-bg { background-image:linear-gradient(rgba(201,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.03) 1px,transparent 1px); background-size:80px 80px; }

        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .gold-shimmer { background:linear-gradient(90deg,var(--gold) 0%,var(--gold-light) 45%,var(--gold) 85%); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s ease infinite; }

        /* ── INFO CARDS ── */
        .info-card {
          position:relative; overflow:hidden;
          background:rgba(26,23,18,0.8); backdrop-filter:blur(12px);
          border:1px solid rgba(201,169,110,0.1);
          padding:32px 24px;
          transition:border-color 0.4s, transform 0.4s;
          cursor:default;
        }
        .info-card::before { content:''; position:absolute; top:0; left:0; width:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); transition:width 0.5s ease; }
        .info-card::after { content:''; position:absolute; inset:0; background:rgba(201,169,110,0.0); transition:background 0.4s; pointer-events:none; }
        .info-card:hover { border-color:rgba(201,169,110,0.3); transform:translateY(-6px); }
        .info-card:hover::before { width:100%; }
        .info-card:hover::after { background:rgba(201,169,110,0.025); }

        /* ── FORM ── */
        .form-field { position:relative; }
        .form-label { display:block; font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:0.28em; color:rgba(201,169,110,0.7); margin-bottom:8px; transition:color 0.3s; }
        .form-field:focus-within .form-label { color:var(--gold-light); }
        .form-input {
          width:100%; background:rgba(22,20,16,0.7); backdrop-filter:blur(8px);
          border:none; border-bottom:1px solid rgba(201,169,110,0.15);
          color:var(--cream); font-family:'Montserrat',sans-serif;
          font-size:12px; letter-spacing:0.06em; padding:12px 4px; outline:none;
          transition:border-color 0.3s;
        }
        .form-input::placeholder { color:rgba(122,112,96,0.55); }
        .form-input:focus { border-color:rgba(201,169,110,0.6); }
        .form-line { position:absolute; bottom:0; left:0; width:0; height:1px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); transition:width 0.4s ease; pointer-events:none; }
        .form-field:focus-within .form-line { width:100%; }

        /* ── SUBMIT BTN ── */
        .submit-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:12px;
          padding:17px 32px; border:1px solid rgba(201,169,110,0.4);
          background:rgba(201,169,110,0.05); backdrop-filter:blur(8px);
          color:var(--gold-light); font-family:'Montserrat',sans-serif;
          font-size:11px; letter-spacing:0.25em; font-weight:500; cursor:pointer;
          position:relative; overflow:hidden;
          transition:border-color 0.3s, gap 0.3s;
        }
        .submit-btn::before { content:''; position:absolute; inset:0; background:rgba(201,169,110,0); transition:background 0.4s; }
        .submit-btn:hover:not(:disabled)::before { background:rgba(201,169,110,0.08); }
        .submit-btn:hover:not(:disabled) { border-color:rgba(201,169,110,0.7); gap:18px; }
        .submit-btn:disabled { opacity:0.45; cursor:not-allowed; }

        /* ── FAQ ── */
        .faq-row {
          border-bottom:1px solid rgba(201,169,110,0.08);
          transition:border-color 0.3s;
        }
        .faq-row:first-child { border-top:1px solid rgba(201,169,110,0.08); }
        .faq-row.open { border-color:rgba(201,169,110,0.2); }
        .faq-btn { width:100%; display:flex; justify-content:space-between; align-items:center; padding:24px 0; background:transparent; border:none; cursor:pointer; text-align:left; gap:24px; }

        /* ── MAP ── */
        .map-wrap { position:relative; overflow:hidden; border:1px solid rgba(201,169,110,0.15); }
        .map-wrap::before, .map-wrap::after { content:''; position:absolute; left:0; right:0; height:80px; z-index:1; pointer-events:none; }
        .map-wrap::before { top:0; background:linear-gradient(to bottom,rgba(12,11,9,0.6),transparent); }
        .map-wrap::after { bottom:0; background:linear-gradient(to top,rgba(12,11,9,0.6),transparent); }

        /* ── STAT CARDS ── */
        .stat-card { text-align:center; padding:28px 16px; border-right:1px solid rgba(201,169,110,0.08); }
        .stat-card:last-child { border-right:none; }
        @media(max-width:640px) { .stat-card { border-right:none; border-bottom:1px solid rgba(201,169,110,0.08); } .stat-card:last-child { border-bottom:none; } }

        /* ── GHOST BTN ── */
        .ghost-btn { display:inline-flex; align-items:center; gap:10px; padding:14px 36px; border:1px solid rgba(201,169,110,0.4); color:var(--gold-light); background:rgba(201,169,110,0.04); backdrop-filter:blur(8px); font-family:'Montserrat',sans-serif; font-size:11px; letter-spacing:0.22em; font-weight:500; text-decoration:none; transition:background 0.3s,border-color 0.3s,gap 0.3s; }
        .ghost-btn:hover { background:rgba(201,169,110,0.1); border-color:rgba(201,169,110,0.7); gap:16px; }

        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--dark)} ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

        @keyframes spin { to{transform:rotate(360deg)} }
        .spin { animation:spin 1s linear infinite; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation:float 5s ease-in-out infinite; }
      `}</style>

      <div className="noise" />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        {/* Parallax bg */}
        <motion.div style={{ y: heroY, scale: heroScale, position: "absolute", inset: 0 }}>
          <img src="/assets/images/contact_us/contactus2.jpg" alt="Contact Hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {/* Multi-layer tint */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(12,11,9,0.91) 0%, rgba(12,11,9,0.6) 50%, rgba(12,11,9,0.85) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,11,9,1) 0%, transparent 40%)" }} />
        </motion.div>

        {/* Gold diagonal accent line */}
        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ position: "absolute", top: 0, bottom: 0, left: "38%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.15) 30%, rgba(201,169,110,0.08) 70%, transparent)", transformOrigin: "top", zIndex: 1 }} />

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          style={{ position: "absolute", top: 40, right: "clamp(24px,5vw,60px)", fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 12, zIndex: 2 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>HOME</Link>
          <span style={{ color: "var(--gold)", opacity: 0.45 }}>—</span>
          <span style={{ color: "var(--gold-light)" }}>CONTACT US</span>
        </motion.div>

        {/* Hero text */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-end">
          <div style={{ padding: "0 clamp(24px,5vw,60px) 80px", width: "100%" }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.42em", color: "var(--gold)", marginBottom: 22 }}>
              GET IN TOUCH · WE'RE HERE FOR YOU
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                style={{ fontSize: "clamp(3.8rem,10vw,10rem)", fontWeight: 300, lineHeight: 0.88, color: "var(--cream)", letterSpacing: "-0.025em", marginBottom: 0 }}>
                Contact
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                style={{ fontSize: "clamp(3.8rem,10vw,10rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.025em", marginBottom: 28 }}>
                <em className="gold-shimmer" style={{ fontStyle: "italic", fontWeight: 400 }}>Us.</em>
              </motion.h1>
            </div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
              style={{ width: 100, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", transformOrigin: "left", marginBottom: 24 }} />

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, letterSpacing: "0.1em", color: "rgba(245,240,232,0.38)", maxWidth: 380, lineHeight: 2, fontWeight: 300 }}>
              Our team of experts is ready to assist you with any question about tiles, surfaces, or installation.
            </motion.p>

            {/* Scroll cue */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
              <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <FiArrowRight color="rgba(201,169,110,0.5)" size={14} />
              </motion.div>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(201,169,110,0.45)" }}>SCROLL TO EXPLORE</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Vertical scroll label */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: 40, right: "clamp(24px,5vw,60px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", writingMode: "vertical-rl" }}>SCROLL</span>
          <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--gold), transparent)", transformOrigin: "top" }} />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          STATS STRIP — tile bg
      ══════════════════════════════════════════════════ */}
      <TileBgSection>
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 clamp(24px,5vw,60px)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="stat-card">
                <p className="gold-shimmer" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300, marginBottom: 6 }}>
                  <CountUp end={s.num} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "var(--muted)" }}>{s.label.toUpperCase()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </TileBgSection>

      {/* ══════════════════════════════════════════════════
          CONTACT INFO CARDS — tile bg
      ══════════════════════════════════════════════════ */}
      <TileBgSection style={{ padding: "110px clamp(24px,5vw,60px)" }} tintOpacity={0.8}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          {/* Section heading */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.38em", color: "var(--gold)", marginBottom: 14 }}>REACH OUT</p>
            <h2 style={{ fontSize: "clamp(2.2rem,5vw,4.2rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1, marginBottom: 0 }}>
              We Are Always Ready
              <br />
              <em className="gold-shimmer" style={{ fontStyle: "italic" }}>to Help You</em>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px,1fr))", gap: 16 }}>
            {contactInfo.map((c, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="info-card">
                {/* Ghosted large icon bg */}
                <div style={{ position: "absolute", right: -8, bottom: -8, fontSize: "5rem", color: "rgba(201,169,110,0.04)", pointerEvents: "none" }}>
                  {c.icon}
                </div>
                {/* Icon circle */}
                <div style={{ position: "relative", marginBottom: 22 }}>
                  <div style={{ width: 48, height: 48, border: "1px solid rgba(201,169,110,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontSize: "1.1rem" }}>
                    {c.icon}
                  </div>
                </div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "rgba(201,169,110,0.65)", marginBottom: 8 }}>{c.label}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 300, color: "var(--cream)", lineHeight: 1.25, marginBottom: 4 }}>{c.value}</p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em" }}>{c.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </TileBgSection>

      {/* ══════════════════════════════════════════════════
          PEEK DIVIDER
      ══════════════════════════════════════════════════ */}
      <TilePeekDivider label="SEND US A MESSAGE" />

      {/* ══════════════════════════════════════════════════
          CONTACT FORM — dark grid bg
      ══════════════════════════════════════════════════ */}
      <div className="grid-bg" style={{ padding: "110px clamp(24px,5vw,60px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 80, alignItems: "stretch" }}>

          {/* Left — editorial copy */}
          <motion.div initial={{ opacity: 0, x: -44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.38em", color: "var(--gold)", marginBottom: 16 }}>SEND A MESSAGE</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05, marginBottom: 20 }}>
                Let's Start a<br />
                <em className="gold-shimmer" style={{ fontStyle: "italic" }}>Conversation</em>
              </h2>
              <div className="divider" style={{ width: 80, marginBottom: 28 }} />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 2.1, fontWeight: 300, marginBottom: 48 }}>
                Whether you have a question about our tile collections, need a quote, or want to schedule a showroom visit — we'd love to hear from you. Every space deserves a perfect surface.
              </p>
            </div>

            {/* Decorative tile mosaic */}
            <motion.div className="float" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, maxWidth: 220 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.04 * i }}
                  style={{
                    aspectRatio: "1",
                    border: "1px solid rgba(201,169,110,0.18)",
                    background: [0, 3, 5, 10].includes(i) ? "rgba(201,169,110,0.07)" : "transparent",
                  }} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ flex: "1 1 400px" }}>

            {/* Form card */}
            <div style={{ position: "relative", background: "rgba(18,16,12,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(201,169,110,0.14)", padding: "clamp(32px,5vw,52px)" }}>
              {/* Corner accents */}
              {[
                { top: -1, left: -1, borderTop: "2px solid rgba(201,169,110,0.35)", borderLeft: "2px solid rgba(201,169,110,0.35)" },
                { top: -1, right: -1, borderTop: "2px solid rgba(201,169,110,0.35)", borderRight: "2px solid rgba(201,169,110,0.35)" },
                { bottom: -1, left: -1, borderBottom: "2px solid rgba(201,169,110,0.35)", borderLeft: "2px solid rgba(201,169,110,0.35)" },
                { bottom: -1, right: -1, borderBottom: "2px solid rgba(201,169,110,0.35)", borderRight: "2px solid rgba(201,169,110,0.35)" },
              ].map((s, i) => <div key={i} style={{ position: "absolute", width: 24, height: 24, ...s }} />)}

              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.32em", color: "rgba(201,169,110,0.6)", textAlign: "center", marginBottom: 36 }}>
                GET IN TOUCH
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div className="form-field">
                    <label className="form-label">FULL NAME</label>
                    <input type="text" placeholder="John Doe" value={fullName}
                      onChange={e => setFullName(e.target.value)} required className="form-input" />
                    <div className="form-line" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">EMAIL</label>
                    <input type="email" placeholder="you@email.com" value={email}
                      onChange={e => setEmail(e.target.value)} required className="form-input" />
                    <div className="form-line" />
                  </div>
                </div>

                {/* Subject */}
                <div className="form-field">
                  <label className="form-label">SUBJECT</label>
                  <input type="text" placeholder="How can we help?" value={subject}
                    onChange={e => setSubject(e.target.value)} className="form-input" />
                  <div className="form-line" />
                </div>

                {/* Message */}
                <div className="form-field">
                  <label className="form-label">MESSAGE</label>
                  <textarea placeholder="Tell us about your project…" value={message}
                    onChange={e => setMessage(e.target.value)} required rows={5}
                    className="form-input" style={{ resize: "none" }} />
                  <div className="form-line" />
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      style={{ textAlign: "center", padding: "18px", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.06)" }}>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)" }}>
                        ✦&nbsp;&nbsp;MESSAGE SENT SUCCESSFULLY
                      </p>
                    </motion.div>
                  ) : (
                    <motion.button key="btn" type="submit" disabled={sending}
                      className="submit-btn" whileTap={{ scale: 0.98 }}>
                      {sending ? (
                        <div className="spin" style={{ width: 13, height: 13, border: "1px solid rgba(201,169,110,0.5)", borderTopColor: "var(--gold)", borderRadius: "50%" }} />
                      ) : <FiSend size={13} />}
                      {sending ? "SENDING…" : "SEND MESSAGE"}
                      {!sending && <FiArrowRight size={12} style={{ opacity: 0.7 }} />}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PEEK DIVIDER
      ══════════════════════════════════════════════════ */}
      <TilePeekDivider label="FREQUENTLY ASKED QUESTIONS" />

      {/* ══════════════════════════════════════════════════
          FAQ — tile bg
      ══════════════════════════════════════════════════ */}
      <TileBgSection style={{ padding: "110px clamp(24px,5vw,60px)" }} tintOpacity={0.86}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.38em", color: "var(--gold)", marginBottom: 14 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>
              Frequently Asked{" "}
              <em className="gold-shimmer" style={{ fontStyle: "italic" }}>Questions</em>
            </h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className={`faq-row ${openIndex === i ? "open" : ""}`}>
                <button className="faq-btn" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: openIndex === i ? "var(--cream)" : "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.4, transition: "color 0.3s" }}>
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: openIndex === i ? 135 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ color: "var(--gold)", flexShrink: 0, padding: 2 }}>
                    <FiPlus size={17} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div key="answer"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}>
                      <div style={{ paddingBottom: 24 }}>
                        <div className="divider" style={{ marginBottom: 18 }} />
                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 2.1, fontWeight: 300 }}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </TileBgSection>

      {/* ══════════════════════════════════════════════════
          PEEK DIVIDER
      ══════════════════════════════════════════════════ */}
      <TilePeekDivider label="FIND OUR SHOWROOM" />

      {/* ══════════════════════════════════════════════════
          MAP — dark section
      ══════════════════════════════════════════════════ */}
      <div className="grid-bg" style={{ padding: "110px clamp(24px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 24 }}>
            <div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.38em", color: "var(--gold)", marginBottom: 14 }}>VISIT US</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>
                Find Our{" "}
                <em className="gold-shimmer" style={{ fontStyle: "italic" }}>Showroom</em>
              </h2>
            </div>
            {/* Address detail */}
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", marginBottom: 6 }}>
                <FiMapPin color="var(--gold)" size={13} />
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "var(--cream)", letterSpacing: "0.08em" }}>Warehouse-16, Al Sajja, Sharjah</p>
              </div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>Mon – Fri: 9AM – 6PM</p>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 36, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="map-wrap">
            {/* Gold top & bottom borders */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", zIndex: 2 }} />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.463689!2d55.448156!3d25.4053264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE5LjIiTiA1NcKwMjYnNTMuNCJF!5e0!3m2!1sen!2sin!4v1695979999999!5m2!1sen!2sin"
              width="100%" height="460" style={{ border: 0, display: "block", filter: "grayscale(0.45) contrast(1.05) brightness(0.82)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Badge overlay */}
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              style={{ position: "absolute", bottom: 28, left: 28, zIndex: 3, background: "rgba(12,11,9,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(201,169,110,0.3)", padding: "16px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, border: "1px solid rgba(201,169,110,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                <FiMapPin size={14} />
              </div>
              <div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: "0.22em", color: "var(--gold)", marginBottom: 3 }}>OUR SHOWROOM</p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "var(--cream)", fontWeight: 300 }}>Warehouse-16, Al Sajja, Sharjah</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CTA — tile bg, most dramatic
      ══════════════════════════════════════════════════ */}
      <TileBgSection style={{ padding: "140px clamp(24px,5vw,60px)", textAlign: "center" }} tintOpacity={0.74}>
        {/* Extra center vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 4, background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(12,11,9,0.4) 0%, rgba(12,11,9,0.1) 100%)", pointerEvents: "none" }} />

        {/* Corner brackets */}
        {[
          { top: "44px", left: "clamp(24px,5vw,60px)", borderTop: "1px solid rgba(201,169,110,0.28)", borderLeft: "1px solid rgba(201,169,110,0.28)" },
          { top: "44px", right: "clamp(24px,5vw,60px)", borderTop: "1px solid rgba(201,169,110,0.28)", borderRight: "1px solid rgba(201,169,110,0.28)" },
          { bottom: "44px", left: "clamp(24px,5vw,60px)", borderBottom: "1px solid rgba(201,169,110,0.28)", borderLeft: "1px solid rgba(201,169,110,0.28)" },
          { bottom: "44px", right: "clamp(24px,5vw,60px)", borderBottom: "1px solid rgba(201,169,110,0.28)", borderRight: "1px solid rgba(201,169,110,0.28)" },
        ].map((s, i) => <div key={i} style={{ position: "absolute", zIndex: 5, width: 52, height: 52, ...s }} />)}

        <div style={{ position: "relative", zIndex: 5, padding: "50px 50px 50px 50px " }}>
          <motion.div initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.38em", color: "var(--gold)", marginBottom: 22 }}>READY TO BEGIN</p>
            <h2 style={{ fontSize: "clamp(2.8rem,7vw,7.5rem)", fontWeight: 300, lineHeight: 0.92, color: "var(--cream)", letterSpacing: "-0.025em", marginBottom: 24 }}>
              Transform Your<br />
              <em className="gold-shimmer" style={{ fontStyle: "italic", fontWeight: 400 }}>Space Today</em>
            </h2>
            <div className="divider" style={{ width: 80, margin: "0 auto 36px" }} />
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "rgba(245,240,232,0.42)", marginBottom: 52, letterSpacing: "0.1em", lineHeight: 2 }}>
              Discover our premium tiles and slabs collection designed to inspire.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/catalogue" className="ghost-btn">
                EXPLORE CATALOGUE <FiArrowRight size={12} />
              </Link>
              <Link href="/" className="ghost-btn" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", background: "rgba(12,11,9,0.3)" }}>
                BACK TO HOME
              </Link>
            </div>
          </motion.div>
        </div>
      </TileBgSection>
    </div>
  );
}