import React from 'react'

const Communities = () => {
  return (
  <section className="py-16">
    <h2 className='text-3xl font-bold text-left mb-10'>Featured communities</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg font-bold text-slate-950 border min-h-[200px]">
         Web development
         <p className='text-blue-400'> Build responsive,modern and interactive websites using latest web technologies</p></div>
            <div className="bg-blue-100 rounded-2xl p-6 shadow-lg font-bold text-slate-950 border min-h-[200px]">
            Software engineering
            <p className='text-blue-400'>Discuss software design,development practices,architecture,testing and problem-solving.</p></div>
            <div className="bg-blue-100 rounded-2xl p-6 shadow-lg font-bold text-slate-950 border min-h-[200px]">
Data analytics
<p className='text-blue-400'>Explore data analysis,visualization,statistics and insights to support better decisions.</p></div>
    </div>
  </section>
  )
}

export default Communities
