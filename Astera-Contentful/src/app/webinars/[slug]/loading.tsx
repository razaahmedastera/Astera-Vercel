export default function WebinarDetailLoading() {
  return (
    <div>
      <section style={{ padding: '100px 0 60px', background: '#0a1e3d' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div className="animate-pulse" style={{ height: 14, width: 80, background: '#1e3a5f', borderRadius: 4, marginBottom: 16 }} />
              <div className="animate-pulse" style={{ height: 32, width: '90%', background: '#1e3a5f', borderRadius: 6, marginBottom: 12 }} />
              <div className="animate-pulse" style={{ height: 32, width: '70%', background: '#1e3a5f', borderRadius: 6, marginBottom: 24 }} />
              <div className="animate-pulse" style={{ height: 14, width: '50%', background: '#1e3a5f', borderRadius: 4 }} />
            </div>
            <div className="animate-pulse" style={{ background: '#ffffff10', borderRadius: 16, height: 360 }} />
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 0' }}>
        <div className="section-container">
          <div className="animate-pulse" style={{ height: 14, width: 120, background: '#e2e8f0', borderRadius: 4, marginBottom: 24 }} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse" style={{ height: 20, width: `${80 - i * 10}%`, background: '#e2e8f0', borderRadius: 4, marginBottom: 16 }} />
          ))}
        </div>
      </section>
    </div>
  );
}
