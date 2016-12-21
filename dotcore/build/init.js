var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

Promise.resolve()
  .then(clearIndex)
  .then(initSymptoms)
  .then(initSuggestions)
  .catch(function(err) {
    console.log("ERROR", err);
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
  var simptoms = ["כאב ראש","פריחה","כאב גב","כאב בטן","בחילות","חום","עצירות","שיעול","שלשול","הקאות"];
  setTimeout(function(){
  for (i = 0; i < simptoms.length; i++) {
    initSymptom(i, simptoms[i]);
  }}, 3000);
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
    "נסה לחייך יותר"];
  setTimeout(function(){
  for (i = 0; i < suggestions.length; i++) {
    initSuggestion(i, suggestions[i]);
  }}, 3000);
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
