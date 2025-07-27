const express = require('express')
const app = express()
const PORT = 3000

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express backend!')
})

app.get('/image-source', (req, res) => {
  res.send('Hello from Express backend! 2')
})

app.get('/image-gallery', (req, res) => {
  res.json({ message: 'hello' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
