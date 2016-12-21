function run() {
    console.log("module1");
}

function g() {
    console.log("module1");
}

//module.exports = run;

exports.run = run;
exports.g = g;
