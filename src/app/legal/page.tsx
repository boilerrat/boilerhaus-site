"use client";

import { useState, useEffect } from "react";

// ── Inline Logo ──────────────────────────────────────────────────────────
function BhMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 1 1"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <polygon points="0,0 1,0 0,1" style={{ fill: "var(--color-signal)" }} />
      <polygon points="1,0 1,1 0,1" style={{ fill: "var(--color-void)" }} />
    </svg>
  );
}

function BhLogo({ size = "sm" }: { size?: "sm" | "md" }) {
  const markSize = { sm: 16, md: 28 }[size];
  const gap = { sm: "8px", md: "12px" }[size];
  const fontSize = { sm: "1rem", md: "1.56rem" }[size];

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap }}
      role="img"
      aria-label="Boilerhaus"
    >
      <BhMark size={markSize} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "0.04em",
          lineHeight: 1,
          fontSize,
        }}
      >
        <span style={{ color: "var(--color-void)" }}>boiler</span>
        <span style={{ color: "var(--color-signal)" }}>haus</span>
      </span>
    </span>
  );
}

// ── Theme toggle ──────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("bh-theme") as "light" | "dark" | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setThemeState(next);
    localStorage.setItem("bh-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return { theme, toggle };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-rule)",
        background: "transparent",
        color: "var(--color-smoke)",
        cursor: "pointer",
        padding: 0,
        transition: "color 0.1s, border-color 0.1s",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.54 11.54l1.41 1.41M11.54 4.46l1.41-1.41M3.05 12.95l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function LegalIndex() {
  return (
    <>
      <div className="site-grid" aria-hidden="true" />

      {/* Topbar */}
      <header className="topbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div className="shell topbar-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
          <a href="https://boilerhaus.org/" aria-label="Boilerhaus home">
            <BhLogo size="sm" />
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main style={{ paddingTop: "calc(var(--topbar-height) + var(--space-9))", paddingBottom: "var(--space-9)", position: "relative", zIndex: 1 }}>
        <div className="shell">
          <div style={{ maxWidth: "76ch" }}>
            <p className="section-tag" style={{ marginBottom: "var(--space-4)" }}>Legal</p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, var(--type-2xl))",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                color: "var(--color-void)",
                marginBottom: "var(--space-7)",
              }}
            >
              Legal &amp; Privacy
            </h1>

            {/* Privacy Policy card */}
            <a
              href="/legal/privacy"
              style={{
                display: "block",
                padding: "var(--space-6)",
                border: "1px solid var(--color-rule)",
                borderRadius: "var(--radius-md)",
                transition: "border-color 0.2s",
                marginBottom: "var(--space-5)",
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-signal)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-rule)")}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--type-lg)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: "var(--color-void)",
                  margin: "0 0 var(--space-3)",
                }}
              >
                Privacy Policy
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--type-base)",
                  lineHeight: 1.65,
                  color: "var(--color-smoke)",
                  margin: 0,
                }}
              >
                What data boilerhaus.org collects, how it is used, and how to
                contact us about privacy requests.
              </p>
            </a>

            {/* Legal Notice card */}
            <div
              id="terms"
              style={{
                padding: "var(--space-6)",
                border: "1px solid var(--color-rule)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--type-lg)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: "var(--color-void)",
                  margin: "0 0 var(--space-3)",
                }}
              >
                Legal Notice
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--type-base)",
                  lineHeight: 1.65,
                  color: "var(--color-smoke)",
                  margin: "0 0 var(--space-4)",
                }}
              >
                Legal terms, copyright notice, and disclaimer governing the
                boilerhaus.org website.
              </p>

              <div
                style={{
                  borderTop: "1px solid var(--color-rule)",
                  paddingTop: "var(--space-5)",
                  marginTop: "var(--space-4)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--type-base)",
                    lineHeight: 1.75,
                    color: "var(--color-void)",
                    margin: "0 0 var(--space-4)",
                  }}
                >
                  <strong>Copyright &copy; 2026 boilerhaus.</strong> All rights
                  reserved.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--type-sm)",
                    lineHeight: 1.75,
                    color: "var(--color-smoke)",
                    margin: "0 0 var(--space-4)",
                  }}
                >
                  This website is operated by Boilerhaus. The content on this
                  site, including text, graphics, logos, and code, is the
                  property of Boilerhaus and is protected by applicable
                  intellectual property laws.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--type-sm)",
                    lineHeight: 1.75,
                    color: "var(--color-smoke)",
                    margin: "0 0 var(--space-4)",
                  }}
                >
                  This website is provided &quot;as is&quot; without warranties
                  of any kind, either express or implied. Boilerhaus does not
                  warrant that the site will be uninterrupted, error-free, or
                  free of viruses.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--type-sm)",
                    lineHeight: 1.75,
                    color: "var(--color-smoke)",
                    margin: 0,
                  }}
                >
                  For inquiries, licensing requests, or takedown notices,
                  contact us via the channels listed on{" "}
                  <a
                    href="https://boilerhaus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--color-signal)",
                      textDecoration: "underline",
                    }}
                  >
                    boilerhaus.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "var(--space-7) 0",
          borderTop: "1px solid var(--color-rule)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-5)" }}>
          <a href="https://boilerhaus.org/" aria-label="Back to top">
            <BhLogo size="sm" />
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--type-sm)", color: "var(--color-smoke)", margin: 0 }}>
            &copy; 2026 boilerhaus
          </p>
        </div>
      </footer>
    </>
  );
}
