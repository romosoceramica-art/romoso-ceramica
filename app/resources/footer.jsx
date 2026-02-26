"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about_us" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Contact", path: "/contact_us" },
  ];

  const topProducts = ["Sense", "Orange Sapphire", "Taj Mahal", "Precious Stone"];
  const socials = [
    { Icon: FaFacebookF, label: "Facebook" },
    { Icon: FaTwitter, label: "Twitter" },
    { Icon: FaInstagram, label: "Instagram" },
    { Icon: FaLinkedinIn, label: "LinkedIn" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&display=swap');

        .footer-root {
          font-family: 'Tenor Sans', sans-serif;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
        }

        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(180, 140, 90, 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 50%, rgba(180, 140, 90, 0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Decorative top border */
        .footer-top-border {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(180, 140, 90, 0.15) 20%, rgba(180, 140, 90, 0.6) 50%, rgba(180, 140, 90, 0.15) 80%, transparent 100%);
          position: relative;
        }

        .footer-top-border::before {
          content: '✦';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(180, 140, 90, 0.7);
          font-size: 10px;
          background: #0a0a0a;
          padding: 0 16px;
          letter-spacing: 4px;
        }

        /* Tagline */
        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(2rem, 5vw, 4rem);
          color: transparent;
          background: linear-gradient(135deg, #b8965a 0%, #e8d5a3 40%, #c9a86c 70%, #8a6a3a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          letter-spacing: 0.02em;
          line-height: 1.1;
          text-align: center;
          padding: 60px 24px 0;
          opacity: 0.9;
        }

        .footer-subtitle {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(180, 140, 90, 0.5);
          text-align: center;
          margin-top: 12px;
          margin-bottom: 0;
        }

        /* Horizontal rule */
        .footer-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180, 140, 90, 0.5), transparent);
          margin: 40px auto;
        }

        /* Main grid */
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 60px;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.4fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding: 0 24px 40px;
          }
        }

        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Logo column */
        .footer-logo img {
          width: 180px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.85;
          transition: opacity 0.4s ease;
        }

        .footer-logo img:hover {
          opacity: 1;
        }

        .footer-logo-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          line-height: 1.8;
          margin-top: 20px;
          max-width: 220px;
        }

        /* Column heading */
        .footer-col-heading {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(180, 140, 90, 0.75);
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }

        .footer-col-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 24px;
          height: 1px;
          background: rgba(180, 140, 90, 0.4);
        }

        /* Product list */
        .footer-product-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-product-list li {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
          cursor: default;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-product-list li::before {
          content: '';
          width: 0;
          height: 1px;
          background: rgba(180, 140, 90, 0.6);
          transition: width 0.4s ease;
          flex-shrink: 0;
        }

        .footer-product-list li:hover {
          color: rgba(200, 170, 110, 0.85);
        }

        .footer-product-list li:hover::before {
          width: 16px;
        }

        /* Nav links */
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-nav-list li a {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s ease;
          padding-bottom: 2px;
          display: inline-block;
        }

        .footer-nav-list li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(180, 140, 90, 0.8), transparent);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-nav-list li a:hover {
          color: rgba(200, 170, 110, 0.9);
        }

        .footer-nav-list li a:hover::after {
          width: 100%;
        }

        /* Contact */
        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .footer-contact-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-contact-label {
          font-size: 8px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(180, 140, 90, 0.5);
        }

        .footer-contact-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.3s ease;
          display: inline-block;
        }

        .footer-contact-value:hover {
          color: rgba(200, 170, 110, 0.85);
        }

        /* Bottom bar */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 40px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 20px;
        }

        @media (max-width: 640px) {
          .footer-bottom {
            flex-direction: column;
            padding: 24px;
            text-align: center;
          }
        }

        .footer-copy {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
        }

        .footer-copy span {
          color: rgba(180, 140, 90, 0.45);
        }

        /* Socials */
        .footer-socials {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(180, 140, 90, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
          font-size: 12px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(180, 140, 90, 0.15), rgba(200, 170, 110, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .footer-social-btn:hover {
          border-color: rgba(180, 140, 90, 0.6);
          color: rgba(200, 170, 110, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(180, 140, 90, 0.15);
        }

        .footer-social-btn:hover::before {
          opacity: 1;
        }

        /* Decorative corner ornament */
        .footer-ornament {
          text-align: center;
          color: rgba(180, 140, 90, 0.15);
          font-size: 11px;
          letter-spacing: 8px;
          padding: 0 0 20px;
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <footer className="footer-root">
        {/* Top decorative border */}
        <div className="footer-top-border" />

        {/* Hero tagline */}
        <h2 className="footer-tagline">Crafted with Earth, Perfected by Time</h2>
        <p className="footer-subtitle">Romoso Ceramica — Est. in Excellence</p>

        <div className="footer-divider" />

        {/* Main content grid */}
        <div className="footer-grid">
          {/* Column 1 — Logo + Description */}
          <div className="footer-logo">
            <Link href="/" aria-label="Home">
              <img
                src="/assets/images/company_logo/logo_white.png"
                alt="Romoso Ceramica Logo"
              />
            </Link>
            <p className="footer-logo-desc">
              Where artisanal tradition meets contemporary luxury. Each tile tells a story written in clay and fire.
            </p>
          </div>

          {/* Column 2 — Top Products */}
          <div>
            <p className="footer-col-heading">Collections</p>
            <ul className="footer-product-list">
              {topProducts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <p className="footer-col-heading">Navigate</p>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <p className="footer-col-heading">Get In Touch</p>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-label">Electronic Mail</span>
                <a
                  href="mailto:Patrick@romosoceramica.com"
                  className="footer-contact-value"
                >
                  Patrick@romosoceramica.com
                </a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-label">Telephone</span>
                <a href="tel:+971567027043" className="footer-contact-value">
                  +971 56 702 7043
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>Romoso Ceramica</span> — All rights reserved
          </p>
          <div className="footer-socials">
            {socials.map(({ Icon, label }, idx) => (
              <a
                key={idx}
                href="#"
                aria-label={label}
                className="footer-social-btn"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Ornamental footer mark */}
        <div className="footer-ornament">· · · ✦ · · ·</div>
      </footer>
    </>
  );
}