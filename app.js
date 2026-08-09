/* =========================================================================
   app.js — hash router and page rendering.

   Plain scripts and globals, no ES modules: the bundled single-file build
   has to work when opened directly from disk (file://).

   One disclosure pattern is used everywhere — panel() below. If you need
   something to expand, use it. Don't invent a second kind.
   ========================================================================= */

(function () {
  "use strict";

  var view = document.getElementById("view");
  var stepsList = document.getElementById("steps-list");
  var main = document.getElementById("main");

  /* ---- Theme ------------------------------------------------------------ */

  var THEME_KEY = "ft-theme";
  var toggle = document.getElementById("theme-toggle");
  var toggleLabel = document.getElementById("theme-toggle-label");

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || systemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    toggleLabel.textContent = theme === "dark" ? "Light" : "Dark";
    toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
  }

  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") applyTheme(saved);
    else toggleLabel.textContent = systemTheme() === "dark" ? "Light" : "Dark";
  } catch (e) {
    toggleLabel.textContent = "Dark";
  }

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ }
  });

  /* ---- The one thing we remember ---------------------------------------
     Which rung the reader was told to start on. Nothing else is stored. */

  var RUNG_KEY = "ft-rung";

  function loadRung() {
    try {
      var n = Number(localStorage.getItem(RUNG_KEY));
      return n >= 1 && n <= CONTENT.ladder.rungs.length + 1 ? n : null;
    } catch (e) { return null; }
  }

  function saveRung(n) {
    try {
      if (n === null) localStorage.removeItem(RUNG_KEY);
      else localStorage.setItem(RUNG_KEY, String(n));
    } catch (e) { /* private mode */ }
  }

  function rungByN(n) {
    for (var i = 0; i < CONTENT.ladder.rungs.length; i++) {
      if (CONTENT.ladder.rungs[i].n === n) return CONTENT.ladder.rungs[i];
    }
    return null;
  }

  /* ---- Helpers ----------------------------------------------------------- */

  function stepByRoute(route) {
    for (var i = 0; i < CONTENT.steps.length; i++) {
      if (CONTENT.steps[i].route === route) return CONTENT.steps[i];
    }
    return null;
  }

  function pager(route) {
    var idx = -1;
    for (var i = 0; i < CONTENT.steps.length; i++) {
      if (CONTENT.steps[i].route === route) idx = i;
    }
    if (idx === -1) return "";

    var prev = idx === 0
      ? '<a href="#/">&larr; Back to the start</a>'
      : '<a href="' + CONTENT.steps[idx - 1].route + '">&larr; ' + CONTENT.steps[idx - 1].title + "</a>";

    var next = idx === CONTENT.steps.length - 1
      ? "<span></span>"
      : '<a href="' + CONTENT.steps[idx + 1].route + '">' + CONTENT.steps[idx + 1].title + " &rarr;</a>";

    return '<nav class="pager">' + prev + next + "</nav>";
  }

  function tldr(text) {
    return '<aside class="tldr">' +
      '<p class="tldr__label">The short version</p>' +
      "<p>" + text + "</p>" +
      "</aside>";
  }

  function block(label, inner) {
    return '<div class="detail-block">' +
      '<span class="detail-block__label">' + label + "</span>" + inner +
      "</div>";
  }

  function list(items) {
    return "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  }

  /* The only disclosure component on the site. `title` may contain markup. */
  function panel(title, hint, body, opts) {
    opts = opts || {};
    return '<details class="panel"' +
        (opts.open ? " open" : "") +
        (opts.group ? ' name="' + opts.group + '"' : "") + ">" +
      '<summary class="panel__head">' +
        '<span class="panel__title">' + title + "</span>" +
        (hint ? '<span class="panel__hint">' + hint + "</span>" : "") +
      "</summary>" +
      '<div class="panel__body">' + body + "</div>" +
      "</details>";
  }

  /* ---- Home -------------------------------------------------------------- */

  function renderHome() {
    var h = CONTENT.home;

    var path = CONTENT.steps.map(function (s) {
      return '<a class="path__item" href="' + s.route + '">' +
        '<span class="path__n">' + s.n + "</span>" +
        '<span class="path__title">' + s.title + "</span>" +
        '<span class="path__desc">' + s.desc +
        ' <span class="path__time">' + s.time + "</span></span>" +
        "</a>";
    }).join("");

    return '<div class="page">' +

      '<header class="hero">' +
        '<h1 class="hero__title">' + h.title + "</h1>" +
        '<p class="hero__lede">' + h.lede + "</p>" +
        '<p class="hero__meta">' +
          "<span>Free</span>" +
          "<span>" + CONTENT.meta.readingTime + "</span>" +
          "<span>Updated " + CONTENT.meta.updated + "</span>" +
        "</p>" +
        '<a class="cta" href="' + CONTENT.steps[0].route + '">' +
          "Start with step 1" +
          '<span class="cta__time">' + CONTENT.steps[0].time + "</span>" +
        "</a>" +
      "</header>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">' + h.promise.label + "</span>" +
          "<p>" + h.promise.body + "</p>" +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<p class="eyebrow">Four steps</p>' +
        '<div class="path">' + path + "</div>" +
      "</section>" +

      '<section class="section prose">' +
        "<h2>Why bother</h2>" +
        h.why.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      "</div>";
  }

  /* ---- Step 1: basics ---------------------------------------------------- */

  function renderBasics() {
    var b = CONTENT.basics;
    var step = stepByRoute("#/basics");

    var territories = b.territories.map(function (t) {
      var reach = t.fit === "close" ? "Within reach"
                : t.fit === "mid" ? "Reachable"
                : "A long way off";
      return '<article class="territory territory--' + t.fit + '">' +
        '<h3 class="territory__name">' + t.name + "</h3>" +
        '<p class="territory__what">' + t.what + "</p>" +
        '<p class="territory__what">' + t.day + "</p>" +
        '<p class="territory__fit"><b>' + reach + "</b> &mdash; " + t.fitNote + "</p>" +
        "</article>";
    }).join("");

    var rows = b.decoder.map(function (d) {
      return "<tr>" +
        '<td class="decoder__word"><span class="term">' + d.word + "</span></td>" +
        "<td>" + d.plain + "</td>" +
        '<td class="decoder__like">' + d.like + "</td>" +
        "</tr>";
    }).join("");

    var decoderTable = '<div class="table-wrap">' +
      '<table class="decoder">' +
        "<thead><tr><th>Word</th><th>What it means</th><th>What it's already like</th></tr></thead>" +
        "<tbody>" + rows + "</tbody>" +
      "</table>" +
    "</div>";

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(b.tldr) +

      '<section class="section prose">' +
        b.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      '<section class="section">' +
        "<h2>The four territories</h2>" +
        '<div class="territories">' + territories + "</div>" +
      "</section>" +

      '<section class="section">' +
        "<h2>The vocabulary</h2>" +
        '<p class="prose">' + b.decoderIntro + "</p>" +
        panel("The words, decoded", b.decoder.length + " terms", decoderTable) +
      "</section>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">' + b.closing.label + "</span>" +
          "<p>" + b.closing.body + "</p>" +
        "</div>" +
      "</section>" +

      pager("#/basics") +
      "</div>";
  }

  /* ---- Step 2: roles, as a ledger ---------------------------------------
     A table you can scan top to bottom. Click a row, it opens underneath.
     Each row is a real <button>, so keyboard support comes free. */

  function renderRoles() {
    var r = CONTENT.roles;
    var step = stepByRoute("#/roles");

    var head = '<div class="ledger__head" aria-hidden="true">' +
      "<span>" + r.tableHead.role + "</span>" +
      "<span>" + r.tableHead.distance + "</span>" +
      "<span>" + r.tableHead.coding + "</span>" +
      "<span>" + r.tableHead.pay + "</span>" +
      "</div>";

    var items = r.items.map(function (role) {
      var bodyId = "role-" + role.id;
      var distance = r.distanceLabels[role.distance - 1];
      var coding = r.codingLabels[role.coding - 1];

      var body =
        '<p class="role__one">' + role.oneLine + "</p>" +
        '<div class="role__detail">' +
          block("A normal day", list(role.day)) +
          block("What already transfers", list(role.transfers)) +
          block("What to add", '<ul class="tags">' + role.add.map(function (a) {
            return '<li><span class="term">' + a + "</span></li>";
          }).join("") + "</ul>") +
          block("After two to four years", '<p class="pay__figure">' + role.salary.mid + " VND / month</p>") +
          block("Who hires for this", "<p>" + role.employers + "</p>") +
          '<p class="watch"><span class="watch__label">Worth knowing</span>' + role.watch + "</p>" +
        "</div>";

      return '<div class="ledger__item">' +
        '<button class="ledger__row" type="button" aria-expanded="false" aria-controls="' + bodyId + '">' +
          '<span class="ledger__name">' + role.name +
            '<span class="ledger__ctx">' + role.context + "</span>" +
          "</span>" +
          '<span class="ledger__cell"><span class="ledger__key">' + r.tableHead.distance + "</span>" + distance + "</span>" +
          '<span class="ledger__cell"><span class="ledger__key">' + r.tableHead.coding + "</span>" + coding + "</span>" +
          '<span class="ledger__cell ledger__pay"><span class="ledger__key">' + r.tableHead.pay + "</span>" + role.salary.junior + "</span>" +
        "</button>" +
        '<div class="ledger__body" id="' + bodyId + '" hidden>' + body + "</div>" +
        "</div>";
    }).join("");

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(r.tldr) +

      '<section class="section prose">' +
        r.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      '<section class="section">' +
        '<div class="ledger">' + head + items + "</div>" +
        '<p class="hint">Click any row to open it.</p>' +
      "</section>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">The cheapest raise on this page</span>' +
          "<p>" + r.payNote + "</p>" +
        "</div>" +
        '<p class="sources">' + r.sources + "</p>" +
      "</section>" +

      pager("#/roles") +
      "</div>";
  }

  function wireRoles() {
    document.querySelectorAll(".ledger__row").forEach(function (row) {
      row.addEventListener("click", function () {
        var body = document.getElementById(row.getAttribute("aria-controls"));
        var open = row.getAttribute("aria-expanded") === "true";
        row.setAttribute("aria-expanded", String(!open));
        body.hidden = open;
      });
    });
  }

  /* ---- Step 3: the ladder ------------------------------------------------ */

  function scoreAssessment(answers) {
    var qs = CONTENT.ladder.assessment.questions;
    for (var n = 1; n <= CONTENT.ladder.rungs.length; n++) {
      var cleared = true;
      for (var i = 0; i < qs.length; i++) {
        if (qs[i].rung === n && answers[i] !== "yes") { cleared = false; break; }
      }
      if (!cleared) return n;
    }
    return CONTENT.ladder.rungs.length + 1;
  }

  function renderAssessmentForm() {
    var a = CONTENT.ladder.assessment;

    var qs = a.questions.map(function (q, i) {
      var opts = a.answers.map(function (ans) {
        return '<label class="opt">' +
          '<input type="radio" name="q' + i + '" value="' + ans.value + '">' +
          "<span>" + ans.label + "</span>" +
          "</label>";
      }).join("");

      return '<div class="q">' +
        '<p class="q__text"><span class="q__n">' + (i + 1) + "</span>" + q.text + "</p>" +
        '<div class="q__options">' + opts + "</div>" +
        "</div>";
    }).join("");

    return '<p class="assess__lede">' + a.lede + "</p>" +
      '<fieldset class="qs" id="assess-form">' + qs + "</fieldset>" +
      '<div class="assess__actions">' +
        '<button class="btn" type="button" id="assess-submit" disabled>Show me where to start</button>' +
        '<span class="assess__progress" id="assess-progress" role="status">0 of ' + a.questions.length + " answered</span>" +
      "</div>";
  }

  function renderAssessmentResult(current) {
    var a = CONTENT.ladder.assessment;
    var total = CONTENT.ladder.rungs.length;

    if (current > total) {
      return '<div class="result">' +
        '<p class="result__lead">' + a.doneLead + "</p>" +
        '<p class="result__why">' + a.doneBody + "</p>" +
        '<div class="assess__actions">' +
          '<a class="btn" href="#/hired">Go to step 4</a>' +
          '<button class="btn btn--quiet" type="button" id="assess-retake">' + a.retake + "</button>" +
        "</div>" +
        "</div>";
    }

    var rung = rungByN(current);
    var next = rungByN(current + 1);

    var why = current === 1
      ? "Most people start here. It's two weeks."
      : "Rungs 1 to " + (current - 1) + " are behind you. Skip them.";

    var third = next
      ? "Then move to rung " + next.n + ", " + next.name.toLowerCase() + ", which is " + next.time + "."
      : 'After that you\'ve finished the ladder, and <a href="#/hired">step 4</a> turns it into a job.';

    return '<div class="result">' +
      '<p class="result__lead">' + a.resultLead + "</p>" +
      '<p class="result__rung">Rung ' + rung.n + " &mdash; " + rung.name + "</p>" +
      '<p class="result__why">' + why + "</p>" +

      '<div class="actions">' +
        '<div class="action">' +
          '<span class="action__label">Learn this</span>' +
          '<span class="action__body"><a href="' + rung.resource.url + '" target="_blank" rel="noopener">' +
            rung.resource.name + "</a>, about " + rung.time + ".</span>" +
        "</div>" +
        '<div class="action">' +
          '<span class="action__label">Then prove it</span>' +
          '<span class="action__body">' + rung.checkpoint + "</span>" +
        "</div>" +
        '<div class="action">' +
          '<span class="action__label">After that</span>' +
          '<span class="action__body">' + third + "</span>" +
        "</div>" +
      "</div>" +

      '<div class="assess__actions">' +
        '<button class="btn btn--quiet" type="button" id="assess-retake">' + a.retake + "</button>" +
      "</div>" +
      "</div>";
  }

  function renderLadder() {
    var l = CONTENT.ladder;
    var step = stepByRoute("#/ladder");
    var startAt = loadRung();
    var openRung = startAt && startAt <= l.rungs.length ? startAt : (startAt ? 0 : 1);

    var rungs = l.rungs.map(function (rung) {
      var badge = rung.emphasis ? '<span class="rung__badge">Best return</span>' : "";
      var title = '<span class="panel__n">' + rung.n + "</span>" + rung.name + badge;

      var body =
        "<p>" + rung.why + "</p>" +
        "<p>" + rung.whyFinance + "</p>" +
        '<p class="skipif"><strong>Skip this if</strong> ' + rung.skipIf + "</p>" +
        block("What to learn", list(rung.learn)) +
        '<div class="resource">' +
          '<a href="' + rung.resource.url + '" target="_blank" rel="noopener">' + rung.resource.name + "</a>" +
          '<span class="resource__note">' + rung.resource.note + "</span>" +
        "</div>" +
        '<p class="checkpoint"><span class="checkpoint__label">Checkpoint</span>' + rung.checkpoint + "</p>";

      return panel(title, rung.time, body, { group: "ladder", open: rung.n === openRung });
    }).join("");

    var assessBody = startAt ? renderAssessmentResult(startAt) : renderAssessmentForm();

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(l.tldr) +

      '<section class="section prose">' +
        l.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      '<section class="section" id="assess">' +
        panel(l.assessment.prompt, "8 questions", assessBody, { open: !!startAt }) +
      "</section>" +

      '<section class="section">' +
        '<p class="eyebrow">Five rungs &mdash; ' + l.totalNote + "</p>" +
        '<div class="ladder">' + rungs + "</div>" +
      "</section>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">' + l.closing.label + "</span>" +
          "<p>" + l.closing.body + "</p>" +
        "</div>" +
      "</section>" +

      pager("#/ladder") +
      "</div>";
  }

  function wireLadder() {
    var a = CONTENT.ladder.assessment;
    var form = document.getElementById("assess-form");

    if (form) {
      var submit = document.getElementById("assess-submit");
      var progressText = document.getElementById("assess-progress");

      form.addEventListener("change", function () {
        var answered = form.querySelectorAll("input:checked").length;
        progressText.textContent = answered + " of " + a.questions.length + " answered";
        submit.disabled = answered < a.questions.length;
      });

      submit.addEventListener("click", function () {
        var answers = [];
        for (var i = 0; i < a.questions.length; i++) {
          var picked = form.querySelector('input[name="q' + i + '"]:checked');
          answers[i] = picked ? picked.value : null;
        }
        saveRung(scoreAssessment(answers));
        rerender();
      });
    }

    var retake = document.getElementById("assess-retake");
    if (retake) {
      retake.addEventListener("click", function () {
        saveRung(null);
        rerender();
      });
    }
  }

  /* ---- Step 4: getting hired --------------------------------------------- */

  function renderHired() {
    var h = CONTENT.hired;
    var step = stepByRoute("#/hired");

    var rules = '<ul class="rules">' + h.cv.rules.map(function (r) {
      return "<li><span>" + r + "</span></li>";
    }).join("") + "</ul>";

    var swaps = '<div class="swaps">' + h.cv.examples.map(function (e) {
      return '<div class="swap">' +
        '<div class="swap__line swap__line--before">' +
          '<span class="swap__tag">Instead of</span>' +
          '<span class="swap__text">' + e.before + "</span>" +
        "</div>" +
        '<div class="swap__line swap__line--after">' +
          '<span class="swap__tag">Write</span>' +
          '<span class="swap__text">' + e.after + "</span>" +
        "</div>" +
        '<p class="swap__why">' + e.why + "</p>" +
        "</div>";
    }).join("") + "</div>";

    var principles = '<ul class="rules">' + h.portfolio.principles.map(function (p) {
      return "<li><span>" + p + "</span></li>";
    }).join("") + "</ul>";

    var briefs = '<div class="briefs">' + h.portfolio.projects.map(function (p) {
      return '<article class="brief">' +
        '<div class="brief__head">' +
          '<h3 class="brief__name">' + p.name + "</h3>" +
          '<span class="term">' + p.skill + "</span>" +
        "</div>" +
        '<div class="brief__row">' +
          '<span class="brief__key">Question</span><span>' + p.question + "</span>" +
          '<span class="brief__key">Good enough</span><span>' + p.good + "</span>" +
          '<span class="brief__key">Stretch</span><span>' + p.stretch + "</span>" +
        "</div>" +
        "</article>";
    }).join("") + "</div>";

    var qa = '<div class="qa">' + h.interview.questions.map(function (q) {
      return '<div class="qa__item">' +
        '<p class="qa__q">&ldquo;' + q.q + "&rdquo;</p>" +
        '<div class="qa__answer">' +
          '<span class="qa__tag qa__tag--bad">Not this</span><span>' + q.bad + "</span>" +
          '<span class="qa__tag qa__tag--good">This</span><span>' + q.good + "</span>" +
          '<p class="qa__why">' + q.why + "</p>" +
        "</div>" +
        "</div>";
    }).join("") + "</div>";

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(h.tldr) +

      '<section class="section prose">' +
        h.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      '<section class="section">' +
        panel(h.cv.label, "4 rules and 4 rewrites",
          '<p class="prose">' + h.cv.intro + "</p>" + rules +
          '<p class="eyebrow">' + h.cv.examplesLabel + "</p>" + swaps,
          { group: "hired", open: true }) +

        panel(h.portfolio.label, "3 projects",
          '<p class="prose">' + h.portfolio.intro + "</p>" + principles +
          '<p class="eyebrow">' + h.portfolio.projectsLabel + "</p>" + briefs,
          { group: "hired" }) +

        panel(h.interview.label, "3 questions",
          '<p class="prose">' + h.interview.intro + "</p>" + qa,
          { group: "hired" }) +
      "</section>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">' + h.closing.label + "</span>" +
          "<p>" + h.closing.body + "</p>" +
        "</div>" +
      "</section>" +

      pager("#/hired") +
      "</div>";
  }

  function renderNotFound() {
    return '<div class="page">' +
      '<header class="page__head"><h1 class="page__title">That page doesn\'t exist</h1></header>' +
      '<p class="prose"><a href="#/">Back to the start</a></p>' +
      "</div>";
  }

  /* ---- Router ------------------------------------------------------------ */

  var routes = {
    "#/":       renderHome,
    "#/basics": renderBasics,
    "#/roles":  renderRoles,
    "#/ladder": renderLadder,
    "#/hired":  renderHired
  };

  var afterRender = {
    "#/roles": wireRoles,
    "#/ladder": wireLadder
  };

  function renderRail(route) {
    stepsList.innerHTML = CONTENT.steps.map(function (s) {
      var current = s.route === route ? ' aria-current="page"' : "";
      return '<li class="steps__item">' +
        '<a class="steps__link" href="' + s.route + '"' + current + ">" +
          '<span class="steps__n">' + s.n + "</span>" +
          '<span class="steps__title">' + s.title +
            '<span class="steps__time">' + s.time + "</span>" +
          "</span>" +
        "</a></li>";
    }).join("");
  }

  function route(opts) {
    var hash = window.location.hash || "#/";
    var render = routes[hash] || renderNotFound;

    view.innerHTML = render();
    renderRail(hash);
    if (afterRender[hash]) afterRender[hash]();

    document.title = hash === "#/"
      ? "Finance to Tech — a map of the tech world for finance students"
      : (stepByRoute(hash) ? stepByRoute(hash).title + " — Finance to Tech" : "Finance to Tech");

    if (!(opts && opts.keepScroll)) window.scrollTo(0, 0);
  }

  function rerender() {
    var y = window.scrollY;
    route({ keepScroll: true });
    window.scrollTo(0, y);
  }

  window.addEventListener("hashchange", function () {
    route();
    main.focus();
  });

  route();
})();
