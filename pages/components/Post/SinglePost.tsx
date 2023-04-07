import Link from 'next/link';
import React from 'react'

type Props = {
    title: string
    description: string
    data: string
    tags: string[]
    slug: string;
    isPaginationPage: boolean;
};

export const SinglePost = (props: Props) => {
    const {title, description, data, tags, slug, isPaginationPage} = props;
  return (
    <>
    {isPaginationPage ? (
        <section
        className='bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'
        >
            <div className='lg:flex items-center'>
                <h2 className='text-gray-100 text-2xl font-medium mb-2'>
                    <Link href={`/posts/${slug}`}>
                        {title}
                    </Link>
                </h2>
                <div className='text-gray-200 mr-2'>{data}</div>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className='text-white bg-gray-500 rounded-x1 px-2 pb-1 mr-2 font-medium'
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className='text-gray-100'>{description}</p>
        </section>
    ) : (
        <section
        className='lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'
        >
            <div className='flex items-center gap-3'>
                <h2 className='text-gray-100 text-2xl font-medium mb-2'>
                    <Link href={`/posts/${slug}`}>
                        {title}
                    </Link>
                </h2>
                <div className='text-gray-100'>{data}</div>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className='text-white bg-gray-500 rounded-x1 px-2 pb-1 font-medium'
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className='text-gray-100'>{description}</p>
        </section>
    )}
    </>
  )
}
