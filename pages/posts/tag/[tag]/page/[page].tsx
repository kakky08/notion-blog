import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getAllPosts, getAllTags, getNumberOfPages, getNumberOfPagesByTag, getPostsByPage, getPostsByTagAndPage, getPostsTopPage } from '@/lib/notionAPI'
import SinglePost from '@/components/Post/SinglePost'
import { GetStaticProps } from 'next'
import Pagination from '@/components/Pagination/Pagination'
import Tag from '@/components/Tag/Tag'

const inter = Inter({ subsets: ['latin'] })

type Params = {
    params: {
      tag: string;
      page: string;
    }
}

interface BlogTagPageListProps {
    numberOfPagesByTag: number;
    posts: {
        title: string;
        description: string;
        date: string;
        tags: string[];
        slug: string;
    }[];
    currentTag: string;
    allTags: string[];
}

/** page番号の取得 */
export const getStaticPaths = async () => {
    const allTags = await getAllTags();
    let params: Params[] = [];

    await Promise.all(
        allTags.map((tag) => {
            return getNumberOfPagesByTag(tag).then((numberOfPageByTag: number) => {
                for(let i = 1; i <= numberOfPageByTag; i++) {
                    params.push({ params: { tag: tag, page: i.toString() } })
                }
            })
        })
    );
    return {
        paths: params,
        fallback: "blocking"
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const currentPage: string = context.params?.page?.toString() ?? "1";
    const currentTag: string = context.params?.tag?.toString() ?? "";

    const upperCaseCurrentTag =
        currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

    const posts = await getPostsByTagAndPage(upperCaseCurrentTag, parseInt(currentPage, 10));

    const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

    const allTags = await getAllTags();

    return {
        props: {
            posts,
            numberOfPagesByTag,
            currentTag,
            allTags
        },
        revalidate: 60,
    }
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, currentTag, allTags }: BlogTagPageListProps) => {
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container w-full mt-16'>
        <h1 className='text-4xl font-medium text-center mb-16'>
          Notion Blog🚀
        </h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
            {posts.map((post, index) => (
            <div key={index}>
                <SinglePost
                title={post.title}
                description={post.description}
                data={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
                />
            </div>
            ))}
        </section>
        <Pagination
            numberOfPage={numberOfPagesByTag}
            tag={currentTag}
         />
        <Tag
            tags={allTags}
        />
      </main>
    </div>
  )
}

export default BlogTagPageList;
