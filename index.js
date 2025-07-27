const express = require('express')
const { theway } = require('./downloadImages.mjs')

const app = express()
const PORT = 3000

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express backend!', theway)
})

app.get('/image-source', (req, res) => {
  const { url, totalImage } = req.body
  res.send('Hello from Express backend! 2')
})

app.get('/image-gallery', (req, res) => {
  const { url } = req.body
  res.json({ message: 'hello' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
