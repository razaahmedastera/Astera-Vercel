export default function IndustryLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero section skeleton */}
        <div className="px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
        
        {/* Features skeleton */}
        <div className="px-8 py-16 bg-gray-50">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <div className="h-16 w-16 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
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
