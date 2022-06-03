const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

//let heroku define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT);