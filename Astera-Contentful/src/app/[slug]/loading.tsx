export default function TrialDemoLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#f0f4ff] to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
            <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
