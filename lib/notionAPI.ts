import { Client } from "@notionhq/client"
import { parseISO, format } from 'date-fns'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({notionClient: notion})

export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        page_size: 100,
    })

    const allPosts = posts.results;

    return allPosts.map((post) => {
        return getPageMetaData(post)
    });
};


const getPageMetaData = (post) => {

    const getTags = (tags) => {
        const allTags = tags.map((tag) => {
            return tag.name;
        })
        return allTags;
    }

    const date = parseISO(post.properties.Date.created_time)
    const formattedDate = format(date, 'yyyy-MM-dd')

    return {
        title: post.properties.Title.title[0].plain_text,
        discription: post.properties.Discription.rich_text[0].plain_text,
        date:  formattedDate,
        slug: post.properties.Slug.rich_text[0].plain_text,
        tags: getTags(post.properties.Tags.multi_select),
    }
};

export const getSinglePost = async (slug) => {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    });

    const page = response.results[0];
    const metadata = getPageMetaData(page);

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    return {
        metadata,
        markdown: mdString,
    };

};

/** Topページ用記事の取得(4つ) */
export const getPostsTopPage = async (pageSize = 4) => {
    const allPosts = getAllPosts();
    const sliceTopPagePosts = allPosts.slice(0, pageSize);
    return sliceTopPagePosts;
};