"use strict";
var express = require("express");
var router = express.Router();
router.get('/', function (req, res, next) {
    var contacts = [
        { id: 1, name: "Ori" },
        { id: 2, name: "Roni" },
    ];
    res.json(contacts);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
