export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="h-[250px] bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
        <div className="space-y-4 mb-6">
          <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
