import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'

export default function Index({ }) {
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>

    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: { },
  }
}
