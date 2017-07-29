require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT;

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


app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
      res.send({todos});
    }).catch((err) => res.status(400).send(err));


});

app.get('/todos/:id' , (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo)
    {
      res.status(404).send();
    } else {
      res.send({todo});
    }

  }).catch((e) => {
    return res.status(400).send();
  });


});


app.delete('/todos/:id', (req, res) => {
  //get the id
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
        res.status(404).send();
      } else {
        res.send({todo});
      }

    }).catch((e) => {
      return res.status(400).send();
    });


});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);


  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      res.status(404).send();
    } else {
      res.status(200).send({todo});
    }
  }).catch((e) => {
    res.status(400).send();
  });


});



app.listen(port, ()=> {
  console.log(`Started on Port ${port}`);
});


module.exports = {app};
