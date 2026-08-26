import React from 'react'

const blogs = () => {
  return (
<section className="py-16">
  <h2 className="text-3xl font-bold text-left mb-10">
    Recent Blogs
  </h2>

  <div className="flex flex-col gap-6">

    <div className="bg-blue-100 border p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-3xl text-slate-950">
        How Responsive Design Works
      </h3>

      <p className="text-blue-400">
        What's the biggest challenge when building responsive websites?
      </p>

      <p className="text-sm text-slate-500 mb-4">
        By Jacky Saliba
      </p>
    </div>

    <div className="bg-blue-100 border p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-3xl text-slate-950">
        Clean Code Principles
      </h3>

      <p className="text-blue-400">
        Writing working code doesn't mean it's ready!
      </p>

      <p className="text-sm text-slate-500 mb-4">
        By John Anderson
      </p>
    </div>

      <div className="bg-blue-100 border p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-3xl text-slate-950">
        React vs Nextjs
      </h3>

      <p className="text-blue-400">
        Which should beginners learn first?
      </p>

      <p className="text-sm text-slate-500 mb-4">
        By kamilla Beckam
      </p>
    </div>

      <div className="bg-blue-100 border p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-3xl text-slate-950">
        SQL and NoSQL
      </h3>

      <p className="text-blue-400">
        What's the difference between these 2?
      </p>

      <p className="text-sm text-slate-500 mb-4">
        By Louis Vender
      </p>
    </div>
  </div>
</section>
    
  )
}

export default blogs
