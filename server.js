const express = require('express');

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
    
    res.send('Performance example');
});

app.get('/timer', (req, res) => {
    //delay the response
    delay(9000);
    res.send('Ding ding');
});

app.listen(3000);