import Head from 'next/head'

const Users = () => {
  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Users</h1>
    </>
  )
}

Users.layout = 'default'

export default Users
