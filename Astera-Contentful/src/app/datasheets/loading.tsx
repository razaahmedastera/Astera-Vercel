export default function DataSheetsLoading() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-7xl mx-auto" style={{ paddingTop: 100 }}>
        <div className="text-center mb-12">
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="h-44 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
