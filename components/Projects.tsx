export default function Projects() {
  const projects = [
    {
      title: "Vestas Calendar",
      description:
        "Integrated task and activity data into a dynamic calendar interface using DHTMLX Gantt for enhanced project visualization and management.",
      tech: ["Laravel", "Vue.js", "DHTMLX Gantt", "MySQL"],
      link: "#",
    },
    {
      title: "Eutas",
      description:
        "Developed backend functionality to enable seamless user interactions with activity data, ensuring accessibility and efficiency.",
      tech: ["Laravel", "Vue.js", "MySQL"],
      link: "#",
    },
    {
      title: "3D Portal",
      description:
        "Built a project management dashboard with real-time features, streamlining admin workflows.",
      tech: ["Laravel", "Vue.js", "Socket.io", "MySQL"],
      link: "#",
    },
    {
      title: "Evaply",
      description:
        "Created a SaaS platform connecting pharmaceutical suppliers and customers, with intuitive frontend interfaces for order management and KPI review.",
      tech: ["Symfony 5", "Vue.js", "PostgreSQL", "Node.js"],
      link: "#",
    },
    {
      title: "Q-Forecast",
      description:
        "Designed a custom calendar interface to visualize data, enhancing user interaction and data accessibility.",
      tech: [".NET", "Vue.js"],
      link: "#",
    },
    {
      title: "Crawl Data",
      description:
        "Developed a JavaScript-based crawler to update data dynamically, integrating external sources for real-time accuracy.",
      tech: ["Node.js", "Express", "Puppeteer"],
      link: "#",
    },
    {
      title: "Gastech CFP Portal",
      description:
        "Built a progressive web app for paper submission, review, and voting, delivering a responsive and user-friendly experience.",
      tech: ["PHP", "Vue.js", "PWA"],
      link: "#",
    },
    {
      title: "Goodlord Webform",
      description:
        "Created a custom web form with role-based field access, optimizing user interaction and data management.",
      tech: ["Laravel", "React.js"],
      link: "#",
    },
    {
      title: "Multi Event CFP Portal",
      description:
        "Developed a platform for managing multiple events and paper submissions with customizable themes for enhanced user experience.",
      tech: ["PHP", "React.js", "PWA"],
      link: "#",
    },
    {
      title: "Time Registration",
      description:
        "Built a time-tracking platform to monitor project hours, incorporating real-time updates for efficient resource management.",
      tech: ["Express.js", "React.js", "MongoDB", "Socket.io"],
      link: "#",
    },
    {
      title: "PFC Hybrid App",
      description:
        "Developed a hybrid mobile app for scrap collection, focusing on a seamless and responsive user interface.",
      tech: ["React Native", "React", "Expo Go"],
      link: "#",
    },
    {
      title: "Internal Devtool",
      description:
        "Created an internal tool for logging development time and managing employee leave requests, streamlining team operations.",
      tech: ["Next.js", "React.js", "MongoDB", "Socket.io"],
      link: "#",
    },
    {
      title: "SaaS Backup Tool",
      description:
        "Built a frontend for a SaaS application enabling users to view, restore, and share backups, ensuring a user-friendly experience.",
      tech: ["Next.js", "Node.js"],
      link: "#",
    },
    {
      title: "AI-Driven Automation Projects",
      description:
        "Developed AI-powered solutions using Retrieval-Augmented Generation (RAG) techniques to automate processes and enhance data-driven decision-making.",
      tech: ["MERN", "PHP", "Vector Databases"],
      link: "#",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
