
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })
    todo.save().then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});


app.get('')


app.listen(port, ()=> {
  console.log(`Started on Port ${port}`);
});