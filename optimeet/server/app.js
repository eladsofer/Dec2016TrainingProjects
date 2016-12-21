"use strict";
var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..')));
require("./user.js").setup(app);
require("./meeting.js").setup(app);
//require("./meeting.ts").setup(app);
app.listen(3000, function () {
    console.log('Optimeet server listening on port 3000!');
});
app.get("*", function (req, res) {
    var filePath = path.join(__dirname, "../index.html");
    res.sendFile(filePath);
});
//# sourceMappingURL=app.js.map