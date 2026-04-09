"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Inline Badge ──────────────────────────────────────────────────────────
function BhBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "var(--type-xs)",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "3px 8px",
        borderRadius: "2px",
        color: "var(--color-smoke)",
        background: "color-mix(in srgb, var(--color-smoke) 10%, var(--color-paper))",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// ── Inline Logo (not yet in the package's public exports) ──────────────────
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

function BhLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const markSize = { sm: 16, md: 28, lg: 56 }[size];
  const gap = { sm: "8px", md: "10px", lg: "18px" }[size];
  const fontSize = { sm: "1rem", md: "1.25rem", lg: "3.81rem" }[size];

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

// ── Data ───────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Agents", href: "#agents" },
  { label: "Connect", href: "#connect" },
];

const socialLinks = [
  { label: "Farcaster", href: "https://farcaster.xyz/boiler" },
  { label: "GitHub", href: "https://github.com/BoilerHAUS" },
  { label: "Substack", href: "https://substack.com/@boiler" },
  { label: "Telegram", href: "https://t.me/boilerrat" },
];

const principles = [
  {
    index: "01",
    title: "Speed with safety",
    copy: "Move fast, never at the expense of safety or quality. Velocity without integrity is just drift.",
  },
  {
    index: "02",
    title: "Guardrails by design",
    copy: "Governance is embedded into tooling and workflows from the start, not bolted on after the fact.",
  },
  {
    index: "03",
    title: "Built to ship",
    copy: "Ethical development and practical utility are not in tension. We build products that real people will actually use.",
  },
];

const products = [
  {
    name: "ScopeHouse",
    subtitle: "Renovation operating system",
    copy: "A structured control layer for residential renovation projects — scope, budget, schedule, decisions, and change tracking in one shared record.",
    badge: "coming soon" as const,
    href: "https://github.com/BoilerHAUS/ScopeHouse",
  },
  {
    name: "boilerhaus-ui",
    subtitle: "Design system & component SDK",
    copy: "A Bauhaus-inspired design system for all boilerhaus products. Tokens, components, and patterns published as an open-source npm package.",
    badge: "in progress" as const,
    href: "https://github.com/BoilerHAUS/boilerhaus-ui",
  },
  {
    name: "claude-eats",
    subtitle: "AI-powered dinner planner",
    copy: "A self-hosted weekly dinner planner powered by Claude AI. Plan meals, generate shopping lists, and reduce decision fatigue — running on your own infrastructure.",
    badge: "complete" as const,
    href: "https://github.com/BoilerHAUS/claude-eats",
  },
  {
    name: "moltch",
    subtitle: "Agentic messaging layer",
    copy: "The output and relay layer for boilerhaus agents. moltch handles shareable command output, multi-agent message routing, and structured execution logs.",
    badge: "coming soon" as const,
    href: "https://github.com/BoilerHAUS/moltch",
  },
];

const agents = [
  {
    name: "boiler",
    role: "The orchestrator",
    copy: "The human behind the agents. boiler sets direction, reviews output, and keeps the build grounded in real-world judgment.",
    href: "https://github.com/boilerrat",
    human: true,
  },
  {
    name: "boilerclaw",
    role: "Autonomous builder agent",
    copy: "The primary build agent. boilerclaw handles code generation, implementation tasks, and autonomous development work across the stack.",
    href: "https://github.com/boilerclaw",
    human: false,
  },
  {
    name: "boilermolt",
    role: "Companion execution agent",
    copy: "The coordination and output layer. boilermolt manages command outputs, shareable notes, and multi-agent workflow execution.",
    href: "https://github.com/boilermolt",
    human: false,
  },
];

// ── Theme toggle ──────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("bh-theme") as "light" | "dark" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8Z" fill="currentColor" />
        </svg>
      ) : (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.54 11.54l1.41 1.41M11.54 4.46l1.41-1.41M3.05 12.95l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <div className="site-grid" aria-hidden="true" />

      {/* Topbar */}
      <header className="topbar">
        <div className="shell topbar-inner">
          <a href="#top" aria-label="Boilerhaus home">
            <BhLogo size="sm" />
          </a>
          <nav className="topbar-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="hero-section shell">
          <div className="hero-copy">
            <p className="section-tag">Agentic development platform</p>
            <h1 className="hero-headline">
              A development
              <br />
              agency for agents.
            </h1>
            <p className="hero-lede">
              We move ideas to life quickly and safely — embedding guardrails
              that enable human–AI collaboration and real-world utility.
            </p>
            <div className="hero-actions">
              {socialLinks.map((link) => (
                <a key={link.label} className="btn-outline" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Decorative Bauhaus mark */}
          <div className="hero-mark-col" aria-hidden="true">
            <svg viewBox="0 0 1 1" className="hero-mark-svg" role="presentation">
              <polygon points="0,0 1,0 0,1" style={{ fill: "var(--color-signal)" }} />
              <polygon points="1,0 1,1 0,1" style={{ fill: "var(--color-void)" }} />
            </svg>
          </div>
        </section>

        {/* ── Principles ── */}
        <section className="principles-section" id="work">
          <div className="shell principles-content">
            <div className="section-headline">
              <p className="section-tag">How we work</p>
              <h2 className="section-h2">
                The principles that guide every build.
              </h2>
              <p className="section-lede">
                Speed, safety, and shipping are not trade-offs. They are the
                same goal, approached with discipline.
              </p>
            </div>
            <div className="principles-grid">
              {principles.map((p) => (
                <div key={p.index} className="principle-card">
                  <p className="principle-index">{p.index}</p>
                  <h3 className="principle-title">{p.title}</h3>
                  <p className="principle-copy">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our work ── */}
        <section className="work-section">
          <div className="shell work-content">
            <div className="section-headline">
              <p className="section-tag">Our work</p>
              <h2 className="section-h2">What we&rsquo;re building.</h2>
              <p className="section-lede">
                Products shaped around real problems, built with the same
                guardrails and discipline we advocate for.
              </p>
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <a
                  key={product.name}
                  className="product-card"
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="product-eyebrow">
                    <p className="product-subtitle">{product.subtitle}</p>
                    <BhBadge>{product.badge}</BhBadge>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-copy">{product.copy}</p>
                  <span className="product-link">View on GitHub ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Agents ── */}
        <section className="agents-section" id="agents">
          <div className="shell agents-content">
            <div className="section-headline">
              <p className="section-tag">Our agents</p>
              <h2 className="section-h2">
                Human&ndash;AI collaboration, in practice.
              </h2>
              <p className="section-lede agents-lede">
                The boilerhaus agent roster works alongside human contributors
                across the full development lifecycle.
              </p>
            </div>
            <div className="agents-grid">
              {agents.map((agent) => (
                <a
                  key={agent.name}
                  className={`agent-card${agent.human ? " agent-card--human" : ""}`}
                  href={agent.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="agent-role">{agent.role}</p>
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-copy">{agent.copy}</p>
                  <span className="agent-link">GitHub profile ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer" id="connect">
        <div className="shell footer-inner">
          <a href="#top" aria-label="Back to top">
            <BhLogo size="sm" />
          </a>
          <nav className="footer-links" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
          <div className="footer-copyright-group" style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap" }}>
            <Link href="/legal" className="footer-legal-link">Privacy</Link>
            <Link href="/legal#terms" className="footer-legal-link">Legal</Link>
            <p className="footer-copyright">&copy; 2026 boilerhaus</p>
          </div>
        </div>
      </footer>
    </>
  );
}
