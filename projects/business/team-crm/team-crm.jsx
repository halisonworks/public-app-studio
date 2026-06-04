/**
 * Team CRM — Halison App Studio example
 *
 * A small-team sales CRM: pipeline, contacts, activities, tasks, and a weighted
 * forecast. It runs solo from a Studio preview (saved in your browser) and
 * becomes multi-user over a shared OneDrive / network folder once packaged.
 *
 * From the Halison App Studio public library:
 * https://github.com/halisonworks/public-app-studio
 *
 * Permitted use: personal, educational, and other non-commercial use.
 * You may modify it, but keep this header and the source link intact, and do
 * not sell, commercialize, or republish it. Released under the Halison App
 * Studio Examples License — see the LICENSE file in the repository above.
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard, KanbanSquare, Users, ListChecks, Plus, Moon, Sun,
  AlertTriangle, Clock, TrendingUp, Trophy, X, Building2, Phone, Mail,
  Calendar, CheckCircle2, Circle, ArrowRight, ArrowLeft, RotateCcw, Filter,
  StickyNote, Target, SlidersHorizontal, ChevronUp, ChevronDown, Trash2, Lock,
  FolderOpen, Share2, UserPlus, Database,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// =====================================================================
// Halison CRM — a multi-user sample for App Studio.
//
// Runs two ways from ONE file:
//  • Packaged app with a shared folder: data lives in OneDrive/Dropbox/an SMB
//    share via window.appStudio.shared. Every teammate who points at the SAME
//    folder shares one live pipeline — no server, no login. Edits merge
//    per-record (conflict-free), so two people can work at once.
//  • Studio preview / browser (no shared API): falls back to this device's
//    localStorage so the canvas still previews exactly as before.
//
// The team-sharing data model is the only thing that changed vs a single-user
// CRM: each entity (deal, contact, …) is a record in a collection, and each
// edit is a targeted put/del instead of rewriting one big blob.
// =====================================================================

// ---------- constants ----------
const PALETTE = ["#64748b", "#0ea5e9", "#8b5cf6", "#f59e0b", "#22c55e", "#ef4444", "#ec4899", "#14b8a6", "#6366f1", "#eab308"];
const SEED_STAGES = [
  { id: "lead", name: "Lead", prob: 0.1, color: "#64748b", kind: "open" },
  { id: "qualified", name: "Qualified", prob: 0.25, color: "#0ea5e9", kind: "open" },
  { id: "proposal", name: "Proposal", prob: 0.5, color: "#8b5cf6", kind: "open" },
  { id: "negotiation", name: "Negotiation", prob: 0.75, color: "#f59e0b", kind: "open" },
  { id: "won", name: "Won", prob: 1, color: "#22c55e", kind: "won" },
  { id: "lost", name: "Lost", prob: 0, color: "#ef4444", kind: "lost" },
];
const ACTIVITY_TYPES = ["Call", "Email", "Meeting", "Note"];
const STALE_DAYS = 21;
const STORAGE_KEY = "halison_crm_v1"; // local-mode blob
const ME_KEY = "halison_crm_me";      // which owner *this device* is (per install)

// ---------- helpers ----------
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const iso = (d) => d.toISOString().slice(0, 10);
const todayISO = () => iso(new Date());
const dFromNow = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
const dBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const fmtKr = (n) => (isFinite(n) ? "kr " + Math.round(n).toLocaleString("nb-NO") : "kr 0");
const fmtDate = (s) => { if (!s) return "—"; const d = new Date(s); return isNaN(d) ? "—" : d.toLocaleDateString("nb-NO", { day: "2-digit", month: "short", year: "2-digit" }); };
const monthKey = (s) => { const d = new Date(s); return isNaN(d) ? "—" : d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }); };
const folderShort = (p) => (p ? String(p).replace(/[\\/]+$/, "").split(/[\\/]/).pop() : "");

// ---------- seed data (loaded on demand, never automatically in shared mode) ----------
function seed() {
  const owners = [
    { id: "o1", name: "Anna Berg", initials: "AB" },
    { id: "o2", name: "Lars Vik", initials: "LV" },
    { id: "o3", name: "Mia Solheim", initials: "MS" },
    { id: "o4", name: "Erik Dahl", initials: "ED" },
  ];
  const companies = [
    { id: "c1", name: "Fjord Logistics", industry: "Logistics", size: 120 },
    { id: "c2", name: "Nordlys Energi", industry: "Energy", size: 340 },
    { id: "c3", name: "Vestland Helse", industry: "Healthcare", size: 80 },
    { id: "c4", name: "Polaris Retail", industry: "Retail", size: 600 },
    { id: "c5", name: "Brygge Software", industry: "SaaS", size: 45 },
    { id: "c6", name: "Arctic Manufacturing", industry: "Manufacturing", size: 210 },
    { id: "c7", name: "Sentrum Eiendom", industry: "Real Estate", size: 30 },
    { id: "c8", name: "Kyst Marine", industry: "Marine", size: 95 },
  ];
  const contacts = [
    { id: "p1", name: "Kari Nilsen", title: "COO", email: "kari@fjordlog.no", companyId: "c1", ownerId: "o1", lastContacted: dFromNow(-4) },
    { id: "p2", name: "Per Johansen", title: "CFO", email: "per@nordlys.no", companyId: "c2", ownerId: "o2", lastContacted: dFromNow(-12) },
    { id: "p3", name: "Ingrid Haugen", title: "IT Director", email: "ingrid@vhelse.no", companyId: "c3", ownerId: "o3", lastContacted: dFromNow(-2) },
    { id: "p4", name: "Ole Kristiansen", title: "Head of Ops", email: "ole@polaris.no", companyId: "c4", ownerId: "o1", lastContacted: dFromNow(-31) },
    { id: "p5", name: "Sofie Andersen", title: "CTO", email: "sofie@brygge.io", companyId: "c5", ownerId: "o4", lastContacted: dFromNow(-9) },
    { id: "p6", name: "Martin Olsen", title: "Plant Manager", email: "martin@arcticmfg.no", companyId: "c6", ownerId: "o2", lastContacted: dFromNow(-6) },
    { id: "p7", name: "Liv Pedersen", title: "GM", email: "liv@sentrum.no", companyId: "c7", ownerId: "o3", lastContacted: dFromNow(-1) },
    { id: "p8", name: "Jonas Larsen", title: "Procurement", email: "jonas@kystmarine.no", companyId: "c8", ownerId: "o4", lastContacted: dFromNow(-27) },
  ];
  const deals = [
    { id: "d1", name: "Fleet rollout", companyId: "c1", contactId: "p1", ownerId: "o1", value: 480000, stageId: "negotiation", createdAt: dFromNow(-70), stageEnteredAt: dFromNow(-12), expectedClose: dFromNow(25), nextAction: "Send revised contract", nextActionDue: dFromNow(3), status: "open" },
    { id: "d2", name: "Platform license", companyId: "c2", contactId: "p2", ownerId: "o2", value: 950000, stageId: "proposal", createdAt: dFromNow(-110), stageEnteredAt: dFromNow(-40), expectedClose: dFromNow(60), nextAction: "Follow up on proposal", nextActionDue: dFromNow(-5), status: "open" },
    { id: "d3", name: "Pilot expansion", companyId: "c3", contactId: "p3", ownerId: "o3", value: 220000, stageId: "qualified", createdAt: dFromNow(-30), stageEnteredAt: dFromNow(-8), expectedClose: dFromNow(45), nextAction: "Book technical review", nextActionDue: dFromNow(4), status: "open" },
    { id: "d4", name: "Enterprise deal", companyId: "c4", contactId: "p4", ownerId: "o1", value: 1300000, stageId: "lead", createdAt: dFromNow(-35), stageEnteredAt: dFromNow(-30), expectedClose: dFromNow(90), nextAction: "Qualify budget", nextActionDue: dFromNow(-2), status: "open" },
    { id: "d5", name: "Integration project", companyId: "c5", contactId: "p5", ownerId: "o4", value: 160000, stageId: "won", createdAt: dFromNow(-95), stageEnteredAt: dFromNow(-6), expectedClose: dFromNow(-6), nextAction: "", nextActionDue: "", status: "won" },
    { id: "d6", name: "Modernization", companyId: "c6", contactId: "p6", ownerId: "o2", value: 700000, stageId: "proposal", createdAt: dFromNow(-60), stageEnteredAt: dFromNow(-18), expectedClose: dFromNow(30), nextAction: "Present ROI model", nextActionDue: dFromNow(6), status: "open" },
    { id: "d7", name: "Starter plan", companyId: "c7", contactId: "p7", ownerId: "o3", value: 90000, stageId: "negotiation", createdAt: dFromNow(-25), stageEnteredAt: dFromNow(-5), expectedClose: dFromNow(10), nextAction: "Confirm pricing", nextActionDue: dFromNow(2), status: "open" },
    { id: "d8", name: "Onboarding package", companyId: "c8", contactId: "p8", ownerId: "o4", value: 300000, stageId: "qualified", createdAt: dFromNow(-50), stageEnteredAt: dFromNow(-26), expectedClose: dFromNow(50), nextAction: "Re-engage champion", nextActionDue: dFromNow(-1), status: "open" },
    { id: "d9", name: "Add-on module", companyId: "c4", contactId: "p4", ownerId: "o1", value: 240000, stageId: "lost", createdAt: dFromNow(-80), stageEnteredAt: dFromNow(-15), expectedClose: dFromNow(-15), nextAction: "", nextActionDue: "", status: "lost" },
    { id: "d10", name: "Support contract", companyId: "c3", contactId: "p3", ownerId: "o3", value: 130000, stageId: "lead", createdAt: dFromNow(-6), stageEnteredAt: dFromNow(-3), expectedClose: dFromNow(70), nextAction: "Discovery call", nextActionDue: dFromNow(5), status: "open" },
    { id: "d11", name: "Capacity expansion", companyId: "c2", contactId: "p2", ownerId: "o2", value: 520000, stageId: "negotiation", createdAt: dFromNow(-90), stageEnteredAt: dFromNow(-22), expectedClose: dFromNow(20), nextAction: "Legal review", nextActionDue: dFromNow(1), status: "open" },
  ];
  const activities = [
    { id: "a1", type: "Meeting", dealId: "d1", contactId: "p1", ownerId: "o1", note: "Walked through contract terms, mostly aligned.", date: dFromNow(-4) },
    { id: "a2", type: "Email", dealId: "d2", contactId: "p2", ownerId: "o2", note: "Sent full proposal with pricing tiers.", date: dFromNow(-12) },
    { id: "a3", type: "Call", dealId: "d3", contactId: "p3", ownerId: "o3", note: "Confirmed pilot scope and success metrics.", date: dFromNow(-2) },
    { id: "a4", type: "Meeting", dealId: "d6", contactId: "p6", ownerId: "o2", note: "Demo to plant leadership, strong interest.", date: dFromNow(-6) },
    { id: "a5", type: "Note", dealId: "d11", contactId: "p2", ownerId: "o2", note: "Procurement wants 3-year term for discount.", date: dFromNow(-22) },
    { id: "a6", type: "Call", dealId: "d8", contactId: "p8", ownerId: "o4", note: "Champion went quiet, need to re-engage.", date: dFromNow(-27) },
  ];
  const tasks = [
    { id: "t1", title: "Send revised contract", dealId: "d1", ownerId: "o1", dueDate: dFromNow(3), done: false },
    { id: "t2", title: "Follow up on proposal", dealId: "d2", ownerId: "o2", dueDate: dFromNow(-5), done: false },
    { id: "t3", title: "Qualify budget with Ole", dealId: "d4", ownerId: "o1", dueDate: dFromNow(-2), done: false },
    { id: "t4", title: "Book technical review", dealId: "d3", ownerId: "o3", dueDate: dFromNow(4), done: false },
    { id: "t5", title: "Prepare ROI model", dealId: "d6", ownerId: "o2", dueDate: dFromNow(6), done: false },
    { id: "t6", title: "Re-engage Kyst champion", dealId: "d8", ownerId: "o4", dueDate: dFromNow(-1), done: false },
    { id: "t7", title: "Send onboarding docs", dealId: "d5", ownerId: "o4", dueDate: dFromNow(-8), done: true },
  ];
  return { stages: SEED_STAGES.map((s) => ({ ...s })), owners, companies, contacts, deals, activities, tasks };
}

// =====================================================================
// Persistence layer — the only part that changed for multi-user.
// =====================================================================

// window.appStudio.shared exists only inside a PACKAGED app. When present we go
// multi-user over the shared folder; otherwise we keep the original localStorage
// behaviour so the canvas still previews in Studio / a browser.
const sharedApi = (typeof window !== "undefined" && window.appStudio && window.appStudio.shared) || null;
const SHARED = !!sharedApi;

const loadMe = () => { try { return localStorage.getItem(ME_KEY) || ""; } catch (e) { return ""; } };
const saveMe = (id) => { try { localStorage.setItem(ME_KEY, id || ""); } catch (e) {} };

// The in-memory view shape every component already expects.
function emptyDb() {
  return { stages: SEED_STAGES.map((s) => ({ ...s })), owners: [], companies: [], contacts: [], deals: [], activities: [], tasks: [] };
}
function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { const p = JSON.parse(raw); if (!p.stages || !p.stages.length) p.stages = SEED_STAGES.map((s) => ({ ...s })); return p; }
  } catch (e) {}
  return seed();
}

// Each entity type is a shared collection keyed by id; stages (order matters)
// live as a single config record. Rebuild the view from the merged team state.
const COLLECTION_KEYS = { owners: "owners", companies: "companies", contacts: "contacts", deals: "deals", activities: "activities", tasks: "tasks" };
function fromShared(state) {
  const arr = (name) => Object.values((state && state[name]) || {});
  const stages = state && state.config && Array.isArray(state.config.stages) ? state.config.stages : SEED_STAGES.map((s) => ({ ...s }));
  return { stages, owners: arr("owners"), companies: arr("companies"), contacts: arr("contacts"), deals: arr("deals"), activities: arr("activities"), tasks: arr("tasks") };
}
// Apply a single record change to the local view (optimistic update mirror of
// what the shared store will report back on the next subscribe tick).
function applyPut(db, collection, id, record) {
  if (collection === "config" && id === "stages") return { ...db, stages: record };
  const key = COLLECTION_KEYS[collection];
  if (!key) return db;
  const list = db[key];
  const exists = list.some((x) => x.id === id);
  return { ...db, [key]: exists ? list.map((x) => (x.id === id ? record : x)) : [...list, record] };
}
function applyDel(db, collection, id) {
  const key = COLLECTION_KEYS[collection];
  if (!key) return db;
  return { ...db, [key]: db[key].filter((x) => x.id !== id) };
}

// ---------- main ----------
export default function HalisonCRM() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [db, setDb] = useState(SHARED ? emptyDb() : loadLocal());
  const [folder, setFolder] = useState(null);
  const [folderReady, setFolderReady] = useState(!SHARED); // local mode is ready immediately
  const [me, setMe] = useState(loadMe());

  // Local-mode persistence (fallback when not packaged / no shared API).
  useEffect(() => {
    if (SHARED) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); } catch (e) {}
  }, [db]);

  // Shared-mode: resolve a previously chosen folder on startup.
  useEffect(() => {
    if (!SHARED) return;
    let alive = true;
    Promise.resolve(sharedApi.folder())
      .then((f) => { if (alive) { setFolder(f || null); setFolderReady(true); } })
      .catch(() => { if (alive) setFolderReady(true); });
    return () => { alive = false; };
  }, []);

  // Shared-mode: live-subscribe; every teammate's change lands here (~2s poll).
  useEffect(() => {
    if (!SHARED || !folder) return;
    const unsub = sharedApi.subscribe((state) => setDb(fromShared(state)));
    return () => { if (typeof unsub === "function") unsub(); };
  }, [folder]);

  const chooseFolder = async () => {
    try { const f = await sharedApi.chooseFolder(); if (f) setFolder(f); } catch (e) {}
  };

  // --- writes: per-record to the shared store, with an optimistic local mirror;
  //     in local mode just update state (the effect above persists the blob). ---
  const putRecord = (collection, id, record) => {
    setDb((s) => applyPut(s, collection, id, record));
    if (SHARED && folder) Promise.resolve(sharedApi.put(collection, id, record)).catch(() => {});
  };
  const delRecord = (collection, id) => {
    setDb((s) => applyDel(s, collection, id));
    if (SHARED && folder) Promise.resolve(sharedApi.del(collection, id)).catch(() => {});
  };

  const { stages, owners, companies, contacts, deals, activities, tasks } = db;
  const stageOf = (id) => stages.find((s) => s.id === id) || stages[0] || SEED_STAGES[0];
  const firstOpenId = (stages.find((s) => s.kind === "open") || stages[0] || SEED_STAGES[0]).id;

  const ownerName = (id) => owners.find((o) => o.id === id)?.name || "Unassigned";
  const ownerInit = (id) => owners.find((o) => o.id === id)?.initials || "?";
  const companyName = (id) => companies.find((c) => c.id === id)?.name || "—";
  const contactName = (id) => contacts.find((c) => c.id === id)?.name || "—";

  // Identity: who is using THIS device. New records attribute to them.
  const myOwner = owners.find((o) => o.id === me) || null;
  const defaultOwnerId = (myOwner && myOwner.id) || owners[0]?.id || "";
  const pickMe = (id) => { setMe(id); saveMe(id); };
  const addMe = (name, initials) => {
    const id = uid();
    const clean = (initials || name.replace(/[^A-Za-z ]/g, "").split(" ").map((w) => w[0]).join("")).slice(0, 3).toUpperCase();
    putRecord("owners", id, { id, name: name.trim(), initials: clean || "?" });
    pickMe(id);
  };

  const matchOwner = (id) => ownerFilter === "all" || id === ownerFilter;
  const fDeals = deals.filter((d) => matchOwner(d.ownerId));
  const fContacts = contacts.filter((c) => matchOwner(c.ownerId));
  const fActivities = activities.filter((a) => matchOwner(a.ownerId));
  const fTasks = tasks.filter((t) => matchOwner(t.ownerId));

  const dealMeta = (d) => {
    const daysInStage = dBetween(d.stageEnteredAt, todayISO());
    const dealActs = activities.filter((a) => a.dealId === d.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastTouch = dealActs[0]?.date || d.stageEnteredAt;
    const daysSinceTouch = dBetween(lastTouch, todayISO());
    const overdue = d.status === "open" && d.nextActionDue && new Date(d.nextActionDue) < new Date(todayISO());
    const stale = d.status === "open" && (daysInStage > STALE_DAYS || daysSinceTouch > STALE_DAYS);
    return { daysInStage, daysSinceTouch, overdue, stale, weighted: d.value * stageOf(d.stageId).prob };
  };

  const T = dark
    ? { app: "bg-slate-950 text-slate-100", panel: "bg-slate-900 border-slate-800", soft: "bg-slate-800/60", sub: "text-slate-400", line: "border-slate-800", hover: "hover:bg-slate-800", chip: "bg-slate-800 text-slate-300", input: "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500", grid: "#1e293b", axis: "#64748b" }
    : { app: "bg-slate-50 text-slate-900", panel: "bg-white border-slate-200", soft: "bg-slate-100", sub: "text-slate-500", line: "border-slate-200", hover: "hover:bg-slate-100", chip: "bg-slate-100 text-slate-600", input: "bg-white border-slate-300 text-slate-900 placeholder-slate-400", grid: "#e2e8f0", axis: "#94a3b8" };

  // --- entity reducers, now expressed as per-record writes ---
  const upsertDeal = (deal) => putRecord("deals", deal.id, deal);
  const moveDeal = (id, stageId) => {
    const d = deals.find((x) => x.id === id); if (!d) return;
    const st = stages.find((x) => x.id === stageId);
    const status = st?.kind === "won" ? "won" : st?.kind === "lost" ? "lost" : "open";
    putRecord("deals", id, { ...d, stageId, status, stageEnteredAt: todayISO() });
  };
  const upsertContact = (c) => putRecord("contacts", c.id, c);
  const addActivity = (a) => {
    putRecord("activities", a.id, a);
    if (a.contactId) { const c = contacts.find((x) => x.id === a.contactId); if (c) putRecord("contacts", c.id, { ...c, lastContacted: a.date }); }
  };
  const addTask = (t) => putRecord("tasks", t.id, t);
  const toggleTask = (id) => { const t = tasks.find((x) => x.id === id); if (t) putRecord("tasks", t.id, { ...t, done: !t.done }); };
  const saveStages = (newStages) => {
    putRecord("config", "stages", newStages);
    const validIds = new Set(newStages.map((x) => x.id));
    const fallbackOpen = newStages.find((x) => x.kind === "open") || newStages[0];
    deals.forEach((d) => {
      if (!validIds.has(d.stageId)) putRecord("deals", d.id, { ...d, stageId: fallbackOpen.id, status: fallbackOpen.kind === "open" ? "open" : fallbackOpen.kind });
    });
  };

  // Demo data is explicit (never auto-seeded into a team folder).
  const isEmpty = !deals.length && !contacts.length && !companies.length && !tasks.length && !activities.length;
  const loadSample = async () => {
    const s = seed();
    if (SHARED) {
      if (!folder) return;
      const all = [
        ["owners", s.owners], ["companies", s.companies], ["contacts", s.contacts],
        ["deals", s.deals], ["activities", s.activities], ["tasks", s.tasks],
      ];
      for (const [coll, rows] of all) for (const r of rows) await sharedApi.put(coll, r.id, r);
      await sharedApi.put("config", "stages", s.stages);
      // subscribe() will refresh the view on its next tick.
    } else {
      setDb(s);
    }
  };
  const resetAll = () => {
    if (SHARED) {
      if (!window.confirm("Clear ALL shared CRM data for the whole team? This cannot be undone.")) return;
      (async () => {
        for (const [coll, key] of Object.entries(COLLECTION_KEYS)) for (const r of db[key]) await sharedApi.del(coll, r.id);
        await sharedApi.del("config", "stages");
      })();
    } else if (window.confirm("Reset all CRM data back to the demo set? This clears your changes.")) {
      setDb(seed());
    }
  };

  const TABS = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "pipeline", name: "Pipeline", icon: KanbanSquare },
    { id: "contacts", name: "Contacts", icon: Users },
    { id: "activities", name: "Activities", icon: ListChecks },
  ];

  // Onboarding gates (shared mode only).
  if (SHARED && !folderReady) return <Splash dark={dark} text="Connecting to your team folder..." />;
  if (SHARED && !folder) return <FolderSetup onChoose={chooseFolder} />;

  return (
    <div className={`${T.app} h-screen w-full flex flex-col overflow-hidden font-sans`}>
      <header className={`flex items-center gap-3 px-4 py-3 border-b ${T.line} shrink-0`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">H</div>
          <div className="leading-tight">
            <div className="font-semibold text-sm">Halison CRM</div>
            <div className={`text-[11px] ${T.sub}`}>Small team · long cycles</div>
          </div>
        </div>
        <nav className="flex items-center gap-1 ml-2">
          {TABS.map((t) => {
            const Icon = t.icon; const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition ${active ? "bg-sky-500 text-white" : `${T.sub} ${T.hover}`}`}>
                <Icon size={15} /> <span className="hidden sm:inline">{t.name}</span>
              </button>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {SHARED && folder && (
            <button onClick={chooseFolder} title={`Sharing via ${folder}`}
              className={`hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${T.soft} ${T.hover} text-[11px]`}>
              <Share2 size={12} className="text-emerald-500" /> <span className="max-w-[140px] truncate">{folderShort(folder)}</span>
            </button>
          )}
          {isEmpty && (
            <button onClick={loadSample}
              className="hidden md:flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-sky-600 transition">
              <Database size={14} /> Load sample data
            </button>
          )}
          <button onClick={() => setModal({ type: "identity", title: "Who are you?" })} title="Set who you are"
            className={`hidden sm:flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${T.soft} ${T.hover} text-sm`}>
            <UserPlus size={14} className={T.sub} />
            <span className={myOwner ? "" : T.sub}>{myOwner ? myOwner.name.split(" ")[0] : "Set you"}</span>
          </button>
          <div className={`hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${T.soft} text-sm`}>
            <Filter size={14} className={T.sub} />
            <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)}
              className={`bg-transparent outline-none text-sm ${dark ? "text-slate-100" : "text-slate-700"}`}>
              <option value="all" className="text-slate-900">All owners</option>
              {owners.map((o) => <option key={o.id} value={o.id} className="text-slate-900">{o.name}</option>)}
            </select>
          </div>
          <button onClick={resetAll} title={SHARED ? "Clear team data" : "Reset demo data"} className={`p-2 rounded-lg ${T.soft} ${T.hover}`}><RotateCcw size={16} /></button>
          <button onClick={() => setDark((d) => !d)} title="Toggle theme" className={`p-2 rounded-lg ${T.soft} ${T.hover}`}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {isEmpty ? (
          <EmptyWorkspace T={T} shared={SHARED} onLoadSample={loadSample} onNewDeal={() => setModal({ type: "deal", title: "New deal" })} />
        ) : (
          <>
            {tab === "dashboard" && <Dashboard {...{ T, fDeals, dealMeta, companyName, setTab, setModal }} />}
            {tab === "pipeline" && <Pipeline {...{ T, stages, fDeals, dealMeta, ownerInit, ownerName, companyName, moveDeal, setModal }} />}
            {tab === "contacts" && <Contacts {...{ T, fContacts, companies, deals, activities, stageOf, ownerName, companyName, setModal }} />}
            {tab === "activities" && <Activities {...{ T, fActivities, fTasks, ownerName, ownerInit, deals, toggleTask, setModal }} />}
          </>
        )}
      </main>

      {modal && (
        <Modal T={T} onClose={() => setModal(null)} title={modal.title} wide={modal.type === "stages"}>
          {modal.type === "deal" && <DealForm {...{ T, stages, firstOpenId, owners, companies, contacts, defaultOwnerId, onSave: (d) => { upsertDeal(d); setModal(null); } }} />}
          {modal.type === "contact" && <ContactForm {...{ T, owners, companies, defaultOwnerId, existing: modal.data, onSave: (c) => { upsertContact(c); setModal(null); } }} />}
          {modal.type === "activity" && <ActivityForm {...{ T, owners, contacts, deals, defaultOwnerId, onSave: (a) => { addActivity(a); setModal(null); } }} />}
          {modal.type === "task" && <TaskForm {...{ T, owners, deals, defaultOwnerId, onSave: (t) => { addTask(t); setModal(null); } }} />}
          {modal.type === "stages" && <StageEditor {...{ T, stages, deals, onSave: (st) => { saveStages(st); setModal(null); }, onCancel: () => setModal(null) }} />}
          {modal.type === "dealDetail" && <DealDetail {...{ T, deal: modal.data, stages, stageOf, dealMeta, activities, tasks, ownerName, companyName, contactName, moveDeal, toggleTask }} />}
          {modal.type === "identity" && <IdentityForm {...{ T, owners, me, onPick: (id) => { pickMe(id); setModal(null); }, onAdd: (n, i) => { addMe(n, i); setModal(null); } }} />}
        </Modal>
      )}

      <div className={`text-[10px] ${T.sub} text-center py-1 border-t ${T.line} shrink-0`}>
        {SHARED
          ? "Shared live with your team through the chosen folder. Demo figures are illustrative, verify before relying on them."
          : "Demo data with sample figures, verify numbers before relying on them. Saved locally on this device (package the app to share with a team)."}
      </div>
    </div>
  );
}

// ---------- onboarding / identity ----------
function Splash({ text, dark }) {
  return <div className={`h-screen w-full flex items-center justify-center font-sans text-sm ${dark ? "bg-slate-950 text-slate-400" : "bg-slate-50 text-slate-500"}`}>{text}</div>;
}

function FolderSetup({ onChoose }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg mx-auto">H</div>
        <h1 className="text-lg font-semibold">Halison CRM — team setup</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Choose a folder inside OneDrive, Dropbox, or a network share to hold this CRM's data.
          Everyone who points at the SAME folder shares one live pipeline, with no server and no login.
        </p>
        <button onClick={onChoose} className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <FolderOpen size={16} /> Choose shared folder
        </button>
        <p className="text-[11px] text-slate-500">The first person creates an empty folder and clicks "Load sample data" (or just starts adding). Teammates pick the same folder to join.</p>
      </div>
    </div>
  );
}

function EmptyWorkspace({ T, shared, onLoadSample, onNewDeal }) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className={`max-w-md w-full ${T.panel} border rounded-2xl p-6 text-center space-y-3`}>
        <div className="w-11 h-11 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center mx-auto"><Database size={20} /></div>
        <h2 className="font-semibold">{shared ? "Your team's CRM is empty" : "No data yet"}</h2>
        <p className={`text-sm ${T.sub} leading-relaxed`}>
          {shared
            ? "Start with the demo pipeline to explore, or add your first real deal. Everything you add syncs to teammates on the same folder."
            : "Load the sample pipeline to explore, or add your first deal."}
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <button onClick={onLoadSample} className="flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-sky-600 transition"><Database size={15} /> Load sample data</button>
          <button onClick={onNewDeal} className={`flex items-center gap-1.5 ${T.soft} ${T.hover} text-sm px-3 py-2 rounded-lg transition`}><Plus size={15} /> New deal</button>
        </div>
      </div>
    </div>
  );
}

function IdentityForm({ T, owners, me, onPick, onAdd }) {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  return (
    <div className="space-y-4">
      <p className={`text-[11px] ${T.sub}`}>Tell the app who you are on this device, so your deals, activity and tasks are attributed to you across the team.</p>
      {owners.length > 0 && (
        <div className="space-y-2">
          <span className={`text-[11px] font-medium ${T.sub} block`}>I'm an existing teammate</span>
          <div className="space-y-1.5 max-h-44 overflow-y-auto">
            {owners.map((o) => (
              <button key={o.id} onClick={() => onPick(o.id)}
                className={`w-full text-left flex items-center gap-2 ${T.soft} ${T.hover} rounded-lg p-2 transition ${me === o.id ? "ring-2 ring-sky-500" : ""}`}>
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 text-[10px] font-bold flex items-center justify-center">{o.initials}</span>
                <span className="text-sm">{o.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <span className={`text-[11px] font-medium ${T.sub} block`}>Or add yourself</span>
        <div className="grid grid-cols-3 gap-2">
          <input className={`col-span-2 ${inputCls(T)}`} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inputCls(T)} placeholder="Initials" maxLength={3} value={initials} onChange={(e) => setInitials(e.target.value)} />
        </div>
        <button onClick={() => name.trim() && onAdd(name, initials)} disabled={!name.trim()}
          className="w-full bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition disabled:opacity-40">Add me</button>
      </div>
    </div>
  );
}

// ---------- Dashboard ----------
function Dashboard({ T, fDeals, dealMeta, companyName, setTab, setModal }) {
  const open = fDeals.filter((d) => d.status === "open");
  const openValue = open.reduce((s, d) => s + d.value, 0);
  const weighted = open.reduce((s, d) => s + dealMeta(d).weighted, 0);
  const won = fDeals.filter((d) => d.status === "won").length;
  const lost = fDeals.filter((d) => d.status === "lost").length;
  const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0;
  const attention = open.filter((d) => { const m = dealMeta(d); return m.stale || m.overdue; });

  const forecast = useMemo(() => {
    const map = {};
    open.forEach((d) => { const k = monthKey(d.expectedClose); if (!map[k]) map[k] = { month: k, value: 0, sort: new Date(d.expectedClose) }; map[k].value += dealMeta(d).weighted; });
    return Object.values(map).sort((a, b) => a.sort - b.sort).map((x) => ({ month: x.month, value: Math.round(x.value) }));
  }, [fDeals]);

  const kpis = [
    { label: "Open pipeline", value: fmtKr(openValue), icon: Target, color: "text-sky-500" },
    { label: "Weighted forecast", value: fmtKr(weighted), icon: TrendingUp, color: "text-violet-500" },
    { label: "Win rate", value: `${winRate}%`, sub: `${won}W · ${lost}L`, icon: Trophy, color: "text-emerald-500" },
    { label: "Needs attention", value: attention.length, icon: AlertTriangle, color: "text-amber-500" },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className={`${T.panel} border rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${T.sub}`}>{k.label}</span>
                <Icon size={16} className={k.color} />
              </div>
              <div className="text-xl font-semibold mt-2">{k.value}</div>
              {k.sub && <div className={`text-[11px] ${T.sub} mt-0.5`}>{k.sub}</div>}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${T.panel} border rounded-xl p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Weighted forecast by close month</h3>
            <span className={`text-[11px] ${T.sub}`}>open deals, probability-adjusted</span>
          </div>
          {forecast.length === 0 ? <Empty T={T} text="No open deals to forecast." /> : (
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={forecast} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.grid} vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: T.axis }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)} tick={{ fontSize: 11, fill: T.axis }} axisLine={false} tickLine={false} width={42} />
                  <Tooltip formatter={(v) => fmtKr(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} cursor={{ fill: "rgba(125,125,125,0.08)" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className={`${T.panel} border rounded-xl p-4 flex flex-col`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-1.5"><AlertTriangle size={15} className="text-amber-500" /> Deals needing attention</h3>
            <button onClick={() => setTab("pipeline")} className="text-[11px] text-sky-500 hover:underline">View pipeline</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[240px]">
            {attention.length === 0 ? <Empty T={T} text="Everything's on track. Nice." /> : attention.map((d) => {
              const m = dealMeta(d);
              return (
                <button key={d.id} onClick={() => setModal({ type: "dealDetail", title: d.name, data: d })}
                  className={`w-full text-left ${T.soft} rounded-lg p-3 ${T.hover} transition`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm truncate">{d.name}</span>
                    <span className="text-sm font-semibold shrink-0">{fmtKr(d.value)}</span>
                  </div>
                  <div className={`text-[11px] ${T.sub} mt-1 flex items-center gap-2 flex-wrap`}>
                    <span>{companyName(d.companyId)}</span>
                    {m.overdue && <span className="text-red-500 font-medium">· action overdue</span>}
                    {m.stale && <span className="text-amber-500 font-medium">· {m.daysSinceTouch}d no contact</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <QuickBtn T={T} onClick={() => setModal({ type: "deal", title: "New deal" })} icon={Plus} label="New deal" />
        <QuickBtn T={T} onClick={() => setModal({ type: "contact", title: "New contact" })} icon={Users} label="New contact" />
        <QuickBtn T={T} onClick={() => setModal({ type: "activity", title: "Log activity" })} icon={StickyNote} label="Log activity" />
        <QuickBtn T={T} onClick={() => setModal({ type: "task", title: "New task" })} icon={ListChecks} label="New task" />
      </div>
    </div>
  );
}

// ---------- Pipeline ----------
function Pipeline({ T, stages, fDeals, dealMeta, ownerInit, ownerName, companyName, moveDeal, setModal }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <h2 className="font-semibold">Pipeline</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal({ type: "stages", title: "Edit pipeline stages" })}
            className={`flex items-center gap-1.5 ${T.soft} ${T.hover} text-sm px-3 py-1.5 rounded-lg transition`}><SlidersHorizontal size={15} /> <span className="hidden sm:inline">Edit stages</span></button>
          <button onClick={() => setModal({ type: "deal", title: "New deal" })}
            className="flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-sky-600 transition"><Plus size={15} /> New deal</button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4">
        <div className="flex gap-3 h-full min-w-max">
          {stages.map((stage) => {
            const col = fDeals.filter((d) => d.stageId === stage.id);
            const total = col.reduce((s, d) => s + d.value, 0);
            return (
              <div key={stage.id} className={`${T.panel} border rounded-xl w-72 flex flex-col`}>
                <div className={`px-3 py-2.5 border-b ${T.line} shrink-0`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: stage.color }} />
                      <span className="font-medium text-sm truncate">{stage.name}</span>
                      <span className={`text-[11px] ${T.chip} px-1.5 py-0.5 rounded-full shrink-0`}>{col.length}</span>
                    </div>
                    <span className={`text-[11px] ${T.sub} shrink-0`}>{Math.round(stage.prob * 100)}%</span>
                  </div>
                  <div className={`text-[11px] ${T.sub} mt-1`}>{fmtKr(total)}</div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {col.length === 0 ? <div className={`text-[11px] ${T.sub} text-center py-6`}>Empty</div> : col.map((d) => {
                    const m = dealMeta(d); const idx = stages.findIndex((s) => s.id === d.stageId);
                    return (
                      <div key={d.id} className={`${T.soft} rounded-lg p-2.5 group`}>
                        <button onClick={() => setModal({ type: "dealDetail", title: d.name, data: d })} className="w-full text-left">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-medium text-sm leading-tight">{d.name}</span>
                            {(m.stale || m.overdue) && <AlertTriangle size={13} className={m.overdue ? "text-red-500 shrink-0" : "text-amber-500 shrink-0"} />}
                          </div>
                          <div className={`text-[11px] ${T.sub} mt-0.5 truncate`}>{companyName(d.companyId)}</div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-semibold">{fmtKr(d.value)}</span>
                            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 text-[10px] font-bold flex items-center justify-center" title={ownerName(d.ownerId)}>{ownerInit(d.ownerId)}</span>
                          </div>
                          {d.status === "open" && (
                            <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${m.daysInStage > 21 ? "text-amber-500" : T.sub}`}>
                              <Clock size={11} /> {m.daysInStage}d in stage
                            </div>
                          )}
                        </button>
                        <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition">
                          <button disabled={idx <= 0} onClick={() => moveDeal(d.id, stages[idx - 1].id)} className={`p-1 rounded ${T.hover} disabled:opacity-20`} title="Move back"><ArrowLeft size={13} /></button>
                          <button disabled={idx >= stages.length - 1} onClick={() => moveDeal(d.id, stages[idx + 1].id)} className={`p-1 rounded ${T.hover} disabled:opacity-20`} title="Move forward"><ArrowRight size={13} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Contacts ----------
function Contacts({ T, fContacts, companies, deals, activities, stageOf, ownerName, companyName, setModal }) {
  const [sel, setSel] = useState(null);
  const selContact = fContacts.find((c) => c.id === sel) || null;
  const company = selContact ? companies.find((c) => c.id === selContact.companyId) : null;
  const cDeals = selContact ? deals.filter((d) => d.contactId === selContact.id) : [];
  const cActs = selContact ? activities.filter((a) => a.contactId === selContact.id).sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  return (
    <div className="h-full flex">
      <div className={`w-full ${sel ? "hidden lg:flex lg:w-1/2" : "flex"} flex-col`}>
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <h2 className="font-semibold">Contacts &amp; companies</h2>
          <button onClick={() => setModal({ type: "contact", title: "New contact" })}
            className="flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-sky-600 transition"><Plus size={15} /> New contact</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {fContacts.length === 0 ? <Empty T={T} text="No contacts yet." /> : fContacts.map((c) => {
            const stale = dBetween(c.lastContacted, todayISO()) > 30;
            return (
              <button key={c.id} onClick={() => setSel(c.id)}
                className={`w-full text-left ${T.panel} border rounded-xl p-3 ${T.hover} transition ${sel === c.id ? "ring-2 ring-sky-500" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">{c.name}</div>
                    <div className={`text-[11px] ${T.sub} truncate`}>{c.title} · {companyName(c.companyId)}</div>
                  </div>
                  <div className={`text-[10px] ${stale ? "text-amber-500" : T.sub} shrink-0`}>{dBetween(c.lastContacted, todayISO())}d ago</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {selContact && (
        <div className={`w-full lg:w-1/2 border-l ${T.line} flex flex-col`}>
          <div className={`flex items-center justify-between px-4 py-3 border-b ${T.line} shrink-0`}>
            <h3 className="font-semibold text-sm">Contact detail</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setModal({ type: "contact", title: "Edit contact", data: selContact })} className={`text-xs font-medium px-2.5 py-1.5 rounded-lg ${T.soft} ${T.hover} transition`}>Edit</button>
              <button onClick={() => setSel(null)} className={`p-1.5 rounded-lg ${T.hover}`}><X size={16} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-violet-600 text-white font-bold flex items-center justify-center">
                {selContact.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div><div className="font-semibold">{selContact.name}</div><div className={`text-xs ${T.sub}`}>{selContact.title}</div></div>
            </div>
            <div className={`${T.soft} rounded-xl p-3 space-y-2 text-sm`}>
              <Row T={T} icon={Building2} label={company?.name} sub={company ? `${company.industry} · ${company.size} employees` : ""} />
              <Row T={T} icon={Mail} label={selContact.email} />
              <Row T={T} icon={Users} label={`Owner: ${ownerName(selContact.ownerId)}`} />
              <Row T={T} icon={Calendar} label={`Last contacted ${fmtDate(selContact.lastContacted)}`} />
            </div>
            <div>
              <h4 className={`text-xs font-semibold ${T.sub} uppercase tracking-wide mb-2`}>Deals ({cDeals.length})</h4>
              <div className="space-y-2">
                {cDeals.length === 0 ? <div className={`text-xs ${T.sub}`}>No deals.</div> : cDeals.map((d) => (
                  <div key={d.id} className={`${T.soft} rounded-lg p-2.5 flex items-center justify-between`}>
                    <div>
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-[11px] mt-0.5"><span style={{ color: stageOf(d.stageId).color }}>{stageOf(d.stageId).name}</span></div>
                    </div>
                    <span className="text-sm font-semibold">{fmtKr(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`text-xs font-semibold ${T.sub} uppercase tracking-wide mb-2`}>Activity timeline</h4>
              <Timeline T={T} acts={cActs} ownerName={ownerName} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Activities ----------
function Activities({ T, fActivities, fTasks, ownerName, ownerInit, deals, toggleTask, setModal }) {
  const dealName = (id) => deals.find((d) => d.id === id)?.name;
  const sortedActs = [...fActivities].sort((a, b) => new Date(b.date) - new Date(a.date));
  const openTasks = fTasks.filter((t) => !t.done).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const doneTasks = fTasks.filter((t) => t.done);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <div className={`flex flex-col lg:border-r ${T.line} overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <h2 className="font-semibold flex items-center gap-2"><ListChecks size={17} /> Tasks &amp; follow-ups</h2>
          <button onClick={() => setModal({ type: "task", title: "New task" })}
            className="flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-sky-600 transition"><Plus size={15} /> Task</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {openTasks.length === 0 && doneTasks.length === 0 && <Empty T={T} text="No tasks yet." />}
          {openTasks.map((t) => {
            const overdue = new Date(t.dueDate) < new Date(todayISO());
            return (
              <div key={t.id} className={`${T.panel} border rounded-xl p-3 flex items-center gap-3`}>
                <button onClick={() => toggleTask(t.id)} className="text-slate-400 hover:text-sky-500"><Circle size={18} /></button>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className={`text-[11px] mt-0.5 flex items-center gap-2 ${overdue ? "text-red-500" : T.sub}`}>
                    <Calendar size={11} /> {fmtDate(t.dueDate)} {overdue && "· overdue"}
                    {dealName(t.dealId) && <span className={`${T.chip} px-1.5 rounded-full`}>{dealName(t.dealId)}</span>}
                  </div>
                </div>
                <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-500 text-[10px] font-bold flex items-center justify-center" title={ownerName(t.ownerId)}>{ownerInit(t.ownerId)}</span>
              </div>
            );
          })}
          {doneTasks.length > 0 && <div className={`text-[11px] ${T.sub} uppercase tracking-wide pt-2`}>Completed</div>}
          {doneTasks.map((t) => (
            <div key={t.id} className={`${T.soft} rounded-xl p-3 flex items-center gap-3 opacity-60`}>
              <button onClick={() => toggleTask(t.id)} className="text-emerald-500"><CheckCircle2 size={18} /></button>
              <div className="text-sm line-through flex-1 truncate">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <h2 className="font-semibold flex items-center gap-2"><StickyNote size={17} /> Activity log</h2>
          <button onClick={() => setModal({ type: "activity", title: "Log activity" })}
            className="flex items-center gap-1.5 bg-sky-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-sky-600 transition"><Plus size={15} /> Log</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <Timeline T={T} acts={sortedActs} ownerName={ownerName} extra={(a) => dealName(a.dealId)} />
        </div>
      </div>
    </div>
  );
}

// ---------- shared ----------
const ACT_ICON = { Call: Phone, Email: Mail, Meeting: Calendar, Note: StickyNote };
function Timeline({ T, acts, ownerName, extra }) {
  if (!acts || acts.length === 0) return <Empty T={T} text="No activity logged." />;
  return (
    <div className="space-y-3">
      {acts.map((a) => {
        const Icon = ACT_ICON[a.type] || StickyNote;
        return (
          <div key={a.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${T.soft} flex items-center justify-center shrink-0`}><Icon size={14} /></div>
              <div className={`w-px flex-1 ${T.line} border-l mt-1`} />
            </div>
            <div className="pb-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{a.type}</span>
                <span className={`text-[11px] ${T.sub}`}>{fmtDate(a.date)}</span>
                {extra && extra(a) && <span className={`text-[10px] ${T.chip} px-1.5 rounded-full`}>{extra(a)}</span>}
              </div>
              <div className={`text-sm ${T.sub} mt-0.5`}>{a.note}</div>
              <div className={`text-[10px] ${T.sub} mt-0.5`}>by {ownerName(a.ownerId)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Row({ T, icon: Icon, label, sub }) {
  if (!label) return null;
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} className={`${T.sub} mt-0.5 shrink-0`} />
      <div className="min-w-0"><div className="truncate">{label}</div>{sub && <div className={`text-[11px] ${T.sub}`}>{sub}</div>}</div>
    </div>
  );
}
function Empty({ T, text }) { return <div className={`text-center text-sm ${T.sub} py-8`}>{text}</div>; }
function QuickBtn({ T, onClick, icon: Icon, label }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 ${T.panel} border rounded-lg px-3 py-2 text-sm ${T.hover} transition`}>
      <Icon size={15} className="text-sky-500" /> {label}
    </button>
  );
}
function Modal({ T, onClose, title, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className={`${T.panel} border rounded-2xl w-full ${wide ? "max-w-lg" : "max-w-md"} max-h-[85vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-4 py-3 border-b ${T.line} sticky top-0 ${T.panel} z-10`}>
          <h3 className="font-semibold text-sm">{title}</h3>
          <button onClick={onClose} className={`p-1.5 rounded-lg ${T.hover}`}><X size={16} /></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

// ---------- forms ----------
function Field({ T, label, children }) {
  return (<label className="block"><span className={`text-[11px] font-medium ${T.sub} block mb-1`}>{label}</span>{children}</label>);
}
const inputCls = (T) => `w-full ${T.input} border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500`;

function DealForm({ T, stages, firstOpenId, owners, companies, contacts, defaultOwnerId, onSave }) {
  const [f, setF] = useState({ name: "", companyId: companies[0]?.id || "", contactId: "", ownerId: defaultOwnerId || owners[0]?.id || "", value: "", stageId: firstOpenId, expectedClose: dFromNow(45), nextAction: "", nextActionDue: dFromNow(7) });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const companyContacts = contacts.filter((c) => c.companyId === f.companyId);
  const submit = () => {
    if (!f.name.trim()) return;
    const st = stages.find((s) => s.id === f.stageId);
    onSave({ ...f, id: uid(), value: Number(f.value) || 0, createdAt: todayISO(), stageEnteredAt: todayISO(), status: st?.kind === "won" ? "won" : st?.kind === "lost" ? "lost" : "open", contactId: f.contactId || companyContacts[0]?.id || "" });
  };
  return (
    <div className="space-y-3">
      <Field T={T} label="Deal name"><input className={inputCls(T)} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Platform license" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Company"><select className={inputCls(T)} value={f.companyId} onChange={(e) => { set("companyId", e.target.value); set("contactId", ""); }}>{companies.length === 0 && <option value="">No companies yet</option>}{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
        <Field T={T} label="Contact"><select className={inputCls(T)} value={f.contactId} onChange={(e) => set("contactId", e.target.value)}><option value="">—</option>{companyContacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Value (kr)"><input type="number" className={inputCls(T)} value={f.value} onChange={(e) => set("value", e.target.value)} placeholder="0" /></Field>
        <Field T={T} label="Owner"><select className={inputCls(T)} value={f.ownerId} onChange={(e) => set("ownerId", e.target.value)}>{owners.length === 0 && <option value="">No owners yet</option>}{owners.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Stage"><select className={inputCls(T)} value={f.stageId} onChange={(e) => set("stageId", e.target.value)}>{stages.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
        <Field T={T} label="Expected close"><input type="date" className={inputCls(T)} value={f.expectedClose} onChange={(e) => set("expectedClose", e.target.value)} /></Field>
      </div>
      <Field T={T} label="Next action"><input className={inputCls(T)} value={f.nextAction} onChange={(e) => set("nextAction", e.target.value)} placeholder="e.g. Send proposal" /></Field>
      <Field T={T} label="Next action due"><input type="date" className={inputCls(T)} value={f.nextActionDue} onChange={(e) => set("nextActionDue", e.target.value)} /></Field>
      <button onClick={submit} className="w-full bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition">Save deal</button>
    </div>
  );
}

function ContactForm({ T, owners, companies, defaultOwnerId, existing, onSave }) {
  const [f, setF] = useState(existing ? { ...existing } : { name: "", title: "", email: "", companyId: companies[0]?.id || "", ownerId: defaultOwnerId || owners[0]?.id || "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = () => { if (!f.name.trim()) return; onSave(existing ? { ...f } : { ...f, id: uid(), lastContacted: todayISO() }); };
  return (
    <div className="space-y-3">
      <Field T={T} label="Name"><input className={inputCls(T)} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Title"><input className={inputCls(T)} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. CFO" /></Field>
        <Field T={T} label="Owner"><select className={inputCls(T)} value={f.ownerId} onChange={(e) => set("ownerId", e.target.value)}>{owners.length === 0 && <option value="">No owners yet</option>}{owners.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
      </div>
      <Field T={T} label="Email"><input className={inputCls(T)} value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="name@company.com" /></Field>
      <Field T={T} label="Company"><select className={inputCls(T)} value={f.companyId} onChange={(e) => set("companyId", e.target.value)}>{companies.length === 0 && <option value="">No companies yet</option>}{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      <button onClick={submit} className="w-full bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition">Save contact</button>
    </div>
  );
}

function ActivityForm({ T, owners, contacts, deals, defaultOwnerId, onSave }) {
  const [f, setF] = useState({ type: "Call", ownerId: defaultOwnerId || owners[0]?.id || "", contactId: "", dealId: "", note: "", date: todayISO() });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = () => { if (!f.note.trim()) return; onSave({ ...f, id: uid() }); };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Type"><select className={inputCls(T)} value={f.type} onChange={(e) => set("type", e.target.value)}>{ACTIVITY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
        <Field T={T} label="Date"><input type="date" className={inputCls(T)} value={f.date} onChange={(e) => set("date", e.target.value)} /></Field>
      </div>
      <Field T={T} label="Contact"><select className={inputCls(T)} value={f.contactId} onChange={(e) => set("contactId", e.target.value)}><option value="">—</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      <Field T={T} label="Related deal"><select className={inputCls(T)} value={f.dealId} onChange={(e) => set("dealId", e.target.value)}><option value="">—</option>{deals.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></Field>
      <Field T={T} label="Owner"><select className={inputCls(T)} value={f.ownerId} onChange={(e) => set("ownerId", e.target.value)}>{owners.length === 0 && <option value="">No owners yet</option>}{owners.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
      <Field T={T} label="Note"><textarea rows={3} className={inputCls(T)} value={f.note} onChange={(e) => set("note", e.target.value)} placeholder="What happened?" /></Field>
      <button onClick={submit} className="w-full bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition">Log activity</button>
    </div>
  );
}

function TaskForm({ T, owners, deals, defaultOwnerId, onSave }) {
  const [f, setF] = useState({ title: "", ownerId: defaultOwnerId || owners[0]?.id || "", dealId: "", dueDate: dFromNow(3) });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = () => { if (!f.title.trim()) return; onSave({ ...f, id: uid(), done: false }); };
  return (
    <div className="space-y-3">
      <Field T={T} label="Task"><input className={inputCls(T)} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Follow up on proposal" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field T={T} label="Due date"><input type="date" className={inputCls(T)} value={f.dueDate} onChange={(e) => set("dueDate", e.target.value)} /></Field>
        <Field T={T} label="Owner"><select className={inputCls(T)} value={f.ownerId} onChange={(e) => set("ownerId", e.target.value)}>{owners.length === 0 && <option value="">No owners yet</option>}{owners.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></Field>
      </div>
      <Field T={T} label="Related deal"><select className={inputCls(T)} value={f.dealId} onChange={(e) => set("dealId", e.target.value)}><option value="">—</option>{deals.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></Field>
      <button onClick={submit} className="w-full bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition">Save task</button>
    </div>
  );
}

// ---------- stage editor ----------
function StageEditor({ T, stages, deals, onSave, onCancel }) {
  const [open, setOpen] = useState(stages.filter((s) => s.kind === "open").map((s) => ({ ...s })));
  const terminal = stages.filter((s) => s.kind !== "open");
  const dealCount = (id) => deals.filter((d) => d.stageId === id).length;

  const setStage = (id, k, v) => setOpen((o) => o.map((s) => (s.id === id ? { ...s, [k]: v } : s)));
  const cycleColor = (id) => setOpen((o) => o.map((s) => { if (s.id !== id) return s; const i = PALETTE.indexOf(s.color); return { ...s, color: PALETTE[(i + 1) % PALETTE.length] }; }));
  const move = (i, dir) => { const j = i + dir; if (j < 0 || j >= open.length) return; setOpen((o) => { const c = [...o]; [c[i], c[j]] = [c[j], c[i]]; return c; }); };
  const add = () => setOpen((o) => [...o, { id: uid(), name: "New stage", prob: 0.3, color: PALETTE[(o.length + 1) % PALETTE.length], kind: "open" }]);
  const del = (id) => {
    if (open.length <= 1) { window.alert("Keep at least one open stage."); return; }
    const n = dealCount(id);
    if (n > 0 && !window.confirm(`${n} deal${n > 1 ? "s" : ""} in this stage will move to the first open stage. Remove it?`)) return;
    setOpen((o) => o.filter((s) => s.id !== id));
  };
  const save = () => onSave([...open.map((s) => ({ ...s, name: s.name.trim() || "Untitled", prob: Math.max(0, Math.min(1, s.prob)) })), ...terminal]);

  return (
    <div className="space-y-3">
      <p className={`text-[11px] ${T.sub}`}>Reorder, rename, recolor, and set win probability for your open stages. Probability drives the weighted forecast. Won and Lost are fixed.</p>

      <div className="space-y-2">
        {open.map((s, i) => (
          <div key={s.id} className={`${T.soft} rounded-xl p-2.5 flex items-center gap-2`}>
            <div className="flex flex-col">
              <button onClick={() => move(i, -1)} disabled={i === 0} className={`p-0.5 rounded ${T.hover} disabled:opacity-20`}><ChevronUp size={14} /></button>
              <button onClick={() => move(i, 1)} disabled={i === open.length - 1} className={`p-0.5 rounded ${T.hover} disabled:opacity-20`}><ChevronDown size={14} /></button>
            </div>
            <button onClick={() => cycleColor(s.id)} title="Change color" className="w-5 h-5 rounded-full shrink-0 ring-2 ring-offset-1 ring-transparent" style={{ background: s.color }} />
            <input value={s.name} onChange={(e) => setStage(s.id, "name", e.target.value)} className={`flex-1 min-w-0 ${T.input} border rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-sky-500`} />
            <div className="flex items-center gap-1 shrink-0">
              <input type="number" min={0} max={100} value={Math.round(s.prob * 100)} onChange={(e) => setStage(s.id, "prob", (Number(e.target.value) || 0) / 100)} className={`w-14 ${T.input} border rounded-lg px-2 py-1.5 text-sm text-right outline-none focus:ring-2 focus:ring-sky-500`} />
              <span className={`text-xs ${T.sub}`}>%</span>
            </div>
            <button onClick={() => del(s.id)} className={`p-1.5 rounded-lg text-red-500 ${T.hover} shrink-0`} title="Delete stage"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>

      <button onClick={add} className={`w-full flex items-center justify-center gap-1.5 ${T.panel} border rounded-xl py-2 text-sm ${T.hover} transition`}><Plus size={15} className="text-sky-500" /> Add stage</button>

      <div className="space-y-2 pt-1">
        {terminal.map((s) => (
          <div key={s.id} className={`${T.soft} rounded-xl p-2.5 flex items-center gap-2 opacity-80`}>
            <Lock size={13} className={`${T.sub} ml-1 shrink-0`} />
            <span className="w-5 h-5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="flex-1 text-sm font-medium">{s.name}</span>
            <span className={`text-xs ${T.sub}`}>{Math.round(s.prob * 100)}% · terminal</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className={`flex-1 ${T.panel} border rounded-lg py-2 text-sm ${T.hover} transition`}>Cancel</button>
        <button onClick={save} className="flex-1 bg-sky-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-600 transition">Save stages</button>
      </div>
    </div>
  );
}

// ---------- deal detail ----------
function DealDetail({ T, deal, stages, stageOf, dealMeta, activities, tasks, ownerName, companyName, contactName, moveDeal, toggleTask }) {
  const m = dealMeta(deal);
  const acts = activities.filter((a) => a.dealId === deal.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const dTasks = tasks.filter((t) => t.dealId === deal.id);
  const idx = stages.findIndex((s) => s.id === deal.stageId);
  const cur = stageOf(deal.stageId);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium px-2 py-1 rounded-full" style={{ background: cur.color + "22", color: cur.color }}>{cur.name}</span>
        <span className="text-lg font-semibold">{fmtKr(deal.value)}</span>
      </div>
      <div className={`${T.soft} rounded-xl p-3 grid grid-cols-2 gap-3 text-sm`}>
        <Row T={T} icon={Building2} label={companyName(deal.companyId)} />
        <Row T={T} icon={Users} label={contactName(deal.contactId)} />
        <Row T={T} icon={Target} label={`${Math.round(cur.prob * 100)}% → ${fmtKr(m.weighted)}`} sub="weighted value" />
        <Row T={T} icon={Calendar} label={fmtDate(deal.expectedClose)} sub="expected close" />
        {deal.status === "open" && <Row T={T} icon={Clock} label={`${m.daysInStage}d in stage`} sub={`${m.daysSinceTouch}d since contact`} />}
        {deal.nextAction && <Row T={T} icon={ArrowRight} label={deal.nextAction} sub={`due ${fmtDate(deal.nextActionDue)}`} />}
      </div>
      <div>
        <div className={`text-[11px] font-medium ${T.sub} mb-1.5`}>Move stage</div>
        <div className="flex flex-wrap gap-1.5">
          {stages.map((s, i) => (
            <button key={s.id} onClick={() => moveDeal(deal.id, s.id)}
              className={`text-[11px] px-2 py-1 rounded-lg border transition ${i === idx ? "text-white border-transparent" : `${T.sub} ${T.line} ${T.hover}`}`}
              style={i === idx ? { background: s.color } : {}}>{s.name}</button>
          ))}
        </div>
      </div>
      {dTasks.length > 0 && (
        <div>
          <div className={`text-[11px] font-medium ${T.sub} mb-1.5`}>Tasks</div>
          <div className="space-y-1.5">
            {dTasks.map((t) => (
              <div key={t.id} className={`${T.soft} rounded-lg p-2 flex items-center gap-2 text-sm`}>
                <button onClick={() => toggleTask(t.id)}>{t.done ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-400" />}</button>
                <span className={t.done ? "line-through opacity-60" : ""}>{t.title}</span>
                <span className={`ml-auto text-[10px] ${new Date(t.dueDate) < new Date(todayISO()) && !t.done ? "text-red-500" : T.sub}`}>{fmtDate(t.dueDate)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className={`text-[11px] font-medium ${T.sub} mb-1.5`}>Activity</div>
        <Timeline T={T} acts={acts} ownerName={ownerName} />
      </div>
    </div>
  );
}
