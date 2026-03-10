export default function UseCasesLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="section-container py-20">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>

        {/* Featured card skeleton */}
        <div className="bg-gray-100 rounded-2xl p-8 mb-8 animate-pulse">
          <div className="flex gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        {/* Search skeleton */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-14 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
