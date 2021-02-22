import Database from 'services/database'

export default async (req, res) => {
  const { get } = Database({ collection: 'meetings' })

  try {
    const meetings = await get()

    res.status(200).send({
      data: meetings,
    })
  } catch (error) {
    console.log(error)
  }
}
