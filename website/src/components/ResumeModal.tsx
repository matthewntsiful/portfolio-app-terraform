import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiDownload, HiX } from "react-icons/hi";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const experience = [
    {
      title: "Cloud / DevOps Engineer",
      company: "Jomacs IT Services and Consulting",
      location: "Remote, Calgary, AB",
      period: "04/2022 – Present",
      responsibilities: [
        "Provisioned and maintained AWS infrastructure using Terraform for EC2, VPC, RDS, IAM, and S3",
        "Built and managed CI/CD pipelines using GitHub Actions with security scanning and Slack notifications",
        "Deployed applications to AWS EKS using Helm charts and configured Ingress, TLS, and autoscaling",
        "Implemented observability using Prometheus, Grafana, Loki, and AWS CloudWatch",
        "Reduced cloud costs by ~30% through resource review and automation",
      ],
    },
    {
      title: "IT Service Desk Analyst",
      company: "Millicom Ghana Limited",
      location: "Accra, Ghana",
      period: "07/2014 – 09/2017",
      responsibilities: [
        "Resolved Tier 1-2 system, access, and endpoint issues",
        "Supported user provisioning and policy compliance via Active Directory",
        "Documented technical workflows to improve ticket resolution speed",
      ],
    },
    {
      title: "Facility Manager",
      company: "Supreme Washing Bay & Auto Detailing",
      location: "Takoradi, Ghana",
      period: "03/2020 – 02/2022",
      responsibilities: [
        "Introduced automation and data tracking for facility operations",
        "Increased efficiency by 50% through workflow and resource optimization",
      ],
    },
  ];

  const technicalSkills = [
    {
      category: "Cloud Platforms",
      skills: "AWS (EC2, S3, VPC, Lambda, RDS, IAM, CloudWatch, CloudFront)",
    },
    {
      category: "Infrastructure as Code",
      skills: "Terraform, CloudFormation",
    },
    {
      category: "CI/CD & Containers",
      skills: "GitHub Actions, Jenkins, Docker, Kubernetes, Helm",
    },
    {
      category: "Monitoring",
      skills: "Prometheus, Grafana, CloudWatch",
    },
    {
      category: "Security",
      skills: "IAM, TLS, WAF, Trivy, HTTPS",
    },
    {
      category: "Scripting",
      skills: "Python, Bash, AWS CLI",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground flex items-center justify-between">
            Resume Details
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-card-foreground"
            >
              <HiX className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-border pb-6">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground">Matthew Odoom Ntsiful</h3>
              <p className="text-primary text-lg">Cloud & DevOps Engineer</p>
              <p className="text-muted-foreground mt-2">
                Takoradi, Ghana | +233 557 721 615 | 
                <a 
                  href="mailto:matthew.ntsiful@gmail.com"
                  className="text-primary hover:text-primary/80 ml-1"
                >
                  matthew.ntsiful@gmail.com
                </a>
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-blue">
              <HiDownload className="mr-2" />
              Download PDF
            </Button>
          </div>
          
          {/* Professional Summary */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b border-border pb-2 text-card-foreground">
              Professional Summary
            </h4>
            <p className="text-lg text-muted-foreground">
              DevOps Engineer with 3+ years of experience automating, deploying, and scaling cloud infrastructure on AWS using tools like Terraform, Kubernetes, Docker, and GitHub Actions. Proven record of reducing AWS costs by 30%, improving deployment speed by 60%, and enhancing system visibility with Prometheus, Grafana, and CloudWatch.
            </p>
          </div>
          
          {/* Experience */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b border-border pb-2 text-card-foreground">
              Experience
            </h4>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <h5 className="font-semibold text-card-foreground">{exp.title} - {exp.company}</h5>
                  <span className="text-muted-foreground text-sm md:text-base">{exp.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">{exp.location}</p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Education */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b border-border pb-2 text-card-foreground">
              Education
            </h4>
            <div>
              <h5 className="font-semibold text-card-foreground">Bachelor of Arts - Psychology & Linguistics</h5>
              <p className="text-muted-foreground">University of Ghana, Legon | 2007 - 2011</p>
              <p className="mt-2 text-muted-foreground">Accra, Ghana</p>
            </div>
          </div>
          
          {/* Technical Skills */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b border-border pb-2 text-card-foreground">
              Technical Skills
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <h5 className="font-semibold text-primary">{skill.category}</h5>
                  <p className="text-muted-foreground text-sm">{skill.skills}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;