const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
  text: 'Some test 1'
}, {
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
