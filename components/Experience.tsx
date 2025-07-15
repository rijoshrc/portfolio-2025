export default function Experience() {
  const experiences = [
    {
      company: "Phases India Technologies",
      position: "Technical Project Manager - Software Development",
      duration: "2015 - Present",
      achievements: [
        "Develop and maintain multiple web applications and integration",
        "Project management & Client management",
        "Mentor an open source team with 18 developers",
      ],
    },
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300">
                    {exp.position}
                  </h3>
                  <p className="text-xl text-gray-300">{exp.company}</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">
                  {exp.duration}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
