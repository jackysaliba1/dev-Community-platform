import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6'>

      <h1 className='text-5xl md:text-7xl text-center font-bold mb-6'>
        Welcome to Developer community platform</h1>

      <p className='text-blue-400'>This is the platform where developers can share knowledge,join communities,publish blogs and grow their career journey!</p>
     <div className="flex gap-4 justify-center mt-8">
      <Link href="/communities">
      <button className="
px-6 py-3
bg-blue-100
text-slate-950
rounded-lg
font-semibold
hover:bg-white
transition-all
duration-300
">Explore communities</button></Link>
<Link href="/developers">
      <button className="
px-6 py-3
bg-blue-100
text-slate-950
rounded-lg
font-semibold
hover:bg-white
transition-all
duration-300
">Browse developers</button></Link>
</div>
    </section>
  
  )
}

export default Hero
