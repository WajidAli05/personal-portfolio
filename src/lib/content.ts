// Every viewer-facing line on the site lives here, verbatim from docs/design-package.md.
// Client businesses are intentionally never named.

export const contact = {
  email: "wajidalise@gmail.com",
  mailto:
    "mailto:wajidalise@gmail.com?subject=" +
    encodeURIComponent("Project inquiry from your portfolio"),
  whatsappDisplay: "+92 340 5796611",
  whatsapp: "https://wa.me/923405796611",
  upwork: "https://www.upwork.com/freelancers/~014724411e6338e0e8",
  github: "https://github.com/WajidAli05",
  linkedin: "https://www.linkedin.com/in/wajid-ali-0746b2186",
  scholar: "https://scholar.google.com/citations?user=IQCKpBMAAAAJ&hl=en",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

// Hero bands. `tag` is the margin comment (an NLBSE comment category).
export const heroBands = [
  {
    tag: "// summary",
    title: "I build software you can trust with real data.",
    sub: "Clinic systems, online stores and research tools. Built end to end, documented, and handed over clean.",
  },
  {
    tag: "// expand",
    title: "Every layer has a job.",
    sub: "Interface, API, permissions, encrypted records, audit trail, backups. I build all six, and I build them to fit together.",
  },
  {
    tag: "// rationale",
    title: "Locked at every layer.",
    sub: "Each role sees only what it should. Patient records are encrypted at rest. Every change leaves a trail nobody can rewrite.",
  },
  {
    tag: "// usage",
    title: "Written down, so nothing is lost.",
    sub: "Security notes, backup runbooks, schema rules. The next developer starts on day one, not in week three.",
  },
];

export const heroSettle = {
  tag: "// ownership",
  name: "Wajid Ali",
  role: "Full-stack engineer. Published researcher. Islamabad.",
  cta: "Email me",
  secondary: "See the work",
};

export const layers = [
  "Interface",
  "API",
  "Roles & permissions",
  "Encrypted records",
  "Audit chain",
  "Backups",
];

export const proof = [
  { value: "58k+", label: "lines of code in one clinic system I built and shipped" },
  { value: "4", label: "staff roles, each with its own permission set" },
  { value: "3", label: "interface languages, including right-to-left Arabic" },
  { value: "81%", label: "weighted F1 for our comment classifier, NLBSE '25" },
];

export type Chapter = { at: number; title: string; body: string };

export const dentalOS = {
  index: "01",
  tag: "// summary",
  kicker: "Clinic management system",
  name: "Dental OS",
  lede: "A dental clinic runs its whole day on it: appointments, patient records, the tooth chart, lab cases, inventory and billing. Owners, dentists, receptionists and outside labs each get their own view.",
  role: "Built end to end: design, frontend, backend, security and deployment.",
  chapters: [
    { at: 0, title: "The day at a glance", body: "Patients, pending lab cases and revenue on one screen, then straight into the appointment book." },
    { at: 0.22, title: "One record per patient", body: "Allergy alerts on top, imaging and consent documents attached, nothing scattered across paper files." },
    { at: 0.42, title: "Chart every tooth", body: "Click a tooth, record the diagnosis and treatment, and request an X-ray in the same step." },
    { at: 0.63, title: "Fees the owner controls", body: "A clinical library of treatments with standard and corporate fee schedules." },
    { at: 0.78, title: "Money that adds up", body: "Invoices, part payments, dentist commissions and lab dues, each with its own chart." },
  ] as Chapter[],
  notes: [
    { tag: "// rationale", title: "Permissions checked on the server", body: "Every route sits behind a role gate and a per-tab permission. The check fails closed: no user, no access." },
    { tag: "// rationale", title: "Encrypted patient records", body: "Diagnosis, treatment, findings and medications are encrypted with AES-256-GCM before they reach the database." },
    { tag: "// rationale", title: "An audit log nobody can rewrite", body: "Each entry is chained to the last with SHA-256. Edits and deletes are blocked at the model level." },
    { tag: "// usage", title: "Real sign-in security", body: "Two-factor codes, account lockout after failed attempts, login history, and log out of every device at once." },
    { tag: "// usage", title: "Backups that restore", body: "Encrypted nightly backups of every collection, plus a tested restore script and a separate plan for patient images." },
    { tag: "// expand", title: "Privacy law, handled", body: "The owner can erase a patient on request. Personal data is wiped while invoices stay intact for the accounts." },
    { tag: "// expand", title: "English, Urdu and Arabic", body: "The whole interface switches language, and flips right-to-left for Arabic." },
  ],
  stack: ["React 19", "Vite", "Zustand", "Express 5", "MongoDB", "Mongoose", "Three.js", "i18next", "Recharts", "jsPDF"],
  screensTitle: "Billing, from the owner's side",
  screens: [
    { src: "/img/dentalos-1.webp", alt: "Daily cashbook with totals by payment method and a 30-day collections chart" },
    { src: "/img/dentalos-2.webp", alt: "Invoices view with billed versus collected bars per day" },
    { src: "/img/dentalos-3.webp", alt: "Dentist commissions: earned, paid and remaining balance" },
    { src: "/img/dentalos-4.webp", alt: "Lab dues: billed, paid and remaining per partner lab" },
  ],
  walkthrough: "Watch the full walkthrough",
  walkthroughMeta: "1:15, with sound",
  dataNote: "All screens use demo data.",
};

export const commerce = {
  index: "02",
  tag: "// expand",
  kicker: "E-commerce platform and admin",
  name: "One backend, two apps",
  lede: "An online store for a US retailer and the admin panel that runs it, both served by a single Express API. The store sells physical goods, digital downloads and affiliate products from one catalog.",
  role: "Full-stack build. Store, admin panel and the shared API.",
  chapters: [
    { at: 0, title: "Sales and traffic, live", body: "Orders, revenue, session length and device split, tracked by the API and charted in the admin." },
    { at: 0.27, title: "Three kinds of product", body: "One form handles physical stock, digital files and affiliate links, with the right fields for each." },
    { at: 0.56, title: "The catalog, under control", body: "Filter by product type, sort by price, edit or pull a listing in a click." },
  ] as Chapter[],
  notes: [
    { tag: "// rationale", title: "Payments you can trust", body: "Stripe Checkout, with signed webhooks that mark the order paid and clear the cart only after Stripe confirms." },
    { tag: "// usage", title: "Sign in with Google", body: "Google sign-in or email, JWTs in cookies, and separate admin and super-admin roles." },
    { tag: "// rationale", title: "Hardened API", body: "Rate limiting, secure headers and validated input on every route." },
    { tag: "// expand", title: "Content without a developer", body: "Blog posts, an announcement bar and product images on Cloudinary, all managed from the admin." },
  ],
  stack: ["React 19", "Tailwind CSS", "shadcn/ui", "Ant Design", "Express 5", "MongoDB", "Stripe", "Cloudinary", "Google OAuth"],
  dataNote: "Store branding blurred. Customer pages left out on purpose.",
};

export const sites = {
  tag: "// pointer",
  title: "Sites that make people book.",
  lede: "Scroll-driven marketing sites with real 3D, built for small businesses. Each one has a single job: get the visitor to call, message or book.",
  items: [
    {
      kind: "Mobile IV therapy",
      place: "Miami, USA",
      img: "/img/site-iv.webp",
      alt: "Mobile IV therapy site: a 3D IV bag beside the headline Recover. Rehydrate.",
      body: "A 3D IV bag drains as you scroll while a recharge meter climbs. English and Spanish, booking form, drip finder.",
      stack: "Next.js 16 · Three.js · GSAP",
      href: "https://revibe-ivs.vercel.app",
    },
    {
      kind: "Physio and aesthetics clinic",
      place: "Islamabad, Pakistan",
      img: "/img/site-physio.webp",
      alt: "Physio clinic site with the headline Move freely. Glow naturally.",
      body: "Interactive 3D body and face maps. Tap where it hurts or what you want treated and see the matching care.",
      stack: "Next.js 16 · React Three Fiber · GSAP",
      href: "https://medicos-life.vercel.app",
    },
    {
      kind: "Dental clinic",
      place: "Islamabad, Pakistan",
      img: "/img/site-dental.webp",
      alt: "Dental clinic site with a 3D tooth over the words Gentle dentistry",
      body: "A 3D tooth hero, a mouth explorer and before and after sliders. English and Urdu, bookings over WhatsApp.",
      stack: "Next.js 16 · Three.js · GSAP",
      href: "https://mh-dental-clinic.vercel.app",
    },
    {
      kind: "Building and renovation",
      place: "Victoria, Australia · Agency project",
      img: "/img/site-builder.webp",
      alt: "Builder site with the headline Built with care. Made to last.",
      body: "Built with an agency team for a residential and commercial builder: services, project case studies, service areas and a quote request flow.",
      stack: "Agency build · Responsive web",
      href: "https://jfhbuilding.com.au",
    },
  ],
};

export const research = {
  tag: "// summary",
  kicker: "Published research",
  title: "CodeComClassify",
  subtitle: "Automating code comment classification using BERT-based language models",
  venue: "IEEE/ACM NLBSE 2025, co-located with ICSE 2025, Ottawa",
  session: "Presented in the Tool Competition session, 27 April 2025",
  body: "Code comments explain why code exists, how to use it and what is about to change. In big projects nobody can read them all. We fine-tuned DistilBERT to sort comments into 19 categories across Java, Python and Pharo, trained on comments from 20 open-source projects.",
  stats: [
    { value: "19", label: "comment categories" },
    { value: "3", label: "languages: Java, Python, Pharo" },
    { value: "81%", label: "weighted average F1" },
  ],
  authors: [
    "Khubaib Amjad Alam",
    "Wajid Ali",
    "Summan Aziz",
    "Muhammad Haroon",
    "Meer Hashaam Khan",
    "Zahoor Ahmad",
    "Nadeem Abbas",
  ],
  links: [
    { label: "Read on IEEE Xplore", href: "https://doi.org/10.1109/NLBSE66842.2025.00017" },
    { label: "Conference page", href: "https://conf.researchr.org/details/icse-2025/nlbse-2025-papers/15/CodeComClassify-Automating-Code-Comments-Classification-using-BERT-based-Language-Mo" },
    { label: "Google Scholar", href: contact.scholar },
  ],
  doi: "10.1109/NLBSE66842.2025.00017",
};

// The interactive moment. Sentences are verbatim from the public NLBSE code comment
// dataset (Java test split), with the label its annotators gave them.
export const quiz = {
  tag: "// usage",
  title: "Read it like the model does.",
  lede: "Seven real comments from open-source Java projects. Pick what each one is doing. Our classifier makes this call for every comment in a codebase.",
  source: "Comments and labels from the public NLBSE code comment dataset, Java test split.",
  categories: {
    summary: "Says what the code does.",
    ownership: "Says who wrote it.",
    expand: "Adds detail about how it works.",
    usage: "Explains how to use it.",
    pointer: "Points to other code or docs.",
    deprecation: "Warns it is outdated and names the replacement.",
    rationale: "Explains why it was built this way.",
  } as Record<string, string>,
  items: [
    { text: "check if a record matches a query.", file: "Query.java", label: "summary", options: ["summary", "usage", "rationale", "pointer"] },
    { text: "@author Alain Lee and John Cortell", file: "IMemorySpaceAwareMemoryBlockRetrieval.java", label: "ownership", options: ["pointer", "ownership", "summary", "expand"] },
    { text: "expect the active namenode to switch rarely.", file: "EditLogTailer.java", label: "rationale", options: ["summary", "usage", "rationale", "deprecation"] },
    { text: "@param keyin the key input type to the mapper", file: "MapContext.java", label: "usage", options: ["usage", "expand", "ownership", "pointer"] },
    { text: "@see grid#setselectionmodel gridselectionmodel", file: "Grid.java", label: "pointer", options: ["deprecation", "summary", "pointer", "usage"] },
    { text: "@deprecated Replaced by {@link #getArgument()}", file: "IASTArraySubscriptExpression.java", label: "deprecation", options: ["pointer", "deprecation", "rationale", "expand"] },
    { text: "dynamically create the output committer based on subclass type and settings.", file: "AbstractS3ACommitterFactory.java", label: "expand", options: ["ownership", "rationale", "summary", "expand"] },
  ],
  done: "That is the whole job, done by hand. Our model does it for every comment in a codebase.",
  again: "Try again",
};

export const services = {
  tag: "// usage",
  title: "What I can build for you.",
  items: [
    {
      n: "01",
      title: "Business systems",
      body: "Management systems for clinics, stores and service businesses. Real roles and permissions, records that stay private, billing that balances.",
      fits: "For owners who have outgrown spreadsheets and paper files.",
    },
    {
      n: "02",
      title: "Cinematic marketing sites",
      body: "Scroll-driven sites with real 3D that load fast and work on phones. Built around one action: the call, the message, the booking.",
      fits: "For businesses that need their site to bring in customers.",
    },
    {
      n: "03",
      title: "APIs, payments and security",
      body: "REST APIs, sign-in, Stripe payments, encryption, audit trails and backups. The parts most projects leave until something breaks.",
      fits: "For teams who need the back end done properly.",
    },
  ],
};

export const about = {
  tag: "// ownership",
  title: "Hi, I'm Wajid.",
  body: [
    "I'm a software engineer from Islamabad. I studied software engineering at FAST-NUCES, and since January 2025 I have been building full-stack products for clients on my own.",
    "I like the parts of a project nobody sees until they go wrong: permissions, backups, the notes the next developer will need. I also co-wrote a paper on teaching models to read code comments, which is the same habit pointed at research.",
  ],
  facts: [
    { label: "Based in", value: "Islamabad, Pakistan" },
    { label: "Languages", value: "English, Urdu, Pashto" },
    { label: "Works with", value: "Clients in Pakistan, the US and Australia" },
  ],
  timeline: [
    {
      when: "2025 to now",
      what: "Freelance full-stack developer",
      where: "Self-employed, Islamabad",
      body: "Built and shipped Dental OS. Delivered web apps and sites for hotel, food delivery, home services, e-commerce and construction businesses, from requirements to launch.",
    },
    {
      when: "Apr 2025",
      what: "Co-author, CodeComClassify",
      where: "IEEE/ACM NLBSE 2025 at ICSE, Ottawa",
      body: "Transformer models that classify code comments across Java, Python and Pharo.",
    },
    {
      when: "Jul to Aug 2024",
      what: "Software developer",
      where: "Octaloop Technologies, Islamabad",
      body: "Worked in an existing codebase: small features, bug fixes and testing with the team.",
    },
    {
      when: "2020 to 2025",
      what: "BS Software Engineering",
      where: "FAST-NUCES, Islamabad",
      body: "Software design, databases, information security, AI and natural language processing.",
    },
  ],
  talk: {
    label: "TED-Ed Student Talk",
    title: "Speech Anxiety",
    body: "What happens in the brain when words won't come, and how to get through it on stage.",
    href: "https://youtu.be/nDiHeJbvvQQ",
  },
  skillsTitle: "Tools I use every week",
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"] },
    { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT and OAuth", "Stripe"] },
    { group: "Data", items: ["MongoDB", "MySQL", "Redis"] },
    { group: "Research", items: ["Python", "BERT models", "NLP"] },
  ],
};

export const faq = {
  tag: "// rationale",
  title: "Before you email.",
  items: [
    {
      q: "Will I own the code?",
      a: "Yes. The code goes into a repository in your name, and the hosting and domain stay in your accounts. Nothing is locked to me.",
    },
    {
      q: "How will I know how the project is going?",
      a: "You get a working link to try after every milestone, and updates on email or WhatsApp, whichever you prefer.",
    },
    {
      q: "What happens after launch?",
      a: "You get the notes: how it is set up, how to back it up and how to change it. If something needs fixing, I'm a message away.",
    },
    {
      q: "Can you work on a system I already have?",
      a: "Yes. I read what is there first and write down what I find before I change anything.",
    },
    {
      q: "Do you work with clients outside Pakistan?",
      a: "Yes. I have built for businesses in the US and Australia as well as Pakistan, and I work across time zones over email and WhatsApp.",
    },
    {
      q: "How do we start?",
      a: "Send a short email about what you need. I reply with questions, then a written plan with milestones before any work begins.",
    },
    {
      q: "Are you open to full-time roles?",
      a: "Yes. Email me the role and I'll reply with my CV.",
    },
  ],
};

export const contactSection = {
  tag: "// ownership",
  title: "Tell me what you're building.",
  body: "A short email is enough: what it is, who uses it, and when you need it. I'll reply with questions or a plan.",
  primary: "Email me",
  copy: "Copy address",
  copied: "Copied",
  whatsapp: "WhatsApp",
  upwork: "Hire on Upwork",
};

export const footer = {
  line: "Wajid Ali, full-stack engineer.",
  note: "Client projects are shown without names. App screens use demo data.",
};
