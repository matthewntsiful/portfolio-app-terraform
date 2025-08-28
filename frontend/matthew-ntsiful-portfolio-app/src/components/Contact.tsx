import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "matthew.ntsiful@gmail.com",
      href: "mailto:matthew.ntsiful@gmail.com"
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      value: "github.com/matthew-ntsiful",
      href: "https://github.com/matthew-ntsiful"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "linkedin.com/in/matthew-ntsiful",
      href: "https://linkedin.com/in/matthew-ntsiful"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Takoradi, Ghana (Remote Available)",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your next cloud infrastructure project or explore collaboration opportunities? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 card-gradient border-border/50">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John"
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe"
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input 
                  id="company" 
                  placeholder="Your Company"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Project Discussion / Collaboration Opportunity"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me about your project requirements, timeline, or any questions you have..."
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full group">
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 card-gradient border-border/50">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm always excited to discuss new opportunities, whether it's a complex 
                infrastructure challenge, a DevOps transformation, or exploring innovative 
                cloud solutions. Let's build something amazing together!
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={item.title} className="flex items-center space-x-4 group">
                    <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 smooth-transition">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-muted-foreground hover:text-primary smooth-transition link-underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 card-gradient border-border/50">
              <h3 className="text-xl font-semibold mb-4">Quick Connect</h3>
              <p className="text-muted-foreground mb-6">
                Prefer a direct approach? Feel free to reach out through any of these platforms:
              </p>
              
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href="https://github.com/matthew-ntsiful" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href="https://linkedin.com/in/matthew-ntsiful" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-accent-foreground">
                  <strong>Response Time:</strong> I typically respond to messages within 24 hours. 
                  For urgent matters, please mention it in your subject line.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;