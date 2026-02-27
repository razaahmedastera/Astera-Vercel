export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="py-12 sm:py-14 lg:py-16"
        style={{
          background: 'linear-gradient(180deg, #f4f7ff 0%, #f9fbff 50%, #ffffff 100%)',
        }}
      >
        <div className="section-container">
          <div className="mb-8">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="h-9 bg-gray-200 rounded w-1/3 mb-3 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              >
                <div className="h-[200px] bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
