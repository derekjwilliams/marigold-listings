import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const res = await fetch(
    `https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_${id}.mdx`
  )
  const mdxText = await res.text()
  console.log(id)
  console.log(mdxText)
  return <MDXRemote source={`${mdxText}`} />
}

// interface Props {
//   mdxSource: MDXRemoteSerializeResult
// }

// export default function RemoteMdxPage({ mdxSource }: Props) {
//   return <MDXRemote {...mdxSource} />
// }

// export async function getStaticProps() {
//   // MDX text - can be from a local file, database, CMS, fetch, anywhere...
//   const res = await fetch(
//     'https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_1.mdx'
//   )
//   const mdxText = await res.text()
//   const mdxSource = await serialize(mdxText)
//   return { props: { mdxSource } }
// }
// import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
// import { serialize } from 'next-mdx-remote/serialize'
// import axios from 'axios'
// import matter from 'gray-matter'

// interface FrontMatter {
//   title: string // Include other front matter keys as needed
// }

// interface DocPageProps {
//   source: MDXRemoteSerializeResult
//   frontMatter: FrontMatter
// }

// export async function loader({ params }: { params: { id: string } }) {
//   const { id } = params
//   const baseUrl = 'https://raw.githubusercontent.com/user/repo/branch'
//   const filePath = `/path/to/${id}.mdx` // Assuming the ID corresponds to the filename
//   let url = `${baseUrl}${filePath}`
//   url =
//     'https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_1.mdx' // hack for now

//   try {
//     const response = await axios.get(url)

//     console.log('response ', response.data)
//     const { content, data: frontMatter } = matter(response.data)
//     const mdxSource = await serialize(content)
//     return { props: { source: mdxSource, frontMatter } } // Adjust this line as per structure
//   } catch (error) {
//     console.error('Failed to fetch MDX:', error)
//     throw new Error('Failed to load MDX content.')
//   }
// }

// export default function DocPage({ source, frontMatter }: DocPageProps) {
//   return (
//     <div>
//       {/* <h1>{frontMatter.title}</h1> */}
//       <MDXRemote {...source} />
//     </div>
//   )
// }

// listings/[id].js
// import MDXContent from '@/components/MDXContent.server'

// export default function DocPage({ params }: { params: { id: string } }) {
//   const { id } = params

//   return <MDXContent id={id} />
// }

// export function getServerSideProps({ params }: { params: { id: string } }) {
//   // Pass the params to the component as props
//   return { props: { params } }
// }

// async function getPostData(id: string) {
//   const fileName = `listing_${id}.mdx`
//   const fullPath = path.join('./listingsMarkdown', fileName)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Combine the data with the id and contentHtml
//   return {
//     fileName,
//     id,
//     ...matterResult.data,
//   }
// }
// export default async function ServiceRequestPage({
//     params,
//   }: {
//     params: { id: string }
//   }) {
//     const id = params.id
//     return <div id={id}></div>
//   }

// export default async function Page({ params }: { params: { id: string } }) {
//   const id = params.id
//   const response = await axios.get(
//     'https://raw.githubusercontent.com/derekjwilliams/marigold-listings/main/src/listingsMarkdown/listing_1.mdx'
//   )
//   const { content, data: frontMatter } = matter(response.data)
//   const mdxSource = await serialize(content)

//   return (
//     <div>
//       <h1>{frontMatter.title}</h1>
//       <MDXRemote {...mdxSource} />{' '}
//     </div>
//   )
// }
// export default function Page({ params }: { params: { id: string } }) {
//   const id = params.id
//   const fileName = `listing_${id}.mdx`
//   console.log('get listing ', fileName)

//   const Mdx = dynamic(import(`@/listingsMarkdown/${fileName}`), { ssr: false })
//   return (
//     <div>
//       <Head>
//         <title>{`Listing ${id}`}</title>
//       </Head>
//       hello {id}
//       <Mdx />
//     </div>
//   )
// }
