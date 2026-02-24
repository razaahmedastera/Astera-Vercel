export default function VideosLoading() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex items-baseline justify-between pt-16 pb-8 border-b-2 border-gray-200 mb-12">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 animate-pulse hidden sm:block"></div>
        </div>

        {/* Featured video skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 mb-16">
          <div className="w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
            <div className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-7 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="flex gap-4 mt-6">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Playlist skeletons */}
        {[1, 2].map((i) => (
          <div key={i} className="mb-12">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            <div className="w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
              <div className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
