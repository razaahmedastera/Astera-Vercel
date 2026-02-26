export default function AboutUsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#f8fafc] to-white pt-32 pb-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-pulse">
              <div className="h-6 w-28 bg-gray-200 rounded-full mb-4" />
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-4" />
              <div className="h-12 w-3/4 bg-gray-200 rounded-lg mb-6" />
              <div className="h-5 w-full bg-gray-100 rounded mb-2" />
              <div className="h-5 w-5/6 bg-gray-100 rounded" />
            </div>
            <div className="hidden lg:grid grid-cols-5 gap-3 animate-pulse">
              <div className="col-span-3 row-span-2 aspect-[3/4] bg-gray-100 rounded-2xl" />
              <div className="col-span-2 aspect-square bg-gray-100 rounded-2xl" />
              <div className="col-span-2 aspect-square bg-gray-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
