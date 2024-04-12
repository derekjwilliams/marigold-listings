import matter from 'gray-matter'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import axios from 'axios'

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
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const fileName = `listing_${id}.mdx`
  console.log('get listing ', fileName)

  const Mdx = dynamic(import(`@/listingsMarkdown/${fileName}`), { ssr: false })
  return (
    <div>
      <Head>
        <title>{`Listing ${id}`}</title>
      </Head>
      hello {id}
      <Mdx />
    </div>
  )
}
