// Every viewer-facing line on the site lives here. Client businesses are never named.

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
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ───────────── 1. Hero: who I am and what I do ───────────── */
export const hero = {
  status: "Open to freelance projects and full-time roles",
  hello: "Hi, I'm",
  name: "Wajid Ali",
  role: "Full-stack engineer and published researcher",
  title: "Full-stack engineer",
  tagline: "I build web and mobile apps with AI inside: chatbots, voice agents and more. Example: the system a family dental clinic runs on every day.",
  lede: "I build web apps, business systems and 3D marketing sites with React, Next.js and Node. I care about the parts most projects skip: permissions, encryption, backups and clear docs.",
  location: "Islamabad, Pakistan",
  reach: "Clients in Pakistan, the US, Australia and Qatar",
  cta: "Email me",
  secondary: "See my projects",
  proof: [
    { kind: "code", value: "58k+", count: 58, suffix: "k+", label: "lines of code in one clinic system", sub: "Dental OS, built end to end" },
    { kind: "badge", value: "IEEE", count: 0, suffix: "", label: "published, NLBSE '25", sub: "IEEE/ACM, co-located with ICSE 2025" },
  ],
  builds: ["business systems", "3D marketing sites", "secure APIs", "NLP research tools"],
  doTitle: "What I do",
  doLede: "Web and mobile solutions for small and mid-sized businesses across the globe, in fields like medical and e-commerce.",
  doItems: [
    {
      icon: "sites",
      title: "Web and mobile apps",
      body: "Clinic systems, online stores and booking apps that owners, staff and customers use every day.",
    },
    {
      icon: "botmsg",
      title: "AI agents",
      body: "Voice agents and chatbots built into your app or website, so customers get answers at any hour.",
    },
    {
      icon: "rocket",
      title: "Full-stack, start to finish",
      body: "Every step is covered, from your pain points and requirements to deployment and rolling out updates.",
      steps: ["Pain points", "Requirements", "Design", "Build", "Deploy", "Updates"],
    },
  ],
};

/* ───────────── 2. Projects ───────────── */
export type Media =
  | { kind: "video"; src: string; poster: string; w: number; h: number; alt: string }
  | { kind: "image"; src: string; w: number; h: number; alt: string }
  | { kind: "pair"; a: { src: string; alt: string }; b: { src: string; alt: string } };

export type App = {
  id: string;
  index: string;
  kicker: string;
  name: string;
  summary: string;
  role: string;
  media: Media;
  highlights: { icon: string; title: string; body: string }[];
  stack: string[];
  walkthrough?: { src: string; poster: string; meta: string };
  screens?: { src: string; alt: string }[];
  link?: { label: string; href: string };
  note?: string;
  short: string;
  tags: { icon: string; text: string }[];
  floaters: { icon: string; text: string }[];
};

export const apps: App[] = [
  {
    id: "dental-os",
    index: "01",
    kicker: "Clinic management system",
    name: "Dental OS",
    summary: "A dental clinic runs its whole day on it: appointments, patient records, the tooth chart, lab cases, inventory and billing. Owners, dentists, receptionists and outside labs each get their own view.",
    role: "Built end to end: design, frontend, backend, security and deployment.",
    media: { kind: "video", src: "/media/dentalos-scrub.mp4", poster: "/media/dentalos-poster.webp", w: 1280, h: 568, alt: "Dental OS: owner dashboard, patient record with tooth chart, and billing" },
    highlights: [
      { icon: "lock", title: "Encrypted patient records", body: "Diagnosis, treatment and medications are encrypted with AES-256-GCM before they reach the database." },
      { icon: "shield", title: "Permissions on the server", body: "Four roles, a permission per tab, checks that fail closed. Two-factor sign-in and lockouts." },
      { icon: "file", title: "An audit log nobody can rewrite", body: "Every entry is chained to the last with SHA-256. Edits and deletes are blocked." },
      { icon: "db", title: "Backups and privacy law", body: "Encrypted nightly backups with a tested restore, and patient erasure that keeps invoices intact." },
      { icon: "globe", title: "English, Urdu and Arabic", body: "The interface switches language and flips right-to-left for Arabic." },
      { icon: "receipt", title: "Billing that adds up", body: "Invoices, part payments, dentist commissions and lab dues, each with its own chart." },
    ],
    stack: ["React 19", "Vite", "Zustand", "Express 5", "MongoDB", "Three.js", "i18next", "Recharts", "jsPDF"],
    walkthrough: { src: "/media/dentalos-walkthrough.mp4", poster: "/media/dentalos-walkthrough-poster.jpg", meta: "1:15 with sound" },
    screens: [
      { src: "/img/dentalos-1.webp", alt: "Daily cashbook with totals by payment method" },
      { src: "/img/dentalos-2.webp", alt: "Invoices: billed versus collected per day" },
      { src: "/img/dentalos-3.webp", alt: "Dentist commissions: earned, paid, remaining" },
      { src: "/img/dentalos-4.webp", alt: "Lab dues per partner lab" },
    ],
    note: "All screens use demo data.",
    short: "The system a family dental clinic runs its whole day on.",
    tags: [{ icon: "lock", text: "Encrypted records" }, { icon: "users", text: "4 user roles" }, { icon: "globe", text: "3 languages" }],
    floaters: [{ icon: "check", text: "Appointment booked" }, { icon: "lock", text: "Record encrypted" }, { icon: "receipt", text: "Invoice paid" }],
  },
  {
    id: "commerce",
    index: "02",
    kicker: "E-commerce platform and admin",
    name: "One backend, two apps",
    summary: "An online store for a US retailer and the admin panel that runs it, both served by a single Express API. Physical goods, digital downloads and affiliate products live in one catalog.",
    role: "Full-stack build: store, admin panel and the shared API.",
    media: { kind: "video", src: "/media/bluerays-scrub.mp4", poster: "/media/bluerays-poster.webp", w: 1260, h: 464, alt: "Store admin: sales dashboard, add product form and product listing" },
    highlights: [
      { icon: "card", title: "Stripe payments", body: "Checkout with signed webhooks that mark the order paid and clear the cart only after Stripe confirms." },
      { icon: "users", title: "Sign in with Google", body: "Google or email sign-in, JWTs in cookies, admin and super-admin roles." },
      { icon: "layers", title: "Three kinds of product", body: "One form handles physical stock, digital files and affiliate links." },
      { icon: "chart", title: "Live sales and traffic", body: "Orders, revenue, session length and device split, tracked and charted." },
    ],
    stack: ["React 19", "Tailwind CSS", "shadcn/ui", "Ant Design", "Express 5", "MongoDB", "Stripe", "Cloudinary"],
    note: "Store branding blurred. Customer pages left out on purpose.",
    short: "A US online store and its admin panel, both run by one API.",
    tags: [{ icon: "card", text: "Stripe checkout" }, { icon: "users", text: "Google sign-in" }, { icon: "chart", text: "Live sales charts" }],
    floaters: [{ icon: "card", text: "Payment confirmed" }, { icon: "receipt", text: "Order received" }, { icon: "chart", text: "Dashboard updated" }],
  },
  {
    id: "qatar",
    index: "03",
    kicker: "Recruitment web app, Qatar",
    name: "Two brands, one codebase",
    summary: "A manpower company in Qatar hires delivery riders, drivers and construction workers. One React app serves both brands, each with its own pages, contacts and application form.",
    role: "Design and build, from requirements to launch.",
    media: {
      kind: "pair",
      a: { src: "/img/qatar-delivery.webp", alt: "A delivery rider on a bicycle, imagery from the delivery hiring brand" },
      b: { src: "/img/qatar-construction.webp", alt: "Construction crew in safety vests, imagery from the construction hiring brand" },
    },
    highlights: [
      { icon: "file", title: "Role-aware applications", body: "Rider and driver forms ask for vehicle, license and age; construction forms ask for trade and experience." },
      { icon: "mail", title: "Straight to the inbox", body: "Applications arrive in the company inbox through EmailJS, with no server to maintain." },
      { icon: "chat", title: "One tap to WhatsApp", body: "Every page puts the recruiters' WhatsApp numbers within reach." },
      { icon: "layers", title: "Checked brand config", body: "Brand details live in one config file that stops the app if anything is missing." },
    ],
    stack: ["React 19", "Vite", "Tailwind CSS", "DaisyUI", "React Router", "EmailJS", "Netlify"],
    short: "One app that hires riders and construction workers for two brands.",
    tags: [{ icon: "layers", text: "Two brands" }, { icon: "file", text: "Role-aware forms" }, { icon: "chat", text: "WhatsApp in one tap" }],
    floaters: [{ icon: "file", text: "Application received" }, { icon: "chat", text: "WhatsApp opened" }, { icon: "layers", text: "Brand switched" }],
  },
];

export const sites = {
  title: "Websites",
  lede: "Marketing sites for small businesses. Each one has a single job: get the visitor to call, message or book.",
  items: [
    {
      kind: "Mobile IV therapy",
      place: "Miami, USA",
      img: "/img/site-iv.webp",
      alt: "Mobile IV therapy site: a 3D IV bag beside the headline Recover. Rehydrate.",
      body: "A 3D IV bag drains as you scroll while a recharge meter climbs. English and Spanish, drip finder, booking form.",
      stack: ["Next.js 16", "Three.js", "GSAP"],
      href: "https://revibe-ivs.vercel.app",
      feature: "3D IV bag on scroll",
    },
    {
      kind: "Physio and aesthetics clinic",
      place: "Islamabad, Pakistan",
      img: "/img/site-physio.webp",
      alt: "Physio clinic site with the headline Move freely. Glow naturally.",
      body: "Interactive 3D body and face maps. Tap where it hurts and see the matching care.",
      stack: ["Next.js 16", "React Three Fiber", "GSAP"],
      href: "https://medicos-life.vercel.app",
      feature: "Tap-to-explore body map",
    },
    {
      kind: "Dental clinic",
      place: "Islamabad, Pakistan",
      img: "/img/site-dental.webp",
      alt: "Dental clinic site with a 3D tooth over the words Gentle dentistry",
      body: "A 3D tooth hero, a mouth explorer and before and after sliders. English and Urdu, bookings over WhatsApp.",
      stack: ["Next.js 16", "Three.js", "GSAP"],
      href: "https://mh-dental-clinic.vercel.app",
      feature: "3D tooth explorer",
    },
    {
      kind: "Building and renovation",
      place: "Victoria, Australia",
      badge: "Agency project",
      img: "/img/site-builder.webp",
      alt: "Builder site with the headline Built with care. Made to last.",
      body: "Built with an agency team: services, project case studies, service areas and a quote request flow.",
      stack: ["Agency build", "Responsive web"],
      href: "https://jfhbuilding.com.au",
      feature: "Quote request flow",
    },
  ],
};

/* ───────────── 3. Research ───────────── */
export const research = {
  kicker: "Published research",
  title: "CodeComClassify",
  subtitle: "Automating code comment classification using BERT-based language models",
  venue: "IEEE/ACM NLBSE 2025, co-located with ICSE 2025, Ottawa",
  session: "Tool Competition session, 27 April 2025",
  body: "Code comments explain why code exists, how to use it and what is about to change. In big projects nobody can read them all. We fine-tuned DistilBERT to sort comments into 19 categories across Java, Python and Pharo, trained on comments from 20 open-source projects.",
  stats: [
    { value: "19", label: "comment categories" },
    { value: "3", label: "languages" },
    { value: "81%", label: "weighted F1" },
  ],
  authors: ["Khubaib Amjad Alam", "Wajid Ali", "Summan Aziz", "Muhammad Haroon", "Meer Hashaam Khan", "Zahoor Ahmad", "Nadeem Abbas"],
  links: [
    { label: "IEEE Xplore", href: "https://doi.org/10.1109/NLBSE66842.2025.00017" },
    { label: "Conference page", href: "https://conf.researchr.org/details/icse-2025/nlbse-2025-papers/15/CodeComClassify-Automating-Code-Comments-Classification-using-BERT-based-Language-Mo" },
    { label: "Google Scholar", href: contact.scholar },
  ],
  doi: "10.1109/NLBSE66842.2025.00017",
};

// Sentences verbatim from the public NLBSE code comment dataset (Java test split), with its labels.
export const quiz = {
  title: "Try it: read it like the model does",
  lede: "Seven real comments from open-source Java projects. Pick what each one is doing.",
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

/* ───────────── 4. Skills ───────────── */
export const skills = {
  title: "Skills and tools",
  lede: "What I reach for every week, grouped by where it sits in the stack.",
  groups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Zustand", "Redux", "Three.js", "WebGL", "GSAP", "HTML", "CSS"] },
    { name: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT", "Stripe", "Cloudinary"] },
    { name: "Databases", items: ["MongoDB", "Mongoose", "MySQL", "Redis"] },
    { name: "AI and research", items: ["Python", "Hugging Face", "BERT models", "NLP"] },
    { name: "Tools and hosting", items: ["Git", "GitHub", "Postman", "Figma", "Vite", "Vercel", "Netlify"] },
  ],
  practices: ["Role-based access control", "Encryption at rest", "Audit logging", "Backups and restore", "Multi-language and RTL", "Responsive design", "Technical writing"],
  practicesTitle: "Practices",
};

/* ───────────── 5. Experience and education ───────────── */
export const experience = {
  title: "Experience and education",
  bio: "I studied software engineering at FAST-NUCES in Islamabad. Since January 2025 I have built full-stack products for clients on my own, from requirements to launch.",
  facts: [
    { icon: "pin", label: "Based in", value: "Islamabad, Pakistan" },
    { icon: "lang", label: "Languages", value: "English, Urdu, Pashto" },
    { icon: "globe", label: "Works with", value: "Pakistan, US, Australia, Qatar" },
  ],
  timeline: [
    {
      icon: "briefcase",
      when: "2025 to now",
      what: "Freelance full-stack developer",
      where: "Self-employed, Islamabad",
      body: "AI-integrated web and mobile apps, and modern websites that turn visitors into leads, for small and mid-sized businesses. Built and shipped Dental OS.",
    },
    {
      icon: "book",
      when: "Apr 2025",
      what: "Co-author, CodeComClassify",
      where: "IEEE/ACM NLBSE 2025 at ICSE, Ottawa",
      body: "A multi-class classification problem: sorting code comments into 19 categories with transformer models, across Java, Python and Pharo.",
    },
    {
      icon: "cart",
      when: "Jul to Aug 2024",
      what: "Software developer",
      where: "Octaloop Technologies, Islamabad",
      body: "Worked on an e-commerce project in an existing codebase: features, bug fixes and testing with the team.",
    },
    {
      icon: "grad",
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
    thumb: "/img/ted-talk.webp",
    cta: "Watch the talk",
  },
};

/* ───────────── 6. Contact and FAQ ───────────── */
export const contactSection = {
  title: "Tell me what you're building.",
  body: "A short email is enough: what it is, who uses it, and when you need it. I'll reply with questions or a plan.",
  primary: "Email me",
  copy: "Copy address",
  copied: "Copied",
  whatsapp: "WhatsApp",
  upwork: "Hire on Upwork",
};

export const faq = {
  title: "Before you email",
  items: [
    { q: "Will I own the code?", a: "Yes. The code goes into a repository in your name, and the hosting and domain stay in your accounts. Nothing is locked to me." },
    { q: "How will I know how the project is going?", a: "You get a working link to try after every milestone, and updates on email or WhatsApp, whichever you prefer." },
    { q: "What happens after launch?", a: "You get the notes: how it is set up, how to back it up and how to change it. If something needs fixing, I'm a message away." },
    { q: "Can you work on a system I already have?", a: "Yes. I read what is there first and write down what I find before I change anything." },
    { q: "Do you work with clients outside Pakistan?", a: "Yes. I have built for businesses in the US, Australia and Qatar as well as Pakistan, and I work across time zones over email and WhatsApp." },
    { q: "How do we start?", a: "Send a short email about what you need. I reply with questions, then a written plan with milestones before any work begins." },
    { q: "Are you open to full-time roles?", a: "Yes. Email me the role and I'll reply with my CV." },
  ],
};

export const cities = [
  { name: "Islamabad", lat: 33.68, lon: 73.05, home: true },
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "Melbourne", lat: -37.81, lon: 144.96 },
  { name: "Doha", lat: 25.29, lon: 51.53 },
];

export const footer = {
  line: "Wajid Ali, full-stack engineer.",
};

/* ───────────── Section headings ───────────── */
export const sections = {
  about: { n: "01", label: "About", title: "Hi, I'm Wajid." },
  projects: { n: "02", label: "Projects", title: "Recent work", lede: "Three apps businesses run on every day, then four websites. Open an app for the full story." },
  research: { n: "03", label: "Research", title: "Published research", lede: "Natural language processing for software engineering, published at IEEE/ACM NLBSE 2025." },
  skills: { n: "04", label: "Skills", title: "Skills and tools", lede: "What I use every week, grouped by where it sits in a project." },
  experience: { n: "05", label: "Experience", title: "Experience and education", lede: "Where I have worked, what I studied and where I have spoken." },
  contact: { n: "06", label: "Contact", title: "Let's work together", lede: "A short email is enough: what it is, who uses it and when you need it. I'll reply with questions or a plan." },
};
