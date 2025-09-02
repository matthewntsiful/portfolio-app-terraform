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
          
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                         prose-headings:text-foreground prose-headings:font-bold
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                         prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                         prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                         prose-p:text-muted-foreground prose-p:leading-7 prose-p:mb-4
                         prose-strong:text-foreground prose-strong:font-semibold
                         prose-ul:text-muted-foreground prose-ul:mb-4 prose-ul:pl-6
                         prose-ol:text-muted-foreground prose-ol:mb-4 prose-ol:pl-6
                         prose-li:mb-2 prose-li:leading-6
                         prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                         prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                         prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
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