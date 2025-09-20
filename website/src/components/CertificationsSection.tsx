import { useInView } from "react-intersection-observer";
import { FaAws, FaGraduationCap, FaRocket, FaCertificate, FaLinux } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";

const CertificationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certifications = [
    {
      icon: FaAws,
      title: "AWS Certified Cloud Practitioner",
      description: "Cloud fluency and foundational AWS architecture knowledge",
      iconColor: "text-orange-400",
      badge: "AWS",
    },
    {
      icon: FaGraduationCap,
      title: "AWS re/Start Graduate",
      description: "Intensive cloud computing bootcamp with hands-on AWS experience",
      iconColor: "text-blue-400",
      badge: "AWS",
    },
    {
      icon: FaRocket,
      title: "AWS Solutions Architect Associate",
      description: "Advanced AWS architecture and design patterns (In Progress)",
      iconColor: "text-purple-500",
      badge: "AWS",
    },
    {
      icon: FaLinux,
      title: "DevOps & Site Reliability Engineering",
      description: "Modern DevOps practices, CI/CD pipelines, and SRE methodologies",
      iconColor: "text-electric-green",
      badge: "LF",
    },
    {
      icon: SiKubernetes,
      title: "Kubernetes Container Orchestration",
      description: "Production Kubernetes deployment and container management",
      iconColor: "text-electric-blue",
      badge: "LF",
    },
    {
      icon: FaLinux,
      title: "Linux System Administration",
      description: "Enterprise Linux operations and system management",
      iconColor: "text-electric-purple",
      badge: "LF",
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certifications & Training
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications demonstrating expertise in cloud computing, DevOps practices, and system administration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden ${
                  inView
                    ? `opacity-100 translate-y-0 delay-${index * 150}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="absolute bottom-4 right-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    cert.badge === 'AWS' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' : 
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {cert.badge}
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <cert.icon className={`text-4xl ${cert.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.credly.com/users/matthewntsiful"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-blue transform hover:scale-105 transition-all duration-300"
            >
              <FaCertificate className="mr-3 text-lg" />
              View All Certifications on Credly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;