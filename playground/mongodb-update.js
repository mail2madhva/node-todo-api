const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

  if(err) {
    return console.log('Uable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({ "text" : "Walk the dog1"},
  //   {
  //     $set:{
  //     "text" : "Walk the dog 2"
  //     }
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });

    db.collection('Users').findOneAndUpdate({ "name" : "Madhu"},
      {
        $inc:{
        "age" : 1
        }
      })
      .then((result) => {
        console.log(result);
      });

  db.close();
});
