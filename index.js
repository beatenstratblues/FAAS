const { spawn } = require('child_process');
const express = require('express');
const { codeQueue } = require('./queue');
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'The server is running successfully'
  })
})

app.post("/execute", async (req, res) => {
  const codeString = req.body.codeString;

  if (!codeString) {
    return res.status(400).json({
      error: "Code is required!"
    })
  }

  const job = await codeQueue.add('execute', { code: codeString }, {
    removeOnComplete: {
      age: 3600
    }
  });

  return res.status(200).json({
    jobId: job.id,
    status: "queued"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
