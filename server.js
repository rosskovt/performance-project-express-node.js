const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
       //event loop is blocked 
    }
}

app.get('/', (req, res) => {
    // blocking functuons...
    // JSON.stringify({}) => "{}"
    // JSON.parse("{}") => {}
    // [5,2,3,4,2].sort()
    // crypto hashing functions...

    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    //delay the response
    delay(9000);
    res.send(`Ding ding ${process.pid}`);
});

if (cluster.isMaster) {
    console.log(`Master has been started: ${process.pid}`);
    const NUM_WORKERS = os.cpus().length;
    console.log(NUM_WORKERS);

    for (let i = 0; i <= NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log(`Worker runs: ${process.pid}`);
    app.listen(3000);
}
