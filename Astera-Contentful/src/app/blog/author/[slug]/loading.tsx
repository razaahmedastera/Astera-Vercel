export default function AuthorLoading() {
  return (
    <div>
      {/* Hero Skeleton */}
      <section style={{ background: 'linear-gradient(135deg, #f4f7ff 0%, #e8f0fe 50%, #f9fbff 100%)', padding: '80px 0 60px' }}>
        <div className="section-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Avatar skeleton */}
            <div style={{ width: 160, height: 160, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0 }} className="animate-pulse" />
            <div style={{ flex: 1 }}>
              {/* Name skeleton */}
              <div style={{ width: '60%', height: 36, background: '#e5e7eb', borderRadius: 8, marginBottom: 12 }} className="animate-pulse" />
              {/* Job title skeleton */}
              <div style={{ width: '40%', height: 20, background: '#e5e7eb', borderRadius: 6, marginBottom: 16 }} className="animate-pulse" />
              {/* Bio skeleton */}
              <div style={{ width: '90%', height: 16, background: '#e5e7eb', borderRadius: 6, marginBottom: 8 }} className="animate-pulse" />
              <div style={{ width: '75%', height: 16, background: '#e5e7eb', borderRadius: 6, marginBottom: 24 }} className="animate-pulse" />
              {/* Social links skeleton */}
              <div style={{ display: 'flex', gap: 12 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: '#e5e7eb' }} className="animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Skeleton */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div style={{ width: '30%', height: 28, background: '#e5e7eb', borderRadius: 8 }} className="animate-pulse" />
            <div style={{ width: 80, height: 28, background: '#e5e7eb', borderRadius: 20 }} className="animate-pulse" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '100%', height: 200, background: '#e5e7eb' }} className="animate-pulse" />
                <div style={{ padding: 24 }}>
                  <div style={{ width: '30%', height: 12, background: '#e5e7eb', borderRadius: 4, marginBottom: 12 }} className="animate-pulse" />
                  <div style={{ width: '90%', height: 20, background: '#e5e7eb', borderRadius: 6, marginBottom: 8 }} className="animate-pulse" />
                  <div style={{ width: '70%', height: 20, background: '#e5e7eb', borderRadius: 6, marginBottom: 16 }} className="animate-pulse" />
                  <div style={{ width: '100%', height: 14, background: '#e5e7eb', borderRadius: 4, marginBottom: 6 }} className="animate-pulse" />
                  <div style={{ width: '80%', height: 14, background: '#e5e7eb', borderRadius: 4 }} className="animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
