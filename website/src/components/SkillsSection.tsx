import { useInView } from "react-intersection-observer";
import { FaAws, FaDocker, FaGitAlt, FaPython, FaLinux, FaJenkins } from "react-icons/fa";
import { SiTerraform, SiKubernetes, SiGithubactions, SiPrometheus, SiGrafana, SiAnsible, SiHelm, SiNginx, SiMysql, SiPostgresql, SiRedis, SiElasticsearch, SiApachekafka } from "react-icons/si";

const SkillsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Cloud & IaC",
      skills: [
        { name: "AWS", icon: FaAws, level: 90, color: "text-orange-400" },
        { name: "Terraform", icon: SiTerraform, level: 85, color: "text-purple-400" },
        { name: "Ansible", icon: SiAnsible, level: 78, color: "text-red-500" },
      ]
    },
    {
      title: "Containers & Orchestration",
      skills: [
        { name: "Docker", icon: FaDocker, level: 88, color: "text-blue-400" },
        { name: "Kubernetes", icon: SiKubernetes, level: 82, color: "text-electric-blue" },
        { name: "Helm", icon: SiHelm, level: 75, color: "text-blue-300" },
      ]
    },
    {
      title: "CI/CD & Automation",
      skills: [
        { name: "GitHub Actions", icon: SiGithubactions, level: 90, color: "text-gray-400" },
        { name: "Jenkins", icon: FaJenkins, level: 75, color: "text-red-400" },
        { name: "Git", icon: FaGitAlt, level: 92, color: "text-orange-500" },
      ]
    },
    {
      title: "Monitoring & Observability",
      skills: [
        { name: "Prometheus", icon: SiPrometheus, level: 80, color: "text-electric-green" },
        { name: "Grafana", icon: SiGrafana, level: 82, color: "text-orange-400" },
      ]
    },
    {
      title: "Programming & Scripting",
      skills: [
        { name: "Python", icon: FaPython, level: 85, color: "text-yellow-400" },
        { name: "Linux/Bash", icon: FaLinux, level: 88, color: "text-electric-purple" },
      ]
    },
    {
      title: "Databases & Services",
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, level: 75, color: "text-blue-600" },
        { name: "Redis", icon: SiRedis, level: 70, color: "text-red-500" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to build scalable cloud infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`bg-card p-6 rounded-xl border border-border transition-all duration-500 ${
                  inView
                    ? `opacity-100 translate-y-0 delay-${categoryIndex * 100}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-semibold text-card-foreground mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <skill.icon className={`text-xl ${skill.color}`} />
                          <span className="text-sm font-medium text-card-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-primary transition-all duration-1000 delay-${
                            categoryIndex * 100 + skillIndex * 50
                          }`}
                          style={{
                            width: inView ? `${skill.level}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;