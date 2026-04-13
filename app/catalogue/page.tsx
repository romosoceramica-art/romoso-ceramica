"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, cubicBezier } from "framer-motion";
import tilesData from "./tiles.json";
import pdfsData from "./pdf.json";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type PdfEntry = {
  title: string;
  subtitle: string;
  size: string;
  tag: string;
  file: string;
  category: string;
};

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const tileCategories = ["ALL","PRECIOUS","MARBLE","CONCRETE","STONE","STRUCTURED","SOLID COLOR"];
const pdfCategories  = ["ALL","FLOORING","WALL","OUTDOOR","SLAB","STONE"];

const tagColors: Record<string,{bg:string;border:string;text:string}> = {
  NEW:        {bg:"rgba(74,158,255,0.12)",  border:"rgba(74,158,255,0.5)",  text:"#4a9eff"},
  POPULAR:    {bg:"rgba(110,201,122,0.12)", border:"rgba(110,201,122,0.5)", text:"#6ec97a"},
  BESTSELLER: {bg:"rgba(201,169,110,0.15)", border:"rgba(201,169,110,0.5)", text:"#c9a96e"},
  PREMIUM:    {bg:"rgba(201,169,110,0.15)", border:"rgba(201,169,110,0.5)", text:"#c9a96e"},
  EXCLUSIVE:  {bg:"rgba(176,110,201,0.12)", border:"rgba(176,110,201,0.5)", text:"#b06ec9"},
  LUXURY:     {bg:"rgba(201,169,110,0.15)", border:"rgba(201,169,110,0.5)", text:"#e8d5a3"},
};

const containerVariants = { hidden:{}, show:{ transition:{ staggerChildren:0.06 } } };
const cardVariants = {
  hidden:{ opacity:0, y:36, scale:0.97 },
  show:  { opacity:1, y:0,  scale:1,   transition:{ duration:0.5, ease:cubicBezier(0.22,1,0.36,1) } },
  exit:  { opacity:0, y:-16, scale:0.97, transition:{ duration:0.28 } },
};

// ─── PDF PREVIEW MODAL ────────────────────────────────────────────────────────
function PdfModal({ pdf, onClose }: { pdf:PdfEntry; onClose:()=>void }) {
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    const onKey = (e:KeyboardEvent) => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown",onKey); document.body.style.overflow=""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(6,5,4,0.97)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <motion.div initial={{ scale:0.93, y:28 }} animate={{ scale:1, y:0 }} exit={{ scale:0.93, y:28 }}
        transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
        onClick={e => e.stopPropagation()}
        style={{ width:"100%", maxWidth:1020, height:"92vh", background:"#161410", border:"1px solid rgba(201,169,110,0.2)", display:"flex", flexDirection:"column", borderRadius:3, overflow:"hidden", boxShadow:"0 40px 120px rgba(0,0,0,0.8)" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid rgba(201,169,110,0.1)", flexShrink:0, gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, minWidth:0 }}>
            <div style={{ width:3, height:30, background:"linear-gradient(to bottom,var(--gold),var(--gold-light))", borderRadius:2, flexShrink:0 }}/>
            <div style={{ minWidth:0 }}>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.28em", color:"var(--gold)", marginBottom:2 }}>PDF PREVIEW</p>
              <p style={{ fontSize:"1rem", fontWeight:300, color:"var(--cream)", lineHeight:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{pdf.title}</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
            <a href={pdf.file} download={pdf.title+".pdf"}
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 18px", background:"linear-gradient(135deg,rgba(201,169,110,0.18),rgba(201,169,110,0.07))", border:"1px solid rgba(201,169,110,0.4)", color:"var(--gold-light)", fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.18em", textDecoration:"none", cursor:"pointer", borderRadius:2, transition:"background 0.25s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(201,169,110,0.25)")}
              onMouseLeave={e=>(e.currentTarget.style.background="linear-gradient(135deg,rgba(201,169,110,0.18),rgba(201,169,110,0.07))")}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              DOWNLOAD
            </a>
            <button onClick={onClose}
              style={{ width:34, height:34, borderRadius:2, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, lineHeight:1 }}>×</button>
          </div>
        </div>

        {/* iFrame */}
        <div style={{ flex:1, position:"relative", overflow:"hidden", background:"#0c0b09" }}>
          {!loaded && (
            <div style={{ position:"absolute", inset:0, zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, background:"#0c0b09" }}>
              <svg width="52" height="64" viewBox="0 0 52 64" fill="none">
                <rect x="1" y="1" width="50" height="62" rx="3" fill="rgba(22,20,16,0.9)" stroke="rgba(201,169,110,0.22)" strokeWidth="1"/>
                <path d="M32 1v14h14" stroke="rgba(201,169,110,0.3)" strokeWidth="1" fill="none"/>
                <rect x="10" y="22" width="24" height="1.5" rx=".75" fill="rgba(201,169,110,0.32)"/>
                <rect x="10" y="28" width="18" height="1.5" rx=".75" fill="rgba(201,169,110,0.2)"/>
                <rect x="10" y="34" width="22" height="1.5" rx=".75" fill="rgba(201,169,110,0.2)"/>
                <rect x="10" y="40" width="14" height="1.5" rx=".75" fill="rgba(201,169,110,0.16)"/>
                <text x="10" y="57" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" fill="rgba(201,169,110,0.65)" letterSpacing="2">PDF</text>
              </svg>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.28em", color:"var(--text-muted)" }}>LOADING PREVIEW…</p>
            </div>
          )}
          <iframe key={pdf.file} src={`${pdf.file}#toolbar=1&view=FitH`} onLoad={()=>setLoaded(true)}
            style={{ width:"100%", height:"100%", border:"none", display:"block", opacity:loaded?1:0, transition:"opacity 0.4s" }}
            title={pdf.title}/>
        </div>

        {/* Footer */}
        <div style={{ padding:"10px 20px", flexShrink:0, borderTop:"1px solid rgba(201,169,110,0.08)", display:"flex", gap:20, alignItems:"center" }}>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.18em", color:"var(--text-muted)" }}>{pdf.size}</span>
          <span style={{ width:1, height:12, background:"rgba(201,169,110,0.18)" }}/>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.18em", color:"var(--text-muted)" }}>{pdf.category}</span>
          <span style={{ marginLeft:"auto", fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.12em", color:"rgba(201,169,110,0.3)" }}>ESC to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PDF CARD (no thumbnail, text-only layout) ────────────────────────────────
function PdfCard({ pdf, onPreview }: { pdf:PdfEntry; onPreview:()=>void }) {
  const [hovered, setHovered] = useState(false);
  const tag = tagColors[pdf.tag];

  return (
    <motion.div variants={cardVariants} layout
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:"var(--dark-3)",
        border:`1px solid ${hovered?"rgba(201,169,110,0.35)":"rgba(201,169,110,0.09)"}`,
        borderRadius:2,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        position:"relative",
        transition:"border-color 0.3s,transform 0.35s,box-shadow 0.35s",
        transform:hovered?"translateY(-5px)":"translateY(0)",
        boxShadow:hovered?"0 24px 64px rgba(0,0,0,0.55)":"none",
        minHeight:220,
      }}>

      {/* Top accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, zIndex:3, background:"linear-gradient(90deg,var(--gold),var(--gold-light))", transformOrigin:"left", transform:hovered?"scaleX(1)":"scaleX(0)", transition:"transform 0.4s ease" }}/>

      {/* Body */}
      <div style={{ padding:"24px 20px 20px", flex:1, display:"flex", flexDirection:"column", gap:0 }}>

        {/* Top row: category + tag */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, letterSpacing:"0.28em", color:"var(--gold)" }}>{pdf.category}</span>
          {pdf.tag && tag && (
            <div style={{ padding:"3px 9px", background:tag.bg, border:`1px solid ${tag.border}`, borderRadius:1 }}>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, letterSpacing:"0.2em", fontWeight:700, color:tag.text }}>{pdf.tag}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"rgba(201,169,110,0.1)", marginBottom:16 }}/>

        {/* Title */}
        <p style={{ fontSize:"1.05rem", fontWeight:400, color:"var(--cream)", lineHeight:1.3, marginBottom:6 }}>{pdf.title}</p>
        <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"var(--text-muted)", letterSpacing:"0.04em", lineHeight:1.6, marginBottom:20 }}>{pdf.subtitle}</p>

        {/* Meta */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, marginTop:"auto" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"'Montserrat',sans-serif", fontSize:9, color:"var(--text-muted)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {pdf.size}
          </span>
          <span style={{ width:1, height:10, background:"rgba(201,169,110,0.18)" }}/>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:"rgba(201,169,110,0.45)", letterSpacing:"0.1em" }}>PDF</span>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onPreview}
            style={{ flex:1, padding:"9px 0", background:"transparent", border:"1px solid rgba(201,169,110,0.18)", color:"var(--text-muted)", fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.18em", cursor:"pointer", borderRadius:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,169,110,0.45)";e.currentTarget.style.color="var(--gold-light)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,169,110,0.18)";e.currentTarget.style.color="var(--text-muted)"}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            VIEW
          </button>
          <a href={pdf.file} download={pdf.title+".pdf"}
            style={{ flex:2, padding:"9px 0", background:"linear-gradient(135deg,rgba(201,169,110,0.14),rgba(201,169,110,0.06))", border:"1px solid rgba(201,169,110,0.32)", color:"var(--gold-light)", fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.18em", textDecoration:"none", borderRadius:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, transition:"background 0.25s" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(201,169,110,0.24)")}
            onMouseLeave={e=>(e.currentTarget.style.background="linear-gradient(135deg,rgba(201,169,110,0.14),rgba(201,169,110,0.06))")}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            DOWNLOAD
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TilesCatalogue() {
  const [searchQuery,  setSearchQuery]  = useState("");
  const [activeTab,    setActiveTab]    = useState("ALL");
  const [hoveredTile,  setHoveredTile]  = useState<string|null>(null);
  const [activePdfCat, setActivePdfCat] = useState("ALL");
  const [previewPdf,   setPreviewPdf]   = useState<PdfEntry|null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY       = useTransform(scrollYProgress, [0,1],   ["0%","30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.8], [1,0]);

  const filteredTiles = (
    activeTab==="ALL" ? tilesData : tilesData.filter(t=>t.categories.some(c=>c.toUpperCase()===activeTab))
  ).filter(t=>t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredPdfs: PdfEntry[] = (
    activePdfCat==="ALL" ? pdfsData : pdfsData.filter((p:any)=>p.category===activePdfCat)
  ) as PdfEntry[];

  return (
    <div style={{ background:"#0c0b09", fontFamily:"'Cormorant Garamond',Georgia,serif", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        :root{ --gold:#c9a96e; --gold-light:#e8d5a3; --cream:#f5f0e8; --dark:#0c0b09; --dark-2:#161410; --dark-3:#1e1c18; --dark-4:#252118; --text-muted:#7a7060; }
        *{ box-sizing:border-box; }
        .tile-card-img{ transition:transform 0.85s cubic-bezier(0.22,1,0.36,1); }
        .tile-card:hover .tile-card-img{ transform:scale(1.08); }
        .search-input::placeholder{ color:#5a5040; }
        .search-input:focus{ outline:none; }
        .tab-btn{ font-family:'Montserrat',sans-serif; font-size:11px; letter-spacing:0.18em; font-weight:500; transition:all 0.3s; border:none; cursor:pointer; background:transparent; position:relative; padding:10px 20px; color:#7a7060; }
        .tab-btn::after{ content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:0; height:1px; background:var(--gold); transition:width 0.3s ease; }
        .tab-btn.active{ color:var(--gold-light); }
        .tab-btn.active::after{ width:100%; }
        .tab-btn:hover:not(.active){ color:#c0b090; }
        .noise-overlay{ position:fixed; inset:0; pointer-events:none; z-index:1000; opacity:0.025; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .divider-line{ height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); }
        @keyframes shimmer{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        .gold-shimmer{ background:linear-gradient(90deg,var(--gold) 0%,var(--gold-light) 40%,var(--gold) 80%); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s ease infinite; }
        .hero-vertical-text{ writing-mode:vertical-rl; text-orientation:mixed; transform:rotate(180deg); font-family:'Montserrat',sans-serif; font-size:10px; letter-spacing:0.3em; color:var(--gold); opacity:0.7; }
        .grid-line-bg{ background-image:linear-gradient(rgba(201,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.04) 1px,transparent 1px); background-size:80px 80px; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--dark)} ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
        .pdf-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        @media(max-width:1200px){ .pdf-grid{ grid-template-columns:repeat(3,1fr); } }
        @media(max-width:800px) { .pdf-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px) { .pdf-grid{ grid-template-columns:1fr; } }
      `}</style>

      <div className="noise-overlay"/>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position:"relative", height:"100svh", overflow:"hidden" }}>
        <motion.div style={{ y:heroY, position:"absolute", inset:0, scale:1.1 }}>
          <img src="/assets/images/catalogue/catalogue.jpg" alt="Catalogue" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(12,11,9,0.3) 0%,rgba(12,11,9,0.55) 50%,rgba(12,11,9,0.96) 100%)" }}/>
        </motion.div>
        <motion.div style={{ opacity:heroOpacity }} className="absolute inset-0 flex flex-col justify-center pb-20 px-10 md:px-24">
          <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-10 md:px-24">
            <span className="hero-vertical-text hidden md:block" style={{ height:120 }}>COLLECTION 2025</span>
            <nav style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, letterSpacing:"0.2em", color:"rgba(255,255,255,0.55)" }} className="flex items-center gap-3 mt-1">
              <Link href="/" style={{ color:"inherit" }}>HOME</Link>
              <span style={{ color:"var(--gold)", opacity:0.6 }}>—</span>
              <span style={{ color:"var(--gold-light)" }}>CATALOGUE</span>
            </nav>
          </div>
          <motion.div initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, ease:[0.22,1,0.36,1], delay:0.2 }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, letterSpacing:"0.35em", color:"var(--gold)", marginBottom:20 }}>STONE · MARBLE · LUXURY SURFACES</p>
            <h1 style={{ fontSize:"clamp(3.5rem,10vw,9rem)", fontWeight:300, lineHeight:0.9, color:"var(--cream)", letterSpacing:"-0.02em", marginBottom:32 }}>
              The Art of<br/><em className="gold-shimmer" style={{ fontStyle:"italic", fontWeight:400 }}>Surface.</em>
            </h1>
            <div className="divider-line" style={{ width:120, marginBottom:28 }}/>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, letterSpacing:"0.12em", color:"rgba(245,240,232,0.45)", maxWidth:340, lineHeight:1.9, fontWeight:300 }}>
              Curated stone and tile collections for spaces that demand distinction.
            </p>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:1 }} className="absolute bottom-10 right-10 md:right-24 flex flex-col items-center gap-2">
            <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.25em", color:"var(--text-muted)" }}>SCROLL</span>
            <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2, ease:"easeInOut" }} style={{ width:1, height:40, background:"linear-gradient(to bottom,var(--gold),transparent)" }}/>
          </motion.div>
        </motion.div>
      </div>

      {/* ══ TILES GRID ════════════════════════════════════════════ */}
      <div className="grid-line-bg" style={{ background:"var(--dark)" }}>
        <div style={{ maxWidth:1600, margin:"0 auto", padding:"80px clamp(20px,5vw,64px)" }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, gap:24 }}>
            <div>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.35em", color:"var(--gold)", marginBottom:12 }}>BROWSE COLLECTION</p>
              <h2 style={{ fontSize:"clamp(2rem,5vw,4rem)", fontWeight:300, color:"var(--cream)", lineHeight:1 }}>
                Our Tiles<span style={{ fontStyle:"italic", color:"var(--gold)", marginLeft:12 }}>&amp; Surfaces</span>
              </h2>
            </div>
            <div style={{ position:"relative", minWidth:280 }}>
              <svg style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Search tiles…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="search-input"
                style={{ width:"100%", padding:"12px 16px 12px 40px", background:"var(--dark-3)", border:"1px solid rgba(201,169,110,0.15)", borderRadius:2, color:"var(--cream)", fontFamily:"'Montserrat',sans-serif", fontSize:12, letterSpacing:"0.08em", transition:"border-color 0.3s" }}
                onFocus={e=>(e.currentTarget.style.borderColor="rgba(201,169,110,0.5)")}
                onBlur={e =>(e.currentTarget.style.borderColor="rgba(201,169,110,0.15)")}/>
            </div>
          </motion.div>

          <div className="divider-line"/>
          <div style={{ display:"flex", alignItems:"center", overflowX:"auto", borderBottom:"1px solid rgba(201,169,110,0.1)", marginBottom:40 }}>
            {tileCategories.map(cat=>(
              <button key={cat} onClick={()=>setActiveTab(cat)} className={`tab-btn ${activeTab===cat?"active":""}`}>{cat}</button>
            ))}
            <span style={{ marginLeft:"auto", flexShrink:0, paddingRight:8, fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.15em", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{filteredTiles.length} RESULTS</span>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" key={activeTab+searchQuery}
            style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:18 }}>
            <AnimatePresence mode="popLayout">
              {filteredTiles.length>0 ? filteredTiles.map((tile,i)=>(
                <motion.div key={tile.name} variants={cardVariants} layout className="tile-card"
                  style={{ position:"relative", borderRadius:2, overflow:"hidden", background:"var(--dark-3)", cursor:"pointer", border:"1px solid rgba(201,169,110,0.08)", gridRow:i%7===0?"span 2":"span 1" }}
                  onMouseEnter={()=>setHoveredTile(tile.name)} onMouseLeave={()=>setHoveredTile(null)}>
                  <div style={{ overflow:"hidden", height:i%7===0?"100%":"260px", minHeight:220 }}>
                    <img src={tile.file} alt={tile.name} className="tile-card-img w-full h-full" style={{ objectFit:"cover", display:"block" }} loading="lazy"/>
                  </div>
                  <motion.div initial={false} animate={{ opacity:hoveredTile===tile.name?1:0 }} transition={{ duration:0.3 }}
                    style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(12,11,9,0.95) 0%,rgba(12,11,9,0.4) 60%,transparent 100%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:20 }}>
                    <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.25em", color:"var(--gold)", marginBottom:6 }}>{tile.categories.join(" · ")}</p>
                    <p style={{ fontSize:"1.1rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.02em", lineHeight:1.2 }}>{tile.name}</p>
                    <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:24, height:1, background:"var(--gold)" }}/>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {hoveredTile!==tile.name && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                        style={{ position:"absolute", top:12, left:12, background:"rgba(12,11,9,0.75)", backdropFilter:"blur(8px)", border:"1px solid rgba(201,169,110,0.2)", padding:"4px 10px", borderRadius:1 }}>
                        <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.2em", color:"var(--gold-light)" }}>{tile.categories[0]}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )) : (
                <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  style={{ gridColumn:"1 / -1", textAlign:"center", padding:"100px 0" }}>
                  <div style={{ width:56, height:56, border:"1px solid rgba(201,169,110,0.3)", borderRadius:"50%", margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  </div>
                  <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, letterSpacing:"0.25em", color:"var(--text-muted)" }}>NO TILES FOUND</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ══ PDF CATALOGUES ════════════════════════════════════════ */}
      <div style={{ background:"var(--dark-2)", position:"relative", padding:"100px 0 80px" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('/assets/images/background/back3.jpg')", backgroundSize:"cover", backgroundAttachment:"fixed", opacity:0.04, pointerEvents:"none" }}/>
        <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 clamp(20px,5vw,64px)", position:"relative" }}>

          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.85, ease:[0.22,1,0.36,1] }}>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:24, marginBottom:16 }}>
              <div>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.4em", color:"var(--gold)", marginBottom:14 }}>DOWNLOADABLE RESOURCES</p>
                <h2 style={{ fontSize:"clamp(2.2rem,5vw,4.5rem)", fontWeight:300, color:"var(--cream)", lineHeight:1, letterSpacing:"-0.02em" }}>
                  Product <em className="gold-shimmer" style={{ fontStyle:"italic", fontWeight:400 }}>Catalogues</em>
                </h2>
              </div>
              <div style={{ display:"flex", gap:28, alignItems:"center" }}>
                {[{ num:String(pdfsData.length), label:"CATALOGUES" }, { num:"PDF", label:"FORMAT" }, { num:"FREE", label:"DOWNLOAD" }].map((s,i)=>(
                  <React.Fragment key={i}>
                    {i>0 && <span style={{ width:1, height:38, background:"rgba(201,169,110,0.18)" }}/>}
                    <div style={{ textAlign:"center" }}>
                      <p style={{ fontSize:"1.9rem", fontWeight:300, color:"var(--gold)", lineHeight:1 }}>{s.num}</p>
                      <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, letterSpacing:"0.2em", color:"var(--text-muted)", marginTop:4 }}>{s.label}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="divider-line"/>
            <div style={{ display:"flex", alignItems:"center", overflowX:"auto", borderBottom:"1px solid rgba(201,169,110,0.1)", marginBottom:40 }}>
              {pdfCategories.map(cat=>(
                <button key={cat} onClick={()=>setActivePdfCat(cat)} className={`tab-btn ${activePdfCat===cat?"active":""}`}>{cat}</button>
              ))}
              <span style={{ marginLeft:"auto", flexShrink:0, paddingRight:8, fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.15em", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{filteredPdfs.length} CATALOGUES</span>
            </div>
          </motion.div>

          <motion.div className="pdf-grid" variants={containerVariants} initial="hidden" animate="show" key={activePdfCat}>
            <AnimatePresence mode="popLayout">
              {filteredPdfs.map(pdf=>(
                <PdfCard key={pdf.file} pdf={pdf} onPreview={()=>setPreviewPdf(pdf)}/>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.3 }}
            style={{ marginTop:48, padding:"20px 28px", background:"rgba(201,169,110,0.04)", border:"1px solid rgba(201,169,110,0.1)", borderRadius:2, display:"flex", flexWrap:"wrap", alignItems:"center", gap:14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.55)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, color:"var(--text-muted)", letterSpacing:"0.06em", lineHeight:1.7, flex:1 }}>
              Click <strong style={{ color:"var(--gold-light)" }}>VIEW</strong> to preview the PDF in-browser, or <strong style={{ color:"var(--gold-light)" }}>DOWNLOAD</strong> to save it. For custom specs or bulk enquiries, <Link href="/contact_us" style={{ color:"var(--gold)", textDecoration:"none" }}>contact our team</Link>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:"var(--dark-2)", padding:"0 clamp(20px,5vw,64px) 56px" }}>
        <div className="divider-line" style={{ marginBottom:28 }}/>
        <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.25em", color:"var(--text-muted)", textAlign:"center" }}>
          © 2025 ROMOSO CERAMICA · ALL SURFACES RESERVED
        </p>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {previewPdf && <PdfModal pdf={previewPdf} onClose={()=>setPreviewPdf(null)}/>}
      </AnimatePresence>
    </div>
  );
}