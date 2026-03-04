export default function PartnersLoading() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      <section className="py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #EFF5FF 0%, #E0EDFF 50%, #D4E6FF 100%)' }}>
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-6 w-24 bg-[#005CCC]/10 rounded-full mx-auto mb-6" />
            <div className="h-12 w-96 max-w-full bg-gray-200 rounded-lg mx-auto mb-5" />
            <div className="h-5 w-full max-w-xl bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto mb-8" />
            <div className="h-12 w-44 bg-[#005CCC]/20 rounded-lg mx-auto" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 h-64" />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="section-container">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-10" />
          <div className="h-96 bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
        </div>
      </section>
    </div>
  );
}
