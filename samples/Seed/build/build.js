const open = require("open");
const shelljs = require("shelljs");
const path = require("path");
const basePath = path.join(__dirname, "..");

function dev() {
    return Promise.resolve()
        .then(openBrowser)
        .then(runServer);
}

function openBrowser() {
    open("http://localhost:8080");

    return Promise.resolve();
}

function runServer() {
    const main = path.join(basePath, "server/main.js");
    shelljs.exec(`nodemon ${main}`);

    return Promise.resolve();
}

module.exports = {
    dev: dev,
    runServer: runServer,
    openBrowser: openBrowser,
};
