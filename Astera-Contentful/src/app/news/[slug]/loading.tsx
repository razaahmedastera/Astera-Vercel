export default function NewsDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-to-b from-[#f8fafc] to-white border-b border-gray-100">
        <div className="section-container">
          <div className="h-4 w-28 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="max-w-3xl space-y-4">
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-10 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-3xl space-y-4">
            <div className="h-64 w-full bg-gray-100 rounded-2xl animate-pulse mb-10" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
