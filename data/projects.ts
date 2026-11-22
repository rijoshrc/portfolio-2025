export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  featured?: boolean;
  /** Real URL to the live product or repo. Leave undefined to hide the link. */
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-automation",
    title: "AI-Driven Automation",
    category: "AI · Retrieval-Augmented Generation",
    summary:
      "AI-powered solutions built on Retrieval-Augmented Generation that automate business processes and turn scattered documents into data-driven decisions.",
    tech: ["MERN", "PHP", "Vector Databases", "RAG"],
    featured: true,
  },
  {
    slug: "evaply",
    title: "Evaply",
    category: "SaaS · Pharmaceutical marketplace",
    summary:
      "A SaaS platform connecting pharmaceutical suppliers and customers, with intuitive interfaces for order management and KPI review.",
    tech: ["Symfony 5", "Vue.js", "PostgreSQL", "Node.js"],
    featured: true,
  },
  {
    slug: "3d-portal",
    title: "3D Portal",
    category: "Dashboard · Real-time",
    summary:
      "A project management dashboard with real-time collaboration that streamlines admin workflows end to end.",
    tech: ["Laravel", "Vue.js", "Socket.io", "MySQL"],
    featured: true,
  },
  {
    slug: "time-registration",
    title: "Time Registration",
    category: "Internal platform · Real-time",
    summary:
      "A time-tracking platform that monitors project hours with live updates, giving managers an accurate view of resource allocation.",
    tech: ["Express.js", "React.js", "MongoDB", "Socket.io"],
    featured: true,
  },
  {
    slug: "vestas-calendar",
    title: "Vestas Calendar",
    category: "Data visualisation",
    summary:
      "Task and activity data integrated into a dynamic Gantt calendar for project visualisation.",
    tech: ["Laravel", "Vue.js", "DHTMLX Gantt", "MySQL"],
  },
  {
    slug: "eutas",
    title: "Eutas",
    category: "Backend",
    summary: "Backend services for seamless user interaction with activity data.",
    tech: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    slug: "q-forecast",
    title: "Q-Forecast",
    category: "Data visualisation",
    summary: "A custom calendar interface for visualising forecast data.",
    tech: [".NET", "Vue.js"],
  },
  {
    slug: "crawl-data",
    title: "Crawl Data",
    category: "Automation",
    summary: "A crawler that keeps data current by integrating external sources.",
    tech: ["Node.js", "Express", "Puppeteer"],
  },
  {
    slug: "gastech-cfp",
    title: "Gastech CFP Portal",
    category: "Progressive web app",
    summary: "A PWA for paper submission, review and voting.",
    tech: ["PHP", "Vue.js", "PWA"],
  },
  {
    slug: "goodlord-webform",
    title: "Goodlord Webform",
    category: "Web app",
    summary: "A custom web form with role-based field access.",
    tech: ["Laravel", "React.js"],
  },
  {
    slug: "multi-event-cfp",
    title: "Multi Event CFP Portal",
    category: "Progressive web app",
    summary: "Multi-event paper submission platform with customisable themes.",
    tech: ["PHP", "React.js", "PWA"],
  },
  {
    slug: "pfc-hybrid",
    title: "PFC Hybrid App",
    category: "Mobile",
    summary: "A hybrid mobile app for scrap collection.",
    tech: ["React Native", "Expo"],
  },
  {
    slug: "internal-devtool",
    title: "Internal Devtool",
    category: "Internal tooling",
    summary: "Development time logging and leave management for the team.",
    tech: ["Next.js", "MongoDB", "Socket.io"],
  },
  {
    slug: "saas-backup",
    title: "SaaS Backup Tool",
    category: "SaaS frontend",
    summary: "View, restore and share backups from a single interface.",
    tech: ["Next.js", "Node.js"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
