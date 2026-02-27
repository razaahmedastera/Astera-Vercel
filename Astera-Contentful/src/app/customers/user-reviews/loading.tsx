export default function UserReviewsLoading() {
  return (
    <div className="min-h-screen">
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(135deg, #EFF5FF 0%, #E0EDFF 50%, #D4E6FF 100%)' }}
      >
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-5 w-32 bg-white/60 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-12 w-3/4 bg-white/60 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-2/3 bg-white/60 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
