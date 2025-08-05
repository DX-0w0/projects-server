async function runGet() {
  const response = await fetch('http://localhost:3000/')
  const result = await response.text()
  console.log('result', result)

  const response1 = await fetch('http://localhost:3000/foods')
  const result1 = await response1.json()
  console.log('result1', result1)
}

async function runPost() {
  const response = await fetch('http://localhost:3000/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'John' }),
  })
  const result = await response.json()
  console.log('result', result)
}

runGet()
runPost()
