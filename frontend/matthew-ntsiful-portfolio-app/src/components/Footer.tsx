import { Button } from "@/components/ui/button";
import { Github, Linkedin, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Matthew Ntsiful</h3>
            <p className="text-muted-foreground leading-relaxed">
              Cloud & DevOps Engineer passionate about building scalable, 
              secure, and efficient infrastructure solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary smooth-transition hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary smooth-transition hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Certifications", href: "#certifications" },
                { label: "Resume", href: "#resume" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary smooth-transition link-underline w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Technical Stack */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Built With</h4>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                React + TypeScript
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                Tailwind CSS
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                Hosted on AWS S3 + CloudFront
              </p>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={scrollToTop}
                className="hover:scale-105 smooth-transition"
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span>© {currentYear} Matthew Odoom Ntsiful. Built with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and lots of ☕</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>Deployed with AWS S3 + CloudFront + Route 53</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;