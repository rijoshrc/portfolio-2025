
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
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4">My Journey</h3>
              <p className="text-gray-300 mb-6">
                With over 10 years of experience in full-stack JavaScript development, I've evolved from a curious beginner to a seasoned architect of digital solutions. My journey began with simple HTML pages and has led me through the entire ecosystem of modern web development.
              </p>
              <p className="text-gray-300 mb-6">
                I specialize in creating scalable, performant applications using cutting-edge technologies. From concept to deployment, I bring ideas to life with clean code and intuitive user experiences.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Skills Summary</h3>
              <div className="space-y-3">
                {['React/Next.js', 'Node.js/Express', 'TypeScript', 'Database Design', 'Cloud Architecture', 'DevOps'].map((skill) => (
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
