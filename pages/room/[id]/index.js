import Head from 'next/head'
import Database from 'services/database'

const Room = ({ meeting }) => {
  const { id } = JSON.parse(meeting)
  return (
    <>
      <Head>
        <title>Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Room</h1>
      <p>{id}</p>
    </>
  )
}

export default Room

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
