var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

router.get('/', function(req, res, next) {
  Promise.resolve()
    .then(clearIndex)
    .then(initSymptoms)
    .then(initSuggestions)
    .catch(function(err) {
      console.log("ERROR", err);
    });
});

function clearIndex() {
  client.indices.delete({
    index: 'myindex'
  }, function(error) {
    if (error) {
      console.log('Index does not exists');
    } else {
      console.log('Index deleted');
    }
  });
}

function clearType(type) {
  client.delete({
    index: '*'
  }, function(error) {
    if (error) {
      console.log('Index does not exists');
    } else {
      console.log('Index deleted');
    }
  });
}

function initSymptoms() {
  var simptoms = ["כאב ראש","פריחה","כאב גב","כאב בטן","בחילות","חום","עצירות","שיעול","שלשול","הקאות"]
  for (i = 0; i < simptoms.length; i++) {
    initSymptom(i, simptoms[i]);
  }
}

function initSymptom(id, desc) {
  return client.index({
    id: id,
    index: 'myindex',
    type: 'symptom',
    body: {
      id: id,
      description: desc
    }
  }).then(function () {
    console.log("symptom created");
  });
}

function initSuggestions() {
  var suggestions = [
    "עליך להשלים שעות שינה",
    "כדאי להוסיף שנ\"צ",
    "אתה עובד יותר מדי",
    "עליך לשתות יותר",
    "זמן לקצת מוזיקה טובה",
    "צא לריצה",
    "עליך לרדת במשקל",
    "נסה לחייך יותר"]
  for (i = 0; i < suggestions.length; i++) {
    initSuggestion(i, suggestions[i]);
  }
}

function initSuggestion(id, desc) {
  return client.index({
    id: id,
    index: 'myindex',
    type: 'suggestion',
    body: {
      id: id,
      description: desc
    }
  }).then(function () {
    console.log("suggestion created");
  });
}

module.exports = router;
