import Database from 'services/database'

export default async (req, res) => {
  const { get } = Database({ collection: 'meetings' })
  const { id } = req.query

  try {
    const meeting = await get({ id })

    res.status(200).send({
      data: meeting,
    })
  } catch (error) {
    res.status(404).send()
  }
}
