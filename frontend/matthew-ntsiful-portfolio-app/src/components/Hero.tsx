import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Github, Linkedin } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="DevOps Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-accent/20 rounded-lg animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border border-success/20 rounded-lg animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-foreground">Matthew</span>
            <span className="block text-gradient">Odoom Ntsiful</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
            Cloud & DevOps Engineer
          </p>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in-left" style={{animationDelay: '0.4s'}}>
            DevOps Engineer with 3+ years automating, deploying, and scaling cloud infrastructure on AWS. 
            Proven track record reducing costs by 30% and improving deployment speed by 60%.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="/resume-matthew-ntsiful.pdf" download="Matthew-Ntsiful-Resume.pdf">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </a>
            </Button>
            <Button variant="outline-hero" size="lg">
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <a
              href="https://github.com/matthew-ntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary smooth-transition hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/matthew-ntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary smooth-transition hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;