const { Worker } = require("bullmq");
const { connection } = require("./queue");

const worker = new Worker('codeJobQueue', async job => {
    console.log("Received the job : ", job.id);
    console.log("Job Data : ", job.data);

    return {
        code: job.data.code
    }
}, { connection });

worker.on('completed', job => {
    console.log("Completed Job : ", job.id);
})

worker.on('failed', (job, err) => {
    console.log("Failed Job : ", job.id, " Error ", job.err);
})