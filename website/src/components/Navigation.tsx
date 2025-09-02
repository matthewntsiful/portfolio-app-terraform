import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certifications" },
    { href: "#resume", label: "Resume" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-glass backdrop-blur-xl border-b border-white/10 shadow-glass">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8 lg:px-12">
        <button
          onClick={() => scrollToSection("#hero")}
          className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
        >
          MN
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 lg:space-x-12">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white/80 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Theme Toggle */}
        <div className="hidden md:flex items-center mr-4">
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
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
                className="text-white/80 hover:text-white transition-all duration-300 text-left font-medium py-2 px-4 rounded-lg hover:bg-white/10"
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