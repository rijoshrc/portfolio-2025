import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative">
      <AnimatedBackground />
      <Navigation />

      <div id="home" className="relative z-10">
        <Hero />
      </div>

      <div id="about" className="relative z-10">
        <About />
      </div>

      <div id="skills" className="relative z-10">
        <Skills />
      </div>

      <div id="projects" className="relative z-10">
        <Projects />
      </div>

      <div id="experience" className="relative z-10">
        <Experience />
      </div>

      <div id="education" className="relative z-10">
        <Education />
      </div>

      <div id="contact" className="relative z-10">
        <Contact />
      </div>
    </div>
  );
}