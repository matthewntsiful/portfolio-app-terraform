import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  ExternalLink, 
  Star, 
  Container, 
  Cloud, 
  ShoppingCart, 
  GitBranch, 
  Globe, 
  Zap 
} from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Kubernetes Microservices Deployment on EKS",
      description: "Deployed 12+ microservices to AWS EKS using Helm charts, Ingress controllers, and TLS encryption. Built CI/CD pipeline with GitHub Actions and implemented observability with Prometheus and Grafana.",
      image: "/api/placeholder/600/400",
      technologies: ["AWS EKS", "Kubernetes", "Helm", "GitHub Actions", "Prometheus", "Grafana", "TLS"],
      category: "Kubernetes",
      github: "https://github.com/matthew-ntsiful",
      demo: null,
      featured: true,
      icon: Container,
      highlights: [
        "12+ microservices with Helm chart templating",
        "Horizontal Pod Autoscaling (HPA) and TLS encryption",
        "Prometheus, Grafana, and Redis for observability and caching"
      ]
    },
    {
      id: 2,
      title: "Terraform AWS Infrastructure Automation",
      description: "Provisioned secure cloud architecture using modular Terraform including VPCs, EC2, IAM, ALB, RDS, and ECS. Enforced encryption, TLS policies, and private subnets with NAT Gateway.",
      image: "/api/placeholder/600/400",
      technologies: ["Terraform", "AWS", "VPC", "EC2", "RDS", "ECS", "IAM"],
      category: "Cloud Infrastructure",
      github: "https://github.com/matthew-ntsiful",
      demo: null,
      featured: true,
      icon: Cloud,
      highlights: [
        "Modular Terraform with reusable components",
        "Secure networking with private subnets and NAT Gateway",
        "Cost optimization and encryption enforcement"
      ]
    },
    {
      id: 3,
      title: "Saleor E-Commerce on Kubernetes",
      description: "Containerized Django + React e-commerce stack with PostgreSQL deployed on Kubernetes. Implemented autoscaling, secret management, and end-to-end TLS encryption.",
      image: "/api/placeholder/600/400",
      technologies: ["Kubernetes", "Docker", "PostgreSQL", "TLS", "GitHub Actions"],
      category: "Kubernetes",
      github: "https://github.com/matthew-ntsiful",
      demo: null,
      featured: false,
      icon: ShoppingCart,
      highlights: [
        "Django + React containerized stack",
        "Kubernetes autoscaling and secret management",
        "End-to-end TLS encryption"
      ]
    },
    {
      id: 4,
      title: "ECS CI/CD for Static Application",
      description: "Built CI/CD pipeline to deploy Dockerized application to AWS ECS using GitHub Actions with Slack notifications and Trivy security scanning.",
      image: "/api/placeholder/600/400",
      technologies: ["ECS", "GitHub Actions", "Docker", "Trivy", "Slack"],
      category: "CI/CD",
      github: "https://github.com/matthew-ntsiful",
      demo: null,
      featured: false,
      icon: GitBranch,
      highlights: [
        "Automated security scanning with Trivy",
        "Slack integration for build notifications",
        "Dockerized application deployment to ECS"
      ]
    },
    {
      id: 5,
      title: "S3 + CloudFront Website with Automation",
      description: "Deployed static website via S3 and CloudFront using OAC, GitHub Actions, and TLS. Enabled cache invalidation and monitoring via CloudWatch.",
      image: "/api/placeholder/600/400",
      technologies: ["S3", "CloudFront", "GitHub Actions", "OAC", "TLS"],
      category: "Serverless",
      github: "https://github.com/matthew-ntsiful",
      demo: "https://demo.com",
      featured: false,
      icon: Globe,
      highlights: [
        "OAC for secure S3 origin access",
        "Automated cache invalidation",
        "CloudWatch monitoring and TLS encryption"
      ]
    },
    {
      id: 6,
      title: "Lambda Function Deployment",
      description: "Built and deployed serverless Python functions to AWS Lambda, integrating with S3 triggers and secured with IAM roles for event-driven processing.",
      image: "/api/placeholder/600/400",
      technologies: ["AWS Lambda", "Python", "S3", "IAM", "CloudWatch"],
      category: "Serverless",
      github: "https://github.com/matthew-ntsiful",
      demo: null,
      featured: false,
      icon: Zap,
      highlights: [
        "Event-driven serverless architecture",
        "S3 trigger integration",
        "IAM role-based security"
      ]
    }
  ];

  const categories = ["All", "Cloud Infrastructure", "Kubernetes", "CI/CD", "Serverless", "Web Apps", "Monitoring"];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of cloud infrastructure, DevOps automation, and scalable solutions 
            that demonstrate expertise in modern cloud technologies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="hover:scale-105 smooth-transition"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8">🌟 Flagship Projects</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <Card 
                key={project.id}
                className="overflow-hidden card-gradient border-border/50 hover:glow-effect smooth-transition group"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Project Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <project.icon className="w-24 h-24 text-primary drop-shadow-lg" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 group-hover:text-primary smooth-transition">
                        {project.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold mb-2 text-accent">Key Highlights:</h5>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="default" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.demo && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(project => !project.featured).map((project, index) => (
              <Card 
                key={project.id}
                className="overflow-hidden card-gradient border-border/50 hover:glow-effect smooth-transition group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Project Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-success/30 flex items-center justify-center">
                    <project.icon className="w-16 h-16 text-accent drop-shadow-md" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold group-hover:text-primary smooth-transition">
                      {project.title}
                    </h4>
                  </div>
                  
                  <Badge variant="outline" className="text-xs mb-3">
                    {project.category}
                  </Badge>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    {project.demo && (
                      <Button variant="ghost" size="sm" className="flex-1 text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline-hero" size="lg">
            View More Projects on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;