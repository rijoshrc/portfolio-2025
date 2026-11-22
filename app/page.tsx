import Providers from "@/components/Providers";
import Preloader from "@/components/Preloader";
import AmbientBackground from "@/components/AmbientBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <Providers>
      <Preloader />
      <AmbientBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Profile />
      </main>
      <Footer />
      <ThemeSwitcher />
    </Providers>
  );
}
