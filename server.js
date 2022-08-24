const express = require('express');
const server = express();

const app = require('./app')

const PORT = process.env.PORT || 3000

server.get('/', (req, res) => {

    var links = app.WEZ_SE_KUP_KOSZULKE()

    res.render('index.pug', { links: links });
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
