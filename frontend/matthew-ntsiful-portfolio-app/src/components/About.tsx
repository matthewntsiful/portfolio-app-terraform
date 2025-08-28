import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Container, 
  GitBranch, 
  Shield, 
  Zap, 
  TrendingUp,
  Award,
  Target,
  Settings,
  Box,
  Activity,
  BarChart,
  Code,
  Terminal,
  Package,
  Monitor,
  Cog,
  ShieldCheck
} from "lucide-react";

const About = () => {
  const skills = [
    { name: "AWS", category: "Cloud", icon: Cloud },
    { name: "Terraform", category: "IaC", icon: Settings },
    { name: "Kubernetes", category: "Orchestration", icon: Container },
    { name: "Docker", category: "Containerization", icon: Box },
    { name: "GitHub Actions", category: "CI/CD", icon: GitBranch },
    { name: "Prometheus", category: "Monitoring", icon: Activity },
    { name: "Grafana", category: "Visualization", icon: BarChart },
    { name: "Jenkins", category: "CI/CD", icon: GitBranch },
    { name: "Python", category: "Programming", icon: Code },
    { name: "Bash", category: "Scripting", icon: Terminal },
    { name: "Helm", category: "Packaging", icon: Package },
    { name: "CloudWatch", category: "Monitoring", icon: Activity },
    { name: "ECS", category: "Containers", icon: Container },
    { name: "CloudFormation", category: "IaC", icon: Settings },
    { name: "Trivy", category: "Security", icon: Shield },
    { name: "Linux", category: "Systems", icon: Monitor },
    { name: "Ansible", category: "Automation", icon: Cog },
    { name: "DevSecOps", category: "Security", icon: ShieldCheck },
    { name: "EKS", category: "Orchestration", icon: Container },
  ];

  const strengths = [
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "CI/CD Automation & Delivery Pipelines",
      description: "Expert in GitHub Actions, Jenkins, and building secure deployment workflows with automated testing."
    },
    {
      icon: <Container className="h-6 w-6" />,
      title: "Containerization and Kubernetes",
      description: "Skilled in Docker, Kubernetes, Helm charts, and deploying scalable microservices on AWS EKS."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Infrastructure as Code",
      description: "Proficient in Terraform and CloudFormation for provisioning secure, scalable AWS infrastructure."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "AWS Cost Optimization & Governance",
      description: "Proven track record reducing cloud costs by 30% through automation and resource optimization."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Scripting & DevOps Tooling",
      description: "Expert in Python and Bash scripting for automation, with strong Linux systems administration skills."
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Monitoring & Observability",
      description: "Experienced with Prometheus, Grafana, CloudWatch, and implementing comprehensive logging solutions."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DevOps Engineer with 3+ years automating, deploying, and scaling cloud infrastructure on AWS. 
            Passionate about creating reliable, secure, and cost-effective solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <div className="space-y-6">
            <Card className="p-8 card-gradient border-border/50">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">My Philosophy</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I believe great DevOps combines technical excellence with strategic thinking, 
                focusing on how infrastructure decisions impact business outcomes. My approach 
                emphasizes automation, security, and cost optimization.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing AWS Solutions Architect Associate certification to deepen 
                my expertise in designing scalable, resilient cloud architectures.
              </p>
            </Card>

            <Card className="p-8 card-gradient border-border/50">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-accent mr-3" />
                <h3 className="text-2xl font-semibold">Experience Highlights</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Deployed 12+ microservices to AWS EKS with Kubernetes, Helm, and TLS encryption</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Reduced AWS costs by 30% through automation, rightsizing, and lifecycle policies</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Improved deployment speed by 60% with GitHub Actions CI/CD pipelines</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {skills.map((skill, index) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="p-3 justify-center hover:scale-105 smooth-transition cursor-default flex items-center gap-2"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <skill.icon className="w-4 h-4" />
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths Grid */}
        <div>
          <h3 className="text-3xl font-semibold text-center mb-12">Core Strengths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <Card 
                key={strength.title}
                className="p-6 card-gradient border-border/50 hover:glow-effect smooth-transition group"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg mr-4 group-hover:bg-primary/30 smooth-transition">
                    <div className="text-primary">
                      {strength.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold">{strength.title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {strength.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;