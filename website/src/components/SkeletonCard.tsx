const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-6">
        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-muted rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;