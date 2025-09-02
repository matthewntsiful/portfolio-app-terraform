import { useInView } from "react-intersection-observer";
import { 
  FaAws, 
  FaDocker, 
  FaGithub, 
  FaPython,
  FaCheck,
  FaLinux,
  FaTerminal,
  FaShieldAlt
} from "react-icons/fa";
import { 
  SiTerraform, 
  SiKubernetes, 
  SiPrometheus, 
  SiGrafana,
  SiAnsible
} from "react-icons/si";

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { icon: FaAws, name: "AWS", color: "text-orange-400" },
    { icon: SiTerraform, name: "Terraform", color: "text-purple-500" },
    { icon: SiKubernetes, name: "Kubernetes", color: "text-blue-400" },
    { icon: FaDocker, name: "Docker", color: "text-blue-500" },
    { icon: FaGithub, name: "GitHub Actions", color: "text-foreground" },
    { icon: FaShieldAlt, name: "DevSecOps", color: "text-green-500" },
    { icon: SiPrometheus, name: "Prometheus", color: "text-orange-400" },
    { icon: SiGrafana, name: "Grafana", color: "text-orange-300" },
    { icon: FaPython, name: "Python", color: "text-green-400" },
    { icon: FaLinux, name: "Linux", color: "text-yellow-400" },
    { icon: FaTerminal, name: "Bash Scripting", color: "text-cyan-400" },
    { icon: SiAnsible, name: "Ansible", color: "text-red-400" },
  ];

  const strengths = [
    "CI/CD Automation & Delivery Pipelines",
    "Containerization and Kubernetes Deployment",
    "Scripting (Python, Bash) and DevOps Tooling",
    "Infrastructure as Code (Terraform, CloudFormation)",
    "AWS Cost Optimization & Governance",
    "Cloud Security & DevSecOps Best Practices",
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            About Me
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                My DevOps Philosophy
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                I'm a DevOps Engineer with 3+ years of experience automating, deploying, and scaling cloud infrastructure on AWS. 
                I specialize in reducing AWS costs, improving deployment speed, and enhancing system visibility with modern monitoring tools.
              </p>
              <p className="text-lg text-muted-foreground">
                My approach combines infrastructure as code, automation scripting, and DevOps best practices to create robust, 
                scalable, and compliant infrastructure for modern cloud-native applications.
              </p>
              
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 text-foreground">My Strengths</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <FaCheck className="text-accent mr-3 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`flex flex-col items-center p-4 bg-card rounded-lg border border-border hover:scale-105 transition-all duration-300 hover:shadow-glow-blue ${
                      inView
                        ? `opacity-100 translate-y-0 delay-${index * 100}`
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <skill.icon className={`text-4xl mb-2 ${skill.color}`} />
                    <span className="text-card-foreground text-sm text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;