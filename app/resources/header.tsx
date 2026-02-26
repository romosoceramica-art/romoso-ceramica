"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FaArrowUp } from "react-icons/fa";
import GoogleTranslate from "./googletranslate";

interface NavLink {
  name: string;
  path: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about_us" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Contact Us", path: "/contact_us" },
  ];

  const tickerItems = ["Premium Ceramics", "✦", "Artisanal Quality", "✦", "Luxury Tiles", "✦", "UAE's Finest", "✦"];

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(sy > 30);
      setShowScrollTop(sy > 200);
      setScrollProgress(docH > 0 ? (sy / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateIndicator = (el: HTMLElement | null, visible: boolean) => {
    if (!el || !navRef.current) {
      setIndicatorStyle(s => ({ ...s, opacity: 0 }));
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({ left: elRect.left - navRect.left, width: elRect.width, opacity: visible ? 1 : 0 });
  };

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(".hdr-nl.active") as HTMLElement;
    if (activeEl) updateIndicator(activeEl, true);
  }, [pathname]);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/971567027043?text=${encodeURIComponent("Hello! I'd like to know more about your products.")}`, "_blank");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Jost:wght@200;300;400;500;600&display=swap');

        :root {
          --gold: #c9a84c;
          --gold-l: #f0d080;
          --gold-d: #8a6820;
          --ink: #0d0d0d;
        }

        /* ══ TICKER ══ */
        .hdr-ticker {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 28px;
          background: var(--ink);
          z-index: 1001;
          overflow: hidden;
          display: flex;
          align-items: center;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s;
        }
        .hdr-ticker.gone { transform: translateY(-100%); opacity: 0; }

        .ticker-track {
          display: flex;
          animation: tickScroll 20s linear infinite;
          white-space: nowrap;
        }
        .ticker-item {
          padding: 0 28px;
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.65);
        }
        @keyframes tickScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ══ SHELL ══ */
        .hdr-shell {
          position: fixed;
          left: 0; right: 0;
          z-index: 1000;
          transition: top 0.45s cubic-bezier(0.4,0,0.2,1), background 0.5s, box-shadow 0.5s;
        }
        .hdr-shell.with-ticker { top: 28px; }
        .hdr-shell.no-ticker   { top: 0; }

        .hdr-shell.hdr-clear {
          background: transparent;
          box-shadow: none;
        }
        .hdr-shell.hdr-glass {
          background: rgba(250,249,246,0.93);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          box-shadow: 0 1px 0 rgba(201,168,76,0.12), 0 12px 48px rgba(0,0,0,0.07);
        }

        /* Gold reveal line */
        .hdr-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, var(--gold-d) 15%, var(--gold) 35%, var(--gold-l) 50%, var(--gold) 65%, var(--gold-d) 85%, transparent 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .hdr-shell.hdr-glass .hdr-topline { transform: scaleX(1); }

        /* Scroll progress */
        .hdr-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--gold-d), var(--gold), var(--gold-l));
          transition: width 0.12s linear;
          box-shadow: 0 0 8px rgba(201,168,76,0.5);
        }

        /* Inner */
        .hdr-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 44px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
        }
        @media (max-width: 900px) { .hdr-inner { padding: 0 20px; height: 62px; } }

        /* ══ LOGO ══ */
        .hdr-logo-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          text-decoration: none;
          position: relative;
        }
        .hdr-logo-wrap::after {
          content: '';
          position: absolute;
          right: -18px; top: 0%;
          transform: translateY(-50%);
          width: 1px; height: 26px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.22), transparent);
        }
        .hdr-logo-img {
          height: 180px; width: auto;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hdr-logo-wrap:hover .hdr-logo-img { transform: scale(1.05); }

        /* ══ NAV ══ */
        .hdr-nav-wrap {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .hdr-nav-list {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0; padding: 0;
          position: relative;
        }

        /* Sliding pill */
        .hdr-pill {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 34px;
          border-radius: 6px;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.14);
          pointer-events: none;
          transition: left 0.38s cubic-bezier(0.4,0,0.2,1), width 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.22s;
        }

        .hdr-nl {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #555;
          text-decoration: none;
          position: relative;
          white-space: nowrap;
          border-radius: 6px;
          transition: color 0.3s;
          z-index: 1;
        }
        .hdr-nl:hover, .hdr-nl.active { color: var(--ink); }

        /* Gold underline sweep */
        .hdr-nl-line {
          position: absolute;
          bottom: 4px; left: 20px; right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-l), var(--gold), transparent);
          transform: scaleX(0);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .hdr-nl:hover .hdr-nl-line,
        .hdr-nl.active .hdr-nl-line { transform: scaleX(1); }

        /* Active dot */
        .hdr-nl-dot {
          position: absolute;
          top: 8px; right: 9px;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 6px rgba(201,168,76,0.8);
          opacity: 0; transform: scale(0);
          transition: opacity 0.3s, transform 0.3s;
        }
        .hdr-nl.active .hdr-nl-dot { opacity: 1; transform: scale(1); }

        /* ══ CTA ══ */
        .hdr-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 22px;
          font-family: 'Jost', sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: var(--ink);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 5px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s, border-color 0.35s;
          white-space: nowrap;
        }
        .hdr-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(240,208,128,0.13), transparent);
          transition: left 0.55s cubic-bezier(0.4,0,0.2,1);
        }
        .hdr-cta:hover::before { left: 160%; }
        .hdr-cta:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(201,168,76,0.6);
          box-shadow: 0 8px 28px rgba(0,0,0,0.2), 0 0 0 1px rgba(201,168,76,0.1);
        }
        .cta-dots { display: flex; gap: 3px; align-items: center; }
        .cta-dots span {
          display: block;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,168,76,0.65);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.35s;
        }
        .cta-dots span:nth-child(2) { transition-delay: 0.05s; }
        .cta-dots span:nth-child(3) { transition-delay: 0.1s; }
        .hdr-cta:hover .cta-dots span { transform: scale(1.8); background: var(--gold-l); }

        /* Burger */
        .hdr-burger {
          display: none !important;
          color: var(--ink) !important;
          border: 1px solid rgba(201,168,76,0.2) !important;
          border-radius: 6px !important;
          padding: 7px !important;
          transition: all 0.3s !important;
        }
        .hdr-burger:hover {
          border-color: rgba(201,168,76,0.5) !important;
          background: rgba(201,168,76,0.05) !important;
        }
        @media (max-width: 900px) {
          .hdr-nav-wrap, .hdr-right { display: none !important; }
          .hdr-burger { display: inline-flex !important; }
        }

        /* ══ DRAWER ══ */
        .drw-outer {
          width: 310px; height: 100%;
          background: #fafaf8;
          display: flex; flex-direction: column;
          overflow: hidden; position: relative;
        }
        .drw-outer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-l), var(--gold), transparent);
          z-index: 1;
        }
        .drw-outer::after {
          content: '';
          position: absolute; inset: 0;
          opacity: 0.022;
          background-image:
            repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(-45deg, #c9a84c 0, #c9a84c 1px, transparent 1px, transparent 24px);
          background-size: 24px 24px;
          pointer-events: none; z-index: 0;
        }

        .drw-head {
          position: relative; z-index: 2;
          padding: 28px 24px 22px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .drw-head::after {
          content: '';
          position: absolute; bottom: 0; left: 24px; right: 24px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent);
        }

        .drw-logo { height: 120px; width: auto; object-fit: contain; cursor: pointer; }

        .drw-close {
          width: 32px !important; height: 32px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(201,168,76,0.18) !important;
          color: #666 !important;
          transition: all 0.3s !important;
        }
        .drw-close:hover {
          border-color: rgba(201,168,76,0.5) !important;
          background: rgba(201,168,76,0.06) !important;
          color: #222 !important;
        }

        .drw-nav {
          position: relative; z-index: 2;
          padding: 28px 20px 16px;
          flex: 1;
        }
        .drw-label {
          font-size: 7px; letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          margin-bottom: 18px; padding: 0 8px;
          font-family: 'Jost', sans-serif;
        }

        .drw-link {
          display: flex; align-items: center;
          width: 100%; padding: 13px 14px;
          margin-bottom: 4px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: none;
          cursor: pointer; text-align: left;
          font-family: 'Jost', sans-serif;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative; overflow: hidden;
          gap: 0;
        }
        .drw-link::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.03));
          opacity: 0; transition: opacity 0.3s;
        }
        .drw-link:hover, .drw-link.active {
          border-color: rgba(201,168,76,0.16);
          transform: translateX(4px);
        }
        .drw-link:hover::before, .drw-link.active::before { opacity: 1; }

        .drw-bar {
          width: 2px; height: 0;
          border-radius: 2px;
          background: linear-gradient(180deg, var(--gold-d), var(--gold), var(--gold-l));
          margin-right: 14px;
          transition: height 0.35s cubic-bezier(0.4,0,0.2,1);
          flex-shrink: 0;
        }
        .drw-link.active .drw-bar { height: 20px; }

        .drw-num {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: 10px;
          color: rgba(201,168,76,0.35);
          min-width: 22px;
          transition: color 0.3s;
        }
        .drw-link:hover .drw-num, .drw-link.active .drw-num { color: var(--gold); }

        .drw-name {
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #555; margin-left: 8px;
          transition: color 0.3s;
        }
        .drw-link:hover .drw-name, .drw-link.active .drw-name { color: var(--ink); }

        .drw-arrow {
          margin-left: auto; font-size: 10px;
          color: rgba(201,168,76,0.3);
          transition: transform 0.3s, color 0.3s;
        }
        .drw-link:hover .drw-arrow, .drw-link.active .drw-arrow {
          transform: translateX(4px); color: var(--gold);
        }

        .drw-foot {
          position: relative; z-index: 2;
          padding: 16px 20px 32px;
        }
        .drw-foot::before {
          content: ''; display: block; height: 1px; margin-bottom: 20px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
        }

        .drw-cta-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; width: 100%; padding: 14px;
          border-radius: 6px;
          background: var(--ink);
          border: 1px solid rgba(201,168,76,0.22);
          color: rgba(255,255,255,0.85);
          font-family: 'Jost', sans-serif;
          font-size: 9.5px; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase;
          cursor: pointer; overflow: hidden; position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
          margin-bottom: 14px;
        }
        .drw-cta-btn::before {
          content: '';
          position: absolute; top: 0; left: -80%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(240,208,128,0.1), transparent);
          animation: ctaShimmer 3s ease infinite;
        }
        @keyframes ctaShimmer { 0% { left: -80%; } 100% { left: 180%; } }
        .drw-cta-btn:hover { border-color: rgba(201,168,76,0.5); box-shadow: 0 4px 18px rgba(0,0,0,0.15); }

        .drw-contact {
          display: flex; align-items: center; justify-content: center;
          gap: 8px;
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: 12px;
          color: rgba(0,0,0,0.28);
        }
        .drw-contact a {
          color: rgba(201,168,76,0.65);
          text-decoration: none; font-size: 11px;
          transition: color 0.3s;
        }
        .drw-contact a:hover { color: var(--gold); }

        /* ══ FABS ══ */
        .fab-wa {
          position: fixed;
          bottom: 28px; right: 28px;
          z-index: 2000;
          width: 54px; height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          display: flex; align-items: center; justify-content: center;
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 6px 24px rgba(37,211,102,0.4);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
        }
        .fab-wa:hover {
          transform: scale(1.12) translateY(-3px);
          box-shadow: 0 14px 38px rgba(37,211,102,0.55);
        }
        .fab-wa::before, .fab-wa::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(37,211,102,0.4);
          animation: waPing 2.4s cubic-bezier(0,0,0.2,1) infinite;
        }
        .fab-wa::after { animation-delay: 1.2s; }
        @keyframes waPing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2); opacity: 0; }
        }

        .fab-up {
          position: fixed;
          bottom: 96px; right: 28px;
          z-index: 2000;
          width: 46px; height: 46px;
          border-radius: 50%;
          background: var(--ink);
          border: 1px solid rgba(201,168,76,0.28);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(0,0,0,0.22);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .fab-up:hover {
          transform: translateY(-4px) scale(1.1);
          border-color: rgba(201,168,76,0.65);
          color: var(--gold-l);
          box-shadow: 0 12px 34px rgba(0,0,0,0.28), 0 0 0 1px rgba(201,168,76,0.12);
        }
        .fab-up.show { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .fab-up.hide { opacity: 0; pointer-events: none; transform: translateY(14px); }
      `}</style>

      {/* TICKER */}
      <div className={`hdr-ticker ${scrolled ? "gone" : ""}`}>
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className={`hdr-shell ${scrolled ? "no-ticker hdr-glass" : "with-ticker hdr-clear"}`}>
        <div className="hdr-topline" />
        <div className="hdr-progress" style={{ width: `${scrollProgress}%` }} />

        <div className="hdr-inner">
          {/* Logo */}
          <Link href="/" className="hdr-logo-wrap" aria-label="Romoso Ceramica">
            <img src="/assets/images/company_logo/logo_name.png" alt="Romoso Ceramica" className="hdr-logo-img" />
          </Link>

          {/* Nav */}
          <div className="hdr-nav-wrap">
            <ul
              ref={navRef}
              className="hdr-nav-list"
              onMouseLeave={() => {
                const a = navRef.current?.querySelector(".hdr-nl.active") as HTMLElement;
                updateIndicator(a || null, !!a);
              }}
            >
              <div className="hdr-pill" style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }} />
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`hdr-nl ${pathname === link.path ? "active" : ""}`}
                    onMouseEnter={(e) => updateIndicator(e.currentTarget, true)}
                    onMouseLeave={() => {
                      const a = navRef.current?.querySelector(".hdr-nl.active") as HTMLElement;
                      updateIndicator(a || null, !!a);
                    }}
                  >
                    {link.name}
                    <span className="hdr-nl-line" />
                    <span className="hdr-nl-dot" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="hdr-right">
            <GoogleTranslate />
            <Link href="/contact_us" className="hdr-cta">
              <span className="cta-dots">
                <span /><span /><span />
              </span>
              Get Us
            </Link>
          </div>

          {/* Burger */}
          <IconButton className="hdr-burger" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <MenuIcon fontSize="small" />
          </IconButton>
        </div>
      </header>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { background: "transparent", boxShadow: "none", overflow: "visible" } }}
      >
        <div className="drw-outer">
          <div className="drw-head">
            <img src="/assets/images/company_logo/logo_black.png" alt="Romoso Ceramica" className="drw-logo" onClick={() => handleNavClick("/")} />
            <IconButton className="drw-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>

          <div className="drw-nav">
            <p className="drw-label">✦ &nbsp; Pages</p>
            {navLinks.map((link, i) => (
              <button key={link.name} onClick={() => handleNavClick(link.path)} className={`drw-link ${pathname === link.path ? "active" : ""}`}>
                <span className="drw-bar" />
                <span className="drw-num">0{i + 1}</span>
                <span className="drw-name">{link.name}</span>
                <span className="drw-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="drw-foot">
            <GoogleTranslate />
            <div style={{ height: 12 }} />
            <button className="drw-cta-btn" onClick={() => handleNavClick("/contact_us")}>
              <span style={{ width: 5, height: 5, border: "1px solid rgba(201,168,76,0.55)", transform: "rotate(45deg)", display: "inline-block", flexShrink: 0 }} />
              Get In Touch
            </button>
            <div className="drw-contact">
              <span>or call</span>
              <a href="tel:+971567027043">+971 56 702 7043</a>
            </div>
          </div>
        </div>
      </Drawer>

      {/* WhatsApp */}
      <button className="fab-wa" onClick={handleWhatsAppClick} aria-label="WhatsApp">
        <WhatsAppIcon fontSize="small" />
      </button>

      {/* Scroll Top */}
      <button className={`fab-up ${showScrollTop ? "show" : "hide"}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
        <FaArrowUp size={15} />
      </button>
    </>
  );
}