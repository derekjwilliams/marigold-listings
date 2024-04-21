// components/MDXContent.server.js
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import axios from 'axios'
import matter from 'gray-matter'

const MDXContent = async ({ id }) => {
  const baseUrl =
    'https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_1.mdx'
  const filePath = `/path/to/${id}.mdx` // Assuming the ID corresponds to the filename
  let url = `${baseUrl}${filePath}`
  url =
    'https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_1.mdx' // hack for now

  try {
    const response = await axios.get(url)
    const { content, data: frontMatter } = matter(response.data)
    const mdxSource = await serialize(content)

    return (
      <div>
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...mdxSource} />
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch MDX:', error)
    return <div>Failed to load content.</div>
  }
}

export default MDXContent
