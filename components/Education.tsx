
export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      year: "2014",
      description: "Specialized in Software Engineering and Web Development"
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
    "Certified Kubernetes Administrator"
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Education & Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-200 mb-2">{edu.degree}</h4>
                <p className="text-gray-300 mb-1">{edu.institution}</p>
                <p className="text-gray-400 text-sm mb-2">{edu.year}</p>
                <p className="text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></div>
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
