export default function UseCaseDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="section-container py-20">
        {/* Hero skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            <div className="flex gap-4 mt-8">
              <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features skeleton */}
        <div className="space-y-8">
          <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
