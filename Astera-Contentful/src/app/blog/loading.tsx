export default function BlogLoading() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
        
        {/* Featured post skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-[460px_1fr] gap-8 mb-10">
          <div className="h-[260px] md:h-[320px] bg-gray-200 rounded-2xl animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
        
        {/* Posts grid skeleton */}
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-[160px_1fr] sm:grid-cols-[220px_1fr] gap-6 bg-white rounded-2xl border border-slate-100 p-5">
              <div className="h-[120px] sm:h-[150px] bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
