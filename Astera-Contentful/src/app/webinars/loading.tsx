export default function WebinarsLoading() {
  return (
    <div>
      <section style={{ padding: '100px 0 48px', background: '#0a1e3d' }}>
        <div className="section-container">
          <div style={{ maxWidth: 680 }}>
            <div className="animate-pulse" style={{ height: 36, width: 200, background: '#1e3a5f', borderRadius: 8, marginBottom: 12 }} />
            <div className="animate-pulse" style={{ height: 16, width: 400, background: '#1e3a5f', borderRadius: 6 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, paddingTop: 32 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse" style={{ height: 36, width: 100, background: '#1e3a5f', borderRadius: 24 }} />
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '40px 0 80px' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 28 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
                <div className="animate-pulse" style={{ width: '100%', paddingBottom: '52%', background: '#e2e8f0' }} />
                <div style={{ padding: '20px 24px' }}>
                  <div className="animate-pulse" style={{ height: 14, width: 80, background: '#e2e8f0', borderRadius: 4, marginBottom: 10 }} />
                  <div className="animate-pulse" style={{ height: 20, width: '80%', background: '#e2e8f0', borderRadius: 4, marginBottom: 10 }} />
                  <div className="animate-pulse" style={{ height: 14, width: '60%', background: '#e2e8f0', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
