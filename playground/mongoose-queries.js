const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '596f54db3efd2f27b0fb205c11';
//
// if(!ObjectID.isValid(id))
// {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
//   }).then((todo) => {
//   console.log('Todo', todo);
//   })

//
// Todo.findById(id).then((todo) => {
//   if(!todo)
//   {
//     return console.log('ID Not found');
//   }
// console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));


var id = '596f2c4996ae371878ab5e21';

User.findById(id).then((user) => {
  console.log('User by ID', user)
}).catch((e) => console.log(e));
