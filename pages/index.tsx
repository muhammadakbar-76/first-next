import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Belajar Next JS</title>
      </Head>
      <h1 className='text-4xl'>Hello World</h1>
      <button className="bg-green-500 text-white m-3 p-3 rounded font-mono hover:bg-green-700">ini tombol</button>
      <p className='bg-yellow-200'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ad ipsa sequi cum facere itaque id enim commodi corrupti omnis?</p>
      <Link href="/page1"><a>page1 index</a></Link><br />
      <Link href="/page1/activities"><a>page1 activities</a></Link><br />
    </section>
  )
}

export default Home