const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const {ObjectID} = require('mongodb');

var todos = [{
  _id: new ObjectID(),
  text: 'Some test 1'
}, {
  _id: new ObjectID(),
  text: 'Some test 2'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {

it('should create a new todo', (done) => {
  var text = 'Test todo text';

  request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });

  });


  it('Should not create a new todo with empty text' , (done) => {
    var text = "";

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));


      });
  });


});



describe('GET /todos', () => {

it('should list a todo', (done) => {

    request(app)
      .get('/todos')
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(() => done());

  });


});



describe('GET /todos/:id', () => {

  it('Should return todo doc', (done) => {

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should return 404 when todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non object', (done) => {
    request(app)
      .get(`/todos/11`)
      .expect(404)
      .end(done);
  });

});
