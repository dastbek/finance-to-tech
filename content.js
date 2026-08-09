/* =========================================================================
   content.js — every word on the site lives here.

   Voice: an experienced mentor talking to a first or second year student.
   Short sentences. Say what to do. Don't argue with the reader, don't prove
   anything, don't talk about "this site". Sources go in one line at the
   bottom of a page, never in the middle of a thought.
   ========================================================================= */

const CONTENT = {

  meta: {
    updated: "August 2026",
    readingTime: "about half an hour"
  },

  steps: [
    {
      n: 1,
      route: "#/basics",
      title: 'What "tech" actually means',
      desc: "The words, decoded. Four kinds of work all get called tech. Your degree already reaches two.",
      time: "7 min"
    },
    {
      n: 2,
      route: "#/roles",
      title: "Where you fit",
      desc: "Six jobs in Vietnam where a finance background helps you rather than holds you back.",
      time: "10 min"
    },
    {
      n: 3,
      route: "#/ladder",
      title: "What to learn, in order",
      desc: "Five skills, ranked by what they give back. You don't need all of them.",
      time: "8 min"
    },
    {
      n: 4,
      route: "#/hired",
      title: "Getting hired",
      desc: "How to put this on a CV, what to build so you have something to show, what to say in the room.",
      time: "8 min"
    }
  ],

  home: {
    title: "You already know half of this.",
    lede: "If you're studying finance and everyone around you keeps saying you should get into tech, start here. We'll sort out what that word means, which jobs already want what you're learning, and what to pick up first. You don't need to know how to code.",
    promise: {
      label: "How to read this",
      body: "Every page opens with a short summary. Read only those four and you'll still have the map. Open the rest when you want it."
    },
    why: [
      "Finance is a crowded degree. In any hiring season you're up against a lot of people who can do roughly what you can do. The ones who get through usually have one extra thing.",
      "It's rarely a second degree. Usually it's two or three concrete skills — pulling your own data, automating the report nobody wants to do by hand, talking to an engineering team without a translator. The hard part isn't learning them. It's knowing which ones matter, and in what order."
    ]
  },

  basics: {
    tldr: "Tech isn't one job. It's four kinds of work that ended up sharing a name, and your degree already reaches two of them. Most of the vocabulary that sounds like a wall is describing something you do in a spreadsheet already.",

    intro: [
      "When someone says they work in tech, they could mean four quite different things. That vagueness is most of what makes it frightening. Split it up and the map gets small."
    ],

    territories: [
      {
        name: "Data",
        what: "Turning records into answers someone acts on.",
        day: "Writing queries, cleaning messy exports, building dashboards, explaining to a manager why a number moved.",
        fit: "close",
        fitNote: "Closest to your degree. The scarce skill is knowing what the numbers <em>mean</em>, and that's the part you already have."
      },
      {
        name: "Product",
        what: "Deciding what gets built, and in what order.",
        day: "Talking to users, writing specifications, arguing about priorities, checking whether the last thing shipped actually worked.",
        fit: "mid",
        fitNote: "Fintech teams need people who understand lending, payments and regulation. That knowledge is the ticket in."
      },
      {
        name: "Software",
        what: "Building the things people use.",
        day: "Reading existing code far more than writing new code, reviewing other people's work, fixing what broke.",
        fit: "far",
        fitNote: "The longest road from here. Take it if you find you enjoy the building itself, not because it sounds like the default."
      },
      {
        name: "Infrastructure",
        what: "Keeping systems running, fast and secure.",
        day: "Automating releases, watching monitors, answering when something fails at two in the morning.",
        fit: "far",
        fitNote: "Almost never a finance entry point. Worth recognising so you know what people mean."
      }
    ],

    decoderIntro: "Here's the vocabulary that does most of the gatekeeping. None of it is complicated once someone says it plainly.",

    decoder: [
      {
        word: "API",
        plain: "A fixed way for one program to ask another for data.",
        like: "A Bloomberg feed your model pulls from. You don't get the whole database, just the fields you asked for."
      },
      {
        word: "Database",
        plain: "A store of records built to be questioned quickly.",
        like: "The general ledger, except you can ask it questions instead of scrolling."
      },
      {
        word: "SQL",
        plain: "The language for asking a database a question.",
        like: "A pivot table, written out instead of dragged. If you can build a pivot, you already think this way."
      },
      {
        word: "Script",
        plain: "A saved list of instructions a computer runs top to bottom.",
        like: "A recorded macro you can actually read and fix."
      },
      {
        word: "Repository",
        plain: "A project folder that keeps every version of every file.",
        like: "valuation_model_v7_FINAL_final.xlsx, except it works and you can see who changed what."
      },
      {
        word: "Git",
        plain: "The system that keeps that history and lets several people edit the same files safely.",
        like: "Track Changes, if it never lost anything and worked across a team."
      },
      {
        word: "Deploy",
        plain: "To put your work somewhere other people can use it.",
        like: "Circulating the model. The moment it stops being yours alone."
      },
      {
        word: "Cloud",
        plain: "Somebody else's computers, rented by the hour.",
        like: "Leasing the office instead of buying the building."
      },
      {
        word: "Frontend",
        plain: "The part a person sees and clicks.",
        like: "The pitch deck."
      },
      {
        word: "Backend",
        plain: "The part that stores data and does the work.",
        like: "The model behind the deck, where the mistakes hide."
      },
      {
        word: "ETL",
        plain: "Moving data from where it's created to where it can be analysed, cleaning it on the way.",
        like: "Pulling figures out of four systems every month so they can sit in one place. You've done this by hand."
      },
      {
        word: "Data model",
        plain: "How tables relate to each other, decided on purpose.",
        like: "Chart of accounts. Get it right and everything downstream is easier."
      }
    ],

    closing: {
      label: "So where does that leave you",
      body: "Two of those four hire people for understanding a business. You've spent years on one. Next, the jobs where that trade actually happens."
    }
  },

  roles: {
    tldr: "Six jobs where your degree gets you through the door instead of being something you explain away. Two of them barely need code. Start with the short-step ones.",

    intro: [
      "All of these hire in Vietnam and take people from finance. What differs is how far each sits from where you are now, and how much code it genuinely needs. Those are two separate things, and mixing them up is why people rule out jobs they could get."
    ],

    tableHead: { role: "Role", distance: "How far", coding: "Code", pay: "Starting pay" },
    distanceLabels: ["Short step", "A jump", "Long road"],
    codingLabels: ["Barely any", "Some", "Most days"],

    payNote: "One thing worth more than any tool here: roles that require English pay about a quarter more than those that don't. If you're choosing what to work on this year, that's the cheapest raise available to you.",

    sources: "Pay is gross monthly VND. The data-analyst, business-analyst and FP&A figures come from the ITviec 2025–26 salary survey checked against current bank postings. The other three are worked out from neighbouring roles, so treat them as rough. All of it moves with the company and the city.",

    items: [
      {
        id: "data-analyst",
        name: "Data Analyst",
        context: "Banking, fintech, e-commerce",
        distance: 1,
        coding: 2,
        oneLine: "You answer questions with data, for someone who is about to make a decision.",
        day: [
          "Writing queries against the company's transaction and customer tables.",
          "Cleaning exports that arrive in a worse state than anyone admits.",
          "Building the dashboards a team looks at every morning.",
          "Explaining in a meeting why a number moved, and being believed."
        ],
        transfers: [
          "You read financial statements already, so you know when a number looks wrong.",
          "You can talk to a finance or risk team in their own language.",
          "You understand what the business is trying to do, which is most of the job."
        ],
        add: ["SQL", "Excel to an analyst standard", "Power BI", "Python, eventually"],
        salary: { junior: "10–20M", mid: "25–40M", basis: "measured" },
        employers: "Techcombank, VPBank, MB Bank, MoMo, VNPay, ZaloPay, Shopee, Grab, FE Credit",
        watch: "The title gets used loosely. Some of these jobs are really reporting jobs where you rebuild the same spreadsheet every week — ask what share of the work is new analysis. And be realistic about the entry: bank postings usually want two years, so most people arrive here from a junior reporting or operations role rather than straight from graduation."
      },
      {
        id: "business-analyst",
        name: "Business Analyst",
        context: "Core banking, payments, insurance",
        distance: 1,
        coding: 1,
        oneLine: "You sit between the people who need something built and the people who build it, and make sure they mean the same thing.",
        day: [
          "Asking the operations or lending team how a process actually works.",
          "Writing it up precisely enough that an engineer can build from it.",
          "Drawing the process out and finding the step nobody thought about.",
          "Testing what got built against what was asked for."
        ],
        transfers: [
          "Domain knowledge is the job, and lending, payments and settlement are things you've studied.",
          "You're trained to be precise about definitions, which is what a specification is.",
          "You notice when a proposed process breaks an accounting or regulatory rule."
        ],
        add: ["SQL, to check your own assumptions", "Process mapping", "Clear written specifications", "How systems talk to each other"],
        salary: { junior: "12–18M", mid: "25–37M", basis: "measured" },
        employers: "Core banking vendors, VPBank, Techcombank, Manulife, Prudential, VNPay, the Big Four",
        watch: "Two things to weigh together. It needs the least code, which makes it the most crowded door, and writing is what separates candidates more than tools do. It also pays less than data analyst at every level. Easiest way in, lowest ceiling — worth choosing on purpose rather than by accident."
      },
      {
        id: "fpna",
        name: "FP&A and finance automation",
        context: "In-house finance teams",
        distance: 1,
        coding: 2,
        oneLine: "The finance job you trained for, done by someone who automates the boring seventy percent.",
        day: [
          "Building the forecast and the monthly reporting pack.",
          "Replacing manual consolidation steps with something that runs itself.",
          "Investigating variances and writing the commentary.",
          "Being the person people ask when a model breaks."
        ],
        transfers: [
          "Nearly all of it. This is a finance role. The tech is leverage, not a change of career.",
          "Your degree is the qualification here, not something to compensate for."
        ],
        add: ["Power Query and Power Pivot", "SQL", "Python for repetitive work", "Power BI"],
        salary: { junior: "12–20M", mid: "23–33M", basis: "measured" },
        employers: "Any company with a real finance function. The MNC shared-service centres in Ho Chi Minh City and Hanoi hire a lot of these.",
        watch: "The safest option here, and the one with the lowest ceiling if you stop learning once the reporting runs itself. Two things lift it: English-required roles pay noticeably more, and the automation skills are what keep this from becoming a dead end."
      },
      {
        id: "product-analyst",
        name: "Fintech Product Analyst",
        context: "Payments, lending, wallets",
        distance: 2,
        coding: 2,
        oneLine: "You work out whether what the team built actually worked, and what should come next.",
        day: [
          "Measuring whether a new feature changed behaviour or just looked like it did.",
          "Sizing a proposed feature — how many users, how much revenue, what it costs to build.",
          "Sitting with engineers and designers deciding what ships this quarter.",
          "Talking to real users about why they abandoned the flow."
        ],
        transfers: [
          "You can model unit economics, which most product people do badly.",
          "Lending, interchange, float and settlement make structural sense to you.",
          "You know which regulatory constraints are real and which are assumed."
        ],
        add: ["SQL", "Reading an A/B test honestly", "Product analytics tools", "Short, decisive writing"],
        salary: { junior: "15–25M", mid: "30–45M", basis: "estimated" },
        employers: "MoMo, VNPay, ZaloPay, Grab Financial, Shopee, Tiki, Finhay, Infina",
        watch: "Rarely a graduate role. The normal path is a year or two as a data or business analyst and then a move sideways. Treat it as a two-year target rather than a first job."
      },
      {
        id: "risk-analytics",
        name: "Risk and credit analytics",
        context: "Banks, consumer lenders, BNPL",
        distance: 2,
        coding: 3,
        oneLine: "You build and watch the models that decide who gets lent money, and on what terms.",
        day: [
          "Building scorecards and testing whether they still predict what they used to.",
          "Monitoring portfolio performance and explaining deterioration.",
          "Documenting models to a standard a regulator will accept.",
          "Arguing with the commercial team about the cost of approving more people."
        ],
        transfers: [
          "Credit risk, provisioning and the time value of money are already yours.",
          "The statistics from your degree is the actual foundation of the modelling.",
          "You understand the regulatory frame the models live inside."
        ],
        add: ["Python or R", "SQL", "Applied statistics and model validation", "Model documentation"],
        salary: { junior: "15–25M", mid: "30–45M", basis: "estimated" },
        employers: "FE Credit, Home Credit, Techcombank, VPBank, MB Bank, Shinhan, BNPL startups",
        watch: "The most technical role here, and the one where weak statistics will genuinely block you — if regression and hypothesis testing were a struggle, be honest with yourself first. The entry is also narrow: scorecard and PD/LGD postings often ask for eight years. You arrive here from risk operations or data analysis, not from graduation."
      },
      {
        id: "regtech",
        name: "RegTech and compliance analytics",
        context: "Banks, payment firms, exchanges",
        distance: 2,
        coding: 2,
        oneLine: "You use data to catch financial crime and show a regulator that the controls work.",
        day: [
          "Tuning the rules that flag suspicious transactions, and cutting false positives.",
          "Investigating alerts and writing them up.",
          "Producing the reports the central bank requires, on time and correct.",
          "Testing whether a control does what the policy says it does."
        ],
        transfers: [
          "Regulation, AML and KYC are on your syllabus. Most technologists find them opaque.",
          "You can read a circular and work out what it actually requires.",
          "Care with documentation, which is half of compliance work."
        ],
        add: ["SQL", "Rule tuning and basic anomaly detection", "Python for investigation", "Reporting tools"],
        salary: { junior: "15–25M", mid: "28–40M", basis: "estimated" },
        employers: "Licensed banks and payment institutions, plus the regional exchanges",
        watch: "Steady, well paid and genuinely useful, but more procedural than it looks from outside. It suits people who like being right more than people who like building things."
      }
    ]
  },

  ladder: {
    tldr: "Five skills in the order that pays back fastest from where you're standing. You don't need all five. If you only ever learn one, learn SQL.",

    intro: [
      "The order matters more than the list. Each one makes the next easier, and each is useful on its own — stop after two and you still have something a hiring manager can check.",
      "One rung opens at a time on purpose. Finish the checkpoint before you open the next."
    ],

    totalNote: "roughly four to six months at half an hour a day for all five. Most people stop after three and are fine.",

    rungs: [
      {
        n: 1,
        name: "Spreadsheets, properly",
        time: "2 weeks",
        why: "There's a real gap between using Excel and using Excel the way an analyst does. Closing it takes two weeks and makes you faster than most of your year immediately.",
        whyFinance: "You're in spreadsheets every day already. This is the only rung where you start at seventy percent instead of zero.",
        skipIf: "you can write an INDEX/MATCH without looking it up and you've built something in Power Query.",
        learn: ["Lookups that don't break when columns move", "Pivot tables past the basics", "Power Query for repeatable cleaning", "Structured references and named ranges"],
        resource: { name: "Microsoft Learn — Excel", url: "https://learn.microsoft.com/training/browse/?products=office-excel", note: "Free and official, in short modules." },
        checkpoint: "Take a listed bank's quarterly report. Build a summary sheet that updates itself when you paste in the next quarter. No retyping, no manual cell edits."
      },
      {
        n: 2,
        name: "SQL",
        time: "4–6 weeks",
        emphasis: true,
        why: "The best return of anything here. It's in nearly every job on the previous page, it can be tested in an interview, and it's small enough to genuinely learn in a month.",
        whyFinance: "If you can build a pivot table you already think the way SQL works. You're learning to write down something you can currently only do with a mouse.",
        skipIf: "you can write a join and a GROUP BY from memory, and you know why a LEFT JOIN can multiply your rows.",
        learn: ["SELECT, WHERE, ORDER BY", "GROUP BY and the aggregate functions", "JOINs, especially how they go wrong", "Subqueries and CTEs"],
        resource: { name: "SQLBolt", url: "https://sqlbolt.com", note: "Free, interactive, runs in the browser. A fortnight of evenings." },
        checkpoint: "Load a public transactions dataset into SQLite. In one query, answer which ten customers generated the most fee revenue last quarter, and what share of the total that was."
      },
      {
        n: 3,
        name: "Python for data",
        time: "8–10 weeks",
        why: "SQL asks questions of data that already exists. Python lets you go and fetch it, reshape it, and run the whole thing again next month without touching it. This is where automation gets real.",
        whyFinance: "Every recurring analysis you've done by hand becomes a file you run. That's the whole pitch.",
        skipIf: "you can load a CSV into pandas, group it and plot the result without searching for the syntax.",
        learn: ["The basics — variables, loops, functions", "pandas for tables", "Reading from files and APIs", "A chart that's good enough to show someone"],
        resource: { name: "Python for Everybody", url: "https://www.py4e.com", note: "Free, and written for people who aren't programmers." },
        checkpoint: "Pull two years of daily prices for a Vietnamese listed stock. Work out monthly returns and rolling volatility, and save a chart you'd be willing to put in front of someone."
      },
      {
        n: 4,
        name: "Dashboards people actually use",
        time: "3–4 weeks",
        why: "Analysis nobody looks at is worth nothing. This rung is the last mile — putting a result in front of a busy person so they understand it in half a minute.",
        whyFinance: "You know what a decision-maker needs to see, because you've sat through the meetings where the wrong chart wasted everyone's time.",
        skipIf: "you've built a dashboard that somebody other than you checks regularly.",
        learn: ["Power BI or Tableau — pick one, they transfer", "Connecting to a database instead of pasting a CSV", "Choosing the chart the question calls for", "Designing for the reader, not the builder"],
        resource: { name: "Microsoft Learn — Power BI", url: "https://learn.microsoft.com/training/powerplatform/power-bi", note: "Free. Power BI is the more common of the two in Vietnamese banks." },
        checkpoint: "Build a single-page dashboard from your SQL data that a manager could read in thirty seconds without you standing next to them."
      },
      {
        n: 5,
        name: "Git, and how software ships",
        time: "1 week",
        why: "The shortest rung, and the one that changes how people treat you. Knowing how work gets versioned, reviewed and released is the difference between being a colleague of the engineering team and being a customer of it.",
        whyFinance: "It also fixes a problem you already have: never again wondering which of six files is the real model.",
        skipIf: "you've pushed to a shared repository and resolved a merge conflict without panicking.",
        learn: ["Commits, branches, merges", "Pushing to GitHub", "What a pull request is and why review exists", "Reading somebody else's repository"],
        resource: { name: "Learn Git Branching", url: "https://learngitbranching.js.org", note: "Free and visual. Branching will make sense in an afternoon." },
        checkpoint: "Put all four earlier checkpoints in one public GitHub repository, with a README explaining what each one does and what you found."
      }
    ],

    assessment: {
      prompt: "Not sure which rung to start on?",
      lede: "Eight questions. Nobody starts at the bottom — most people have cleared part of rung one without noticing.",
      answers: [
        { value: "yes", label: "Yes, confidently" },
        { value: "partly", label: "Sort of" },
        { value: "no", label: "Not yet" }
      ],
      questions: [
        { rung: 1, text: "Can you write a lookup that keeps working when someone inserts a column?" },
        { rung: 1, text: "Have you cleaned a messy export with Power Query rather than by hand?" },
        { rung: 2, text: "Can you write a <span class=\"term\">GROUP BY</span> query from memory?" },
        { rung: 2, text: "Do you know why a <span class=\"term\">LEFT JOIN</span> can return more rows than you started with?" },
        { rung: 3, text: "Can you load a CSV in pandas, group it and plot it without looking up the syntax?" },
        { rung: 4, text: "Have you built a dashboard somebody else checks regularly?" },
        { rung: 5, text: "Have you pushed work to a shared repository?" },
        { rung: 5, text: "Have you resolved a merge conflict without panicking?" }
      ],
      resultLead: "Start here",
      doneLead: "You're past this list",
      doneBody: "There's nothing left on the ladder for you. Step 4 is about turning it into a job.",
      retake: "Answer again"
    },

    closing: {
      label: "Notice what you just built",
      body: "Finish all five checkpoints and you don't just have five skills. You have a public repository with four pieces of real analysis in it. That's the portfolio the next page asks you for. You were building it the whole time."
    }
  },

  hired: {
    tldr: "Claim what you could talk about for five minutes. Link to something they can open. Delete the lines every other candidate also wrote.",

    intro: [
      "Skills nobody can check are worth almost nothing in an application. The difference between a CV that gets an interview and one that doesn't is rarely how much you learned. It's whether a stranger reading for ten seconds can tell any of it is real."
    ],

    cv: {
      label: "On the CV",
      intro: "Four rules, then what they look like in practice.",
      rules: [
        "Only claim something you could be questioned on for five minutes without flinching.",
        "Name the tool, what you did with it, and where it can be seen. Three parts, one line.",
        "If it isn't linked, they'll assume it was smaller than it was.",
        "Delete anything every other candidate also wrote."
      ],
      examplesLabel: "Before and after",
      examples: [
        {
          before: "Proficient in Python, SQL and data analytics.",
          after: "SQL — wrote the queries behind a fee-revenue analysis of about 50,000 transactions (linked). Python — pandas for monthly returns and volatility on two years of price data.",
          why: "Nobody can check the first one, so they won't count it. They can click the second."
        },
        {
          before: "Experienced in data visualisation and business intelligence.",
          after: "Built a one-page Power BI dashboard over the transaction data above, meant to be read in under a minute.",
          why: "“Experienced” invites the question “how much?”. Naming the thing answers it first."
        },
        {
          before: "Familiar with Git and version control.",
          after: "All four projects sit in one public repository, commit history intact.",
          why: "“Familiar with” is what people write after watching a tutorial. Showing the repository is shorter and stronger."
        },
        {
          before: "Strong analytical and problem-solving skills.",
          after: "— cut this line —",
          why: "Everyone writes it, so nobody reads it. Spend the space on something they can open."
        }
      ]
    },

    portfolio: {
      label: "The portfolio",
      intro: "If you did the checkpoints on the last page, you already have this. Here's how to make the same work land harder.",
      principles: [
        "A project is good when it answers a question someone would really ask, not when it uses an impressive tool.",
        "Say what the limitation is. “This ignores survivorship bias” is the sentence that makes an interviewer trust the rest.",
        "Write one README saying what each project does and what you found, in plain language. Most people skip this, which is why it works.",
        "Finance data is your advantage. Most portfolios out there analyse the same three tutorial datasets."
      ],
      projectsLabel: "Three that work",
      projects: [
        {
          name: "Where the fee revenue comes from",
          skill: "SQL",
          question: "Which customers or products generate the fee revenue, and how concentrated is it?",
          good: "One query that answers it, and a sentence on what surprised you.",
          stretch: "Add a concentration measure. What share comes from the top ten percent?"
        },
        {
          name: "Two years of one listed company",
          skill: "Python",
          question: "How volatile was this stock, and did that change over the period?",
          good: "Monthly returns, rolling volatility, and one chart you'd show someone.",
          stretch: "Compare it to the VN-Index and say whether the difference is interesting or noise."
        },
        {
          name: "The thirty-second dashboard",
          skill: "Power BI",
          question: "If a manager had thirty seconds and one screen, what would they need?",
          good: "One page, no scrolling, headline number largest. Reuse the data from the first project.",
          stretch: "Add one filter that changes the story, not one that just looks interactive."
        }
      ]
    },

    interview: {
      label: "In the room",
      intro: "Three questions you'll get. The wrong answers aren't stupid ones — they're the reasonable-sounding ones.",
      questions: [
        {
          q: "Why not just finance?",
          bad: "“Tech pays better.” Or: “Finance jobs are hard to get right now.”",
          good: "“I do want to stay in finance. I just don't want to spend a week doing by hand what a query does in a second.”",
          why: "The first makes you sound like you're running away from something. The second makes the skills leverage on the degree you chose, which is also true."
        },
        {
          q: "You're not a developer. Why should we hire you?",
          bad: "Apologising for it, or overclaiming to cover it.",
          good: "“I'm not, and I'm not applying as one. What I bring is knowing what the numbers mean. I can write the SQL to pull them, and I can tell you when a result is wrong because it doesn't match how the business works.”",
          why: "Naming the boundary is more convincing than blurring it. They already know you're not an engineer. The question is whether you know."
        },
        {
          q: "Walk me through one of your projects.",
          bad: "Listing the tools and libraries you used.",
          good: "The question you were answering, what you did, what you found, what you'd do differently. Four sentences, that order.",
          why: "They're checking whether you can think, not whether you can operate pandas. The tools are the least interesting part and they know it."
        }
      ]
    },

    closing: {
      label: "What this won't fix",
      body: "A repository and a rewritten CV won't get you past a firm that filters on university or GPA, and they're no substitute for applying to a lot of places. What they change is the conversation once you're in the room — from whether you can do the work to what you'd do first."
    }
  }
};
