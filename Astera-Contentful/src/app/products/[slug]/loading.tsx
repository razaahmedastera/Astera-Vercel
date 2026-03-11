export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#f0f4ff] to-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/6 mx-auto animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-40 mx-auto animate-pulse mt-6" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-6 space-y-3">
              <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
