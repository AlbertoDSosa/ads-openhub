import Head from 'next/head'

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

export async function getServerSideProps({ params, req }) {
  const { id } = params

  const { host } = req.headers

  try {
    const res = await fetch(`http://${host}/api/meetings/${id}`)
    const meeting = await res.json()

    return {
      props: {
        meeting: JSON.stringify(meeting.data),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
