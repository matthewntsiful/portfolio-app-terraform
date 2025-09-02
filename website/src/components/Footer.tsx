import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/matthewntsiful", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/matthewntsiful", label: "LinkedIn" },
    { icon: FaCertificate, href: "https://www.credly.com/users/matthewntsiful", label: "Certifications" },
  ];

  return (
    <footer className="py-16 bg-gradient-glass backdrop-blur-xl border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <p className="text-foreground font-medium text-lg">
              &copy; 2024 Matthew Odoom Ntsiful. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Built with React + Tailwind + AWS S3 + CloudFront + Route 53
            </p>
          </div>
          
          <div className="flex items-center space-x-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;