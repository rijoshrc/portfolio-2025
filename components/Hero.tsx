
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Alex Johnson
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Full Stack JavaScript Developer
        </p>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Crafting digital experiences with 10 years of expertise in modern web technologies
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
          View My Work
        </button>
      </div>
    </section>
  );
}
