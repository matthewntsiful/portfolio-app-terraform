import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaClock, FaTag } from "react-icons/fa";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Portfolio
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <div className={`h-64 ${post.gradient} rounded-lg mb-8`}></div>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center">
                <FaClock className="mr-2" />
                {post.readTime}
              </div>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  <FaTag className="mr-1 text-xs" />
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xl text-muted-foreground">
              {post.description}
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/">
              <Button>
                <FaArrowLeft className="mr-2" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;