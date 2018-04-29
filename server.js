var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var id = 0;
var messages = {};

var messageParser = bodyParser.text();

app.get('/', function (req, res) {
   res.send('Send a get request to /messages/id to see a message.');
})

var server = app.listen(8081, function () {
   console.log("server started");
})

// GET method route
app.get('/messages/:id', function (req, res) {
  if (messages[req.params.id] !== undefined) {
    res.status(200).send(messages[req.params.id]);
  } else {
    res.status(404).send("Resource not found");
  }
})

// POST method route
app.post('/messages', messageParser, function (req, res) {
  messages[id] = req.body;
  var cid = id;
  setTimeout(function() {
    messages[cid] = undefined;
  }, 30000);
  res.status(200).send("Success");
  id++;
})

// GET method to clear route
app.get('/clear', function (req, res) {
  messages = {};
  res.status(200).send("Successfully cleared cache");
})
