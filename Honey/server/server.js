var elasticsearch = require('elasticsearch');
var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
//var user = require("user");

var elasticClient = new elasticsearch.Client({
});

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, "..")));

// This responds a POST request for the homepage
app.post('/', function (req, res) {
  console.log("Got a POST request for the homepage");
  res.send('Hello POST');
})

///---------------------- Chat ---------------------------///
app.post('/sendchat', function (req, res) {
  console.log("Got a POST request for sendchat");

   SendChat(req.body).then(function (result) {
     res.json(result._id);
   })
})

function SendChat(body) {
  return elasticClient.index({
    index: 'honeyindex',
    type: 'chatitem',
    body: body
  })
}

app.get('/getchat', function (req, res) {
  console.log("Got a getchat request ");
  Promise.resolve()
    .then(GetChat(req.query))

  res.send('Get Chat');
})

function GetChat(chatItem) {
  console.log("Got a get chat request :" + chatItem);
  //user: user;
  //user = getUser(chatItem.userId);

    return elasticClient.search({
      index: 'honeyindex',
      type: 'chatitem',
      body: {
        query: {
          bool: {
            must: [
              {
                terms: {
                  "chatItem.userId": [chatItem.userId]
                }
              },
              {range: {"chatItem.dateTime": {"from": chatItem.date}}}
            ]
          }
        }
      }
    })
}
app.get('/gettasks', function (req,res) {
 getTasks().then(function(result){
   res.json(result.hits)
 })
    .catch(function(Err){
      console.log("error : "+Err);
    })
})

app.post('/addtask', function (req, res) {
  console.log(req.body);
  indexTask(req.body).then(function(result){
    res.json(result._id);
  })
})

// This responds a DELETE request for the /del_user page.
app.post('/setUser', function (req, res) {
  console.log("Got a setUser request for " + req.body.user.id);
  setUser(req.body).then(function(result){
    res.json(result._id);
  });
})

app.post('/addUser', function (req, res) {
  console.log(req.body.user)
  indexUser(req.body).then(function(result){
    //req.body.user.id = result.id;

    //console.log(JSON.stringify(req.body.user));

    //var partner = {
    //  id:null,
    //  name:req.body.user.partnerName,
    //  partnerId:req.body.user.id,
    //  partnerName:req.body.user.name,
    //  location:[]};

    //indexUser(partner).then(function(resp){
    //  req.body.user.partnerId = resp._id;
    //  console.log(JSON.stringify(req.body.user));
    //  setUser(req.body.user);
    //  partner.id = resp._id;
    //  setUser(partner);
      res.json(result._id);
    //});


  })
})

// This responds a GET request for the /list_user page.
app.get('/getUser', function (req, res) {
  var id = req.query.id;
  console.log("Got a GET request for /getUser" + id);
  getUser(id).then(function(result){
    res.json(result._source.user)
  })
    .catch(function(Err){
      console.log("error : "+Err);
    })
})

function getUser(id) {
  console.log("Got a get getuser request :" + id);

  return elasticClient.get({
    index: 'honeyindex',
    type: 'user',
    id:id
    })
}

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})

function indexTask(body) {
  return elasticClient.index({
    index: 'honeyindex',
    type: 'task',
    body: body
  });
}

function getTasks() {
  return elasticClient.search({
    index: 'honeyindex',
    type: 'task'
  });

}

function indexUser(body) {
  return elasticClient.index({
    index: 'honeyindex',
    type: 'user',
    body: body
  });
}

function setUser(body) {
  return elasticClient.index({
    index: 'honeyindex',
    type: 'user',
    id: body.user.id,
    body: body
  });
}
