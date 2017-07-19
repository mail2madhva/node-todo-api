var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }

});


// var newtodo = new Todo({
//   text: 'Get a Logo for website',
//   completed: false,
//   completedAt: 0
// });
//
// newtodo.save().then((doc) => {
//   console.log('Saved todo ', doc);
// }, (err) => {
//   console.log(err);
// });


var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },

});

var newUser = new User({
  email: 'mail2madhva@gmail.com'
});

newUser.save().then((doc) => {
  console.log('Saved User ', doc);
}, (err) => {
  console.log(err);
});
