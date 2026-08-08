/* =========================================================================
   app.js — hash router and page rendering.
   Plain scripts and globals, no ES modules: the bundled single-file build
   has to work when opened directly from disk (file://), where modules are
   blocked by the browser's origin rules.
   ========================================================================= */

(function () {
  "use strict";

  var view = document.getElementById("view");
  var stepsList = document.getElementById("steps-list");
  var main = document.getElementById("main");

  /* ---- Theme ------------------------------------------------------------
     The published Artifact stamps data-theme on <html> from the viewer's own
     toggle. We use the same attribute so both paths agree. */

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

  /* ---- Progress ---------------------------------------------------------
     current: the rung the reader is on (1–5), or 6 once the ladder is cleared.
     done:    rungs they have ticked off by hand.
     Both survive a reload; neither is required for the site to work. */

  var PROGRESS_KEY = "ft-progress";

  function loadProgress() {
    try {
      var raw = JSON.parse(localStorage.getItem(PROGRESS_KEY));
      if (raw && typeof raw === "object") {
        return { current: raw.current || null, done: Array.isArray(raw.done) ? raw.done : [] };
      }
    } catch (e) { /* corrupt or unavailable — fall through */ }
    return { current: null, done: [] };
  }

  function saveProgress(p) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* private mode */ }
  }

  function rungByN(n) {
    for (var i = 0; i < CONTENT.ladder.rungs.length; i++) {
      if (CONTENT.ladder.rungs[i].n === n) return CONTENT.ladder.rungs[i];
    }
    return null;
  }

  /* ---- Small helpers ---------------------------------------------------- */

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

  /* ---- Pages ------------------------------------------------------------ */

  /* A returning reader should land on their next action, not the front door. */
  function renderResume() {
    var p = loadProgress();
    if (!p.current && !p.done.length) return "";

    var total = CONTENT.ladder.rungs.length;
    var what, link;

    if (p.current && p.current > total) {
      what = "You have cleared all five rungs.";
      link = '<a class="btn" href="#/hired">Go to step 4</a>';
    } else if (p.current) {
      var rung = rungByN(p.current);
      what = "You are on rung " + rung.n + " &mdash; " + rung.name + ".";
      link = '<a class="btn" href="#/ladder">Pick up where you left off</a>';
    } else {
      what = p.done.length + " of " + total + " rungs marked done.";
      link = '<a class="btn" href="#/ladder">Back to the ladder</a>';
    }

    return '<section class="section"><div class="resume">' +
      '<p class="resume__lead">Welcome back</p>' +
      '<p class="resume__what">' + what + "</p>" +
      '<div class="resume__row">' + link + "</div>" +
      "</div></section>";
  }

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

    var why = h.why.map(function (p) { return "<p>" + p + "</p>"; }).join("");

    return '<div class="page">' +

      '<header class="hero">' +
        '<h1 class="hero__title">' + h.title + "</h1>" +
        '<p class="hero__lede">' + h.lede + "</p>" +
        '<p class="hero__meta">' +
          "<span>Free and open</span>" +
          "<span>" + CONTENT.meta.readingTime + "</span>" +
          "<span>Updated " + CONTENT.meta.updated + "</span>" +
        "</p>" +
        '<a class="cta" href="' + CONTENT.steps[0].route + '">' +
          "Start with step 1" +
          '<span class="cta__time">' + CONTENT.steps[0].time + "</span>" +
        "</a>" +
      "</header>" +

      renderResume() +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">' + h.promise.label + "</span>" +
          "<p>" + h.promise.body + "</p>" +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<p class="eyebrow">The path &mdash; four steps</p>' +
        '<div class="path">' + path + "</div>" +
      "</section>" +

      '<section class="section prose">' +
        "<h2>Why this exists</h2>" +
        why +
      "</section>" +

      "</div>";
  }

  function renderBasics() {
    var b = CONTENT.basics;
    var step = stepByRoute("#/basics");

    var intro = b.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("");

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

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(b.tldr) +

      '<section class="section prose">' + intro + "</section>" +

      '<section class="section">' +
        "<h2>The four territories</h2>" +
        '<div class="territories">' + territories + "</div>" +
      "</section>" +

      '<section class="section">' +
        "<h2>The vocabulary, decoded</h2>" +
        '<p class="prose">' + b.decoderIntro + "</p>" +
        '<div class="table-wrap">' +
          '<table class="decoder">' +
            "<thead><tr>" +
              "<th>Word</th><th>What it means</th><th>What it is already like</th>" +
            "</tr></thead>" +
            "<tbody>" + rows + "</tbody>" +
          "</table>" +
        "</div>" +
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

  /* ---- Step 2: roles ---------------------------------------------------- */

  var DISTANCE_WORDS = ["A short step", "A real jump", "A long road"];
  var CODING_WORDS = ["Almost none", "Some", "Most days"];

  function meter(label, value, words) {
    var dots = "";
    for (var i = 1; i <= 3; i++) {
      dots += '<span class="meter__dot' + (i <= value ? " meter__dot--on" : "") + '"></span>';
    }
    return '<li class="meter">' +
      "<span>" + label + "</span>" +
      '<span class="meter__dots" aria-hidden="true">' + dots + "</span>" +
      "<span>" + words[value - 1] + "</span>" +
      "</li>";
  }

  function block(label, inner) {
    return '<div class="detail-block">' +
      '<span class="detail-block__label">' + label + "</span>" + inner +
      "</div>";
  }

  function list(items) {
    return "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  }

  function chips(name, options) {
    return options.map(function (o) {
      var pressed = o.value === "all";
      return '<button class="chip" type="button" data-filter="' + name + '" data-value="' + o.value +
        '" aria-pressed="' + pressed + '">' + o.label + "</button>";
    }).join("");
  }

  function renderRoles() {
    var r = CONTENT.roles;
    var step = stepByRoute("#/roles");

    var cards = r.items.map(function (role) {
      return '<article class="role" data-distance="' + role.distance + '" data-coding="' + role.coding + '">' +

        '<header class="role__head">' +
          '<h3 class="role__name">' + role.name + "</h3>" +
          '<span class="role__context">' + role.context + "</span>" +
        "</header>" +

        '<p class="role__one">' + role.oneLine + "</p>" +

        '<ul class="meters">' +
          meter("Distance from finance", role.distance, DISTANCE_WORDS) +
          meter("Code required", role.coding, CODING_WORDS) +
        "</ul>" +

        '<details class="role__more">' +
          "<summary>What the job is actually like</summary>" +
          '<div class="role__detail">' +
            block("A normal day", list(role.day)) +
            block("What already transfers", list(role.transfers)) +
            block("What to add", '<ul class="tags">' + role.add.map(function (a) {
              return '<li><span class="term">' + a + "</span></li>";
            }).join("") + "</ul>") +
            block("Typical pay",
              '<div class="pay">' +
                '<span><span class="pay__figure">' + role.salary.junior + "</span> " +
                  '<span class="pay__unit">VND / month &middot; entry</span></span>' +
                '<span><span class="pay__figure">' + role.salary.mid + "</span> " +
                  '<span class="pay__unit">VND / month &middot; 2&ndash;4 years</span></span>' +
                '<span class="basis basis--' + role.salary.basis + '">' +
                  (role.salary.basis === "measured" ? "Measured" : "Estimated") +
                "</span>" +
              "</div>") +
            block("Who hires for this", "<p>" + role.employers + "</p>") +
            '<p class="honest"><span class="honest__label">The honest catch</span>' + role.honest + "</p>" +
          "</div>" +
        "</details>" +

        "</article>";
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
        '<div class="filters">' +
          '<div class="filter-group">' +
            '<span class="filter-group__label">Distance from finance</span>' +
            '<div class="chips">' + chips("distance", r.filters.distance) + "</div>" +
          "</div>" +
          '<div class="filter-group">' +
            '<span class="filter-group__label">Code required</span>' +
            '<div class="chips">' + chips("coding", r.filters.coding) + "</div>" +
          "</div>" +
        "</div>" +
        '<p class="filter-count" id="filter-count" role="status"></p>' +
        '<div class="roles" id="roles">' + cards + "</div>" +
      "</section>" +

      '<section class="section">' +
        '<div class="note">' +
          '<span class="note__label">The cheapest raise on this page</span>' +
          "<p>" + r.payNote + "</p>" +
        "</div>" +
        '<p class="caveat"><b>On the salary figures &mdash; reviewed ' + r.salaryNote.reviewed + ".</b> " +
          r.salaryNote.body + "</p>" +
      "</section>" +

      pager("#/roles") +
      "</div>";
  }

  function wireRoles() {
    var state = { distance: "all", coding: "all" };
    var cards = Array.prototype.slice.call(document.querySelectorAll(".role"));
    var count = document.getElementById("filter-count");
    if (!cards.length || !count) return;

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var ok = (state.distance === "all" || card.dataset.distance === state.distance) &&
                 (state.coding === "all" || card.dataset.coding === state.coding);
        card.hidden = !ok;
        if (ok) shown++;
      });

      count.textContent = shown === cards.length
        ? "Showing all " + cards.length + " roles."
        : shown === 0
          ? "No role matches both filters. Try widening one of them."
          : "Showing " + shown + " of " + cards.length + " roles.";
    }

    document.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var group = chip.dataset.filter;
        state[group] = chip.dataset.value;
        document.querySelectorAll('.chip[data-filter="' + group + '"]').forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
      });
    });

    apply();
  }

  /* ---- Step 3: the ladder ------------------------------------------------ */

  /* Your current rung is the first one you have not cleared. A rung only
     counts as cleared on a confident yes to every question about it —
     "sort of" is not a pass, because the checkpoint will find out. */
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

    return '<div class="assess__body">' +
      '<p class="assess__lede">' + a.lede + "</p>" +
      '<fieldset class="qs" id="assess-form">' + qs + "</fieldset>" +
      '<div class="assess__actions">' +
        '<button class="btn" type="button" id="assess-submit" disabled>See where I am</button>' +
        '<span class="assess__progress" id="assess-progress" role="status">0 of ' + a.questions.length + " answered</span>" +
      "</div>" +
      "</div>";
  }

  function renderAssessmentResult(current) {
    var a = CONTENT.ladder.assessment;
    var total = CONTENT.ladder.rungs.length;

    if (current > total) {
      return '<div class="assess__body"><div class="result">' +
        '<div class="result__head">' +
          '<p class="result__lead">' + a.doneLead + "</p>" +
          '<p class="result__why">' + a.doneBody + "</p>" +
        "</div>" +
        '<div class="assess__actions">' +
          '<a class="btn" href="#/hired">Go to step 4</a>' +
          '<button class="btn btn--quiet" type="button" id="assess-retake">' + a.retake + "</button>" +
        "</div>" +
        "</div></div>";
    }

    var rung = rungByN(current);
    var next = rungByN(current + 1);

    var why = current === 1
      ? "Starting at the first rung is the normal result, not a bad one. It is two weeks of work."
      : "Rungs 1 to " + (current - 1) + " are already behind you. Skip them entirely.";

    var third = next
      ? { label: "Then, and only then", body: "Move to rung " + next.n + ", " + next.name.toLowerCase() + " &mdash; " + next.time + "." }
      : { label: "Then, and only then", body: 'You will have cleared the ladder. <a href="#/hired">Step 4</a> turns it into a job.' };

    return '<div class="assess__body"><div class="result">' +
      '<div class="result__head">' +
        '<p class="result__lead">' + a.resultLead + "</p>" +
        '<p class="result__rung">Rung ' + rung.n + " &mdash; " + rung.name + "</p>" +
        '<p class="result__why">' + why + "</p>" +
      "</div>" +

      '<div class="actions">' +
        '<div class="action">' +
          '<span class="action__label">Learn this</span>' +
          '<span class="action__body"><a href="' + rung.resource.url + '" target="_blank" rel="noopener">' +
            rung.resource.name + "</a> &mdash; about " + rung.time + ".</span>" +
        "</div>" +
        '<div class="action">' +
          '<span class="action__label">Then prove it</span>' +
          '<span class="action__body">' + rung.checkpoint + "</span>" +
        "</div>" +
        '<div class="action">' +
          '<span class="action__label">' + third.label + "</span>" +
          '<span class="action__body">' + third.body + "</span>" +
        "</div>" +
      "</div>" +

      '<div class="assess__actions">' +
        '<button class="btn btn--quiet" type="button" id="assess-retake">' + a.retake + "</button>" +
      "</div>" +
      "</div></div>";
  }

  function renderLadder() {
    var l = CONTENT.ladder;
    var step = stepByRoute("#/ladder");
    var progress = loadProgress();
    // Open the rung you are on. If the ladder is already cleared, open none —
    // auto-opening rung 1 would contradict the result we just gave.
    var openRung = progress.current
      ? (progress.current <= l.rungs.length ? progress.current : 0)
      : 1;

    var rungs = l.rungs.map(function (rung) {
      var badge = rung.emphasis ? '<span class="rung__badge">Highest return</span>' : "";
      var isDone = progress.done.indexOf(rung.n) !== -1;
      var doneMark = isDone ? '<span class="rung__done-mark">Done</span>' : "";
      var cls = "rung" + (isDone ? " rung--done" : "");
      return '<details class="' + cls + '" name="ladder"' + (rung.n === openRung ? " open" : "") + ">" +
        "<summary>" +
          '<span class="rung__row">' +
            '<span class="rung__n">' + rung.n + "</span>" +
            '<span class="rung__name">' + rung.name + badge + doneMark + "</span>" +
            '<span class="rung__time">' + rung.time + "</span>" +
            '<span class="rung__hint">Open</span>' +
          "</span>" +
        "</summary>" +

        '<div class="rung__body">' +
          "<p>" + rung.why + "</p>" +
          "<p>" + rung.whyFinance + "</p>" +
          '<p class="skipif"><strong>Skip this if</strong> ' + rung.skipIf + "</p>" +
          block("What to learn", list(rung.learn)) +
          '<div class="resource">' +
            '<a href="' + rung.resource.url + '" target="_blank" rel="noopener">' + rung.resource.name + "</a>" +
            '<span class="resource__note">' + rung.resource.note + "</span>" +
          "</div>" +
          '<p class="checkpoint"><span class="checkpoint__label">Checkpoint</span>' + rung.checkpoint + "</p>" +
          '<div class="assess__actions">' +
            '<button class="btn' + (isDone ? " btn--quiet" : "") + '" type="button" data-done-rung="' + rung.n + '">' +
              (isDone ? "Mark as not done" : "Mark rung " + rung.n + " as done") +
            "</button>" +
          "</div>" +
        "</div>" +
        "</details>";
    }).join("");

    var doneCount = progress.done.length;
    var pct = Math.round((doneCount / l.rungs.length) * 100);
    var summary = '<div class="ladder__summary">' +
      "<span>" + doneCount + " of " + l.rungs.length + " rungs done</span>" +
      '<span class="bar"><span class="bar__fill" style="width:' + pct + '%"></span></span>' +
      "</div>";

    var assessOpen = progress.current ? " open" : "";
    var assess = '<details class="assess"' + assessOpen + ">" +
      "<summary>" + l.assessment.prompt + "</summary>" +
      (progress.current ? renderAssessmentResult(progress.current) : renderAssessmentForm()) +
      "</details>";

    return '<div class="page">' +

      '<header class="page__head">' +
        '<p class="eyebrow">Step ' + step.n + " &mdash; " + step.time + "</p>" +
        '<h1 class="page__title">' + step.title + "</h1>" +
      "</header>" +

      tldr(l.tldr) +

      '<section class="section prose">' +
        l.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "</section>" +

      '<section class="section">' + assess + "</section>" +

      '<section class="section">' +
        '<p class="eyebrow">Five rungs &mdash; ' + l.totalNote + "</p>" +
        summary +
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
        "<h2>" + h.cv.label + "</h2>" +
        '<p class="prose">' + h.cv.intro + "</p>" +
        rules +
        '<p class="eyebrow">' + h.cv.examplesLabel + "</p>" +
        swaps +
      "</section>" +

      '<section class="section">' +
        "<h2>" + h.portfolio.label + "</h2>" +
        '<p class="prose">' + h.portfolio.intro + "</p>" +
        principles +
        '<p class="eyebrow">' + h.portfolio.projectsLabel + "</p>" +
        briefs +
      "</section>" +

      '<section class="section">' +
        "<h2>" + h.interview.label + "</h2>" +
        '<p class="prose">' + h.interview.intro + "</p>" +
        qa +
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
      '<header class="page__head"><h1 class="page__title">That page does not exist</h1></header>' +
      '<p class="prose"><a href="#/">Back to the start</a></p>' +
      "</div>";
  }

  /* ---- Router ----------------------------------------------------------- */

  var routes = {
    "#/":       renderHome,
    "#/basics": renderBasics,
    "#/roles":  renderRoles,
    "#/ladder": renderLadder,
    "#/hired":  renderHired
  };

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
        var p = loadProgress();
        p.current = scoreAssessment(answers);
        saveProgress(p);
        rerender();
      });
    }

    var retake = document.getElementById("assess-retake");
    if (retake) {
      retake.addEventListener("click", function () {
        var p = loadProgress();
        p.current = null;
        saveProgress(p);
        rerender();
      });
    }

    document.querySelectorAll("[data-done-rung]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var n = Number(btn.dataset.doneRung);
        var p = loadProgress();
        var at = p.done.indexOf(n);
        if (at === -1) p.done.push(n); else p.done.splice(at, 1);
        p.done.sort(function (x, y) { return x - y; });
        saveProgress(p);
        rerender();
      });
    });
  }

  /* Anything that needs event listeners after its markup is in the DOM. */
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

  /* Re-render after a progress change without throwing the reader back
     to the top of the page. */
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
