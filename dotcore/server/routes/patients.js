var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

var esClient = new elasticsearch.Client({
  host: 'localhost:9200'
});

var indexName = 'myindex';
var typeName = 'patients';


router.get('/:id', function(req, res, next) {
    console.log(req);
    esClient.get({
        index: indexName,
        type: typeName,
        id:  req.params.id
    }).then(function (response) {
        res.json(response);
    }).catch(()=>{
        res.json("not found");


    });

});



/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var patientRequest = req.body;
  patientRequest.status = 1; // processing

  Promise.resolve()
    .then(ping)
    .then(() => index(patientRequest))
    .then(() => {
        res.json(patientRequest);
    })
    .catch(function(err) {
      console.log("ERROR", err);
      res.json(err);
    });
  //res.json(patientRequest);
});

/* GET users listing. */
router.put('/', function(req, res, next) {
  console.log(req.body);
  var patientRequest = req.body;
  if (patientRequest.suggestions != undefined && patientRequest.suggestions.length > 0){
    patientRequest.status = 2; // completed
  }


  Promise.resolve()
    .then(ping)
    .then(() => index(patientRequest))
    .then(() => {
      res.json(patientRequest);
    })
    .catch(function(err) {
      console.log("ERROR", err);
      res.json(err);
    });
  //res.json(patientRequest);
});

function ping() {
  return esClient.ping({
    requestTimeout: 30000,
  }).then(function () {
    //console.log("Cluster is OK");
  }).catch(function(err) {
    throw err;
  });
}

function index(patientRequest) {
  return esClient.index({
    index: indexName,
    type: typeName,
    id: patientRequest.patient.id,
    body: patientRequest
  }).then(function (res) {
    if(res.result  != "created" && res.result  != "updated") {
      throw new Error("Failed to post patient");
    }
  });
}

module.exports = router;
