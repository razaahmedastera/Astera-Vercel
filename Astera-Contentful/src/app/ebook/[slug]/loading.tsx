export default function EbookDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Cover image skeleton */}
        <div className="h-64 bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
        
        {/* Title skeleton */}
        <div className="space-y-4 mb-6">
          <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
          ))}
        </div>
        
        {/* Form skeleton */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
