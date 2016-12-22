var express = require('express');
var elasticsearch = require('elasticsearch');
var router = express.Router();

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  //log: 'trace'
});

/* GET users listing. */
router.post('/getSuggestionsForPatient', function(req, res, next) {
  return Promise.resolve()
    .then(ping)
    .then(search)
    .then(function(data) {
      data.sort( function() { return 0.5 - Math.random() } ); // Shuffle and get 4 elements
      var numOfSuggestions = Math.random() * (4) + 1;
      res.json(data.splice(0, numOfSuggestions));
    })
    .catch(function(err) {
      res.status(500);
      res.statusMessage = err.message;
      res.end();

      console.log("ERROR", err);
    });

});

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
    type: 'suggestion',
    size: 100
    }).then(function (resp) {
    return resp.hits.hits.map(function (a) { return a._source; });
  });
}

module.exports = router;
