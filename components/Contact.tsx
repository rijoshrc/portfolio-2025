
export default function Contact() {
  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <p className="text-gray-300">Email</p>
                  <p className="text-cyan-300">alex.johnson@email.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-4">🔗</span>
                <div>
                  <p className="text-gray-300">LinkedIn</p>
                  <p className="text-cyan-300">linkedin.com/in/alexjohnson</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-4">🐙</span>
                <div>
                  <p className="text-gray-300">GitHub</p>
                  <p className="text-cyan-300">github.com/alexjohnson</p>
                </div>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">Send Message</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
