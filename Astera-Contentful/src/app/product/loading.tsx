export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Hero skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
        
        {/* Features skeleton */}
        <div className="space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
