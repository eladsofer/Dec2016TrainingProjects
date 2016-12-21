var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World 3!')
})

app.get('/api/user', function (req, res) {
    var contacts = [
        {id: 1, name: "Ori"},
        {id: 2, name: "Roni"},
    ];

    res.json(contacts);
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

