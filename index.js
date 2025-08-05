const express = require('express')

const app = express()
const PORT = 3000

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express backend!')
})

app.get('/foods', (req, res) => {
  res.json({ message: 'I am so hungry for food' })
})

app.post('/hello', (req, res) => {
  const data = req.body
  res.json({ message: 'Hello, POST request received!', data })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
