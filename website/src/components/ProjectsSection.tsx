import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { 
  FaLayerGroup, 
  FaShoppingCart, 
  FaTasks, 
  FaGlobe, 
  FaServer, 
  FaBolt,
  FaGithub,
  FaExternalLinkAlt,
  FaCode
} from "react-icons/fa";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      icon: FaLayerGroup,
      title: "Kubernetes Microservices on EKS",
      description: "Deployed 12+ microservices to AWS EKS using Helm, Ingress, HPA, and TLS. Implemented observability via Prometheus and Grafana.",
      tech: ["AWS EKS", "Kubernetes", "Helm", "Prometheus"],
      category: "container",
      gradient: "bg-gradient-card-1",
      featured: true,
    },
    {
      icon: FaShoppingCart,
      title: "E-Commerce on Kubernetes",
      description: "Containerized Django + React stack with PostgreSQL on Kubernetes. Enabled autoscaling, secret management, and end-to-end TLS.",
      tech: ["Kubernetes", "Docker", "PostgreSQL", "Django"],
      category: "container",
      gradient: "bg-gradient-card-2",
      featured: false,
    },
    {
      icon: FaTasks,
      title: "ECS CI/CD Pipeline",
      description: "Built ECS deployment workflow with GitHub Actions, Docker, and Trivy for vulnerability scanning with Slack notifications.",
      tech: ["ECS", "GitHub Actions", "Trivy", "Docker"],
      category: "cicd",
      gradient: "bg-gradient-card-3",
      featured: true,
    },
    {
      icon: FaGlobe,
      title: "S3 + CloudFront Website",
      description: "Automated deployment of static site with TLS, cache invalidation, and lifecycle policies using GitHub Actions and OAC.",
      tech: ["S3", "CloudFront", "GitHub Actions", "Route 53"],
      category: "cloud",
      gradient: "bg-gradient-card-4",
      featured: false,
    },
    {
      icon: FaServer,
      title: "Terraform AWS Infrastructure",
      description: "Provisioned VPC, ECS, RDS, and IAM with modular Terraform. Enforced secure routing with ALB, WAF, and NAT gateways.",
      tech: ["Terraform", "ECS", "IAM", "WAF"],
      category: "iac",
      gradient: "bg-gradient-card-5",
      featured: true,
    },
    {
      icon: FaBolt,
      title: "Lambda Function Deployment",
      description: "Built and deployed serverless Python functions to AWS Lambda, integrating with S3 triggers and secured with IAM roles.",
      tech: ["AWS Lambda", "IAM", "Python", "S3"],
      category: "serverless",
      gradient: "bg-gradient-card-6",
      featured: false,
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "container", label: "Containers" },
    { id: "cicd", label: "CI/CD" },
    { id: "cloud", label: "Cloud" },
    { id: "iac", label: "Infrastructure" },
    { id: "serverless", label: "Serverless" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-background via-background/95 to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,124,240,0.1),transparent)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my cloud engineering projects showcasing modern DevOps practices, 
              automation, and scalable infrastructure solutions.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-primary text-white shadow-glow-blue transform scale-105"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-modern ${
                  project.featured ? "ring-2 ring-primary/30" : ""
                } ${
                  inView
                    ? `opacity-100 translate-y-0 delay-${index * 100}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className={`h-56 ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <project.icon className="text-7xl text-white/90 z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-white/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-primary text-white py-2 px-4 rounded-lg font-medium hover:shadow-glow-blue transition-all duration-300 transform hover:scale-105">
                      <FaCode className="text-sm" />
                      View Code
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
                      <FaExternalLinkAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View more button */}
          <div className="text-center">
            <a
              href="https://github.com/matthewntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-4 bg-gradient-secondary text-white rounded-2xl font-bold hover:shadow-glow-green transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <FaGithub className="mr-3 text-xl" />
              Explore All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;