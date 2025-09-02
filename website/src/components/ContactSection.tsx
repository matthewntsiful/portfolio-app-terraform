import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCertificate
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: "matthew.ntsiful@gmail.com",
      href: "mailto:matthew.ntsiful@gmail.com",
    },
    {
      icon: FaPhone,
      text: "+233 557 721 615",
      href: "tel:+233557721615",
    },
    {
      icon: FaMapMarkerAlt,
      text: "Takoradi, Ghana",
      href: "#",
    },
    {
      icon: FaCalendarAlt,
      text: "Schedule a meeting",
      href: "https://calendly.com/matthewntsiful",
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/matthewntsiful", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/matthewntsiful", label: "LinkedIn" },
    { icon: FaCertificate, href: "https://www.credly.com/users/matthewntsiful", label: "Certifications" },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Get In Touch
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mt-2 bg-card border-border focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-2 bg-card border-border focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full mt-2 bg-card border-border focus:ring-primary resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-blue"
                >
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="lg:w-1/2">
              <div className="bg-card p-8 rounded-lg border border-border h-full">
                <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                  Contact Information
                </h3>
                
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <info.icon className="text-primary text-xl mr-4" />
                       {info.href === "#" ? (
                        <span className="text-muted-foreground">{info.text}</span>
                      ) : (
                        <a 
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : "_self"}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {info.text}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                
                <h3 className="text-2xl font-semibold my-6 text-card-foreground">
                  Connect With Me
                </h3>
                 <div className="flex space-x-6">
                   {socialLinks.map((social, index) => (
                     <a
                       key={index}
                       href={social.href}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-2xl text-muted-foreground hover:text-primary transition-colors"
                       aria-label={social.label}
                     >
                       <social.icon />
                     </a>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;