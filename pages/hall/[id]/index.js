import Head from 'next/head'
import Database from 'services/database'

const Hall = ({ meeting }) => {
  const { id } = JSON.parse(meeting)

  return (
    <>
      <Head>
        <title>Hall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hall</h1>
      <p>{id}</p>
    </>
  )
}

Hall.layout = 'default'

export default Hall

export async function getServerSideProps({ params }) {
  const { get } = Database({ collection: 'meetings' })
  const { id } = params

  try {
    const meeting = await get({ id })

    return {
      props: {
        meeting: JSON.stringify(meeting),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
