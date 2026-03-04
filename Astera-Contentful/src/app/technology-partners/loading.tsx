export default function TechnologyPartnersLoading() {
  return (
    <main className="min-h-screen bg-white animate-pulse">
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
              <div className="h-10 w-full bg-gray-200 rounded mb-3" />
              <div className="h-10 w-3/4 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-[478/509] bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="section-container">
          <div className="h-8 w-80 bg-gray-200 rounded mx-auto" />
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-6" />
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 p-6">
                    <div className="flex gap-4 mb-5">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                      <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                    </div>
                    <div className="h-5 w-28 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-36 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
