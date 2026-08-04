/* ==========================================================================
   STEMIFY HIGH — MATH DASHBOARD LOGIC
   --------------------------------------------------------------------------
   Modules:
     1. Helpers & user store
     2. Onboarding flow  (auth → pricing → survey)
     3. Mock payment gateway
     4. DP popover / science gate
     5. Article grid, search, voice typing, Wikipedia-style reader (+KaTeX)
     6. Sample paper generator (view-only for Standard, download for Premium)
     7. Premium suite: tabs, lock overlay, quiz, plans, gamification,
        NCERT hub, math solver, image solver, graphs, tutor
     8. AI chatbot (3/month Standard · unlimited Premium) with API hook
   ========================================================================== */

/* ---------------- 1. HELPERS & USER STORE ---------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const USER_KEY = "stemify_user";

function loadUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch { return null; }
}
function saveUser(u) { localStorage.setItem(USER_KEY, JSON.stringify(u)); }

/* Month-scoped query counter for the Standard tier quota */
function queryMonthKey() { return "stemify_chat_" + new Date().toISOString().slice(0, 7); }
function queriesUsed() { return +(localStorage.getItem(queryMonthKey()) || 0); }
function bumpQueries() { localStorage.setItem(queryMonthKey(), String(queriesUsed() + 1)); }

/* ---------- Toast component ---------- */
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

/* ---------- Modal helpers ---------- */
function openModal(id) { $(`#${id}`).classList.add("open"); }
function closeModal(id) { $(`#${id}`).classList.remove("open"); }
function isOpen(id) { return $(`#${id}`).classList.contains("open"); }

/* ---------- Generic modal close — any ✕ with data-close="modalId" ----------
   Covers every modal automatically (reader, tutor, onboarding…). Specific
   flows keep their own listeners; double-closing is harmless (idempotent). */
document.addEventListener("click", (e) => {
  const x = e.target.closest("[data-close]");
  if (!x) return;
  const id = x.dataset.close;
  if (isOpen(id)) closeModal(id);
});

/* Escape closes the topmost open modal as well */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = $$(".modal-backdrop.open");
  if (open.length) closeModal(open[open.length - 1].id);
});

/* True while the first-visit onboarding chain is still running
   (auth → pricing → survey); false for returning users upgrading mid-session */
let onboardingInProgress = false;

/* ---------- KaTeX renderer (safe if CDN unavailable) ---------- */
function renderMath(el) {
  if (el && window.renderMathInElement) {
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    } catch (e) { console.warn("KaTeX render failed:", e); }
  }
}

/* ==========================================================================
   2. ONBOARDING FLOW
   --------------------------------------------------------------------------
   States: not-onboarded → AUTH modal → (Google login → PRICING modal)
                                      \→ (Skip) ─────────────┐
                                ┌────────────────────────────┘
                                ▼
                             SURVEY modal → Dashboard
   Returning users skip straight to the dashboard.
   ========================================================================== */
function initOnboarding() {
  const user = loadUser();

  /* --- First visit: start the flow with the AUTH modal --- */
  if (!user) { onboardingInProgress = true; openModal("authModal"); return; }

  /* --- Returning user: hydrate UI (fresh session) --- */
  updateTierUI();
}

/* Google login → simulate OAuth, then pricing modal on first sign-in */
function initAuthModal() {
  const googleBtn = $("#googleBtn");
  const skipBtn = $("#skipAuthBtn");

  googleBtn.addEventListener("click", () => {
    /* STATE: loading — simulate OAuth handshake */
    googleBtn.disabled = true;
    googleBtn.innerHTML = `<span class="spinner"></span> Contacting Google…`;
    setTimeout(() => {
      const user = loadUser() || {};
      user.name = "Arjun Sharma";                       // mock profile (replace with real OAuth response)
      user.email = "arjun.sharma@gmail.com";
      user.loginAt = Date.now();
      saveUser(user);
      googleBtn.disabled = false;
      googleBtn.innerHTML = googleBtnMarkup;
      /* STATE: first login → pricing modal; returning → straight to dashboard */
      if (user.loginAt) { closeModal("authModal"); openModal("pricingModal"); }
    }, 1400);
  });

  skipBtn.addEventListener("click", () => {
    /* STATE: guest — skip pricing, go to survey */
    closeModal("authModal");
    openModal("surveyModal");
  });

  /* Closing the auth modal via ✕ = "skip for now" */
  const x = $('#authModal [data-close="authModal"]');
  if (x) x.addEventListener("click", () => skipBtn.click());
}
const googleBtnMarkup = `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg> Continue with Google`;

/* ---------- Pricing modal (Standard vs Premium ₹299/mo) ---------- */
let planChoice = "standard";   /* module-scope: pre-select current plan on open */

function showPlan(which) {
  planChoice = which;
  $("#planStdBtn").classList.toggle("on", which === "standard");
  $("#planPremBtn").classList.toggle("on", which === "premium");
  $("#planStdSummary").style.display = which === "standard" ? "block" : "none";
  $("#planPremSummary").style.display = which === "premium" ? "block" : "none";
}

/* Open the plan manager pre-set to the user's current plan */
function openPlanManager() {
  const user = loadUser() || {};
  showPlan(user.premium ? "premium" : "standard");
  openModal("pricingModal");
}

function initPricingModal() {
  $("#planStdBtn").addEventListener("click", () => showPlan("standard"));
  $("#planPremBtn").addEventListener("click", () => showPlan("premium"));

  $("#confirmPlanBtn").addEventListener("click", () => {
    closeModal("pricingModal");
    if (planChoice === "premium") {
      /* STATE: premium selected → mock payment gateway */
      openModal("payModal");
    } else if (onboardingInProgress) {
      /* STATE: onboarding + standard → survey */
      openModal("surveyModal");
    } else {
      /* STATE: managing plans (downgrade) → confirm first */
      openModal("downgradeModal");
    }
  });

  /* ✕ on pricing: onboarding → keep Standard & proceed to survey; otherwise just close */
  const x = $('#pricingModal [data-close="pricingModal"]');
  if (x) x.addEventListener("click", () => {
    if (onboardingInProgress) openModal("surveyModal");
  });
}

/* ---------- Downgrade confirmation (Premium → Standard) ---------- */
function initDowngradeModal() {
  $("#downgradeConfirmBtn").addEventListener("click", () => {
    const user = loadUser() || {};
    user.premium = false;
    saveUser(user);
    closeModal("downgradeModal");
    updateTierUI();
    refreshTierDependentUI();
    toast("Switched to Standard — you can upgrade anytime. ⚡", "info", 4000);
  });
  $("#downgradeCancelBtn").addEventListener("click", () => closeModal("downgradeModal"));
}

/* ---------- Survey modal (class / country / age / school type) ---------- */
function initSurveyModal() {
  const finish = () => {
    const user = loadUser() || {};
    user.class = $("#srvClass").value;
    user.country = $("#srvCountry").value;
    user.age = $("#srvAge").value || null;
    user.schoolType = $("#srvSchool").value;
    saveUser(user);
    onboardingInProgress = false;
    closeModal("surveyModal");
    updateTierUI();
    refreshTierDependentUI();
    toast(user.premium ? "Welcome to Premium! 👑" : "Dashboard personalised — happy learning! 🚀", "success", 4200);
  };

  /* Save + Skip both finalise the onboarding chain; ✕ acts as Skip too */
  $("#saveSurveyBtn").addEventListener("click", finish);
  $("#skipSurveyBtn").addEventListener("click", finish);
  const x = $('#surveyModal [data-close="surveyModal"]');
  if (x) x.addEventListener("click", finish);
}

/* Refresh UI pieces that depend on the tier (paper download, lock overlay…) */
function refreshTierDependentUI() {
  const premium = (loadUser() || {}).premium;
  $("#downloadPaperBtn").disabled = !premium;
  const note = $("#paperModeNote");
  if (note) note.textContent = premium ? "" : "View-only on Standard — upgrade to download.";
  applyTierLock();   /* re-lock / unlock the Premium Suite on plan changes */
}

/* ==========================================================================
   3. MOCK PAYMENT GATEWAY (Razorpay / PayPal placeholders)
   ========================================================================== */
function initPaymentModal() {
  $("#payRazorpayBtn").addEventListener("click", () => runMockPayment("Razorpay"));
  $("#payPaypalBtn").addEventListener("click", () => runMockPayment("PayPal"));

  /* STATE: payment success → resume the onboarding chain (survey) OR just finish */
  $("#payDoneBtn").addEventListener("click", () => {
    closeModal("payModal");
    if (onboardingInProgress) openModal("surveyModal");
    else toast("Premium unlocked — enjoy the full suite! 👑", "success", 4200);
  });

  /* ✕ on payment = back out (continue onboarding as Standard, or just close) */
  const x = $('#payModal [data-close="payModal"]');
  if (x) x.addEventListener("click", () => {
    closeModal("payModal");
    if (onboardingInProgress) openModal("surveyModal");
  });
}

/* STATE machine: actions → processing (spinner) → success (confetti) */
function runMockPayment(gateway) {
  $("#payActions").style.display = "none";
  $("#payProcessing").style.display = "block";
  toast(`Contacting ${gateway}…`, "info", 1800);
  setTimeout(() => {
    $("#payProcessing").style.display = "none";
    $("#paySuccess").style.display = "block";
    const user = loadUser() || {};
    user.premium = true;             /* grant premium entitlement */
    user.premiumSince = Date.now();
    saveUser(user);
    updateTierUI();
    refreshTierDependentUI();
    toast("Premium activated! 🎉", "success", 4200);
  }, 2200);
}

/* ==========================================================================
   4. DP POPOVER & SCIENCE GATE
   ========================================================================== */
function updateTierUI() {
  const user = loadUser();
  const pill = $("#tierPill");
  const dp = $("#dpBtn");
  const pop = $("#dpPopover");
  if (!user) return;

  pill.innerHTML = user.premium
    ? `<span class="tier-chip premium" style="margin-left:10px">👑 Premium</span>`
    : `<span class="tier-chip standard" style="margin-left:10px">◈ Standard</span>`;

  if (dp) dp.textContent = (user.name || "G").charAt(0).toUpperCase();
  if (pop) {
    $(".p-name", pop).textContent = user.name || "Guest Explorer";
    $(".p-sub", pop).textContent = user.email || "Not signed in";
    const chip = $(".tier-chip", pop);
    if (user.premium) {
      chip.textContent = "👑 Premium"; chip.className = "tier-chip premium";
      $(".p-stat", pop).innerHTML = "<span>AI queries</span><b>∞ unlimited</b>";
    } else {
      chip.textContent = "◈ Standard"; chip.className = "tier-chip standard";
      const left = Math.max(0, 3 - queriesUsed());
      $(".p-stat", pop).innerHTML = `<span>AI queries left</span><b>${left}/3</b>`;
    }
  }
}

function initDp() {
  const dp = $("#dpBtn"), pop = $("#dpPopover");
  dp.addEventListener("click", (e) => { e.stopPropagation(); pop.classList.toggle("open"); });
  document.addEventListener("click", (e) => { if (!pop.contains(e.target)) pop.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") pop.classList.remove("open"); });

  /* Switch Plan entry points: profile popover + dashboard header */
  $("#managePlanBtn").addEventListener("click", () => {
    pop.classList.remove("open");
    openPlanManager();
  });
  $("#headerPlanBtn").addEventListener("click", openPlanManager);
}

function initScienceGate() {
  $$("[data-science]").forEach((el) =>
    el.addEventListener("click", (e) => { e.preventDefault(); toast("🧪 Science Hub is under construction — stay tuned!", "info"); })
  );
}

/* ==========================================================================
   5. ARTICLES — grid, search, voice typing, reader
   ========================================================================== */
function renderArticles(filter = "") {
  const grid = $("#articlesGrid");
  const q = filter.trim().toLowerCase();
  const list = STEMIFY_ARTICLES.filter((a) =>
    !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) ||
    a.tag.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)
  );

  grid.innerHTML = list.length
    ? list.map((a) => `
      <article class="card art-card grid-in" data-article="${a.id}">
        <span class="art-tag ${a.tagClass}">${a.tag}</span>
        <h4>${a.title}</h4>
        <p style="font-size:12.5px">${a.excerpt}</p>
        <div class="art-meta"><span>⏱ ${a.readTime}</span><span>🎓 ${a.level}</span><span>📖 Read</span></div>
      </article>`).join("")
    : `<p class="muted" style="grid-column:1/-1; text-align:center; padding:30px">No articles match “${filter}”. Try “trigonometry” or “probability”.</p>`;

  grid.querySelectorAll("[data-article]").forEach((card) =>
    card.addEventListener("click", () => openArticle(card.dataset.article))
  );
}

function openArticle(id) {
  const a = STEMIFY_ARTICLES.find((x) => x.id === id);
  if (!a) return;
  $("#readerBody").innerHTML = `
    <span class="art-tag ${a.tagClass}">${a.tag}</span>
    <h2 style="margin:8px 0 4px; border:none">${a.title}</h2>
    <div class="art-meta" style="margin-bottom:8px"><span>⏱ ${a.readTime}</span><span>🎓 ${a.level}</span></div>
    ${a.body}
  `;
  renderMath($("#readerBody"));      /* render \( ... \) / $$ ... $$ math */
  openModal("readerModal");
  trackProgress("read");
}

/* Voice typing via Web Speech API (with graceful fallback) */
function initSearch() {
  const input = $("#globalSearch");
  input.addEventListener("input", () => renderArticles(input.value));

  const mic = $("#micBtn");
  let listening = false;

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    mic.title = "Voice typing not supported in this browser";
    mic.addEventListener("click", () => toast("Voice typing isn't supported in this browser yet.", "error"));
    return;
  }
  const rec = new SpeechRec();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = "en-IN";

  rec.onstart = () => {
    listening = true;
    mic.classList.add("listening");
    toast("🎙 Listening… speak your search", "info", 2000);
  };
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    input.value = text;
    renderArticles(text);
  };
  rec.onend = () => { listening = false; mic.classList.remove("listening"); };
  rec.onerror = () => { listening = false; mic.classList.remove("listening"); toast("Couldn't hear that — try again.", "error"); };

  mic.addEventListener("click", () => { if (listening) rec.stop(); else rec.start(); });
}

/* ==========================================================================
   6. SAMPLE PAPER GENERATOR
   --------------------------------------------------------------------------
   Standard tier: view-only  ·  Premium tier: download via Blob (offline mode)
   ========================================================================== */
function initPaperGenerator() {
  const view = $("#paperView");

  $("#genPaperBtn").addEventListener("click", () => {
    const cls = $("#paperClass").value;
    const p = STEMIFY_PAPERS[cls];
    if (!p) return toast("Paper not ready for this class yet.", "error");

    const html = `
      <div style="text-align:center; margin-bottom:14px">
        <b style="font-family:var(--font-head)">SAMPLE QUESTION PAPER — CLASS ${cls}</b><br/>
        <span class="muted" style="font-size:12px">${p.subject} · auto-generated · 60 marks</span>
      </div>
      ${p.sections.map((s) => `
        <div style="margin-bottom:16px">
          <b style="color:var(--cyan); font-size:13px">${s.name} — ${s.total} × ${s.marksPer} mark${s.marksPer > 1 ? "s" : ""}</b>
          <ol style="padding-left:20px; margin-top:8px">
            ${s.questions.map((q) => `<li style="margin-bottom:8px; font-size:13px">${q}</li>`).join("")}
          </ol>
        </div>`).join("")}
      <p class="muted" style="font-size:11px; border-top:1px dashed var(--line); padding-top:10px">
        ${(loadUser() || {}).premium ? "⬇ Download enabled (Premium) — saves as .txt" : "🔒 View-only on Standard — upgrade to download & take it offline."}
      </p>`;
    view.innerHTML = html;
    view.classList.add("on");
    $("#downloadPaperBtn").disabled = !((loadUser() || {}).premium);
    toast("Paper generated for Class " + cls + "!", "success");
  });

  /* Download: only reachable when Premium (button stays disabled otherwise) */
  $("#downloadPaperBtn").addEventListener("click", () => {
    const cls = $("#paperClass").value;
    const p = STEMIFY_PAPERS[cls];
    let txt = `STEMIFY HIGH — SAMPLE PAPER · CLASS ${cls}\n${p.subject}\n${"=".repeat(50)}\n`;
    p.sections.forEach((s) => {
      txt += `\n${s.name} (${s.total} × ${s.marksPer})\n`;
      s.questions.forEach((q, i) => { txt += `${i + 1}. ${q}\n`; });
    });
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Stemify_Class${cls}_SamplePaper.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Paper downloaded — ready for offline practice!", "success");
  });

  /* Keep note text in sync with tier */
  $("#paperClass").addEventListener("change", () => {
    const note = $("#paperModeNote");
    note.textContent = (loadUser() || {}).premium ? "" : "View-only on Standard — upgrade to download.";
  });
}

/* ==========================================================================
   7. PREMIUM SUITE — tabs, gating, and every feature module
   ========================================================================== */
function initPremiumTabs() {
  $$("#premiumTabs .tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$("#premiumTabs .tab").forEach((t) => t.classList.remove("on"));
      tab.classList.add("on");
      $$(".tabpane").forEach((p) => p.classList.remove("on"));
      $("#pane-" + tab.dataset.tab).classList.add("on");
    })
  );

  /* Lock overlay: Standard users see it over the whole suite.
     Module-level so it can re-apply after plan switches. */
  applyTierLock();
  $("#upgradeBtn").addEventListener("click", () => openPlanManager());
}

function applyTierLock() {
  const premium = (loadUser() || {}).premium;
  $("#premiumLock").style.display = premium ? "none" : "grid";
  $("#premiumTabs").style.pointerEvents = premium ? "auto" : "none";
  $$(".tabpane").forEach((p) => { p.style.pointerEvents = premium ? "auto" : "none"; });
}

/* ---------- 7a. Weekly MCQ Test (timed, auto-generated) ---------- */
let quizTimerId = null;
let quizAnswers = [];

function initQuiz() {
  $("#quizStartBtn").addEventListener("click", startQuiz);
}

function startQuiz() {
  /* STATE: idle → running */
  $("#quizResults").style.display = "none";
  const area = $("#quizArea");
  quizAnswers = [];
  area.innerHTML = STEMIFY_WEEKLY_MCQ.map((q, i) => `
    <div class="quiz-q">
      <div class="q-text">Q${i + 1}. ${q.q}</div>
      ${q.opts.map((o, oi) => `<button class="opt" data-q="${i}" data-oi="${oi}">${String.fromCharCode(65 + oi)}) ${o}</button>`).join("")}
    </div>`).join("");

  area.querySelectorAll(".opt").forEach((btn) =>
    btn.addEventListener("click", () => {
      const qIdx = +btn.dataset.q;
      quizAnswers[qIdx] = +btn.dataset.oi;
      $$(`[data-q="${qIdx}"]`).forEach((b) => b.classList.remove("picked"));
      btn.classList.add("picked");
    })
  );

  startTimer();
  $("#quizStartBtn").textContent = "⟳ Restart Test";
}

function startTimer() {
  clearInterval(quizTimerId);
  let t = 60;
  const el = $("#quizTimer");
  el.textContent = "⏱ 00:60";
  quizTimerId = setInterval(() => {
    t--;
    el.textContent = `⏱ 00:${String(t).padStart(2, "0")}`;
    if (t <= 10) el.style.color = "var(--pink)";
    if (t <= 0) { clearInterval(quizTimerId); gradeQuiz(); }
  }, 1000);
}

/* STATE: running → graded (marks correct answers, updates streak & points) */
function gradeQuiz() {
  clearInterval(quizTimerId);
  let score = 0;
  const area = $("#quizArea");
  area.querySelectorAll(".opt").forEach((b) => b.disabled = true);

  STEMIFY_WEEKLY_MCQ.forEach((q, i) => {
    $$(`[data-q="${i}"]`).forEach((b) => {
      const oi = +b.dataset.oi;
      if (oi === q.ans) b.classList.add("correct");
      else if (oi === quizAnswers[i]) b.classList.add("wrong");
    });
    if (quizAnswers[i] === q.ans) score++;
  });

  const res = $("#quizResults");
  res.style.display = "block";
  const pct = Math.round((score / STEMIFY_WEEKLY_MCQ.length) * 100);
  res.innerHTML = `
    <div style="text-align:center; padding:6px">
      <div style="font-family:var(--font-head); font-size:34px; color:${pct >= 70 ? "var(--green)" : "var(--amber)"}; text-shadow:0 0 20px currentColor">${score}/${STEMIFY_WEEKLY_MCQ.length}</div>
      <p class="muted" style="font-size:13px">${pct >= 70 ? "Excellent — badge progress +1 🔥" : "Good effort — review your weak chapters!"}</p>
      <button class="btn btn-primary btn-sm" onclick="startQuiz()" style="margin-top:10px">⟳ Retry</button>
    </div>`;
  toast(`Quiz graded: ${score}/${STEMIFY_WEEKLY_MCQ.length}`, pct >= 70 ? "success" : "info");

  /* Reward: points + streak (only if passing) */
  const user = loadUser() || {};
  user.points = (user.points || 0) + (pct >= 70 ? 50 : 10);
  if (pct >= 70) {
    const today = new Date().toDateString();
    user.streak = user.streakDay === today ? user.streak : (user.streak || 0) + 1;
    user.streakDay = today;
  }
  saveUser(user);
  renderGamification();
}

/* ---------- 7b. Study Plan (timeline tracker) ---------- */
function initPlan() {
  renderPlan();
  $("#regeneratePlanBtn").addEventListener("click", () => {
    toast("♻ AI regenerating your weekly plan…", "info", 1600);
    setTimeout(renderPlan, 900);
  });
}

function renderPlan() {
  const list = $("#planList");
  list.innerHTML = STEMIFY_PLAN.map((d, i) => `
    <div class="plan-day ${d.done ? "done" : ""}" data-i="${i}" title="Click to mark complete">
      <div class="day-ic">${d.day}</div>
      <div style="flex:1">
        <div style="font-size:13px; margin-bottom:6px">${d.goal}</div>
        <div class="plan-bar"><span style="width:${d.pct}%"></span></div>
      </div>
      <span class="muted" style="font-size:11px">${d.pct}%</span>
    </div>`).join("");

  /* Click to toggle completion (gives +10 pts as a reward) */
  list.querySelectorAll(".plan-day").forEach((row) =>
    row.addEventListener("click", () => {
      const i = +row.dataset.i;
      STEMIFY_PLAN[i].done = !STEMIFY_PLAN[i].done;
      STEMIFY_PLAN[i].pct = STEMIFY_PLAN[i].done ? 100 : 0;
      renderPlan();
      const user = loadUser() || {};
      if (STEMIFY_PLAN[i].done) { user.points = (user.points || 0) + 10; saveUser(user); renderGamification(); }
    })
  );
}

/* ---------- 7c. Gamification — badges, streak, leaderboard ---------- */
function initGamification() { renderGamification(); }

function renderGamification() {
  const user = loadUser() || {};

  $("#streakCount").textContent = user.streak || 0;
  $("#pointsCount").textContent = user.points || 0;

  $("#badgesGrid").innerHTML = STEMIFY_BADGES.map((b) => `
    <div class="badge-cell ${b.unlocked ? "" : "locked"}" title="${b.desc}">
      <div class="b-ic">${b.ic}</div>
      <div class="b-name">${b.name}</div>
      <div class="b-desc">${b.unlocked ? "Unlocked" : "Locked"}</div>
    </div>`).join("");

  $("#leaderboard").innerHTML = STEMIFY_LEADERBOARD.map((r) => `
    <div class="lb-row ${r.me ? "me" : ""}">
      <div class="lb-rank r${r.rank}">${r.rank}</div>
      <div style="flex:1; font-size:13px">${r.name}</div>
      <span style="font-family:var(--font-mono); font-size:12px; color:var(--cyan)">${r.pts} pts</span>
    </div>`).join("");
}

/* ---------- 7d. CBSE / NCERT Hub (accordion) ---------- */
function initNcert() {
  $("#ncertList").innerHTML = STEMIFY_NCERT.map((c, ci) => `
    <div class="ncert-chapter" data-ci="${ci}">
      <button type="button">
        ${c.chapter}
        <span class="chev">▾</span>
      </button>
      <div class="ncert-body">
        ${c.qa.map((qa) => `
          <div class="qa">
            <div class="q">Q. ${qa.q}</div>
            <div class="a">${qa.a}</div>
          </div>`).join("")}
        <div class="tip-card">💡 <b>Tip:</b> ${c.tips}</div>
      </div>
    </div>`).join("");

  $$("#ncertList .ncert-chapter > button").forEach((btn) =>
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("open"))
  );
}

/* ==========================================================================
   7e. MATH SOLVER — input → KaTeX steps + Copy Solution
   --------------------------------------------------------------------------
   Local mock engine for linear & quadratic equations.
   ⚠️ BACKEND HOOK: POST the raw string to your live solver API here, e.g.
      fetch("/api/solve", { body: raw }) → receive { latexSteps: [...] }
   ========================================================================== */
function initSolver() {
  $("#solveBtn").addEventListener("click", () => solveExpression());
  $("#solverInput").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); solveExpression(); } });
}

function solveExpression() {
  const raw = $("#solverInput").value.trim();
  const out = $("#solveOut");
  if (!raw) return toast("Type a problem first!", "error");

  const cleaned = raw.replace(/\^/g, "^").replace(/×/g, "*").replace(/÷/g, "/");

  /* --- Linear: ax + b = c --- */
  const lin = cleaned.match(/^(-?\d*\.?\d*)\s*\*\s*x\s*([+-]\s*\d*\.?\d*)?\s*=\s*(-?\d*\.?\d+)$/);
  /* --- Quadratic: ax^2 + bx + c = 0 --- */
  const quad = cleaned.match(/^(-?\d*\.?\d*)\s*\*\s*x\^2\s*([+-]\s*\d*\.?\d*\s*\*\s*x)?\s*([+-]\s*\d*\.?\d+)?\s*=\s*0$/);

  /* Helper: parse coefficients with implicit 1 / −1 handling */
  const parseCoeff = (raw, fallback) => {
    const s = String(raw || "").replace(/\s+/g, "");
    if (s === "" || s === "+") return 1;
    if (s === "-") return -1;
    const n = parseFloat(s);
    return Number.isFinite(n) && s !== "" ? n : fallback;
  };

  let steps = null;

  if (quad) {
    const a = parseCoeff(quad[1], 1);
    const b = parseCoeff(quad[2], 1);
    const c = parseCoeff(quad[3], 0);
    if (!a) return toast("Not a valid quadratic (a can't be 0).", "error");
    const D = b * b - 4 * a * c;
    const sq = Math.sqrt(Math.abs(D));
    const latexA = a === 1 ? "" : a === -1 ? "-" : a;

    steps = [
      `\\text{Given: } ${latexA}x^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)}x ${c < 0 ? "-" : "+"} ${Math.abs(c)} = 0`,
      `\\text{Discriminant } D = b^2 - 4ac = ${b}^2 - 4(${a})(${c}) = ${D}`,
      D >= 0
        ? `x = \\frac{-b \\pm \\sqrt{D}}{2a} = \\frac{${-b} \\pm \\sqrt{${D}}}{${2 * a}}`
        : `D < 0 \\Rightarrow \\text{no real roots} \\;(x = \\frac{${-b} \\pm ${Math.sqrt(Math.abs(D)).toFixed(3)}i}{${2 * a}})`,
      D > 0 ? `\\therefore x_1 = ${((-b + sq) / (2 * a)).toFixed(3)}, \\quad x_2 = ${((-b - sq) / (2 * a)).toFixed(3)}` :
      D === 0 ? `\\therefore x = ${(-b / (2 * a)).toFixed(3)} \\text{ (repeated root)}` : ""
    ].filter(Boolean);

  } else if (lin) {
    const a = parseCoeff(lin[1], 1);
    const b = parseCoeff(lin[2], 0);
    const c = parseCoeff(lin[3], NaN);
    if (!a) return toast("Not a valid linear equation.", "error");
    const sol = (c - b) / a;
    steps = [
      `\\text{Given: } ${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}`,
      `${a}x = ${c} ${b < 0 ? "+" : "-"} ${Math.abs(b)} = ${c - b}`,
      `x = \\frac{${c - b}}{${a}} = ${sol.toFixed(3)}`,
      `\\boxed{x = ${sol.toFixed(3)}}`
    ];
  } else {
    /* Fallback: unknown pattern → backend hook placeholder */
    const esc = raw.replace(/\^/g, "^").replace(/&/g, "\\&").replace(/_/g, "\\_");
    steps = [
      `\\text{Expression received: } ${esc}`,
      "\\text{Full symbolic solving for this pattern comes from the live backend solver.}"
    ];
  }

  out.innerHTML = `
    <div style="font-family:var(--font-head); font-size:11px; letter-spacing:.24em; color:var(--cyan); margin-bottom:8px">SOLUTION</div>
    ${steps.map((s) => `<div class="step">${s}</div>`).join("")}
    <button class="btn btn-sm copy-btn" id="copySolBtn">📋 Copy Solution</button>`;

  renderMath(out);
  out.classList.add("on");

  $("#copySolBtn").addEventListener("click", () => {
    const latex = steps.join("\n");
    (navigator.clipboard?.writeText(latex) || Promise.reject())
      .then(() => toast("Solution copied to clipboard!", "success"))
      .catch(() => toast("Couldn't copy — select the text manually.", "error"));
  });
}

/* ---------- 7f. Image Solver — drag & drop upload ---------- */
function initImageSolver() {
  const zone = $("#dropZone"), input = $("#fileInput");
  const preview = $("#imgPreview"), img = $("#imgPreviewEl"), out = $("#imgOut");

  zone.addEventListener("click", () => input.click());
  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag"); });
  zone.addEventListener("dragleave", () => zone.classList.remove("drag"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault(); zone.classList.remove("drag");
    handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener("change", () => handleFile(input.files[0]));

  /* STATE: empty → preview → analysing → solved */
  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return toast("Please drop an image file.", "error");
    if (file.size > 5 * 1024 * 1024) return toast("Image is larger than 5 MB.", "error");

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      preview.style.display = "block";
      out.innerHTML = `<p class="muted" style="text-align:center; padding:10px"><span class="spinner"></span><br/>AI analysing image…</p>`;
      out.classList.add("on");

      /* ⚠️ BACKEND HOOK: POST image blob to your OCR/AI solver here.
         fetch("/api/solve-image", { method: "POST", body: file }) → { steps } */
      setTimeout(() => {
        out.innerHTML = `
          <div style="font-family:var(--font-head); font-size:11px; letter-spacing:.24em; color:var(--cyan); margin-bottom:8px">AI SOLUTION (mock OCR)</div>
          <div class="step">\\text{Detected equation: } x^2 + 2x - 8 = 0</div>
          <div class="step">D = 4 + 32 = 36</div>
          <div class="step">x = \\frac{-2 \\pm 6}{2} \\;\\Rightarrow\\; \\boxed{x = 2,\\; x = -4}</div>
          <p class="muted" style="font-size:11px; margin-top:10px">Preview output — connect your live AI solver for real detection.</p>`;
        renderMath(out);
      }, 2600);
    };
    reader.readAsDataURL(file);
  }
}

/* ---------- 7g. Interactive graph placeholders (canvas) ---------- */
function initGraphs() {
  drawGraph("graphParabola", (x) => x * x - 2, { label: "y = x² − 2" });
  drawGraph("graphSine", (x) => Math.sin(x * Math.PI / 180 * 60) * 1.4, { label: "y = sin x" });
  drawGraph("graphIneq", (x) => x * 0.5 + 1, { label: "y ≤ x + 1", shade: true });
}

function drawGraph(id, fn, { shade = false } = {}) {
  const cv = document.getElementById(id);
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = cv.width = 320, H = cv.height = 200;

  const toX = (v) => (v + 4) * (W / 8);       /* x range: −4 … 4  */
  const toY = (v) => H - (v + 2.2) * (H / 4.4); /* y range: −2.2 … 2.2 */

  /* axes grid */
  ctx.strokeStyle = "rgba(0,229,255,.12)";
  ctx.lineWidth = 1;
  for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(toX(i), 0); ctx.lineTo(toX(i), H); ctx.stroke(); }
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(0, toY(i)); ctx.lineTo(W, toY(i)); ctx.stroke(); }

  /* shaded region (inequalities) */
  if (shade) {
    ctx.fillStyle = "rgba(0,229,255,.10)";
    ctx.beginPath();
    ctx.moveTo(toX(-4), H);
    for (let v = -4; v <= 4; v += 0.1) ctx.lineTo(toX(v), toY(fn(v)));
    ctx.lineTo(toX(4), H);
    ctx.fill();
  }

  /* curve */
  ctx.strokeStyle = "#00e5ff";
  ctx.shadowColor = "rgba(0,229,255,.8)";
  ctx.shadowBlur = 8;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let v = -4; v <= 4; v += 0.05) {
    const y = fn(v);
    const px = toX(v), py = toY(y);
    v === -4 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  /* origin dot */
  ctx.fillStyle = "#ff3d81";
  ctx.shadowColor = "rgba(255,61,129,.9)"; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(toX(0), toY(0), 3.2, 0, 7); ctx.fill();
}

/* ---------- 7h. Tutor request ---------- */
function initTutor() {
  $("#tutorBtn").addEventListener("click", () => openModal("tutorModal"));
  $("#tutorSendBtn").addEventListener("click", () => {
    const subj = $("#tutSubject").value.trim() || "General math";
    const date = $("#tutDate").value || "soon";
    const slot = $("#tutTime").value;
    closeModal("tutorModal");
    toast(`📡 Tutor requested: “${subj}” on ${date} (${slot}) — we'll confirm shortly!`, "success", 5000);
  });
}

/* ==========================================================================
   8. AI CHATBOT — "Have a Question?" slide-out panel
   --------------------------------------------------------------------------
   Tier rules:
     Standard → 3 queries per month (month-scoped localStorage counter)
     Premium  → unlimited
   ⚠️ BACKEND HOOK: replace mockReply() with a call to your OpenAI/Gemini API:
     fetch("/api/chat", { body: JSON.stringify({ message, articleCtx }) })
   ========================================================================== */
let chatCtx = "General Math";   /* article context set when asked from reader */

function initChat() {
  $("#fabQuestion").addEventListener("click", openChat);
  $("#askQuestionBtn").addEventListener("click", () => { openChat(); });
  $("#chatCloseBtn").addEventListener("click", closeChat);
  $("#chatSendBtn").addEventListener("click", sendChat);
  $("#chatInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendChat(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeChat(); });
}

function openChat() {
  const shell = $("#chatShell");
  if (!shell.classList.contains("open") && !$("#chatMsgs").children.length) {
    botSay(`Hi! I'm your Stemify AI tutor 👋\nAsk me anything about ${chatCtx} — I'll walk you through it step by step.`);
  }
  shell.classList.add("open");
  $("#chatInput").focus();
  updateChatStatus();
}

function closeChat() { $("#chatShell").classList.remove("open"); }

function updateChatStatus() {
  const user = loadUser() || {};
  $("#chatStatus").textContent = user.premium
    ? "premium · unlimited queries"
    : `standard · ${Math.max(0, 3 - queriesUsed())}/3 left this month`;
}

function sendChat() {
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;

  const user = loadUser() || {};

  /* --- QUOTA CHECK (Standard tier) --- */
  if (!user.premium && queriesUsed() >= 3) {
    botSay("⚠️ You've used all 3 free queries this month.\nUpgrade to Premium for unlimited AI help — it's ₹299/month. Tap the Upgrade button in the Premium Suite!");
    toast("Query limit reached — upgrade for unlimited chat.", "error");
    input.value = "";
    return;
  }

  userSay(text);
  input.value = "";
  bumpQueries();
  updateChatStatus();
  saveUser(user);

  /* --- Simulated API latency + typing indicator --- */
  const typing = botTyping();
  setTimeout(() => {
    typing.remove();
    botSay(mockReply(text));
  }, 1100 + Math.random() * 900);
}

/* STATE: typing indicator bubble */
function botTyping() {
  const msg = document.createElement("div");
  msg.className = "bubble bot";
  msg.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span>`;
  $("#chatMsgs").appendChild(msg);
  scrollChat();
  return msg;
}

function userSay(text) {
  const b = document.createElement("div");
  b.className = "bubble user";
  b.textContent = text;
  $("#chatMsgs").appendChild(b);
  scrollChat();
}

function botSay(text) {
  const b = document.createElement("div");
  b.className = "bubble bot";
  b.textContent = text;
  $("#chatMsgs").appendChild(b);
  scrollChat();
}

function scrollChat() { const a = $("#chatMsgs"); a.scrollTop = a.scrollHeight; }

/* Lightweight offline brain — swap for a real LLM API call */
function mockReply(q) {
  const t = q.toLowerCase();
  if (/(quadratic|ax|roots|discriminant|b2|b\^2)/.test(t))
    return "For a quadratic ax² + bx + c = 0, compute the discriminant D = b² − 4ac.\n• D > 0 → two real roots\n• D = 0 → one repeated root\n• D < 0 → no real roots\n\nThen use x = (−b ± √D) / 2a. Want a worked example?";
  if (/(pythagoras|pythagorean|hypotenuse)/.test(t))
    return "Pythagoras' theorem: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle).\nTry it: a ladder 12 m long rests 5 m from a wall — the wall height is √(12² − 5²) = √119 ≈ 10.9 m.";
  if (/(trig|sin|cos|tan|angle)/.test(t))
    return "Remember SOH-CAH-TOA:\nsin θ = opposite/hypotenuse\ncos θ = adjacent/hypotenuse\ntan θ = opposite/adjacent\n\nAnd the golden identity: sin²θ + cos²θ = 1. Ask me to prove it!";
  if (/(probability|dice|coin|card)/.test(t))
    return "Probability = favourable outcomes / total outcomes.\nExample: rolling two dice → 36 outcomes; P(sum = 7) = 6/36 = 1/6. Tip: when asked 'at least one', compute 1 − P(none).";
  if (/(mean|median|mode|statistics|average)/.test(t))
    return "Three averages, three jobs:\n• Mean — sensitive to extremes\n• Median — robust middle value\n• Mode — most frequent value\n\nEmpirical link: Mode ≈ 3·Median − 2·Mean.";
  if (/(ap|arithmetic|sequence|series)/.test(t))
    return "For an Arithmetic Progression a, a+d, a+2d…\nnth term: aₙ = a + (n−1)d\nSum: Sₙ = n/2 · [2a + (n−1)d]\n\nTest: 1 + 2 + … + 20 = (20 × 21)/2 = 210. ✔";
  if (/(tutor|teacher|human|help me study)/.test(t))
    return "You can request a live human tutor from the Premium Suite → Tutor tab! For now, tell me which topic is tricky and I'll break it down.";
  if (/(hello|hi|hey)/.test(t)) return "Hey there! 👋 What's on your mind today — algebra, geometry, trigonometry, statistics or exam strategy?";
  if (/(thank|thanks|great|awesome)/.test(t)) return "Anytime! 🚀 Keep the streak alive — I'll be right here.";
  return `Good question! Here's the general approach for "${q}":\n\n1. Write down everything the problem gives you.\n2. Identify the concept involved (formula or theorem).\n3. Substitute values step by step.\n4. Sanity-check the answer's units and size.\n\n(I'm running on mock logic right now — my real brain is an OpenAI/Gemini API your developer can plug in at js/math.js → mockReply.)`;
}

/* ==========================================================================
   PROGRESS TRACKER (lightweight reward hooks)
   ========================================================================== */
function trackProgress(action) {
  const user = loadUser();
  if (!user) return;                    /* guests don't get persisted rewards */
  if (action === "read") user.points = (user.points || 0) + 5;
  saveUser(user);
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderArticles();
  initSearch();
  initPaperGenerator();
  initOnboarding();
  initAuthModal();
  initPricingModal();
  initSurveyModal();
  initPaymentModal();
  initDowngradeModal();
  initDp();
  updateTierUI();
  initScienceGate();
  initPremiumTabs();
  initQuiz();
  initPlan();
  initGamification();
  initNcert();
  initSolver();
  initImageSolver();
  initGraphs();
  initTutor();
  initChat();
});
