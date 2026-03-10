export default function WhitepaperLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#f8fafc] to-white pt-32 pb-16">
        <div className="section-container text-center">
          <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 max-w-full bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-80 max-w-full bg-gray-100 rounded mx-auto animate-pulse" />
        </div>
      </div>
      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-100" />
              <div className="p-5">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
