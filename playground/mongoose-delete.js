const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

console.log('error in code');
Todo.findByIdAndRemove('59787ab418e6171878094b15').then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
