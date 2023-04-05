import React from 'react'

type Props = {
    title: string
    description: string
    data: string
    tags: string
    slug: string
};

export const SinglePost = (props: Props) => {
    const {title, description, data, tags, slug} = props;
  return (
    <div>{title}</div>
  )
}
