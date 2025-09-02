import { useInView } from "react-intersection-observer";
import { FaAws, FaGraduationCap, FaRocket, FaCertificate } from "react-icons/fa";

const CertificationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certifications = [
    {
      icon: FaAws,
      title: "AWS Certified Cloud Practitioner",
      description: "Validation of cloud fluency and foundational AWS knowledge",
      iconColor: "text-orange-400",
    },
    {
      icon: FaGraduationCap,
      title: "AWS re/Start Graduate",
      description: "Hands-on training in AWS cloud fundamentals",
      iconColor: "text-blue-400",
    },
    {
      icon: FaRocket,
      title: "AWS Solutions Architect Associate",
      description: "In progress - Deepening AWS architecture expertise",
      iconColor: "text-purple-500",
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Certifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`bg-card p-6 rounded-lg border border-border flex items-center hover:shadow-glow-blue transition-all duration-500 hover:scale-105 ${
                  inView
                    ? `opacity-100 translate-y-0 delay-${index * 200}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mr-6">
                  <cert.icon className={`text-5xl ${cert.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {cert.description}
                  </p>
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