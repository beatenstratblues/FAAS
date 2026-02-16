const { spawn } = require('child_process');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'The server is running successfully'
  })
})

app.post("/execute", (req, res) => {
  const codeString = req.body.codeString;
  res.status(200).json({
    message: codeString
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
