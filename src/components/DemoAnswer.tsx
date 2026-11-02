import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Source = { title: string; domain: string; note: string };
type Script = { answer: string; sources: Source[]; followUps: string[] };

const VETERAN: Script = {
  answer:
    "As a veteran, you can apply for VA health care online, by phone, or by mail. [1]\n\nHere's the short version:\n\n1. Check that you served on active duty and weren't dishonorably discharged. [1]\n2. Apply at va.gov/health-care/apply — it takes about 15 minutes. [1]\n3. VA determines your priority group and sends your decision letter, usually within a few weeks. [2]\n\nMany veterans are enrolled with no copays at all, depending on service history and income. [2]",
  sources: [
    { title: "Apply for VA health care", domain: "va.gov", note: "Official application" },
    {
      title: "VA health benefits overview",
      domain: "va.gov",
      note: "Eligibility & priority groups",
    },
    { title: "Veterans' health care records", domain: "usa.gov", note: "Government-wide guide" },
  ],
  followUps: [
    "What documents do I need to apply?",
    "Will I pay copays?",
    "How do I replace my social security card?",
  ],
};

const SOCIAL_SECURITY: Script = {
  answer:
    "You can replace a lost or stolen Social Security card for free — never pay anyone for this. [1]\n\nHere's how:\n\n1. Create or sign in to your personal my Social Security account at ssa.gov. [1]\n2. Request the replacement card online — in most states it arrives by mail in 10–14 days. [1]\n3. If your state doesn't support online requests, gather proof of identity and visit a local office. [2]\n\nYou're limited to three replacement cards per year and ten in a lifetime. [2]",
  sources: [
    { title: "Replace your Social Security card", domain: "ssa.gov", note: "Step-by-step" },
    { title: "Get or replace a card", domain: "ssa.gov", note: "Limits & documents" },
    { title: "Social Security cards", domain: "usa.gov", note: "Government-wide guide" },
  ],
  followUps: [
    "I'm a veteran. How do I get care?",
    "When do I qualify for Medicare?",
    "How do I book a campsite in a national park?",
  ],
};

const PARK: Script = {
  answer:
    "Campsite reservations for national parks are made through Recreation.gov — the official booking site. [1]\n\nQuick plan:\n\n1. Search recreation.gov for the park or campground you want. [1]\n2. Popular spots (Yosemite, Glacier, Shenandoah) open bookings in monthly windows, often 5–6 months ahead — set an arrival alert. [2]\n3. Pay the reservation fee and download your confirmation; park entry passes are separate. [2]\n\nFirst-come campgrounds still exist if a reservation slips away — arrive early in the morning. [3]",
  sources: [
    { title: "Find a campsite", domain: "recreation.gov", note: "Official reservations" },
    { title: "Plan your visit", domain: "nps.gov", note: "National Park Service" },
    { title: "National park passes", domain: "usa.gov", note: "Entry fees & passes" },
  ],
  followUps: [
    "How do I get a national parks pass?",
    "How do I replace my social security card?",
    "Help me find a new job",
  ],
};

const MEDICARE: Script = {
  answer:
    "Most people qualify for Medicare at 65, even if they're still working. [1]\n\nKey dates:\n\n1. Your Initial Enrollment Period is the 7 months starting 3 months before your 65th birthday month. [1]\n2. Sign up for Part A (hospital) and Part B (medical) during that window to avoid a late penalty. [1]\n3. If you already get Social Security benefits, you're usually enrolled automatically at 65. [2]\n\nUnder 65? You may qualify earlier through disability or certain conditions like ESRD. [2]",
  sources: [
    {
      title: "Medicare eligibility & enrollment",
      domain: "medicare.gov",
      note: "Official program site",
    },
    { title: "Apply for Medicare", domain: "ssa.gov", note: "Social Security Administration" },
    { title: "Medicare", domain: "usa.gov", note: "Government-wide guide" },
  ],
  followUps: [
    "What does Part B cost?",
    "I'm a veteran. How do I get care?",
    "How do I replace my social security card?",
  ],
};

const NAME_CHANGE: Script = {
  answer:
    "Congratulations! After a marriage (or court order), update your name in this order. [1]\n\n1. Social Security card first — file Form SS-5 with proof of identity and the marriage certificate. [1]\n2. Driver's license or state ID at your local DMV, usually within days of the SSA update. [2]\n3. Passport: submit Form DS-82 (or DS-5504 within a year of issuance) with a new photo. [3]\n\nThen roll through banks, employers, and voter registration — most accept the updated SSA card. [1]",
  sources: [
    { title: "Change your name with Social Security", domain: "ssa.gov", note: "Form SS-5" },
    { title: "Change your name with the DMV", domain: "usa.gov", note: "State-by-state" },
    {
      title: "Change a name on a passport",
      domain: "travel.state.gov",
      note: "Department of State",
    },
  ],
  followUps: [
    "How do I replace my social security card?",
    "When do I qualify for Medicare?",
    "Help me find a new job",
  ],
};

const JOB: Script = {
  answer:
    "Your fastest official starting points for a job search: [1]\n\n1. CareerOneStop (careeronestop.org) — free resume builder, training finder, and local job listings sponsored by the Department of Labor. [1]\n2. USAJOBS.gov — every open federal position, with resume templates tuned for federal hiring. [2]\n3. Your state's American Job Center offers free career coaching and workshops, in person or online. [3]\n\nIf you were recently laid off, you may qualify for Reemployment Assistance programs. [1]",
  sources: [
    { title: "CareerOneStop job search", domain: "careeronestop.org", note: "Dept. of Labor" },
    { title: "Federal government jobs", domain: "usajobs.gov", note: "Official federal hiring" },
    { title: "Find a job center near you", domain: "dol.gov", note: "Dept. of Labor" },
  ],
  followUps: [
    "How do I register my new business?",
    "I'm a veteran. How do I get care?",
    "When do I qualify for Medicare?",
  ],
};

const BUSINESS: Script = {
  answer:
    "Registering a new business follows the same backbone in every state. [1]\n\n1. Pick a legal structure (LLC, corporation, sole proprietorship) — SBA.gov's Business Guide walks through the trade-offs. [1]\n2. Register the business name and file formation paperwork with your state. [2]\n3. Get an EIN from the IRS online — it's free and takes minutes. [3]\n4. Check whether you need federal or state licenses for your industry. [1]\n\nOpen a business bank account once your EIN arrives so finances stay separate. [3]",
  sources: [
    { title: "Start your business", domain: "sba.gov", note: "Small Business Administration" },
    { title: "Register your business by state", domain: "usa.gov", note: "State filings" },
    { title: "Apply for an EIN online", domain: "irs.gov", note: "Internal Revenue Service" },
  ],
  followUps: [
    "Help me find a new job",
    "How do I replace my social security card?",
    "How do I book a campsite in a national park?",
  ],
};

const HELLO: Script = {
  answer:
    "Hi! Great to meet you.\n\nI'm the America.gov assistant. Here's how I work: you ask a question in plain English, and I search official government sources only — ssa.gov, va.gov, medicare.gov, usa.gov and the like — then write a short, step-by-step answer with links you can trust. No ads, no data sold, no account needed. [1]\n\nThere's no live backend connected yet, so this is a preview with sample answers — but the full flow you're watching (search, cross-check, write, cite) is exactly what the real service will do. [2]\n\nTry typing a question above, or tap one of the suggestions below.",
  sources: [
    { title: "How America.gov works", domain: "america.gov", note: "About this service" },
    {
      title: "USA.gov — the official guide",
      domain: "usa.gov",
      note: "Government-wide information",
    },
    {
      title: "U.S. Government Websites",
      domain: "gsa.gov",
      note: "General Services Administration",
    },
  ],
  followUps: [
    "How do I replace my social security card?",
    "I'm a veteran. How do I get care?",
    "How do I book a campsite in a national park?",
  ],
};

const GENERIC: Script = {
  answer:
    "Good question — here's how I'd answer it once live: I search official government sources only, cross-check that pages are current, and write a short step-by-step answer with citations. [1]\n\nThis preview runs on sample answers while the real search and writing engine is being built, but every part of the flow you see — the source scan, the freshness check, the typed answer, the citations — is the real interface design. [2]\n\nTry one of the example questions below to see a complete answer.",
  sources: [
    { title: "How America.gov works", domain: "america.gov", note: "About this service" },
    {
      title: "USA.gov — the official guide",
      domain: "usa.gov",
      note: "Government-wide information",
    },
  ],
  followUps: [
    "How do I replace my social security card?",
    "I'm a veteran. How do I get care?",
    "When do I qualify for Medicare?",
    "How do I register my new business?",
  ],
};

function scriptFor(question: string): Script {
  const q = question.toLowerCase();
  if (
    /^(hi|hey|hello|yo|sup|hola|good (morning|afternoon|evening))\b/.test(q.trim()) ||
    q.trim() === "hi!"
  )
    return HELLO;
  if (q.includes("social security") || q.includes("card")) return SOCIAL_SECURITY;
  if (q.includes("veteran") || q.includes("va ") || q.includes("va care")) return VETERAN;
  if (q.includes("camp") || q.includes("park") || q.includes("hike") || q.includes("reservation"))
    return PARK;
  if (q.includes("medicare") || q.includes("medicaid")) return MEDICARE;
  if (q.includes("married") || q.includes("name") || q.includes("passport")) return NAME_CHANGE;
  if (q.includes("job") || q.includes("career") || q.includes("hire") || q.includes("unemploy"))
    return JOB;
  if (q.includes("business") || q.includes("llc") || q.includes("company") || q.includes("ein"))
    return BUSINESS;
  return GENERIC;
}

const CSS = `
.demo-backdrop{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:16px;
  background:color-mix(in oklab,#0b1533 55%,transparent);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  animation:demoFade .25s ease-out-quint}
.demo-panel{position:relative;width:min(680px,100%);max-height:min(86vh,860px);display:flex;flex-direction:column;
  border-radius:28px;background:var(--color-background-primary,#fff);overflow:hidden;
  box-shadow:0 40px 120px -20px rgba(2,20,70,.55),0 0 0 1px rgba(20,60,160,.12);
  animation:demoPanel .55s cubic-bezier(.22,1.4,.36,1)}
.demo-panel::before{content:"";position:absolute;inset:-2px;border-radius:30px;padding:2px;z-index:-1;
  background:conic-gradient(from var(--demo-spin,0deg),#2563eb,#38bdf8,#22d3ee,#6366f1,#2563eb);
  animation:demoSpin 6s linear infinite}
@property --demo-spin{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes demoSpin{to{--demo-spin:360deg}}
.demo-orbs{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.demo-orbs i{position:absolute;border-radius:999px;filter:blur(34px);opacity:.5;animation:demoFloat 9s ease-in-out infinite alternate}
@keyframes demoFloat{from{transform:translateY(-14px) translateX(0)}to{transform:translateY(18px) translateX(22px)}}
.demo-head{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid rgba(15,40,110,.08)}
.demo-orb{position:relative;width:30px;height:30px;border-radius:999px;flex:none;
  background:conic-gradient(from 0deg,#2563eb,#22d3ee,#6366f1,#2563eb);animation:demoPulse 2.4s ease-in-out infinite}
.demo-orb::after{content:"";position:absolute;inset:-5px;border-radius:999px;border:1.5px solid rgba(37,99,235,.5);animation:demoRing 2.4s ease-out infinite}
@keyframes demoRing{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.7);opacity:0}}
@keyframes demoPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.demo-bubble{align-self:flex-end;max-width:85%;margin:18px 18px 6px auto;padding:10px 16px;border-radius:20px 20px 6px 20px;
  background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;font-weight:500;line-height:1.45;
  animation:demoPop .5s cubic-bezier(.2,1.6,.4,1) both;box-shadow:0 10px 24px -8px rgba(37,99,235,.5)}
@keyframes demoPop{from{transform:translateY(16px) scale(.85);opacity:0}to{transform:none;opacity:1}}
.demo-stages{display:flex;gap:6px;flex-wrap:wrap;margin:8px 18px 2px}
.demo-stage{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:600;
  background:rgba(37,99,235,.07);color:rgba(15,40,110,.55);border:1px solid transparent;
  animation:demoPop .45s cubic-bezier(.2,1.5,.4,1) both}
.demo-stage[data-on="true"]{color:#1d4ed8;border-color:rgba(37,99,235,.35);background:rgba(37,99,235,.1)}
.demo-dots{display:inline-flex;gap:3px}
.demo-dots i{width:4px;height:4px;border-radius:99px;background:#1d4ed8;animation:demoDot 1s ease-in-out infinite}
.demo-dots i:nth-child(2){animation-delay:.15s}.demo-dots i:nth-child(3){animation-delay:.3s}
@keyframes demoDot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}
.demo-answer{margin:14px 18px 0;padding:16px 18px;border-radius:16px;background:rgba(15,40,110,.045);
  font-size:15px;line-height:1.65;white-space:pre-wrap;animation:demoRise .5s ease-out-quint both;min-height:64px}
@keyframes demoRise{from{transform:translateY(10px);opacity:0}to{transform:none;opacity:1}}
.demo-caret{display:inline-block;width:8px;height:1.05em;vertical-align:-3px;margin-left:2px;border-radius:2px;
  background:#1d4ed8;animation:demoCaret .8s steps(2) infinite}
@keyframes demoCaret{0%,49%{opacity:1}50%,100%{opacity:0}}
.demo-badge{margin:12px 18px 0;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;
  color:#b45309;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);padding:5px 11px;border-radius:999px;
  animation:demoPop .5s .2s cubic-bezier(.2,1.5,.4,1) both}
.demo-scan{position:relative;overflow:hidden;margin:16px 18px 0;border-radius:14px;background:rgba(15,40,110,.045);padding:14px}
.demo-scan-row{display:flex;flex-wrap:wrap;gap:8px}
.demo-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;font-size:12.5px;font-weight:600;
  background:#fff;border:1px solid rgba(37,99,235,.25);color:#1e3a8a;position:relative;overflow:hidden;
  animation:demoPill .55s cubic-bezier(.2,1.5,.4,1) both}
.demo-pill::after{content:"";position:absolute;inset:0;transform:translateX(-110%);
  background:linear-gradient(105deg,transparent 30%,rgba(56,189,248,.35) 50%,transparent 70%);
  animation:demoSweep 1.4s ease-in-out infinite}
.demo-pill b{width:18px;height:18px;border-radius:6px;background:#1d4ed8;color:#fff;font-size:10px;display:grid;place-items:center}
@keyframes demoPill{from{transform:translateY(14px) scale(.8);opacity:0}to{transform:none;opacity:1}}
@keyframes demoSweep{to{transform:translateX(110%)}}
.demo-bar{position:relative;height:3px;border-radius:99px;background:rgba(15,40,110,.1);margin-top:12px;overflow:hidden}
.demo-bar i{position:absolute;inset:0;width:40%;border-radius:99px;
  background:linear-gradient(90deg,#2563eb,#22d3ee);animation:demoBar 1.2s ease-in-out infinite}
@keyframes demoBar{from{left:-40%}to{left:100%}}
.demo-sources{margin:14px 18px 0;display:grid;gap:8px}
.demo-source{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:14px;background:#fff;
  border:1px solid rgba(15,40,110,.12);animation:demoSource .55s cubic-bezier(.2,1.5,.4,1) both;position:relative;overflow:hidden}
.demo-source::after{content:"";position:absolute;inset:0;transform:translateX(-110%);
  background:linear-gradient(105deg,transparent 35%,rgba(56,189,248,.25) 50%,transparent 65%);
  animation:demoSweep 1.6s ease-in-out infinite;animation-delay:var(--d,0s)}
.demo-source b{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-size:13px;color:#fff;
  background:linear-gradient(135deg,#1d4ed8,#0ea5e9)}
.demo-source span{display:block;font-size:13.5px;font-weight:600;color:#0f172a}
.demo-source small{display:block;font-size:12px;color:#64748b}
.demo-source em{margin-left:auto;flex:none;font-style:normal;font-size:11.5px;font-weight:700;color:#1d4ed8;
  background:rgba(37,99,235,.1);padding:3px 8px;border-radius:99px}
@keyframes demoSource{from{transform:translateX(-18px);opacity:0}to{transform:none;opacity:1}}
.demo-follow{margin:16px 18px 20px;display:flex;flex-wrap:wrap;gap:8px}
.demo-follow button{padding:9px 15px;border-radius:999px;font-size:13px;font-weight:600;color:#1d4ed8;background:#fff;
  border:1px solid rgba(37,99,235,.35);cursor:pointer;transition:transform .2s cubic-bezier(.2,1.5,.4,1),box-shadow .2s;
  animation:demoPop .5s cubic-bezier(.2,1.5,.4,1) both}
.demo-follow button:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 8px 20px -8px rgba(37,99,235,.55)}
.demo-follow button:active{transform:scale(.95)}
.demo-close{margin-left:auto;flex:none;width:32px;height:32px;border-radius:999px;border:none;cursor:pointer;display:grid;place-items:center;
  background:rgba(15,40,110,.08);color:#0f172a;transition:background .2s,transform .2s}
.demo-close:hover{background:rgba(15,40,110,.16);transform:rotate(90deg)}
.demo-body{overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;display:flex;flex-direction:column}
.demo-body::-webkit-scrollbar{display:none}
.demo-label{margin:18px 18px -6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7c93c9}
@media (prefers-reduced-motion:reduce){
  .demo-panel,.demo-bubble,.demo-stage,.demo-pill,.demo-source,.demo-follow button,.demo-answer,.demo-badge{animation:none!important}
  .demo-pill::after,.demo-source::after,.demo-bar i,.demo-orb::after{animation:none!important}
}
`;

const STAGE_LABELS = [
  "Searching official sources",
  "Cross-checking freshness",
  "Writing your answer",
];

export function DemoAnswer({ question, onClose }: { question: string; onClose: () => void }) {
  const [current, setCurrent] = useState(question);
  const [runId, setRunId] = useState(0);
  const script = useMemo(() => scriptFor(current), [current]);
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Reset the whole sequence on a new question.
  useEffect(() => {
    setStage(0);
    setTyped(0);
    setDone(false);
    const t1 = window.setTimeout(() => setStage(1), 1300);
    const t2 = window.setTimeout(() => setStage(2), 2500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [current, runId]);

  // Stream the answer.
  useEffect(() => {
    if (stage < 2) return;
    const id = window.setInterval(() => {
      setTyped((t) => {
        if (t >= script.answer.length) {
          window.clearInterval(id);
          setDone(true);
          return t;
        }
        return Math.min(script.answer.length, t + 3);
      });
    }, 14);
    return () => window.clearInterval(id);
  }, [stage, script, runId]);

  // Keep the stream scrolled to the bottom.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed, stage]);

  // Lock page scroll + close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const ask = (next: string) => {
    setCurrent(next);
    setRunId((id) => id + 1);
  };

  return (
    <div
      className="demo-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Preview answer"
      onClick={onClose}
      data-demo-answer=""
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="demo-panel" onClick={(e) => e.stopPropagation()}>
        <div className="demo-orbs" aria-hidden="true">
          <i
            style={{ left: "-40px", top: "-30px", width: 180, height: 180, background: "#60a5fa" }}
          />
          <i
            style={{
              right: "-50px",
              top: "80px",
              width: 220,
              height: 220,
              background: "#22d3ee",
              animationDelay: "1.4s",
            }}
          />
          <i
            style={{
              left: "30%",
              bottom: "-80px",
              width: 260,
              height: 260,
              background: "#818cf8",
              animationDelay: "2.6s",
            }}
          />
        </div>
        <div className="demo-head">
          <span className="demo-orb" aria-hidden="true" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>America.gov</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>· preview</span>
          <button className="demo-close" type="button" aria-label="Close preview" onClick={onClose}>
            <svg fill="none" height="16" viewBox="0 0 20 20" width="16" aria-hidden="true">
              <path
                d="M16 5.4L14.6 4L10 8.6L5.4 4L4 5.4L8.6 10L4 14.6L5.4 16L10 11.4L14.6 16L16 14.6L11.4 10L16 5.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="demo-body" ref={bodyRef}>
          <div className="demo-bubble">{current}</div>
          <div className="demo-stages" aria-live="polite">
            {STAGE_LABELS.map((label, i) => (
              <span
                className="demo-stage"
                key={label}
                data-on={stage >= i ? "true" : "false"}
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                {stage === i ? (
                  <span className="demo-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 99,
                      background: stage > i ? "#1d4ed8" : "rgba(15,40,110,.35)",
                    }}
                    aria-hidden="true"
                  />
                )}
                {label}
              </span>
            ))}
          </div>
          <p className="demo-label">Answer</p>
          <div className="demo-answer">
            {stage < 2 ? (
              <span className="demo-scan" style={{ display: "block", margin: 0, padding: 12 }}>
                <span className="demo-scan-row">
                  {[
                    script.sources[0]?.domain ?? "usa.gov",
                    "gsa.gov",
                    "usa.gov",
                    "nps.gov",
                    "ssa.gov",
                    "medicare.gov",
                  ]
                    .slice(0, 4)
                    .map((domain, i) => (
                      <span
                        className="demo-pill"
                        key={domain + i}
                        style={{ animationDelay: `${i * 0.14}s` }}
                      >
                        <b>↗</b>
                        {domain}
                      </span>
                    ))}
                </span>
                <span className="demo-bar">
                  <i />
                </span>
              </span>
            ) : (
              <>
                {script.answer.slice(0, typed)}
                {!done && <span className="demo-caret" aria-hidden="true" />}
              </>
            )}
          </div>
          {done && (
            <>
              <span className="demo-badge" style={{ alignSelf: "flex-start" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 1.5L12.6 7.4L19 8.2L14.3 12.5L15.5 19L10 15.8L4.5 19L5.7 12.5L1 8.2L7.4 7.4L10 1.5Z"
                    fill="currentColor"
                  />
                </svg>
                Preview mode — sample answer while the live engine is being built
              </span>
              <p className="demo-label" style={{ marginTop: 16 }}>
                Sources · only official sites
              </p>
              <div className="demo-sources">
                {script.sources.map((s, i) => (
                  <div
                    className="demo-source"
                    key={s.domain + s.title}
                    style={
                      {
                        animationDelay: `${0.08 * i}s`,
                        "--d": `${0.3 + 0.25 * i}s`,
                      } as CSSProperties
                    }
                  >
                    <b>{s.domain.slice(0, 1).toUpperCase()}</b>
                    <span style={{ minWidth: 0 }}>
                      <span>{s.title}</span>
                      <small>
                        {s.domain} · {s.note}
                      </small>
                    </span>
                    <em>[{i + 1}]</em>
                  </div>
                ))}
              </div>
              <div className="demo-follow">
                {script.followUps.map((f, i) => (
                  <button
                    type="button"
                    key={f}
                    style={{ animationDelay: `${0.15 * i}s` }}
                    onClick={() => ask(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
