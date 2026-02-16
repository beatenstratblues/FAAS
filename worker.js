const { Worker } = require('bullmq');
const { spawn } = require('child_process');
const { connection } = require('./queue');
const fs = require('fs');
const path = require('path');
const os = require('os');

const worker = new Worker(
  'codeJobQueue',
  async job => {

    const tempFile = path.join(os.tmpdir(), `code-${Date.now()}.js`);
    fs.writeFileSync(tempFile, job.data.code);

    return new Promise((resolve, reject) => {

      const child = spawn(process.execPath, [tempFile]);

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', data => {
        output += data.toString();
      });

      child.stderr.on('data', data => {
        errorOutput += data.toString();
      });

      child.on('close', code => {
        fs.unlinkSync(tempFile);

        if (code === 0) {
          resolve({ output });
        } else {
          reject(new Error(errorOutput));
        }
      });
    });
  },
  { connection }
);

worker.on('completed', (job, output) => {
    console.log("Completed Job : ", job.id, output);
})

worker.on('failed', (job, err) => {
    console.log("Failed Job : ", job.id, " Error ", err);
})