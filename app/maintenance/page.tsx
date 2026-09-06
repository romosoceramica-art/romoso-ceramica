"use client";

import { useEffect, useState } from "react";

// List of things being verified before the site comes back up.
// Edit this to reflect whatever your team is actually checking.
const CHECKS = [
  { label: "Server response", status: "ok" as const },
  { label: "Database connection", status: "ok" as const },
  { label: "Network configuration", status: "checking" as const },
  { label: "Deployment pipeline", status: "pending" as const },
];

function StatusMark({ status }: { status: "ok" | "checking" | "pending" }) {
  if (status === "ok") return <span className="mark mark-ok">✓</span>;
  if (status === "checking") return <span className="mark mark-checking">···</span>;
  return <span className="mark mark-pending">–</span>;
}

export default function MaintenancePage() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="wrap">
      <div className="lamp" aria-hidden="true">
        <span className="lamp-core" />
        <span className="lamp-ring" />
      </div>

      <p className="eyebrow">Status</p>
      <h1>We're checking a few things behind the scenes</h1>
      <p className="lede">
        The site is temporarily offline while we verify the systems it
        depends on. This shouldn't take long — thanks for your patience.
      </p>

      <div className="panel">
        <div className="panel-head">
          <span>Pre-launch checks</span>
          <span className="live">running{".".repeat(dots)}</span>
        </div>
        <ul className="checklist">
          {CHECKS.map((c) => (
            <li key={c.label}>
              <StatusMark status={c.status} />
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="footnote">
        Need something urgently? Reach us at{" "}
        <a href="mailto:support@vercel.com">support@vercel.com</a>
      </p>

      <style jsx>{`
        .wrap {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 48px 24px;
          background: #14171a;
          color: #edede7;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
        }

        .lamp {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .lamp-core {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f2a93b;
          box-shadow: 0 0 16px 4px rgba(242, 169, 59, 0.55);
          z-index: 1;
        }

        .lamp-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(242, 169, 59, 0.35);
          animation: pulse 2.2s ease-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.4);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .eyebrow {
          margin: 0;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: #8b9198;
        }

        h1 {
          margin: 0;
          max-width: 620px;
          font-family: "Space Grotesk", -apple-system, BlinkMacSystemFont,
            sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.15;
          color: #f5f4ef;
        }

        .lede {
          margin: 0;
          max-width: 480px;
          font-size: 16px;
          line-height: 1.55;
          color: #b7bcc2;
        }

        .panel {
          margin-top: 12px;
          width: 100%;
          max-width: 420px;
          background: #1c2024;
          border: 1px solid #2a2f34;
          border-radius: 10px;
          padding: 18px 20px;
          text-align: left;
        }

        .panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: #8b9198;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #2a2f34;
        }

        .live {
          color: #f2a93b;
          min-width: 62px;
          text-align: right;
        }

        .checklist {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .checklist li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #d7dade;
        }

        .mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          font-size: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          flex-shrink: 0;
        }

        .mark-ok {
          background: rgba(122, 197, 130, 0.15);
          color: #7ac582;
        }

        .mark-checking {
          background: rgba(242, 169, 59, 0.15);
          color: #f2a93b;
        }

        .mark-pending {
          background: rgba(139, 145, 152, 0.15);
          color: #8b9198;
        }

        .footnote {
          margin-top: 4px;
          font-size: 13px;
          color: #6f757b;
        }

        .footnote a {
          color: #b7bcc2;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .lamp-ring {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}