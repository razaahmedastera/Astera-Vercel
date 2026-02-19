export default function EbookLoading() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
        
        {/* eBooks grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="h-48 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
