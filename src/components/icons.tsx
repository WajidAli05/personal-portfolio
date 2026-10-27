import type { IconType } from "react-icons";
import {
  LuArrowRight, LuArrowUpRight, LuBookOpen, LuBriefcase, LuChartColumn, LuCreditCard, LuDatabase, LuFileText,
  LuGlobe, LuGraduationCap, LuLanguages, LuLayers, LuLock, LuMail, LuMapPin, LuMessageCircle, LuMonitorSmartphone,
  LuPlay, LuReceipt, LuServer, LuShieldCheck, LuSparkles, LuUsers, LuWorkflow, LuCode, LuBrain, LuWrench, LuPlus,
  LuCopy, LuCheck, LuPause, LuMenu, LuX, LuBadgeCheck,
} from "react-icons/lu";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiThreedotjs, SiGreensock, SiRedux, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiStripe, SiCloudinary, SiMongodb, SiMysql, SiRedis, SiPython, SiHuggingface,
  SiGit, SiGithub, SiPostman, SiFigma, SiVite, SiVercel, SiNetlify, SiUpwork, SiGooglescholar, SiMongoose,
} from "react-icons/si";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export const ui: Record<string, IconType> = {
  arrow: LuArrowRight, out: LuArrowUpRight, book: LuBookOpen, briefcase: LuBriefcase, chart: LuChartColumn,
  card: LuCreditCard, db: LuDatabase, file: LuFileText, globe: LuGlobe, grad: LuGraduationCap, lang: LuLanguages,
  layers: LuLayers, lock: LuLock, mail: LuMail, pin: LuMapPin, chat: LuMessageCircle, sites: LuMonitorSmartphone,
  play: LuPlay, pause: LuPause, receipt: LuReceipt, backend: LuServer, shield: LuShieldCheck, sparkles: LuSparkles,
  users: LuUsers, systems: LuWorkflow, code: LuCode, brain: LuBrain, tools: LuWrench, plus: LuPlus, copy: LuCopy,
  check: LuCheck, menu: LuMenu, x: LuX, badge: LuBadgeCheck,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = ui[name] ?? LuSparkles;
  return <C className={className} aria-hidden="true" />;
}

// Tech logos with brand colors (tuned for a dark background).
export const tech: Record<string, { I: IconType; c: string }> = {
  "React": { I: SiReact, c: "#61DAFB" },
  "Next.js": { I: SiNextdotjs, c: "#FFFFFF" },
  "TypeScript": { I: SiTypescript, c: "#3178C6" },
  "JavaScript": { I: SiJavascript, c: "#F7DF1E" },
  "Tailwind CSS": { I: SiTailwindcss, c: "#38BDF8" },
  "Three.js": { I: SiThreedotjs, c: "#FFFFFF" },
  "GSAP": { I: SiGreensock, c: "#88CE02" },
  "Redux": { I: SiRedux, c: "#9E7CE0" },
  "HTML": { I: SiHtml5, c: "#E34F26" },
  "CSS": { I: SiCss, c: "#5A8DEE" },
  "Node.js": { I: SiNodedotjs, c: "#5FA04E" },
  "Express": { I: SiExpress, c: "#FFFFFF" },
  "REST APIs": { I: LuServer, c: "#8A90FF" },
  "JWT": { I: SiJsonwebtokens, c: "#FB5BC5" },
  "Stripe": { I: SiStripe, c: "#8B83FF" },
  "Cloudinary": { I: SiCloudinary, c: "#5A8DEE" },
  "MongoDB": { I: SiMongodb, c: "#47A248" },
  "Mongoose": { I: SiMongoose, c: "#E15A5A" },
  "MySQL": { I: SiMysql, c: "#5D9BD1" },
  "Redis": { I: SiRedis, c: "#FF4438" },
  "Python": { I: SiPython, c: "#FFD43B" },
  "Hugging Face": { I: SiHuggingface, c: "#FFD21E" },
  "BERT models": { I: LuBrain, c: "#4FDCFF" },
  "NLP": { I: LuLanguages, c: "#4FDCFF" },
  "Git": { I: SiGit, c: "#F05032" },
  "GitHub": { I: SiGithub, c: "#FFFFFF" },
  "Postman": { I: SiPostman, c: "#FF6C37" },
  "Figma": { I: SiFigma, c: "#F24E1E" },
  "Vite": { I: SiVite, c: "#A78BFA" },
  "Vercel": { I: SiVercel, c: "#FFFFFF" },
  "Netlify": { I: SiNetlify, c: "#32E6E2" },
};

export function Tech({ name }: { name: string }) {
  const t = tech[name];
  if (!t) return null;
  return <t.I style={{ color: t.c }} aria-hidden="true" />;
}

export const brand = { github: SiGithub, linkedin: FaLinkedinIn, upwork: SiUpwork, scholar: SiGooglescholar, whatsapp: FaWhatsapp };
