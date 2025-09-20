import { useEffect, useState } from "react";
import { HiChevronUp, HiDownload, HiMail, HiStar, HiClock, HiTrendingUp } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "./ParticlesBackground";
import ResumeModal from "./ResumeModal";

const HeroSection = () => {
  const [counters, setCounters] = useState({ years: 0, cost: 0, speed: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleLetsConnect = () => {
    scrollToSection("#contact");
    // Optional: Auto-focus email field after scroll
    setTimeout(() => {
      const emailField = document.getElementById('email');
      if (emailField) {
        emailField.focus();
      }
    }, 1000);
  };

  // Show back-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        const animateCounter = (target: number, key: keyof typeof counters, duration: number) => {
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
          }, 16);
        };

        animateCounter(3, 'years', 2000);
        animateCounter(30, 'cost', 2500);
        animateCounter(60, 'speed', 3000);
        setHasAnimated(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);

  const stats = [
    { icon: HiStar, value: counters.years, suffix: "+", label: "Years Experience", color: "text-electric-blue" },
    { icon: HiTrendingUp, value: counters.cost, suffix: "%", label: "Cost Reduction", color: "text-electric-green" },
    { icon: HiClock, value: counters.speed, suffix: "%", label: "Faster Deployments", color: "text-electric-purple" },
  ];

  return (
    <>
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
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-muted-foreground">
          Automating cloud infrastructure at scale with proven results
        </p>
        
        {/* Animated Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-4 hover:scale-105 transition-all duration-500 delay-${index * 200}`}
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`text-2xl ${stat.color} mr-2`} />
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}{stat.suffix}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 sm:mb-8">
          <button
            onClick={handleDownloadResume}
            className="group px-10 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-blue transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <HiDownload className="mr-2 relative z-10" />
            <span className="relative z-10">View Resume</span>
          </button>
          <button
            onClick={handleLetsConnect}
            className="group px-10 py-4 bg-gradient-glass backdrop-blur-md border-2 border-primary/30 text-foreground rounded-xl font-semibold hover:border-primary hover:shadow-glow-blue transition-all duration-300 inline-flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <HiMail className="mr-2 relative z-10" />
            <span className="relative z-10">Let's Connect</span>
          </button>
        </div>
      </div>
      
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
    
    {/* Back to Top Button */}
    {showBackToTop && (
    <div className="fixed bottom-8 right-8 z-40 transition-all duration-300">
      <button
        onClick={() => scrollToSection("#hero")}
        className="group bg-primary/90 backdrop-blur-sm hover:bg-primary text-white rounded-full p-3 shadow-lg hover:shadow-glow-blue hover:scale-110 transition-all duration-300"
        aria-label="Back to top"
      >
        <HiChevronUp className="text-xl" />
      </button>
    </div>
    )}
    </>
  );
};

export default HeroSection;