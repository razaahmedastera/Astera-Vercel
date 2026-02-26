export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-gray-100">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="h-12 w-64 bg-gray-100 rounded-lg animate-pulse mb-4" />
            <div className="h-5 w-96 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-6">
                <div className="hidden sm:block w-[140px] h-[100px] bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                  <div className="h-6 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
