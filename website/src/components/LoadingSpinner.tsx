const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Loading Portfolio</h3>
          <p className="text-muted-foreground">Preparing an amazing experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;