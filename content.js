/* =========================================================================
   content.js — every word on the site lives here.
   This file is plain data on purpose: you can edit the content without
   touching any of the code in app.js.
   ========================================================================= */

const CONTENT = {

  meta: {
    updated: "August 2026",
    readingTime: "about 40 minutes end to end"
  },

  /* The four steps. Order is the whole point — this is a path, not a menu. */
  steps: [
    {
      n: 1,
      route: "#/basics",
      title: 'What "tech" actually means',
      desc: "The words, decoded. The four kinds of work that all get called tech, and which ones a finance degree already reaches.",
      time: "8 min"
    },
    {
      n: 2,
      route: "#/roles",
      title: "Where you fit",
      desc: "Six real jobs in Vietnam and Southeast Asia where a finance background is an advantage, not something to apologise for.",
      time: "12 min"
    },
    {
      n: 3,
      route: "#/ladder",
      title: "What to learn, in order",
      desc: "Five skills, ranked by what they return for the effort. You do not need all five, and you do not need them at once.",
      time: "10 min"
    },
    {
      n: 4,
      route: "#/hired",
      title: "Getting hired",
      desc: "How to put this on a CV without overclaiming, what to build so you have something to show, and how to tell the story in an interview.",
      time: "10 min"
    }
  ],

  home: {
    title: "You already know half of this.",
    lede: "A map of the tech world for finance students in Vietnam and Southeast Asia — what the words actually mean, which jobs want your degree, and what to learn first. No coding background assumed.",
    promise: {
      label: "How to use this",
      body: "Every page opens with a boxed summary. If you read nothing but those four boxes, you will still leave with the map. Everything underneath them is optional depth — take it when you want it, skip it when you don't."
    },
    why: [
      "Finance is a crowded degree. In any given hiring season you are competing with a very large number of people who can do broadly what you can do, and the ones who get through often have one thing extra.",
      "That extra thing is usually not a second degree. It is a handful of concrete, checkable skills — the ability to pull your own data, automate the reporting nobody wants to do by hand, and talk to an engineering team without a translator.",
      "This guide exists because the hardest part is not learning those skills. It is knowing which ones matter, in what order, and being able to see that the distance is shorter than it looks from here."
    ]
  },

  basics: {
    tldr: "“Tech” is not one job. It is four different kinds of work that got filed under the same word, and your finance degree already reaches two of them. Most of the vocabulary that sounds like a wall is describing something you already do in a spreadsheet.",

    intro: [
      "When someone says they work in tech, they could mean four quite different things. The word is doing far too much work, and that vagueness is most of what makes it intimidating. Split it into its parts and the map gets much smaller."
    ],

    /* fit: "close" | "mid" | "far" — how reachable from a finance degree */
    territories: [
      {
        name: "Data",
        what: "Turning records into answers that someone acts on.",
        day: "Writing queries, cleaning messy exports, building dashboards, and explaining to a manager why a number moved.",
        fit: "close",
        fitNote: "Closest to your degree. The scarce skill here is knowing what the numbers <em>mean</em> — and that is the part you already have."
      },
      {
        name: "Product",
        what: "Deciding what gets built, and why, and in what order.",
        day: "Talking to users, writing specifications, arguing about priorities, and checking whether the last thing shipped actually worked.",
        fit: "mid",
        fitNote: "Fintech teams need people who genuinely understand lending, payments and regulation. Domain knowledge is the entry ticket."
      },
      {
        name: "Software",
        what: "Building the things that people use.",
        day: "Reading existing code far more than writing new code, reviewing teammates' work, and fixing what broke.",
        fit: "far",
        fitNote: "The longest path from here, and worth taking only if you find you enjoy the building itself. Not the default answer."
      },
      {
        name: "Infrastructure",
        what: "Keeping the systems running — fast, available and secure.",
        day: "Automating releases, watching monitors, and being the person who responds when something fails at two in the morning.",
        fit: "far",
        fitNote: "Almost never a finance entry point. Worth being able to recognise so you know what people are talking about."
      }
    ],

    decoderIntro: "Here is the vocabulary that does most of the gatekeeping. None of it is complicated once someone says it plainly — which, for some reason, people rarely do.",

    /* word | plain meaning | the finance thing it is already like */
    decoder: [
      {
        word: "API",
        plain: "A fixed way for one program to request data or actions from another.",
        like: "A Bloomberg or Refinitiv feed your model pulls from. You don't get the whole database — only the fields you asked for, in the shape they agreed to give them."
      },
      {
        word: "Database",
        plain: "A store of records built to be questioned quickly.",
        like: "The general ledger, except you can ask it questions instead of scrolling through it."
      },
      {
        word: "SQL",
        plain: "The language for asking a database a question.",
        like: "A pivot table, written as a sentence instead of dragged with a mouse. If you can build a pivot, you can already think in SQL."
      },
      {
        word: "Script",
        plain: "A saved list of instructions a computer runs top to bottom.",
        like: "A recorded macro — but one you can read, understand and fix."
      },
      {
        word: "Repository",
        plain: "A project folder that keeps every version of every file in it.",
        like: "valuation_model_v7_FINAL_final.xlsx, except it actually works and you can see exactly who changed what, and when."
      },
      {
        word: "Git",
        plain: "The system that keeps that history, and lets several people edit the same files without overwriting each other.",
        like: "Track Changes, if Track Changes never lost anything and worked across a whole team at once."
      },
      {
        word: "Deploy",
        plain: "To put your work somewhere other people can actually use it.",
        like: "Circulating the model — the moment it stops being yours alone and starts being something others depend on."
      },
      {
        word: "Cloud",
        plain: "Somebody else's computers, rented by the hour.",
        like: "Leasing the office instead of buying the building. Same trade: less control, no capital outlay, someone else handles the plumbing."
      },
      {
        word: "Frontend",
        plain: "The part a person sees and clicks.",
        like: "The pitch deck — what gets presented."
      },
      {
        word: "Backend",
        plain: "The part that stores the data and does the actual work.",
        like: "The model behind the deck — where the reasoning lives and where the mistakes hide."
      },
      {
        word: "Framework",
        plain: "Prewritten code you build on top of, instead of starting from an empty file.",
        like: "A template model. The structure is already there; you supply the assumptions."
      },
      {
        word: "Stack",
        plain: "The particular set of tools a team has chosen to work with.",
        like: "The house methodology. Every firm has one, everyone is convinced theirs is correct, and you learn it on arrival."
      }
    ],

    closing: {
      label: "The point of all that",
      body: "Two of the four territories — data and product — hire people for understanding a business domain. You have spent years acquiring one. The next step is the specific jobs where that trade actually happens."
    }
  },

  /* ---------------------------------------------------------------------
     Step 2 — the roles.
     distance: 1 = a short step from a finance degree, 3 = a long one
     coding:   1 = almost none, 3 = you will write code most days
     --------------------------------------------------------------------- */
  roles: {
    tldr: "Six jobs in Vietnam and Southeast Asia where a finance degree is the thing that gets you in, not the thing you have to explain away. Two of them barely require code. Start by reading only the ones marked as a short step.",

    intro: [
      "Every role below is real, hires in this region, and takes people from a finance background. What differs is how far it sits from where you are now and how much code it actually asks for — those two things are separate, and confusing them is why people rule out jobs they could get.",
      "Use the filters. If you are unsure, look only at the short-step, low-code roles first; you can always widen from there."
    ],

    salaryNote: {
      reviewed: "August 2026",
      body: "Gross monthly VND. Figures marked <strong>measured</strong> come from the ITviec 2025&ndash;2026 salary report (1,839 respondents) cross-checked against live bank postings; figures marked <strong>estimated</strong> are inferred from adjacent roles and are the least reliable thing on this site. Two caveats on even the measured ones: ITviec surveys IT professionals, so bank salaries can sit lower, and every number moves with the company, the city and the year. Check the current ITviec, VietnamWorks and TopDev reports before you rely on any of it."
    },

    payNote: "Roles where English is required pay about 23% more than those where it is not — the largest single premium found in Vietnamese finance-analyst salary data. It is worth more than any tool on the ladder.",

    filters: {
      distance: [
        { value: "all", label: "Any distance" },
        { value: "1", label: "A short step" },
        { value: "2", label: "A real jump" },
        { value: "3", label: "A long road" }
      ],
      coding: [
        { value: "all", label: "Any amount of code" },
        { value: "1", label: "Almost no code" },
        { value: "2", label: "Some code" },
        { value: "3", label: "Code most days" }
      ]
    },

    items: [
      {
        id: "data-analyst",
        name: "Data Analyst",
        context: "Banking, fintech, e-commerce",
        distance: 1,
        coding: 2,
        oneLine: "You answer questions with data that someone is about to make a decision on.",
        day: [
          "Writing queries against the company's transaction and customer tables.",
          "Cleaning exports that arrive in a worse state than anyone admits.",
          "Building and maintaining the dashboards a team looks at every morning.",
          "Explaining, in a meeting, why a number moved — and being believed."
        ],
        transfers: [
          "You already read financial statements, so you know what a suspicious number looks like.",
          "You can talk to a finance or risk team in their own language.",
          "You understand what the business is actually trying to do, which is most of the job."
        ],
        add: ["SQL", "Excel to an analyst standard", "Power BI or Tableau", "Python (eventually)"],
        salary: { junior: "10–20M", mid: "25–40M", basis: "measured" },
        employers: "Techcombank, VPBank, MB Bank, MoMo, VNPay, ZaloPay, Shopee, Grab, FE Credit",
        honest: "The title is used loosely — some \"data analyst\" jobs are really reporting jobs where you rebuild the same spreadsheet weekly. Ask what proportion of the work is new analysis versus recurring reports. Also be realistic about entry: bank BI postings routinely ask for two years, so the usual route in is a junior reporting or operations role first."
      },
      {
        id: "business-analyst",
        name: "Business Analyst",
        context: "Core banking, payments, insurance tech",
        distance: 1,
        coding: 1,
        oneLine: "You sit between the people who need something built and the people who build it, and make sure they mean the same thing.",
        day: [
          "Interviewing the operations or lending team about how a process actually works.",
          "Writing that up precisely enough that an engineer can build from it.",
          "Drawing the process as a diagram and finding the step nobody had thought about.",
          "Testing what got built against what was asked for."
        ],
        transfers: [
          "Domain knowledge is the whole job, and lending, payments and settlement are things you have studied.",
          "You are trained to be precise about definitions — which is exactly what a specification is.",
          "You can spot when a proposed process breaks a regulatory or accounting rule."
        ],
        add: ["SQL (to check your own assumptions)", "Process mapping", "Writing clear specifications", "Basic understanding of how systems talk to each other"],
        salary: { junior: "12–18M", mid: "25–37M", basis: "measured" },
        employers: "Core banking vendors, VPBank, Techcombank, Manulife, Prudential, VNPay, the Big Four consulting arms",
        honest: "Two things to weigh. It has the lowest coding requirement here, which makes it the most competitive door — a lot of people are trying it, and strong writing separates candidates more than tools do. It also pays measurably less than data analyst at every experience level. Easiest entry, lowest ceiling: that trade is worth making deliberately rather than by accident."
      },
      {
        id: "fpna",
        name: "FP&A / Finance Automation",
        context: "In-house finance teams",
        distance: 1,
        coding: 2,
        oneLine: "The finance job you already trained for, done by someone who automates the boring 70% of it.",
        day: [
          "Building the forecast and the monthly reporting pack.",
          "Replacing manual consolidation steps with something that runs itself.",
          "Investigating variances and writing the commentary.",
          "Being the person the team asks when a model breaks."
        ],
        transfers: [
          "Effectively all of it. This is a finance role — the tech is leverage, not a career change.",
          "Your degree is the qualification, not a liability you're compensating for."
        ],
        add: ["Power Query and Power Pivot", "SQL", "Python for repetitive work", "Power BI"],
        salary: { junior: "12–20M", mid: "23–33M", basis: "measured" },
        employers: "Any company with a real finance function — MNC shared-service centres in Ho Chi Minh City and Hanoi hire heavily here",
        honest: "The safest option here, and the one with the lowest ceiling if you stop learning once the reporting runs itself. Two levers matter more than the tools: English-required roles pay around 23% more, and the automation skills are what stop this becoming a dead end."
      },
      {
        id: "product-analyst",
        name: "Fintech Product Analyst",
        context: "Payments, lending, wallets",
        distance: 2,
        coding: 2,
        oneLine: "You work out whether the thing the team built actually worked, and what should be built next.",
        day: [
          "Measuring whether a new feature changed user behaviour, or just looked like it did.",
          "Sizing a proposed feature: how many users, how much revenue, what it costs to build.",
          "Sitting with engineers and designers deciding what ships this quarter.",
          "Talking to actual users about why they abandoned the flow."
        ],
        transfers: [
          "You can model unit economics, which most product people cannot do well.",
          "Lending, interchange, float and settlement are things you understand structurally.",
          "You know which regulatory constraints are real and which are assumed."
        ],
        add: ["SQL", "Experiment design and reading an A/B test honestly", "Product analytics tools", "Writing short, decisive documents"],
        salary: { junior: "15–25M", mid: "30–45M", basis: "estimated" },
        employers: "MoMo, VNPay, ZaloPay, Grab Financial, Shopee, Tiki, Finhay, Infina",
        honest: "Rarely a graduate role. The usual path is one to two years as a data or business analyst first, then a move sideways. Treat it as a two-year target, not a first job."
      },
      {
        id: "risk-analytics",
        name: "Risk & Credit Analytics",
        context: "Banks, consumer lenders, BNPL",
        distance: 2,
        coding: 3,
        oneLine: "You build and monitor the models that decide who gets lent money and on what terms.",
        day: [
          "Building scorecards and testing whether they still predict what they used to.",
          "Monitoring portfolio performance and explaining deterioration.",
          "Documenting models to a standard a regulator will accept.",
          "Arguing with the commercial team about the cost of approving more people."
        ],
        transfers: [
          "Credit risk, provisioning and the time value of money are already yours.",
          "Statistics from your degree is the actual foundation of the modelling.",
          "You understand the regulatory frame the models have to live inside."
        ],
        add: ["Python or R", "SQL", "Applied statistics and model validation", "Model documentation"],
        salary: { junior: "15–25M", mid: "30–45M", basis: "estimated" },
        employers: "FE Credit, Home Credit, Techcombank, VPBank, MB Bank, Shinhan, consumer-lending and BNPL startups",
        honest: "The most technical role here, and the one where a weak statistics background genuinely blocks you — if regression and hypothesis testing were a struggle at university, be honest with yourself first. Also note the entry point is narrow: bank postings for scorecard and PD/LGD modelling routinely ask for eight years. Realistically you arrive here from risk operations or data analysis, not from graduation."
      },
      {
        id: "regtech",
        name: "RegTech & Compliance Analytics",
        context: "Banks, payment institutions, crypto exchanges",
        distance: 2,
        coding: 2,
        oneLine: "You use data to catch financial crime and prove to a regulator that the controls work.",
        day: [
          "Tuning the rules that flag suspicious transactions, and cutting the false positives.",
          "Investigating alerts and writing them up.",
          "Producing the reports the central bank requires, on time and correct.",
          "Testing whether a control does what the policy claims."
        ],
        transfers: [
          "Regulation, AML and KYC are finance-curriculum topics — most technologists find them opaque.",
          "You can read a circular and work out what it actually requires.",
          "Attention to documentation, which is half of compliance work."
        ],
        add: ["SQL", "Rule tuning and basic anomaly detection", "Python for investigation work", "Reporting tools"],
        salary: { junior: "15–25M", mid: "28–40M", basis: "estimated" },
        employers: "All licensed banks and payment institutions, plus regional crypto exchanges",
        honest: "Steady, well-paid and genuinely useful, but the work is more procedural than it looks from outside. It suits people who like being right more than people who like building things."
      }
    ]
  },

  /* ---------------------------------------------------------------------
     Step 3 — the ladder. Ordered by return on effort from a finance start.
     --------------------------------------------------------------------- */
  ladder: {
    tldr: "Five skills, in the order that pays off fastest from where you are. You do not need all five. If you learn only one, learn SQL — it opens more doors per hour spent than anything else on this list.",

    intro: [
      "The order matters more than the list. Each rung makes the next one easier, and each one is independently useful — if you stop after two, you have still gained something a hiring manager can check.",
      "One rung is open at a time on purpose. Finish the checkpoint before you open the next one."
    ],

    totalNote: "About four to six months at thirty minutes a day, if you do all five. Most people stop after three and are fine.",

    rungs: [
      {
        n: 1,
        name: "Spreadsheets, properly",
        time: "2 weeks",
        why: "There is a real gap between using Excel and using Excel the way an analyst does. Closing it costs two weeks and immediately makes you faster than most of your cohort.",
        whyFinance: "You are already in spreadsheets every day. This is the only rung where you start at seventy percent rather than zero.",
        skipIf: "You can write an INDEX/MATCH without looking it up, and you have built something in Power Query.",
        learn: ["Lookups that don't break when columns move", "Pivot tables past the basics", "Power Query for repeatable cleaning", "Structured references and named ranges"],
        resource: { name: "Microsoft Learn — Excel", url: "https://learn.microsoft.com/training/browse/?products=office-excel", note: "Free, official, and organised as short modules." },
        checkpoint: "Take a listed bank's quarterly report. Build a summary sheet that updates itself when you paste in the next quarter — no retyping, no manual cell edits."
      },
      {
        n: 2,
        name: "SQL",
        time: "4–6 weeks",
        emphasis: true,
        why: "The highest return of anything on this list. SQL appears in the requirements of nearly every role in step 2, it is testable in an interview, and it is small enough to genuinely learn in a month.",
        whyFinance: "If you can build a pivot table, you already think the way SQL works. You are learning to write down something you can currently only do with a mouse.",
        skipIf: "You can write a join and a GROUP BY from memory and know why a LEFT JOIN can multiply your row count.",
        learn: ["SELECT, WHERE, ORDER BY", "GROUP BY and aggregate functions", "JOINs — especially why they go wrong", "Subqueries and CTEs"],
        resource: { name: "SQLBolt", url: "https://sqlbolt.com", note: "Free, interactive, runs in the browser. Finish it in a fortnight of evenings." },
        checkpoint: "Load a public transactions dataset into SQLite. In one query, answer: which ten customers generated the most fee revenue last quarter, and what share of the total was that?"
      },
      {
        n: 3,
        name: "Python for data",
        time: "8–10 weeks",
        why: "Where SQL asks questions of data that already exists, Python lets you fetch it, reshape it, model it and repeat the whole thing on a schedule. This is the rung where automation becomes real.",
        whyFinance: "Every recurring analysis you have ever done by hand becomes a file you run. That is the entire pitch.",
        skipIf: "You can load a CSV into pandas, group it, and plot the result without searching for the syntax.",
        learn: ["The language basics — variables, loops, functions", "pandas for tabular data", "Reading from files and APIs", "matplotlib for a chart that is good enough"],
        resource: { name: "Python for Everybody", url: "https://www.py4e.com", note: "Free full course by Charles Severance. Aimed at people who are not programmers, which is the point." },
        checkpoint: "Pull two years of daily prices for a Vietnamese listed stock. Compute monthly returns and rolling volatility, and save a chart you would be willing to put in front of someone."
      },
      {
        n: 4,
        name: "Dashboards that get used",
        time: "3–4 weeks",
        why: "Analysis nobody looks at has no value. This rung is about the last mile — presenting a result so a busy person understands it in thirty seconds.",
        whyFinance: "You already know what a decision-maker needs to see, because you have sat through the meetings where the wrong chart wasted everyone's time.",
        skipIf: "You have built a dashboard someone other than you checks regularly.",
        learn: ["Power BI or Tableau — pick one, they transfer", "Connecting to a database rather than pasting a CSV", "Choosing the chart the question calls for", "Designing for the reader, not the builder"],
        resource: { name: "Microsoft Learn — Power BI", url: "https://learn.microsoft.com/training/powerplatform/power-bi", note: "Free. Power BI is the more common of the two in Vietnamese banks." },
        checkpoint: "Build a single-page dashboard from your SQL transactions data that a manager could read in thirty seconds without you standing next to them."
      },
      {
        n: 5,
        name: "Git, and how software actually ships",
        time: "1 week",
        why: "The shortest rung, and the one that changes how people treat you. Knowing how work is versioned, reviewed and released is the difference between being a colleague of the engineering team and being a customer of it.",
        whyFinance: "It also solves a problem you already have: never again wondering which of six files is the real model.",
        skipIf: "You have pushed to a shared repository and resolved a merge conflict without panicking.",
        learn: ["Commits, branches, merges", "Pushing to GitHub", "What a pull request is and why review exists", "Reading someone else's repository"],
        resource: { name: "Learn Git Branching", url: "https://learngitbranching.js.org", note: "Free and visual. You will understand branching in an afternoon." },
        checkpoint: "Put all four previous checkpoints into one public GitHub repository, with a README that explains what each does and what you found."
      }
    ],

    /* The "you are here" self-assessment. Each question tests one rung;
       a rung counts as cleared only on a confident yes. Your current rung
       is the first one you have not cleared. */
    assessment: {
      prompt: "Not sure which rung to start on? Answer eight questions.",
      lede: "Nobody starts at the bottom. Most finance students have already cleared at least part of rung one without noticing.",
      answers: [
        { value: "yes", label: "Yes, confidently" },
        { value: "partly", label: "Sort of" },
        { value: "no", label: "Not yet" }
      ],
      questions: [
        { rung: 1, text: "Can you write a lookup that keeps working when someone inserts a column?" },
        { rung: 1, text: "Have you cleaned a messy data export using Power Query rather than by hand?" },
        { rung: 2, text: "Can you write a <span class=\"term\">GROUP BY</span> query from memory, without looking up the syntax?" },
        { rung: 2, text: "Do you know why a <span class=\"term\">LEFT JOIN</span> can return more rows than you started with?" },
        { rung: 3, text: "Can you load a CSV in pandas, group it, and plot the result without searching for the syntax?" },
        { rung: 4, text: "Have you built a dashboard that somebody other than you checks regularly?" },
        { rung: 5, text: "Have you pushed work to a shared repository?" },
        { rung: 5, text: "Have you resolved a merge conflict without panicking?" }
      ],
      resultLead: "You are here",
      doneLead: "You have cleared the ladder",
      doneBody: "Nothing on this list is left. Step 4 is about turning it into a job.",
      retake: "Answer again"
    },

    closing: {
      label: "Notice what you just built",
      body: "If you complete all five checkpoints, you do not just have five skills — you have a public repository containing four pieces of real analysis. That repository is the portfolio step 4 asks you for. The ladder was building it the whole time."
    }
  },

  /* ---------------------------------------------------------------------
     Step 4 — turning any of this into a job.
     --------------------------------------------------------------------- */
  hired: {
    tldr: "Claim only what you could be questioned on for five minutes, link to something a reader can open, and delete every line that every other candidate also wrote. The repository the ladder built is the whole portfolio — you do not need a second one.",

    intro: [
      "Skills that nobody can verify are worth almost nothing in an application. The gap between a CV that gets an interview and one that does not is rarely the amount learned — it is whether a stranger reading for eleven seconds can tell that any of it is real.",
      "Everything below assumes you have done at least two rungs of the ladder. If you have not, this page will keep."
    ],

    cv: {
      label: "On the CV",
      intro: "Four rules, then what they look like in practice.",
      rules: [
        "Only claim a verb you could be questioned on for five minutes without flinching.",
        "Name the tool, what you did with it, and where it can be seen. Three parts, one line.",
        "If it is not linked, the reader will assume it was smaller than it was.",
        "Delete anything that every other candidate also wrote. It costs a line and returns nothing."
      ],
      examplesLabel: "Before and after",
      examples: [
        {
          before: "Proficient in Python, SQL and data analytics.",
          after: "SQL &mdash; wrote the queries behind a fee-revenue concentration analysis of ~50,000 transactions (linked). Python &mdash; pandas for monthly returns and rolling volatility on two years of VN-listed price data.",
          why: "The first cannot be checked, so a reader discounts it entirely. The second can be checked, so they do not have to."
        },
        {
          before: "Experienced in data visualisation and business intelligence.",
          after: "Built a one-page Power BI dashboard over the transaction data above, designed to be read in under a minute.",
          why: "“Experienced” invites the question “how much?”. A specific artefact answers it before it is asked."
        },
        {
          before: "Familiar with Git and version control.",
          after: "All four projects live in one public repository, with the commit history intact.",
          why: "“Familiar with” is the phrase people use when they have watched a tutorial. Showing the repository is both stronger and shorter."
        },
        {
          before: "Strong analytical and problem-solving skills.",
          after: "&mdash; delete this line entirely &mdash;",
          why: "Every candidate writes this. It is invisible. Spend the space on something a reader can open."
        }
      ]
    },

    portfolio: {
      label: "The portfolio",
      intro: "If you did the ladder checkpoints, you already have this. What follows is how to make the same work land harder, not more work to do.",
      principles: [
        "A project is good when it answers a question a real person would ask &mdash; not when it uses an impressive tool.",
        "State the limitation. “This ignores survivorship bias” is the sentence that makes an interviewer trust the rest of it.",
        "Write one README explaining what each project does and what you found, in plain language. Most candidates skip this, which is exactly why it works.",
        "Finance data is your advantage. Most portfolios out there analyse the same three tutorial datasets."
      ],
      projectsLabel: "Three that work",
      projects: [
        {
          name: "Where the fee revenue actually comes from",
          skill: "SQL",
          question: "Which customers or products generate the fee revenue, and how concentrated is it?",
          good: "One query that answers it, plus a sentence saying what surprised you.",
          stretch: "Add a concentration measure &mdash; what share comes from the top ten percent?"
        },
        {
          name: "Two years of one listed company",
          skill: "Python",
          question: "How volatile was this stock, and did that volatility change over the period?",
          good: "Monthly returns, rolling volatility, and one chart you would be willing to show someone.",
          stretch: "Compare it against the VN-Index and say whether the difference is interesting or noise."
        },
        {
          name: "The thirty-second dashboard",
          skill: "Power BI",
          question: "If a manager had thirty seconds and one screen, what would they need to see?",
          good: "One page, no scrolling, the headline number largest. Reuse the data from the first project.",
          stretch: "Add one filter that genuinely changes the story, not one that just looks interactive."
        }
      ]
    },

    interview: {
      label: "In the room",
      intro: "Three questions you will be asked. The wrong answers are not stupid &mdash; they are the reasonable-sounding ones.",
      questions: [
        {
          q: "Why not just finance?",
          bad: "“Tech pays better.” Or: “Finance jobs are hard to get right now.”",
          good: "“I do want to stay in finance. I just don't want to spend a week doing by hand what a query does in a second.”",
          why: "The first frames you as escaping something. The second frames the skills as leverage on the degree you chose &mdash; which is also the truth."
        },
        {
          q: "You are not a developer. Why should we hire you?",
          bad: "Apologising for it, or overclaiming to cover it.",
          good: "“I am not, and I am not applying as one. What I bring is knowing what the numbers mean. I can write the SQL to pull them, and I can tell you when a result is wrong because it does not match how the business actually works.”",
          why: "Naming the boundary honestly is more convincing than blurring it. They already know you are not an engineer; the question is whether you know."
        },
        {
          q: "Walk me through one of your projects.",
          bad: "Listing the tools and libraries you used.",
          good: "The question you were answering, what you did, what you found, and what you would do differently. Four sentences, in that order.",
          why: "They are testing whether you can think, not whether you can operate pandas. The tools are the least interesting part and they know it."
        }
      ]
    },

    closing: {
      label: "What this does not fix",
      body: "A repository and a rewritten CV will not get you past a firm that filters on university or GPA, and they are not a substitute for applying to a lot of places. What they change is the conversation once you are in the room &mdash; from whether you can do the work to what you would do first."
    }
  }
};
