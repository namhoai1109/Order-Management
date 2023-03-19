const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
})