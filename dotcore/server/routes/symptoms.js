var express = require('express');
var elasticsearch = require('elasticsearch');
var router = express.Router();

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  //log: 'trace'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  return Promise.resolve()
    .then(ping)
    .then(search)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(500);
      res.statusMessage = err.message;
      res.end();

      console.log("ERROR", err);
    });

    console.log(symptoms);

});

module.exports = router;

function ping() {
  return client.ping({
    requestTimeout: 30000,
  }).then(function () {
    //console.log("Cluster is OK");
  }).catch(function(err) {
    throw err;
  });
}

function search() {
  return client.search({
    index: 'myindex',
    type: 'symptom',
    size: 100
    }).then(function (resp) {
    return resp.hits.hits.map(function (a) { return a._source; });
  });
}
