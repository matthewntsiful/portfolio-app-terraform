import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { HiDownload, HiEye, HiStar } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import ResumeModal from "./ResumeModal";

const ResumeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: HiStar,
      title: "Cost Optimization Expert",
      description: "Reduced AWS costs by 30% through strategic resource optimization and automation",
      color: "text-electric-green",
    },
    {
      icon: HiStar,
      title: "Performance Enhancement",
      description: "Improved deployment speed by 60% with robust CI/CD pipelines",
      color: "text-electric-blue",
    },
    {
      icon: HiStar,
      title: "Infrastructure Automation",
      description: "Expert in Terraform, Kubernetes, and containerized deployments",
      color: "text-electric-purple",
    },
  ];

  return (
    <section id="resume" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Professional Summary
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Hero Card */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-lg mb-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-card-foreground mb-4">
                  DevOps Engineer & Cloud Architect
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  3+ years of experience automating, deploying, and scaling cloud infrastructure on AWS. 
                  Specialized in reducing costs, improving deployment efficiency, and enhancing system visibility.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <HiEye className="mr-2" />
                  View Full Resume
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-blue">
                  <HiDownload className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <highlight.icon className={`text-3xl mr-3 ${highlight.color}`} />
                    <h4 className="text-lg font-semibold text-card-foreground">{highlight.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack Preview */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-lg mt-6">
              <h4 className="text-xl font-semibold text-card-foreground mb-4 text-center">Core Technologies</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana", "Python", "Bash"].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ResumeSection;