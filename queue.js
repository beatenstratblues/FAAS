const { Queue } = require('bullmq')

const connection = {
    host: '127.0.0.1',
    port: 6379
}

const codeQueue = new Queue('codeJobQueue', connection);

module.exports = {
    codeQueue,
    connection
}