export default function About() {
  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
                My Journey
              </h3>
              <p className="text-gray-300 mb-6">
                With over 10 years of experience as a full stack developer, I’ve
                grown from a PHP enthusiast into a seasoned technical lead
                crafting innovative digital solutions. My journey began in 2015
                at Phases India Technology Pvt. Ltd., where I dove into web
                development as a PHP developer, laying the foundation for my
                passion for building seamless, user-centric applications.
              </p>
              <p className="text-gray-300 mb-6">
                Specializing in the MERN stack, PHP, Laravel, and Vue.js, I
                excel at creating scalable, high-performance solutions,
                including AI-driven applications leveraging RAG techniques for
                automation. My expertise spans frontend technologies like React
                and Next.js, backend frameworks like Node.js, and databases such
                as MySQL, PostgreSQL, and MongoDB. I thrive on transforming
                complex requirements into intuitive designs with clean,
                efficient code. Driven by mentoring teams and collaborating with
                clients, I’m committed to pushing boundaries and delivering
                impactful solutions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
                Skills Summary
              </h3>
              <div className="space-y-3">
                {[
                  "React/Next.js",
                  "Node.js/Express",
                  "Python/Frappe",
                  "TypeScript",
                  "AI",
                  "Database Design",
                  "Cloud Architecture",
                  "DevOps",
                ].map((skill) => (
                  <div key={skill} className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
