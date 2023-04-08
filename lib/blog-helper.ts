/**
 * タグの有無でページネーションのリンクを切り分ける
 * @param tag
 * @param page
 * @returns
 */
export const getPageLink = (tag: string, page: number) => {
    return tag ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`
}