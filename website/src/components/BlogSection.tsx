import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      title: "Optimizing AWS Costs for Startups",
      description: "Practical strategies to reduce your cloud bill without sacrificing performance or reliability.",
      date: "June 15, 2023",
      gradient: "bg-gradient-card-4",
    },
    {
      title: "Building Secure CI/CD Pipelines",
      description: "How to implement security best practices in your deployment pipelines from day one.",
      date: "May 28, 2023",
      gradient: "bg-gradient-card-5",
    },
    {
      title: "Kubernetes Disaster Recovery Strategies",
      description: "Ensure business continuity with these proven techniques for Kubernetes cluster recovery.",
      date: "April 10, 2023",
      gradient: "bg-gradient-card-6",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            From My Blog
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.title}
                className={`bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:scale-105 transition-all duration-500 hover:shadow-glow-blue ${
                  inView
                    ? `opacity-100 translate-y-0 delay-${index * 100}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className={`h-48 ${post.gradient}`}></div>
                <div className="p-6">
                  <span className="text-accent text-sm">{post.date}</span>
                  <h3 className="text-xl font-semibold my-2 text-card-foreground">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {post.description}
                  </p>
                  <button className="text-primary hover:underline font-medium">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Posts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;