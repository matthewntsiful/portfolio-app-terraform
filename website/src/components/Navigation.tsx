import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaCertificate } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certifications" },
    { href: "#resume", label: "Resume" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Find active section
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = `#${section}`;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-glass backdrop-blur-xl border-b border-white/10 shadow-glass">
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      <div className="w-full flex justify-between items-center py-4 px-8 lg:px-12">
        <button
          onClick={() => scrollToSection("#hero")}
          className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
        >
          MN
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-foreground/80 hover:text-foreground transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-accent/10 backdrop-blur-sm ${
                  activeSection === item.href
                    ? "text-primary bg-primary/10 shadow-glow-blue"
                    : ""
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/matthewntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/10"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/matthewntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/10"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="https://www.credly.com/users/matthewntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/10"
              aria-label="Certifications"
            >
              <FaCertificate className="text-lg" />
            </a>
          </div>
          
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/10"
          >
            {isMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-glass backdrop-blur-xl border border-white/20 px-6 py-8 mt-4 rounded-2xl shadow-glass mx-4">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`text-foreground/80 hover:text-foreground transition-all duration-300 text-left font-medium py-2 px-4 rounded-lg hover:bg-accent/10 ${
                  activeSection === item.href
                    ? "text-primary bg-primary/10"
                    : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;