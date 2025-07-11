
export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
      icon: "🎨"
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL"],
      icon: "⚙️"
    },
    {
      title: "Tools & DevOps",
      skills: ["Docker", "AWS", "Git", "CI/CD", "Jest", "Webpack"],
      icon: "🛠️"
    }
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-4xl mb-4 text-center">{category.icon}</div>
              <h3 className="text-2xl font-semibold text-cyan-300 mb-6 text-center">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-center">
                    <span className="text-gray-300 bg-white/5 px-4 py-2 rounded-full text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
