import React from 'react'
import { getAllPosts, getSinglePost } from '@/lib/notionAPI';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts();
    const paths = allPosts.map(({slug}) => ({ params: {slug}}));
    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps = async ({params}) => {
    const post = await getSinglePost(params.slug);

    return {
      props: {
        post,
      },
      revalidate: 60,
    }
  }

function Post({post}) {
  return (
    <section className='container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
        <div className='border-b-2 w-1/3 mt-1 border-sky-900'></div>
        <span className='text-gray-500'>Posted date at {post.metadata.date}</span>
        <br />
        {post.metadata.tags.map((tag: string, index: number) => (
            <p
                key={index}
                className='text-white bg-sky-900 rounded-x1 font-medium mt-2 px-2 inline-block'
            >
                {tag}
            </p>
        ))}

        <div className='mt-10 font-medium'>
            <ReactMarkdown children={post.markdown} >

            </ReactMarkdown>
        </div>
    </section>
  )
}

export default Post