import Head from 'next/head'

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
