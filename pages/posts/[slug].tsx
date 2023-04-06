import React from 'react'

function Post() {
  return (
    <section className='container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>2回目の投稿です。</h2>
        <div className='border-b-2 w-1/3 mt-1 border-sky-900'></div>
        <span className='text-gray-500'>2023/4/6</span>
        <br />
        <p className='text-white bg-sky-900 rounded-x1 font-medium mt-2 px-2 inline-block'>
            Next.js
        </p>
        <div className='mt-10 font-medium'>
            test
        </div>
    </section>
  )
}

export default Post