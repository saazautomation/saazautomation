import type { NavItem, ProcessStep, Project, Review, Service, Stat, Tool } from "./types";

const img = {
  trading: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=720&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=720&q=80",
  voice: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=720&q=80",
  workflow: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&q=80",
  leads: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=720&q=80",
  consult: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=720&q=80",
  saas: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=720&q=80",
  ml: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=720&q=80",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=80",
  api: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=720&q=80",
  portfolio: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=720&q=80",
};

export const navItems: NavItem[] = [
  {
    label: "Trading Automation",
    href: "#about",
    sectionLabel: "Trading Automation",
    dropdown: [
      {
        id: "mt5-ea",
        title: "MT5 Expert Advisors",
        subtitle: "Custom EAs · MQL5",
        href: "#about",
        preview: {
          image: img.trading,
          quote: "Battle-tested Expert Advisors with disciplined risk, stealth execution, and full MQL5 control.",
          cta: "Explore Trading Bots",
          ctaHref: "#about",
        },
      },
      {
        id: "hedge-arb",
        title: "Hedge & Arbitrage Bots",
        subtitle: "Stealth Latency Systems",
        href: "#about",
        preview: {
          image: img.trading,
          quote: "Latency-aware hedge and arbitrage systems engineered for prop firms and serious operators.",
          cta: "View Solutions",
          ctaHref: "#about",
        },
      },
      {
        id: "scalper",
        title: "Scalper Bots",
        subtitle: "News + Slippage Filters",
        href: "#about",
        preview: {
          image: img.trading,
          quote: "High-frequency scalpers with news filters, slippage guards, and rollback protection built in.",
          cta: "See Scalper Systems",
          ctaHref: "#about",
        },
      },
      {
        id: "dashboards",
        title: "Performance Dashboards",
        subtitle: "Win Rate · Streaks · PnL",
        href: "#about",
        preview: {
          image: img.dashboard,
          quote: "Real-time performance dashboards — win rate, drawdown, streaks, and PnL at a glance.",
          cta: "View Dashboards",
          ctaHref: "#about",
        },
      },
      {
        id: "telegram",
        title: "Telegram Signal Bots",
        subtitle: "Multi-Lang · Auto-Onboard",
        href: "#about",
        preview: {
          image: img.workflow,
          quote: "Multi-language Telegram bots that onboard subscribers and deliver signals on autopilot.",
          cta: "Build Signal Bot",
          ctaHref: "#about",
        },
      },
    ],
  },
  {
    label: "AI Automation",
    href: "#about",
    sectionLabel: "AI Automation",
    dropdown: [
      {
        id: "chatbots",
        title: "AI Chatbots",
        subtitle: "Trained on Your Data",
        href: "#about",
        preview: {
          image: img.ai,
          quote: "Conversational AI trained on your knowledge base — support, sales, and qualification 24/7.",
          cta: "Build Chatbot",
          ctaHref: "#about",
        },
      },
      {
        id: "voice",
        title: "Voice Agents",
        subtitle: "Inbound & Outbound Calls",
        href: "/voice-agents",
        preview: {
          image: img.voice,
          quote: "AI voice agents that qualify leads, book appointments, and handle calls with full context.",
          cta: "Explore Voice Agents",
          ctaHref: "/voice-agents",
        },
      },
      {
        id: "real-estate",
        title: "Real Estate Voice AI",
        subtitle: "Leads · Showings · CRM Sync",
        href: "/real-estate",
        preview: {
          image: img.leads,
          quote: "AI voice agents built for agents and brokerages — qualify buyers, book showings, and never miss a high-intent lead.",
          cta: "Explore Real Estate AI",
          ctaHref: "/real-estate",
        },
      },
      {
        id: "agentic",
        title: "Agentic Workflows",
        subtitle: "Multi-Agent Systems",
        href: "/ai-automation",
        preview: {
          image: img.ai,
          quote: "Multi-agent systems that reason, plan, and execute complex workflows — your 24/7 AI workforce.",
          cta: "Explore Agents",
          ctaHref: "/ai-automation",
        },
      },
      {
        id: "leads",
        title: "Lead Generation",
        subtitle: "Scrape · Qualify · Outreach",
        href: "#about",
        preview: {
          image: img.leads,
          quote: "AI-powered scraping, qualification, and hyper-personalized outreach on complete autopilot.",
          cta: "Automate Pipeline",
          ctaHref: "#about",
        },
      },
      {
        id: "workflow-auto",
        title: "Workflow Automation",
        subtitle: "n8n · Make · Zapier · GHL",
        href: "/ai-automation",
        preview: {
          image: img.workflow,
          quote: "End-to-end ops automation across n8n, Make, Zapier, and GHL — 80% less manual work.",
          cta: "Explore AI Automation",
          ctaHref: "/ai-automation",
        },
      },
    ],
  },
  {
    label: "AI Consultancy",
    href: "#process",
    sectionLabel: "AI Consultancy",
    dropdown: [
      {
        id: "audit",
        title: "AI Strategy Audit",
        subtitle: "Where AI Pays Off",
        href: "#process",
        preview: {
          image: img.consult,
          quote: "A precise audit of where AI creates ROI in your business — no fluff, just leverage points.",
          cta: "Book Audit",
          ctaHref: "#cta",
        },
      },
      {
        id: "stack",
        title: "Tech Stack Review",
        subtitle: "Tools · Integrations · Cost",
        href: "#process",
        preview: {
          image: img.dashboard,
          quote: "We review your tools, integrations, and spend — then architect a stack that scales.",
          cta: "Review Stack",
          ctaHref: "#process",
        },
      },
      {
        id: "roadmap",
        title: "Implementation Roadmap",
        subtitle: "90-Day Action Plan",
        href: "#process",
        preview: {
          image: img.consult,
          quote: "A 90-day implementation roadmap with clear milestones, owners, and measurable outcomes.",
          cta: "Get Roadmap",
          ctaHref: "#cta",
        },
      },
      {
        id: "training",
        title: "Team Training",
        subtitle: "Internal AI Enablement",
        href: "#process",
        preview: {
          image: img.voice,
          quote: "Hands-on training so your team ships AI workflows internally — long after we leave.",
          cta: "Enable Your Team",
          ctaHref: "#cta",
        },
      },
    ],
  },
  {
    label: "Custom Solutions",
    href: "#about",
    sectionLabel: "Custom Solutions",
    dropdown: [
      {
        id: "saas",
        title: "SaaS Applications",
        subtitle: "Built From Scratch",
        href: "#about",
        preview: {
          image: img.saas,
          quote: "Full-stack SaaS products engineered from zero — auth, billing, dashboards, and scale.",
          cta: "Start Build",
          ctaHref: "#cta",
        },
      },
      {
        id: "ml",
        title: "ML Models",
        subtitle: "Predictive · Classification",
        href: "#about",
        preview: {
          image: img.ml,
          quote: "Custom models trained on your data — predictive analytics and classification that compound.",
          cta: "Train Model",
          ctaHref: "#about",
        },
      },
      {
        id: "internal",
        title: "Internal Tools",
        subtitle: "Dashboards · Calculators",
        href: "#about",
        preview: {
          image: img.dashboard,
          quote: "Internal dashboards and calculators that replace spreadsheets and manual ops overnight.",
          cta: "Build Tool",
          ctaHref: "#about",
        },
      },
      {
        id: "api",
        title: "API Integrations",
        subtitle: "Connect Anything",
        href: "#about",
        preview: {
          image: img.api,
          quote: "If two systems should talk, we wire them — webhooks, REST, and real-time sync included.",
          cta: "Connect Systems",
          ctaHref: "#integrations",
        },
      },
    ],
  },
  { label: "Showreel", href: "#showreel" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Partner Terms", href: "#" },
  { label: "Service Level (SLA)", href: "#" },
  { label: "Data Processing (DPA)", href: "#" },
];

export const footerNavLinks: {
  label: string;
  href: string;
  isBooking?: boolean;
}[] = [
  { label: "Features", href: "#about" },
  { label: "Pricing", href: "#showreel" },
  { label: "About Us", href: "#about" },
];

export const footerContact = {
  address: "2200 Envoy Circle, Louisville, KY 40299",
  email: "support@saazautomation.com",
};

export const marqueeItems = [
  "TRADING AUTOMATION",
  "MT5 EXPERT ADVISORS",
  "AI CHATBOTS",
  "VOICE AGENTS",
  "AGENTIC WORKFLOWS",
  "LEAD GENERATION",
  "SAAS APPLICATIONS",
  "ML MODELS",
  "N8N · MAKE · GHL · ZAPIER",
];

export const stats: Stat[] = [
  {
    target: 150,
    suffix: "+",
    label: "Automations Deployed",
    description: "Production systems live across trading desks and ops teams worldwide.",
    float: "tr",
    accent: false,
  },
  {
    target: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Founders who'd recommend us — without hesitation.",
    float: "ml",
    accent: true,
  },
  {
    target: 50,
    suffix: "+",
    label: "Enterprise Clients",
    description: "Prop firms, agencies, and high-growth operators scaling with AI.",
    float: "bc",
    accent: false,
  },
  {
    target: 10,
    suffix: "M+",
    label: "Dollars Saved",
    description: "Measurable ROI from automation — time, headcount, and lost leads recovered.",
    float: "br",
    accent: true,
  },
];

export const services: Service[] = [
  {
    num: "01 — TRADING",
    category: "TRADING",
    title: "TRADING BOTS",
    description:
      "Custom MT5 Expert Advisors — hedge bots, scalpers, latency arbitrage. Risk-managed, backtested, deployed.",
    featured: true,
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: "02 — AI",
    category: "AI",
    title: "AI AUTOMATION",
    description:
      "Intelligent process automation that eliminates repetitive tasks and frees your team to focus on what compounds.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "03 — ML",
    category: "ML",
    title: "ML MODELS",
    description:
      "Custom machine learning trained on your data — predictive analytics, classification, business intelligence.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "04 — CHAT",
    category: "CHAT",
    title: "AI CHATBOTS",
    description:
      "Conversational AI that handles support, sales, and qualification 24/7 — trained on your exact knowledge base.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    num: "05 — VOICE",
    category: "VOICE",
    title: "VOICE AGENTS",
    description:
      "Realistic AI voice agents that handle calls, qualify leads, book appointments — with full context in real time.",
    featured: true,
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  },
  {
    num: "06 — AGENTS",
    category: "AGENTS",
    title: "AGENTIC WORKFLOWS",
    description:
      "Multi-agent AI systems that reason, plan, and execute complex multi-step tasks. Your 24/7 AI workforce.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: "07 — LEADS",
    category: "LEADS",
    title: "LEAD GENERATION",
    description:
      "AI-powered lead scraping, qualification, and hyper-personalized outreach. Pipeline on autopilot.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    num: "08 — CUSTOM",
    category: "CUSTOM",
    title: "CUSTOM SOLUTIONS",
    description:
      "SaaS apps, internal tools, dashboards, API integrations. If it doesn't exist yet — we'll engineer it.",
    icon: (
      <svg className="srv-icon" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export const aboutTags = [
  "AI-First",
  "Trading-Native",
  "100% Custom",
  "Rapid Deployment",
  "24/7 Support",
  "Proven ROI",
];

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "DISCOVERY",
    description:
      "We audit operations, map automation opportunities, and define clear ROI targets. No fluff — just a precise diagnosis.",
    tag: "→ Week 1",
    icon: (
      <svg className="proc-icon" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "STRATEGY & DESIGN",
    description:
      "We architect your stack — the right models, frameworks, and automation patterns for your specific environment.",
    tag: "→ Week 1–2",
    icon: (
      <svg className="proc-icon" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "BUILD & INTEGRATE",
    description:
      "We develop, test, and integrate. Zero downtime. Full compatibility. Battle-tested before deployment.",
    tag: "→ Week 2–4",
    icon: (
      <svg className="proc-icon" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "LAUNCH & SCALE",
    description:
      "Go live with confidence. We monitor, optimize, and improve continuously. Your AI scales with your business.",
    tag: "→ Ongoing",
    icon: (
      <svg className="proc-icon" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export const tools: Tool[] = [
  { emoji: "📈", name: "MT5" },
  { emoji: "🤖", name: "OpenAI" },
  { emoji: "🧠", name: "Claude" },
  { emoji: "🔗", name: "n8n" },
  { emoji: "⚡", name: "Zapier" },
  { emoji: "🔧", name: "Make" },
  { emoji: "🏠", name: "GHL" },
  { emoji: "📊", name: "Airtable" },
  { emoji: "📧", name: "HubSpot" },
  { emoji: "💬", name: "Telegram" },
  { emoji: "🌊", name: "LangChain" },
  { emoji: "📱", name: "Twilio" },
];

export const projects: Project[] = [
  {
    tag: "AI Voice Agent · GHL · Twilio",
    title: "NEXUS CALL AI",
    description:
      "Fully autonomous AI voice agent handling 500+ daily calls, qualifying leads and booking directly to calendar — 0 human involvement.",
    bgText: "AI",
    image: img.voice,
    large: true,
  },
  {
    tag: "MT5 EA · MQL5 · XAUUSD",
    title: "HEDGE AUTOBOT",
    description: "Risk-managed hedge bot with rollback protection and slippage filtering.",
    bgText: "MT5",
    image: img.trading,
  },
  {
    tag: "n8n · Airtable · OpenAI",
    title: "FLOWCORE SYSTEM",
    description: "End-to-end ops automation — 80% manual work eliminated across 5 departments.",
    bgText: "WF",
    image: img.workflow,
    delay: ".15s",
  },
];

export const reviews: Review[] = [
  {
    text: "SAAZ deployed our MT5 trading bot with strict risk caps and a kill-switch. Six months live, zero manual overrides, and execution latency we could not hit by hand.",
    initials: "SR",
    name: "Sarah Ross",
    role: "Prop Firm Trader",
  },
  {
    text: "Their agentic system routes leads, updates CRM, and books calls without us babysitting every step. Response time went from hours to under a minute.",
    initials: "JM",
    name: "James Miller",
    role: "CEO, TechVentures Inc",
  },
  {
    text: "We needed business automation beyond chatbots. SAAZ built agentic workflows for invoicing, onboarding, and ops alerts — one stack, fully auditable.",
    initials: "AK",
    name: "Alex Khan",
    role: "Founder, GrowthLab Digital",
  },
  {
    text: "The trading automation handles entries, exits, and position sizing while we monitor P&L in real time. Disciplined, transparent, and built for production.",
    initials: "DL",
    name: "Daniel Lee",
    role: "Head of Quant, Meridian Capital",
  },
  {
    text: "Agentic AI agents research, decide, and execute tasks across our stack. SAAZ integrated brokers, Slack, and our data warehouse without breaking compliance.",
    initials: "NP",
    name: "Nina Patel",
    role: "CTO, FinEdge Systems",
  },
  {
    text: "From pilot to production in two weeks: AI automation for support tickets plus a sandboxed trading bot. Clear docs, secure keys, and a team that ships.",
    initials: "RC",
    name: "Ryan Cooper",
    role: "Director of Operations, ScaleFlow",
  },
];

export const serviceOptions = [
  "Trading Automation / MT5 Bots",
  "AI Automation",
  "AI Consultancy",
  "AI Chatbots",
  "Voice Agents",
  "ML Models",
  "Lead Generation",
  "Custom Business Solution",
  "Other",
];
