/* ==========================================================================
   STEMIFY HIGH — LANDING PAGE LOGIC
   --------------------------------------------------------------------------
   Handles: profile popover, "Science coming soon" gating, scroll reveals,
   toast notifications, and reading the shared user profile from storage.
   ========================================================================== */

/* ---------------- Tiny DOM helper ---------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------------- Shared user store (same key as Math dashboard) ---------------- */
function stemifyUser() {
  try { return JSON.parse(localStorage.getItem("stemify_user")) || null; }
  catch { return null; }
}

/* ==================================================================
   TOAST SYSTEM — global notification component
   usage: toast("Saved!", "success") | toast("Oops", "error")
   ================================================================== */
function toast(msg, type = "info", ms = 3200) {
  const host = $("#toasts");
  if (!host) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  const icons = { success: "✓", error: "✕", info: "◈" };
  el.innerHTML = `<span>${icons[type] || "◈"}</span><span>${msg}</span>`;
  host.appendChild(el);
  setTimeout(() => { el.classList.add("hide"); setTimeout(() => el.remove(), 320); }, ms);
}

/* ==================================================================
   DP POPOVER — placeholder profile card, top-right
   Syncs with whichever auth state exists on the dashboard
   ================================================================== */
function initDpPopover() {
  const dp = $("#dpBtn");
  const pop = $("#dpPopover");
  const user = stemifyUser();

  if (dp && user) {
    const initial = (user.name || "Guest").trim().charAt(0).toUpperCase() || "S";
    dp.textContent = initial;
    $(".p-name", pop).textContent = user.name || "Guest Explorer";
    $(".p-sub", pop).textContent = user.email || "Signed in via Google";
    const chip = $(".tier-chip", pop);
    if (user.premium) {
      chip.textContent = "◈ Premium";
      chip.className = "tier-chip premium";
      $(".p-stat", pop).innerHTML = "<span>Queries this month</span><b>∞</b>";
    } else {
      chip.textContent = "◈ Standard";
      chip.className = "tier-chip standard";
      const q = (user.queriesUsed || 0);
      $(".p-stat", pop).innerHTML = `<span>AI queries left</span><b>${Math.max(0, 3 - q)}/3</b>`;
    }
  }

  // Toggle popover on DP click; close on outside click / Esc
  if (dp) {
    dp.addEventListener("click", (e) => {
      e.stopPropagation();
      pop.classList.toggle("open");
    });
  }
  document.addEventListener("click", (e) => { if (pop && !pop.contains(e.target)) pop.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") pop?.classList.remove("open"); });
}

/* ==================================================================
   SCIENCE SECTION GATE — only Math is live for now
   ================================================================== */
function initScienceGate() {
  $$("[data-science]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      toast("🧪 The Science Hub is under construction — stay tuned!", "info");
    });
  });
}

/* ==================================================================
   SCROLL REVEAL — elements with .reveal fade up as they enter view
   ================================================================== */
function initReveals() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ==================================================================
   INIT
   ================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initDpPopover();
  initScienceGate();
  initReveals();
});
