import React from 'react'

const StatsSection = () => {
  return (
    <section className="py-16">
    <h2 className='text-3xl font-bold text-left mb-10'>Platform Statistics</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-blue-100 rounded-3xl p-6 shadow-xl border flex flex-col items-center justify-center min-h-[180px]">
    <h3 className="text-5xl font-extrabold text-slate-950">4</h3>
    <p className="text-blue-500 text-lg font-semibold mt-2">
      Developers
    </p>
  </div>

  <div className="bg-blue-100 rounded-3xl p-6 shadow-xl border flex flex-col items-center justify-center min-h-[180px]">
    <h3 className="text-5xl font-extrabold text-slate-950">7</h3>
    <p className="text-blue-500 text-lg font-semibold mt-2">
      Blogs
    </p>
  </div>

  <div className="bg-blue-100 rounded-3xl p-6 shadow-xl border flex flex-col items-center justify-center min-h-[180px]">
    <h3 className="text-5xl font-extrabold text-slate-950">3</h3>
    <p className="text-blue-500 text-lg font-semibold mt-2">
      Communities
    </p>
  </div>

</div>
    </section>
  )
}

export default StatsSection
