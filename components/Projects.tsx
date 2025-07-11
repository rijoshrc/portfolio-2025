
export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include real-time inventory, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, team collaboration features, and advanced reporting.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard for business metrics with interactive charts, real-time data updates, and custom reporting.",
      tech: ["Vue.js", "Express", "Redis", "Chart.js"],
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
      tech: ["React Native", "Node.js", "PostgreSQL", "JWT"],
      link: "#"
    }
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
