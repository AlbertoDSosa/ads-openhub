export default (req, res) => {
  if (req.method === 'POST') {
    res
      .status(201)
      .json({ data: req.body, success: true, message: 'success OK' })
  } else {
    res
      .status(400)
      .json({ error: true, message: 'Endpoint only accepts POST method' })
  }
}
