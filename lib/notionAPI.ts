import { Client } from "@notionhq/client"
import { parseISO, format } from 'date-fns'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

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
}