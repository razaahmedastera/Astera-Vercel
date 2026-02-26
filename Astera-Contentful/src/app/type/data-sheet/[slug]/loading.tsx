export default function DataSheetDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <section style={{ padding: '120px 0 64px', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="animate-pulse" style={{ height: 14, width: 80, background: '#e2e8f0', borderRadius: 4, marginBottom: 16 }} />
              <div className="animate-pulse" style={{ height: 40, width: '80%', background: '#e2e8f0', borderRadius: 8, marginBottom: 12 }} />
              <div className="animate-pulse" style={{ height: 40, width: '60%', background: '#e2e8f0', borderRadius: 8 }} />
            </div>
            <div className="animate-pulse" style={{ width: 340, height: 240, background: '#e2e8f0', borderRadius: 12 }} />
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 0 96px' }}>
        <div className="section-container">
          <div style={{ display: 'flex', gap: 48 }}>
            <div style={{ flex: 1 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="animate-pulse" style={{ height: 16, background: '#e2e8f0', borderRadius: 4, marginBottom: 16, width: `${100 - i * 8}%` }} />
              ))}
            </div>
            <div style={{ width: 400 }}>
              <div className="animate-pulse" style={{ height: 400, background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 16 }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
