// Single source of truth for personal content. Everything here is real data
// taken from the existing portfolio — edit this file to update the site.

export const site = {
  name: "Rijosh Ravi C",
  shortName: "Rijosh",
  role: "Full Stack Developer",
  title: "Technical Project Manager",
  company: "Phases India Technologies",
  location: "India",
  timezone: "Asia/Kolkata",
  url: "https://rijosh.vercel.app",
  description:
    "Full stack developer and technical project manager with 10+ years building scalable web platforms, SaaS products and AI-driven automation with React, Next.js, Node.js, Laravel and Vue.",
  socials: {
    linkedin: "https://www.linkedin.com/in/rijosh-ravi-c-068062131/",
    github: "https://github.com/rijoshrc",
  },
  startYear: 2015,
} as const;

export const stats = [
  { value: 10, suffix: "+", label: "Years shipping production software" },
  { value: 14, suffix: "", label: "Products delivered across industries" },
  { value: 18, suffix: "", label: "Developers mentored on an open source team" },
] as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "profile", label: "Profile" },
] as const;
