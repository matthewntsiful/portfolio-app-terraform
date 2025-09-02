import { useEffect, useState } from "react";
import { HiChevronDown, HiDownload, HiMail } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "./ParticlesBackground";

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const strings = [
    "Automating cloud infrastructure at scale.",
    "Reducing AWS costs by 30% through optimization.",
    "Improving deployment speed by 60% with CI/CD.",
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 50;
    const currentString = strings[currentStringIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentString.length) {
        setTypewriterText(currentString.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setTypewriterText(currentString.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (!isDeleting && currentCharIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentStringIndex((currentStringIndex + 1) % strings.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentStringIndex, isDeleting, strings]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background with particles */}
      <div className="absolute inset-0 bg-hero-gradient">
        <ParticlesBackground />
      </div>
      
      <div className="container mx-auto px-6 z-10 text-center relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
          Matthew Odoom Ntsiful
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary mb-8 font-semibold">
          Cloud & DevOps Engineer
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-muted-foreground min-h-[2em]">
          {typewriterText}
          <span className="animate-pulse">|</span>
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => scrollToSection("#resume")}
            className="px-10 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-blue transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
          >
            <HiDownload className="mr-2" />
            Download Resume
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="px-10 py-4 bg-gradient-glass backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center"
          >
            <HiMail className="mr-2" />
            Let's Connect
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("#about")}
          className="text-electric-purple text-4xl hover:text-accent transition-colors"
        >
          <HiChevronDown />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;